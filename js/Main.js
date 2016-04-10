/**
 * Created by manderscheid on 5/15/15.
 */

(function () {

    window.amg = window.amg || {};

    var Main = {
        currentState: null, // switch currentState and currentScreen rolls
        currentScreen: 0,
        stage: null // this stage is the context for the game. pass it into every screen controller
    };

    Main.states = {
        STATE_HOME_SCREEN: 0,
        STATE_GAME_SCREEN: 1,
        STATE_ACHIEVEMENT_SCREEN: 2,
        STATE_CHOOSE_SCREEN: 3
    };

    Main.init = function () {
        amg.managers.ScreenInformationManager.init();
        this.currentScreen = this.states.STATE_HOME_SCREEN;
        this.setupStage();
        this.setListeners();
        this.loadAssets();
    };

    Main.setupStage = function () {
        var me = this;
        var screen = amg.managers.ScreenInformationManager;
        this.stage = new PIXI.Stage(0x263f15);
        var renderOptions = {
            resolution: screen.displayResolution,
            autoResize: true
        };
        this.renderer = PIXI.autoDetectRenderer(screen.stage.width, screen.stage.height, renderOptions);
        document.body.appendChild(this.renderer.view);
        requestAnimFrame(function () {
            me.update(me);
        });
    };

    Main.setListeners = function () {
        var me = this;
        document.addEventListener(amg.events.GameEvents.stateEvents.CHANGE_STATE_TO_GAME, function (e) {
            //amg.managers.GameStateManager.createNewGameWithCharactersModel(e.detail.charactersModel);
            me.currentScreen = me.states.STATE_GAME_SCREEN;
            me.changeState();
        });
        document.addEventListener(amg.events.GameEvents.stateEvents.CHANGE_STATE_TO_ACHIEVEMENTS_SCREEN, function (e) {
            me.currentScreen = me.states.STATE_ACHIEVEMENT_SCREEN;
            me.changeState();
        });
        document.addEventListener(amg.events.GameEvents.stateEvents.CHANGE_STATE_TO_HOME, function (e) {
            me.currentScreen = me.states.STATE_HOME_SCREEN;
            me.changeState();
        });
    };

    Main.loadAssets = function () {
        document.addEventListener(amg.events.GameEvents.GAME_ASSETS_LOADED, this.assetsReady.bind(this));
        amg.managers.AssetManager.init();
    };

    Main.assetsReady = function () {
        this.changeState();
    };

    Main.changeState = function () {
        if (this.currentState !== null) {
            this.currentState.kill();
        }
        switch (this.currentScreen) {
            case this.states.STATE_HOME_SCREEN:
                this.currentState = Object.create(amg.controllers.HomeScreenController);
                this.currentState.init(this.stage);
                break;
            case this.states.STATE_GAME_SCREEN:
                this.currentState = Object.create(amg.controllers.GameController);
                this.currentState.init(this.stage);
                break;
            case this.states.STATE_ACHIEVEMENT_SCREEN:
                this.currentState = Object.create(amg.controllers.AchievementsScreenController);
                this.currentState.init(this.stage);
                break;
            case this.states.STATE_CHOOSE_SCREEN:
                this.currentState = Object.create(amg.controllers.ChooseCharacterScreenController);
                this.currentState.init(this.stage);
                break;
        }
    };

    /// ticker
    Main.update = function (scope) {
        scope.renderer.render(scope.stage);
        requestAnimFrame(function () {
            scope.update(scope);
        });
    };

    window.amg.Main = Main;

}());
/**
 * Created by manderscheid on 6/5/15.
 */

(function () {

    window.amg.controllers = window.amg.controllers || {};

    var ccc = {
        stage: null,
        model: null,
        view: null
    };

    ccc.init = function (stage) {
        this.stage = stage;
        this.setListeners();
        this.setUpScreen();
    };

    ccc.setListeners = function () {
        var me = this;
        document.addEventListener(amg.events.GameEvents.viewEvents.CHARACTER_CHOSEN_AND_START_PRESSED, function () {
            me.startGameWithCharacter();
        });
    };

    ccc.startGameWithCharacter = function () {
        document.dispatchEvent(new CustomEvent(amg.events.GameEvents.stateEvents.CHANGE_STATE_TO_GAME, {
            detail: {
                charactersModel: this.model
            }
        }));
    };

    ccc.setUpScreen = function () {
        this.model = Object.create(amg.models.CharacterModelManager);
        this.view = Object.create(amg.views.ChooseCharacterScreenView);
        this.model.init();
        this.view.model = this.model;
        this.view.init(this.stage);
    };

    ccc.kill = function () {
        this.stage.removeChildren(0, this.stage.children.length);
    };

    window.amg.controllers.ChooseCharacterScreenController = ccc;

}());
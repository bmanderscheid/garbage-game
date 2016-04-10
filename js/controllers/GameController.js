/**
 * Created by manderscheid on 4/25/15.
 */

(function () {

    window.amg.controllers = window.amg.controllers || {};

    var gc = {
        stage: null,
        gameModel: null,
        gameView: null,
        achievementsModel: null,
        achievementsView: null,
        gameEvents: null
    };

    gc.init = function (stage) {
        this.stage = stage;
        this.gameEvents = amg.events.GameEvents;
        this.setListeners();
        this.setUpGame();
    };

    gc.setListeners = function () {
        var me = this;
        document.addEventListener(this.gameEvents.viewEvents.NEW_GAME_READY, function () {
            me.gameModel.updateViewForDrawCard(true);
            me.gameView.updateViewForDrawCard();
        });
        document.addEventListener(this.gameEvents.viewEvents.CARD_DROP_SUCCESS, function (e) {
            var data = e.detail;
            me.gameModel.placeCardInPlayIntoRealm(0, data.realmCardModelObject); //TODO hard coded player ??
            me.gameView.updateCards();
            me.achievementsModel.update(amg.models.AchievementModelManager.ACHIEVEMENT_TYPE_INGAME);
        });
        document.addEventListener(this.gameEvents.viewEvents.CARD_DRAWN, function (e) {
            me.gameModel.updateViewForDrawCard();
            me.gameView.updateCardsForPlayerDraw();
        });
        document.addEventListener(this.gameEvents.viewEvents.CARD_DISCARDED, function (e) {
            me.gameModel.changePlayer(); // TODO possibly have change player ONLY change player. call bot from here
        });
        document.addEventListener(this.gameEvents.viewEvents.GAME_VIEW_UPDATED_FOR_BOT_MOVE, function (e) {
            me.gameModel.botReady();
        });
        document.addEventListener(this.gameEvents.viewEvents.ROUND_WON, function (e) {
            me.gameModel.roundWon();
            me.achievementsModel.update(amg.models.AchievementModelManager.ACHIEVEMENT_TYPE_ROUND_OVER);
            me.gameView.cleanUpForNewRound(); // do view first
            me.gameModel.cleanUpForNewRound();
            me.gameModel.createNewRound();
            me.gameView.createNewRound();
        });

        //BOT EVENTS
        document.addEventListener(this.gameEvents.botEvents.BOT_FOUND_MOVE_ON_REALM, function (e) {
            var data = e.detail;
            me.gameModel.placeCardInPlayIntoRealm(1, data.realmCardModelObject); //TODO hard coded player ??
            me.gameView.updateCardsForBotMove(data.realmCardIndex);
        });
        document.addEventListener(this.gameEvents.botEvents.BOT_DRAW_CARD, function (e) {
            me.gameModel.updateViewForDrawCard();
            me.gameView.updateCardsForBotDraw();
        });
        document.addEventListener(this.gameEvents.botEvents.BOT_DISCARDED, function (e) {
            me.gameModel.changePlayer();
            me.gameView.updateCardsForBotDiscard();
        });
    };

    gc.setUpGame = function () {
        // game model and view
        this.gameModel = Object.create(amg.managers.GameModelManager);
        this.gameView = Object.create(amg.managers.GameViewManager);
        this.gameModel.init();
        this.gameView.model = this.gameModel;
        this.gameView.init(this.stage);
        // achievements model and view
        this.achievementsModel = Object.create(amg.models.AchievementModelManager);
        this.achievementsModel.player = this.gameModel.playerManager.players[0]; // hard coded
        this.achievementsModel.init();
        this.achievementsView = Object.create(amg.views.AchievementsBadge);
        this.achievementsView.stage = this.gameView.stage;
        this.achievementsView.init();
        this.achievementsModel.view = this.achievementsView;
    };

    gc.kill = function(){
        this.stage.removeChildren(0,this.stage.children.length);
    };

    window.amg.controllers.GameController = gc;

}());
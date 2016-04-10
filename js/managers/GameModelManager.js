/**
 * Created by manderscheid on 4/14/15.
 */

(function () {

    window.amg.managers = window.amg.managers || {};

    var gm = {
        NUM_PLAYERS: 2,
        cardManager: {},
        playerManager: {},
        realmManager: {},
        botManager: {},
        currentCardInPlay: null,
        winner: null,
        winnerAll: null
    };

    gm.init = function () {
        this.winner = false;
        this.buildModelManagers();
        this.dealCards();
    };

    gm.buildModelManagers = function () {
        this.cardManager = Object.create(amg.managers.CardManager);
        this.cardManager.createDeckFromData(amg.data.cards);
        this.playerManager = Object.create(amg.managers.PlayerModelManager);
        this.playerManager.createVsBot();
        this.realmManager = Object.create(amg.managers.RealmModelManager);
        this.realmManager.init(this.playerManager.players);
        this.botManager = Object.create(amg.managers.BotManager); // TODO like this - focus on vs. computer (1) instead of making it complicated
        this.botManager.createBotFromModel(1, this);
    };

    gm.dealCards = function () {
        var i, cards;
        var numCardsForRealms = 0;
        for (i = 0; i < this.NUM_PLAYERS; i++) {
            numCardsForRealms += this.playerManager.players[i].level;
        }
        cards = this.cardManager.drawCards(numCardsForRealms);
        this.realmManager.dealCardsToRealms(cards);
    };

    gm.updateViewForDrawCard = function (firstDraw) { // TODO - firstDraw? not sure about this approach
        firstDraw = firstDraw === undefined ? false : true;
        this.currentCardInPlay = this.cardManager.drawCard();
        if (!firstDraw) {
            this.playerManager.disableCurrentPlayerDraw();
        }
    };

    /**
     * placeCardInPlayIntoRealm()
     * gets player, the realm card model from realm card and card model from card in play
     * update model in both cards
     */

    gm.placeCardInPlayIntoRealm = function (player, realmCardModel) { //TODO possibly dont need player when we have player manager
        var currentCardInPlayModelObject = this.currentCardInPlay;
        var currentRealmCardInPlayModelObject = this.realmManager.realms[player].cards[realmCardModel.realmIndex];
        if (!currentRealmCardInPlayModelObject.flipped) {
            this.playerManager.addPointsForCurrentPlayer();
        }
        this.playerManager.disableCurrentPlayerDraw();
        this.playerManager.evaluateCardForAchievements(this.currentCardInPlay);
        this.currentCardInPlay = realmCardModel.cardModelObject;
        currentRealmCardInPlayModelObject.cardModelObject = currentCardInPlayModelObject;
        currentRealmCardInPlayModelObject.flipped = true;
        if (this.playerManager.currentPlayer.win) {
            this.winner = this.playerManager.currentPlayer;
        }
        if (this.playerManager.currentPlayer.winAll) {
            this.winnerAll = this.playerManager.currentPlayer;
        }
    };

    gm.changePlayer = function () {
        this.playerManager.changePlayer();
        if (this.playerManager.currentPlayer.isBot) {
            this.botReady();
        }
    };

    gm.botReady = function () {
        this.botManager.makeMove();
    };

    gm.roundWon = function () {
        this.playerManager.updateWinStreaksForPlayers();
    };

    gm.cleanUpForNewRound = function () {
        this.currentCardInPlay = null;
        this.winner = false;
        this.playerManager.resetPlayers();
        this.cardManager.resetDeck();
        this.realmManager.resetRealms();
    };
    gm.createNewRound = function () {
        this.dealCards();
    };

    window.amg.managers.GameModelManager = gm;

}());
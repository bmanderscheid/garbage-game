/**
 * Created by manderscheid on 4/15/15.
 */

(function () {

    window.amg.managers = window.amg.managers || {};

    var gsm = {
        model: null,
        stage: {},
        renderer: {},
        config: null,
        cardViewManager: null,
        realmViewManager: null,
        currentCardInPlay: null,
        currentRealmCardInPlay: null,
        cardInPlayStartPos: null //TODO - simply use realm managers deck sprite pos
    };

    gsm.init = function (stage) {
        this.stage = stage;
        this.config = amg.managers.AssetManager.config;
        this.cardInPlayStartPos = this.config.cardViewManager.cardInPlay;
        this.drawBackground();
        this.createManagers();
        this.newGame();
    };

    gsm.drawBackground = function(){
        var bg = new PIXI.Sprite.fromImage('assets/images/bg@2x.png'); // pull in from config
        this.stage.addChild(bg);
    };

    gsm.createManagers = function () {
        // cards
        this.cardViewManager = Object.create(amg.views.CardViewManager);
        this.cardViewManager.model = this.model.cardViewManager;
        this.cardViewManager.stage = this.stage;
        this.cardViewManager.init();
        // realms
        this.realmViewManager = Object.create(amg.views.RealmViewManager);
        this.realmViewManager.model = this.model.realmManager;
        this.realmViewManager.stage = this.stage;
        this.realmViewManager.init();
    };

    gsm.newGame = function () {
        this.realmViewManager.animateCardsToRealmsFromDeck(this.newGameReady, this);
    };

    gsm.newGameReady = function () {
        document.dispatchEvent(new CustomEvent(amg.events.GameEvents.viewEvents.NEW_GAME_READY));
    };

    gsm.enablePlayer = function () {
        var me = this;
        var card = this.currentCardInPlay;
        var deck = this.cardViewManager.deckSprite;
        if (this.model.playerManager.currentPlayer.allowDraw) { //TODO - this is weird.  Can I have player model object here? Or dive into player view object?
            deck.mousedown = deck.touchstart = function (data) {
                data.originalEvent.preventDefault();
                me.disablePlayer();
                document.dispatchEvent(new CustomEvent(amg.events.GameEvents.viewEvents.CARD_DRAWN));
            };
        }
        card.mousedown = card.touchstart = function (data) {
            // stop the default event...
            data.originalEvent.preventDefault();

            // store a reference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.dragging = true;
        };

        card.mousemove = card.touchmove = function (data) {
            if (this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
            }
        };

        card.mouseup = card.touchup = function (data) {
            me.disablePlayer();
            me.evaluateDroppedCardInPlay();
        };
    };

    gsm.disablePlayer = function () {
        var card = this.currentCardInPlay;
        var deck = this.cardViewManager.deckSprite;
        card.dragging = false;
        card.mousedown = card.mousemove = card.mouseup = null;
        deck.mousedown = card.touchstart = null;
    };

    gsm.evaluateDroppedCardInPlay = function () {
        var isTrashUnderCard, realCardUnderPoint;
        var cardPosition = this.currentCardInPlay.position;
        isTrashUnderCard = this.isTrashUnderPoint(cardPosition);
        if (isTrashUnderCard) {
            this.discardCardInPlay();
            return;
        }
        var realmCardUnderPoint = this.getRealmCardUnderPoint(cardPosition);
        if (realmCardUnderPoint) {
            if (realmCardUnderPoint.model.realmIndex == this.currentCardInPlay.model.value
                || (!realmCardUnderPoint.model.flipped && this.currentCardInPlay.model.type === "wild")) {
                this.currentRealmCardInPlay = realmCardUnderPoint;
                document.dispatchEvent(new CustomEvent(amg.events.GameEvents.viewEvents.CARD_DROP_SUCCESS, {
                    detail: {
                        realmCardModelObject: realmCardUnderPoint.model
                    }
                }));
            }
            else {
                this.resetCardInPlay();
            }
        }
        else {
            this.resetCardInPlay();
        }
    };

    gsm.resetCardInPlay = function () {
        TweenMax.to(this.currentCardInPlay, .5, {
            x: this.cardInPlayStartPos.x,
            y: this.cardInPlayStartPos.y,
            onComplete: this.enablePlayer,
            onCompleteScope: this
        });
    };

    gsm.discardCardInPlay = function () {
        var trashPoint = this.cardViewManager.trashSprite.position;
        TweenMax.to(this.currentCardInPlay, .2, {
            x: trashPoint.x,
            y: trashPoint.y,
            onComplete: this.changePlayer,
            onCompleteScope: this
        });
    };

    gsm.getRealmCardUnderPoint = function (point) {
        var i, card, top, right, bottom, left;
        var realmCards = this.realmViewManager.realms[0];
        for (i = 0; i < realmCards.length; i++) {
            card = realmCards[i];
            top = card.y - (card.height / 2);
            left = card.x - (card.width / 2);
            right = left + card.width;
            bottom = top + card.height;
            if (point.x > left && point.x < right && point.y > top && point.y < bottom) {
                return card;
            }
        }
        return false;
    };

    gsm.isTrashUnderPoint = function (point) {
        var trash = this.cardViewManager.trashSprite;
        var top = trash.y - (trash.height / 2);
        var left = trash.x - (trash.width / 2);
        var right = left + trash.width;
        var bottom = top + trash.height;
        return (point.x > left && point.x < right && point.y > top && point.y < bottom);
    };

    gsm.evalutatePlayerAfterViewUpdate = function () {
        if (this.model.winnerAll) {
            this.updateForWinnerAll(this.model.winner);
            return;
        }
        if (this.model.winner) {
            this.updateForWinner(this.model.winner);
            return;
        }
        if (!this.model.playerManager.currentPlayer.isBot) {
            this.enablePlayer();
        }
        else {
            document.dispatchEvent(new CustomEvent(amg.events.GameEvents.viewEvents.GAME_VIEW_UPDATED_FOR_BOT_MOVE));
        }
    };

    gsm.changePlayer = function () {
        document.dispatchEvent(new CustomEvent(amg.events.GameEvents.viewEvents.CARD_DISCARDED));
    };

    //update view methods

    gsm.updateViewForDrawCard = function () {
        var gameDeckPos = this.config.cardViewManager.gameDeck;
        var cardModel = this.model.currentCardInPlay;
        var cardTexture = PIXI.Texture.fromFrame(cardModel.frame);
        this.currentCardInPlay = new amg.sprites.Card(cardTexture);
        this.currentCardInPlay.model = cardModel;
        this.currentCardInPlay.interactive = true;
        this.currentCardInPlay.position = {x: gameDeckPos.x, y: gameDeckPos.y};
        this.stage.addChild(this.currentCardInPlay);
        TweenMax.to(this.currentCardInPlay, .5, {
            //TODO - simply use realm managers deck sprite pos
            x: this.cardInPlayStartPos.x,
            y: this.cardInPlayStartPos.y,
            onComplete: this.evalutatePlayerAfterViewUpdate,
            onCompleteScope: this
        });
    };

    gsm.updateCards = function () {
        this.currentCardInPlay.model = this.model.currentCardInPlay; // need to update model, even though it was set to this before
        this.currentCardInPlay.updateCardTexture();
        this.currentRealmCardInPlay.flip();
        TweenMax.to(this.currentCardInPlay, .5, {
            x: this.cardInPlayStartPos.x,
            y: this.cardInPlayStartPos.y,
            onComplete: this.evalutatePlayerAfterViewUpdate,
            onCompleteScope: this
        });
    };

    gsm.updateCardsForPlayerDraw = function () {
        TweenMax.to(this.currentCardInPlay, .5, {
            x: -200,
            y: -200
        });
        this.updateViewForDrawCard();
    };

    gsm.updateCardsForBotDraw = function () {
        TweenMax.to(this.currentCardInPlay, .5, {
            x: -200,
            y: -200
        });
        this.updateViewForDrawCard();
    };

    gsm.updateCardsForBotMove = function (realmCardIndex) {
        var realmCardBotPlayedOn = this.realmViewManager.realms[1][realmCardIndex];
        this.currentRealmCardInPlay = realmCardBotPlayedOn;
        TweenMax.to(this.currentCardInPlay, .5, {
            x: realmCardBotPlayedOn.position.x,
            y: realmCardBotPlayedOn.position.y,
            onComplete: this.updateCards,
            onCompleteScope: this
        });
    };

    gsm.updateCardsForBotDiscard = function () {
        var trash = this.cardViewManager.trashSprite;
        TweenMax.to(this.currentCardInPlay, .5, {
            x: trash.position.x,
            y: trash.position.y,
            onComplete: this.evalutatePlayerAfterViewUpdate,
            onCompleteScope: this
        });
    };

    gsm.updateForWinner = function (winner) {
        //alert(winner.name + " wins!");
        document.dispatchEvent(new CustomEvent(amg.events.GameEvents.viewEvents.ROUND_WON));
    };

    gsm.updateForWinnerAll = function (winner) {
        alert(winner.name + " wins the whole fucking thing!");
    };

    gsm.cleanUpForNewRound = function () {
        this.realmViewManager.removeAllCardsFromStage();
        this.stage.removeChild(this.currentCardInPlay);
    };

    gsm.createNewRound = function () {
        this.realmViewManager.buildRealms();
        this.realmViewManager.animateCardsToRealmsFromDeck(this.newGameReady, this);
    };

    /// ticker
    //gsm.update = function (scope) {
    //    scope.renderer.render(scope.stage);
    //    requestAnimFrame(function () {
    //        scope.update(scope);
    //    });
    //};

    window.amg.managers.GameViewManager = gsm;

}());
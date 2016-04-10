/**
 * Created by manderscheid on 4/20/15.
 */

(function () {

    window.amg.views = window.amg.views || {};

    var rvm = {
        model: null,
        stage: null,
        config: null,
        realms: null
    };

    rvm.init = function () {
        this.config = amg.managers.AssetManager.config.realms;
        this.buildRealms();
    };
    rvm.buildRealms = function () {
        var i, j, cardCnt, cardModelObject, realmCardModelObject, card, cards, realm, realmStartPoint, xPos, yPos, cardTexture;
        var numRealms = this.model.players.length;
        var cardConfig = this.config.cards;
        var hGap = cardConfig.hGap;
        var vGap = cardConfig.vGap;
        var cardsPerRow = cardConfig.cardsPerRow;
        this.realms = [];
        for (i = 0; i < numRealms; i++) {
            this.realms[i] = [];
            realm = this.model.realms[i];
            cards = realm.cards;
            realmStartPoint = cardConfig.startPoints[i];
            cardCnt = 0;
            xPos = realmStartPoint.x;
            yPos = realmStartPoint.y;
            for (j = 0; j < cards.length; j++) {
                realmCardModelObject = cards[j];
                cardTexture = PIXI.Texture.fromFrame("back");
                card = new amg.sprites.Card(cardTexture);
                card.model = realmCardModelObject;
                card.x = xPos;
                card.y = yPos;
                this.realms[i][j] = card;
                xPos += hGap;
                cardCnt++;
                if (cardCnt >= cardsPerRow) {
                    cardCnt = 0;
                    xPos = realmStartPoint.x;
                    yPos += cardConfig.height + vGap;
                }
                this.stage.addChild(card);
            }
        }
    };

    rvm.animateCardsToRealmsFromDeck = function (callback, scope) {
        var deckPosition = amg.managers.AssetManager.config.cardViewManager.gameDeck;
        TweenMax.staggerFrom(this.realms[0], .5, {x: deckPosition.x, y: deckPosition.y}, 0.1);
        TweenMax.staggerFrom(this.realms[1], .5, {
            x: deckPosition.x,
            y: deckPosition.y,
            delay: 0.1
        }, 0.1, callback, null, scope);
    };

    // using models - issue is that realm model gets reset before getting here to clean up
    rvm.removeAllCardsFromStage = function () {
        var i, j, realm, cards;
        var numRealms = this.model.players.length;
        for (i = 0; i < numRealms; i++) {
            realm = this.model.realms[i];
            cards = realm.cards;
            for (j = 0; j < cards.length; j++) {
                this.stage.removeChild(this.realms[i][j]);
            }
        }
    };

    window.amg.views.RealmViewManager = rvm;

}());
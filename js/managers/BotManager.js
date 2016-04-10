/**
 * Created by manderscheid on 4/29/15.
 */

(function () {

    window.amg.managers = window.amg.managers || {};

    var bm = {
        player: null, // should we use a player model object?
        model: null // replace with a realm model and player model
    };

    bm.init = function () {

    };

    bm.createBotFromModel = function (player, model) {
        this.player = player;
        this.model = model;
    };

    bm.makeMove = function () {
        //if(this.model.playerManager.currentPlayer.allowDraw)this.discardCard();
        var i, realmCardModelObject;
        var foundPlaceInRealm = false;
        var realm = this.model.realmManager.realms[this.player].cards;
        for (i = 0; i < realm.length; i++) {
            realmCardModelObject = realm[i];
            if (!realmCardModelObject.flipped) {
                if (i == this.model.currentCardInPlay.value || this.model.currentCardInPlay.type === "wild") {
                    foundPlaceInRealm = true;
                    break;
                }
            }
            else {
                if (i == this.model.currentCardInPlay.value && realmCardModelObject.cardModelObject.type === "wild") {
                    foundPlaceInRealm = true;
                    break;
                }
            }
        }
        if (foundPlaceInRealm) {
            document.dispatchEvent(new CustomEvent(amg.events.GameEvents.botEvents.BOT_FOUND_MOVE_ON_REALM, {
                detail: {
                    realmCardModelObject: realm[i],
                    realmCardIndex: i
                }
            }));
            return;
        }
        // draw
        if (this.model.playerManager.currentPlayer.allowDraw) {
            document.dispatchEvent(new CustomEvent(amg.events.GameEvents.botEvents.BOT_DRAW_CARD));
        }
        else {
            this.discardCard();
        }


        // bot should discard
        //bm.discardCard();
    };

    bm.discardCard = function () {
        document.dispatchEvent(new CustomEvent(amg.events.GameEvents.botEvents.BOT_DISCARDED));
    };

    window.amg.managers.BotManager = bm;

}());
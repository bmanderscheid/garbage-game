/**
 * Created by manderscheid on 4/15/15.
 */

(function () {

    window.amg.managers = window.amg.managers || {};

    var rm = {
        players: null,
        realms: null
    };

    rm.init = function (players) {
        this.players = players;
        this.buildRealms();
    };

    rm.buildRealms = function () {
        var i, realmModelObject;
        var numPlayers = this.players.length;
        this.realms = [];
        for (i = 0; i < numPlayers; i++) {
            realmModelObject = Object.create(amg.models.RealmModelObject);
            realmModelObject.init();
            this.realms[i] = realmModelObject;
        }
    };

    rm.dealCardsToRealms = function (cards) {
        var i, player, playerIndex, realm, realmCardModelObject;
        var numCards = cards.length;
        for (i = 0; i < numCards; i++) {
            playerIndex = i % 2;
            player = this.players[playerIndex];
            realm = this.realms[playerIndex];
            if (player.level === realm.cards.length) {
                playerIndex = playerIndex === 0 ? 1 : 0;
                realm = this.realms[playerIndex];
            }

            //TODO - turn into RealmCardModelObject
            realmCardModelObject = Object.create(amg.models.RealmCardModelObject);
            realmCardModelObject.createRealmCard(cards[i], playerIndex);
            realm.dealCardToRealm(realmCardModelObject);
        }
    };

    rm.resetRealms = function () {
        var i;
        var numRealms = this.realms.length;
        for (i = 0; i < numRealms; i++) {
            this.realms[i].removeCardsFromRealm();
        }
    };

    window.amg.managers.RealmModelManager = rm;

}());
/**
 * Created by manderscheid on 4/14/15.
 */

(function () {

    window.amg.models = window.amg.models || {};

    var cmo = {
        value: null,
        frame: null,
        type: null
    };

    cmo.init = function () {

    };

    cmo.createCardFromData = function (data) {
        this.value = data.value - 1;
        this.frame = data.frame;
        this.type = data.type;
    };

    window.amg.models.CardModelObject = cmo;

}());

(function () {

    window.amg.models = window.amg.models || {};

    var rcmo = {
        cardModelObject: null,
        player: null,
        realmIndex: null,
        flipped:null
    };

    rcmo.createRealmCard = function (cardModelObject, player) {
        this.cardModelObject = cardModelObject;
        this.player = player;
        this.flipped = false;
    };

    window.amg.models.RealmCardModelObject = rcmo;

}());
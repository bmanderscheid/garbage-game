/**
 * Created by manderscheid on 4/15/15.
 */

(function () {

    window.amg = window.amg || {};

    var rmo = {
        cards:null
    };

    rmo.init = function () {
        this.cards = [];
    };

    rmo.dealCardToRealm = function(realmCardModelObject){
        this.cards.push(realmCardModelObject);
        realmCardModelObject.realmIndex = this.cards.length - 1;
    };

    rmo.removeCardsFromRealm = function(){
        this.cards = [];
    };

    window.amg.models.RealmModelObject = rmo;

}());
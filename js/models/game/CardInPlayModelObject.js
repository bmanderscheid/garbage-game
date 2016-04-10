/**
 * Created by manderscheid on 4/14/15.
 */

(function () {

    window.amg.models = window.amg.models || {};

    function CardInPlayModelObject() {
    }

    var p = CardInPlayModelObject.prototype;

    p.canPlayOn = true;
    p.revealed = false;

    window.amg.models.CardInPlayModelObject = CardInPlayModelObject;

}());
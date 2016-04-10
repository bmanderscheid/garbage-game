/**
 * Created by manderscheid on 6/5/15.
 */

(function () {

    window.amg.models = window.amg.models || {};

    var c = {
        name: null,
        frame: null
    };

    c.init = function () {
    };

    c.createFromData = function (data) {
        this.name = data.name;
        this.frame = data.frame;
    };

    window.amg.models.CharacterModel = c;

}());
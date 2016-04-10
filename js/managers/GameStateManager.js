/**
 * Created by manderscheid on 6/6/15.
 */

(function () {

    window.amg.managers = window.amg.managers || {};

    var gsm = {};

    gsm.init = function () {

    };

    gsm.createNewGameWithCharactersModel = function (charactersModel) {
        console.log("create game", charactersModel);
    };

    window.amg.managers.GameStateManager = gsm;

}());
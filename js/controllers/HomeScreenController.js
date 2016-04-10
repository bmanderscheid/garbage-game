/**
 * Created by manderscheid on 5/20/15.
 */

(function () {

    window.amg.controllers = window.amg.controllers || {};

    var hsc = {
        stage: null,
        model: null,
        view: null
    };

    hsc.init = function (stage) {
        this.stage = stage;
        this.setListeners();
        this.setUpScreen();
    };

    hsc.setListeners = function () {

    };

    hsc.setUpScreen = function () {
        this.view = Object.create(amg.views.HomeScreenView);
        this.view.init(this.stage);
    };


    hsc.kill = function(){
        this.stage.removeChildren(0,this.stage.children.length);
    };

    window.amg.controllers.HomeScreenController = hsc;

}());
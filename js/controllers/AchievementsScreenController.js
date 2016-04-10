/**
 * Created by manderscheid on 5/23/15.
 */

(function () {

    window.amg.controllers = window.amg.controllers || {};

    var asc = {
        stage: null,
        model: null,
        view: null
    };

    asc.init = function (stage) {
        this.stage = stage;
        this.setListeners();
        this.setUpScreen();
    };

    asc.setListeners = function () {

    };

    asc.setUpScreen = function () {
        this.model = Object.create(amg.models.AchievementModelManager);
        this.view = Object.create(amg.views.AchievementsScreenView);
        this.model.init();
        this.view.model = this.model;
        this.view.init(this.stage);
    };


    asc.kill = function(){
        this.stage.removeChildren(0,this.stage.children.length);
    };

    window.amg.controllers.AchievementsScreenController = asc;

}());
/**
 * Created by manderscheid on 4/19/15.
 */

(function () {

    window.amg.managers = window.amg.managers || {};

    var sim = {
        gameConfig: null,
        displayResolution: null,
        stage: {width: 0, height: 0}
    };

    sim.init = function () {
        this.stage.width = window.innerWidth;
        this.stage.height = window.innerHeight;
        this.displayResolution = window.devicePixelRatio;
    };

    window.amg.managers.ScreenInformationManager = sim;

}());
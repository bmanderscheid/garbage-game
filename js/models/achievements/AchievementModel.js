/**
 * Created by manderscheid on 5/10/15.
 */

(function () {

    window.amg.models = window.amg.models || {};

    var am = {
        id: null,
        type: null,
        copy: null,
        message: null,
        frame: null,
        maxEarned: null,
        currentEarned: null
    };

    am.buildObjectWithData = function (data) {
        this.id = data.id;
        this.type = data.type;
        this.copy = data.copy;
        this.message = data.message;
        this.frame = data.frame;
        this.maxEarned = data.maxEarned;
        if (localStorage.getItem(data.id) === undefined || localStorage.getItem(data.id) === null) {
            localStorage.setItem(data.id, 0);
            this.currentEarned = 0;
        }
        else {
            this.currentEarned = localStorage.getItem(data.id);
        }
    };

    am.updateCurrentEarned = function () {
        this.currentEarned++;
        localStorage.setItem(this.id, this.currentEarned);
    };

    window.amg.models.AchievementModel = am;

}());
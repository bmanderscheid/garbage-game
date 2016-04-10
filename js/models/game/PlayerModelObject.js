/**
 * Created by manderscheid on 4/15/15.
 */

(function () {

    window.amg.models = window.amg.models || {};

    var pmo = {
        id: null,
        name: null,
        isBot: null,
        playStreak: null,
        winStreak: null,
        jokersPlayed: null,
        lastJokerCount: null,
        level: null,
        points: null,
        win: null,
        winAll: null,
        allowDraw: null
    };

    pmo.createPlayer = function (id, name, isBot) {
        this.id = id;
        this.name = name;
        this.isBot = isBot;
        //TODO defaults ??
        this.level = 10;
        this.playStreak = 0;
        this.jokersPlayed = 0;
        this.lastJokerCount = 0;
        this.winStreak = 0;
        this.win = false;
        this.winAll = false;
        this.points = 0;
        this.allowDraw = true;
    };

    pmo.updateWinStreak = function(){
        this.winStreak = this.win ? this.winStreak + 1 : 0;
    };

    pmo.resetPlayer = function () {
        this.win = false;
        this.points = 0;
        this.playStreak = 0;
        this.allowDraw = true;
        this.jokersPlayed = 0;
        this.lastJokerCount = 0;
    };

    window.amg.models.PlayerModelObject = pmo;

}());
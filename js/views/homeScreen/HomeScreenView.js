/**
 * Created by manderscheid on 5/20/15.
 */

(function () {

    window.amg.views = window.amg.views || {};

    var hsv = {
        stage: null,
        suites: null,
        startBtn: null,
        achievementsBtn: null
    };

    hsv.init = function (stage) {
        this.stage = stage;
        this.buildScreen();
        this.setListeners();
        this.startScreen();
    };

    hsv.buildScreen = function () {
        var bg, texture, spade, club, heart, diamond;
        bg = new PIXI.Sprite.fromImage('assets/images/homeScreenBG@2x.png');
        texture = PIXI.Texture.fromFrame("club");
        club = new PIXI.Sprite(texture);
        club.anchor.set(0.5, 0.5);
        club.position.set(200,500)
        texture = PIXI.Texture.fromFrame("heart");
        heart = new PIXI.Sprite(texture);
        texture = PIXI.Texture.fromFrame("spade");
        spade = new PIXI.Sprite(texture);
        texture = PIXI.Texture.fromFrame("diamond");
        diamond = new PIXI.Sprite(texture);
        diamond.anchor.set(0.5, 0.5);
        diamond.position.set(100, 100);
        this.suits = [club, heart, spade, diamond];
        // start button
        texture = PIXI.Texture.fromFrame("start");
        this.startBtn = new PIXI.Sprite(texture);
        this.startBtn.interactive = true;
        this.startBtn.position.set(450, 650);
        // achievement buttonn
        texture = PIXI.Texture.fromFrame("achievementsBtn");
        this.achievementsBtn = new PIXI.Sprite(texture);
        this.achievementsBtn.interactive = true;
        this.achievementsBtn.position.set(830, 685);
        // add
        this.stage.addChild(bg);
        this.stage.addChild(club);
        this.stage.addChild(heart);
        this.stage.addChild(spade);
        this.stage.addChild(diamond);
        this.stage.addChild(this.startBtn);
        this.stage.addChild(this.achievementsBtn);
    };

    hsv.setListeners = function () {
        //TODO add touch events
        this.startBtn.mousedown = function () {
            document.dispatchEvent(new CustomEvent(amg.events.GameEvents.stateEvents.CHANGE_STATE_TO_GAME));
        };
        this.achievementsBtn.mousedown = function () {
            document.dispatchEvent(new CustomEvent(amg.events.GameEvents.stateEvents.CHANGE_STATE_TO_ACHIEVEMENTS_SCREEN));
        }
    };

    hsv.startScreen = function () {
        TweenMax.to(this.suits, 3, {repeat: -1, rotation: 1, yoyo: true, ease: Linear.easeNone});
        TweenMax.to(this.startBtn, 1, {repeat: -1, alpha: .3, yoyo: true});
    };

    window.amg.views.HomeScreenView = hsv;

}());
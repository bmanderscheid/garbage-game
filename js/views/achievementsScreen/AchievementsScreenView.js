/**
 * Created by manderscheid on 5/23/15.
 */

(function () {

    window.amg.views = window.amg.views || {};

    var asv = {
        stage: null,
        model: null,
        config: null,
        backBtn: null
    };

    asv.init = function (stage) {
        this.stage = stage;
        this.config = amg.managers.AssetManager.config.achievementsScreen;
        this.buildScreen();
        this.buildAchievements();
        this.setListeners();
    };

    asv.buildScreen = function () {
        var bg, texture, title;
        bg = new PIXI.Sprite.fromImage('assets/images/achievementsScreenBG@2x.png'); // TODO get from config
        texture = PIXI.Texture.fromFrame("backToMain");
        this.backBtn = new PIXI.Sprite(texture);
        this.backBtn.interactive = true;
        this.backBtn.position.set(this.config.backBtn.x, this.config.backBtn.y);
        texture = PIXI.Texture.fromFrame("achievementsTitle");
        title = new PIXI.Sprite(texture);
        title.position.set(this.config.title.x,this.config.title.y);
        // add
        this.stage.addChild(bg);
        this.stage.addChild(title);
        this.stage.addChild(this.backBtn);
    };

    asv.buildAchievements = function () {
        var i, achievement, paperTexture, paper;
        var achievements = this.model.achievements;
        var tableConfig = this.config.paperTable;
        var paperConfig = this.config.paper;
        var xPos = tableConfig.x;
        var yPos = tableConfig.y;
        var col = 0;
        for (i = 0; i < achievements.length; i++) {
            achievement = achievements[i];
            paperTexture = PIXI.Texture.fromFrame("paper");
            paper = new amg.sprites.AchievementPaper(paperTexture);
            paper.model = achievement;
            paper.position.set(xPos, yPos);
            paper.init();
            this.stage.addChild(paper);
            xPos += paperConfig.width + tableConfig.hGap;
            col++;
            if (col === tableConfig.col) {
                col = 0;
                xPos = tableConfig.x;
                yPos += paperConfig.height + tableConfig.vGap;
            }
        }
    };

    asv.setListeners = function () {
        this.backBtn.mousedown = function () {
            document.dispatchEvent(new CustomEvent(amg.events.GameEvents.stateEvents.CHANGE_STATE_TO_HOME));
        };
    };

    window.amg.views.AchievementsScreenView = asv;

}());
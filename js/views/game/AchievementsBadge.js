/**
 * Created by manderscheid on 5/8/15.
 */

(function () {

    window.amg.views = window.amg.views || {};

    var ab = {
        config: null,
        stage: null,
        badgeSlateSprite: null,
        badgeSprite: null,
        message: null,
        achievementQueue: null,
        isUpdating: null
    };

    ab.init = function () {
        var slateTexture = PIXI.Texture.fromFrame("badgeSlate");
        var badgeTexture = PIXI.Texture.fromFrame("streak7");
        this.isUpdating = false;
        this.achievementQueue = [];
        this.config = amg.managers.AssetManager.config.achievements;
        this.badgeSlateSprite = new PIXI.Sprite(slateTexture);
        this.badgeSlateSprite.position = {
            x: this.config.slate.x,
            y: this.config.slate.y + (this.badgeSlateSprite.height / 2)
        };  //TODO store to and from Y
        this.badge = new PIXI.Sprite(badgeTexture);
        this.badge.anchor.set(0.5, 0.5);
        this.badge.position = {x: this.config.badge.x, y: this.config.badge.y};
        //message

        this.message = new PIXI.BitmapText("5 CARD\nSTREAK", {
            font: "22px EdoSZ",
            align: "center"
        });
        this.message.position.set(this.config.copy.x, this.config.copy.y);
        // add
        this.badgeSlateSprite.addChild(this.badge);
        this.badgeSlateSprite.addChild(this.message);
        this.stage.addChild(this.badgeSlateSprite);
    };

    ab.achievementEarned = function (achievementModel) {
        this.achievementQueue.push(achievementModel);
        this.update();
    };

    ab.update = function () {
        if (this.isUpdating)return;
        var targY = this.badgeSlateSprite.position.y - (this.badgeSlateSprite.height / 2);
        var achievementModel = this.achievementQueue[0];
        this.isUpdating = true;
        this.buildSlate(achievementModel);
        TweenMax.to(this.badgeSlateSprite.position, .4, {
            y: targY,
            onComplete: this.hideSlate,
            onCompleteScope: this
        });
        this.badgeSlateSprite.visible = true;
    };

    ab.buildSlate = function (achievementModel) {
        var badgeTexture = PIXI.Texture.fromFrame(achievementModel.frame);
        this.badge.setTexture(badgeTexture);
        this.message.setText(achievementModel.copy);
    };

    ab.hideSlate = function () {
        var toY = this.config.slate.y + (this.badgeSlateSprite.height / 2);
        TweenMax.to(this.badgeSlateSprite.position, .4, {
            y: toY,
            delay: 1,
            onComplete: this.checkAchievementQueue,
            onCompleteScope: this
        });
    };

    ab.checkAchievementQueue = function () {
        this.isUpdating = false;
        this.achievementQueue.shift();
        if (this.achievementQueue.length > 0) {
            this.update();
        }
    };


    window.amg.views.AchievementsBadge = ab;

}());
(function () {

    window.amg.sprites = window.amg.sprites || {};

    function AchievementPaper(texture) {
        PIXI.Sprite.call(this, texture);
        //this.alpha = .4;
    }

    var p = AchievementPaper.prototype = Object.create(PIXI.Sprite.prototype);

    AchievementPaper.prototype.constructor = AchievementPaper;

    p.model = null;
    p.config = null;

    p.init = function () {
        console.log(this.model);
        this.config = amg.managers.AssetManager.config.achievementsScreen.paper;
        this.render();
    };

    p.render = function () {
        var i, banana;
        var bananaConfig = this.config.banana;
        var bananaOnTexture = PIXI.Texture.fromFrame("bananaOn");
        var bananaOffTexture = PIXI.Texture.fromFrame("bananaOff");
        var xPos = bananaConfig.x;
        var yPos = bananaConfig.y;
        var maxEarned = this.model.maxEarned;
        var message = new PIXI.BitmapText("", {
            font: "16px EdoSZBlack"
        });
        message.position.set(this.config.copy.x, this.config.copy.y);
        this.addChild(message);
        for (i = 0; i < maxEarned; i++) {
            message.setText(this.model.message)
            banana = new PIXI.Sprite((i + 1) <= this.model.currentEarned ? bananaOnTexture : bananaOffTexture);
            banana.position.set(xPos, yPos);
            this.addChild(banana);
            xPos += bananaConfig.width + bananaConfig.hGap;
        }
        // titles
        // bananas

    };

    window.amg.sprites.AchievementPaper = AchievementPaper;

}());
/**
 * Created by manderscheid on 4/18/15.
 */

(function () {

    window.amg.managers = window.amg.managers || {};

    var am = {
        assetLoader: null,
        dataLoader: null,
        config: null,
        characters: null,
        achievements: null
    };

    am.init = function () {
        //TODO assets are dynamic, base on screen
        var me = this;
        this.assetLoader = new PIXI.AssetLoader(
            [
                "assets/fonts/edosz@2x.fnt",
                "assets/fonts/edoszBlack.fnt",
                "assets/spritesheets/ui@2x.json",
                "assets/spritesheets/frames@2x.json",
                "assets/images/bg@2X.png"
            ], true);
        this.assetLoader.onComplete = function () {
            me.assetsLoaded();
        };
        this.assetLoader.load();
    };
    am.assetsLoaded = function () {
        var me = this;
        this.dataLoader = new PIXI.JsonLoader("assets/data/config1024x768@2x.json", true);
        this.dataLoader.on("loaded", function () {
            me.config = this.json;
            me.loadAchievements();
        });
        this.dataLoader.load();
    };
    am.loadAchievements = function () {
        var me = this;
        this.dataLoader = new PIXI.JsonLoader("assets/data/achievements.json", true);
        this.dataLoader.on("loaded", function () {
            me.achievements = this.json;
            me.loadCharacterData();
        });
        this.dataLoader.load();
    };
    am.loadCharacterData = function () {
        var me = this;
        this.dataLoader = new PIXI.JsonLoader("assets/data/characters.json", true);
        this.dataLoader.on("loaded", function () {
            me.characters = this.json;
            me.dataLoaded();
        });
        this.dataLoader.load();
    };
    am.dataLoaded = function () {
        var e = new CustomEvent(amg.events.GameEvents.GAME_ASSETS_LOADED);
        document.dispatchEvent(e);
    };

    window.amg.managers.AssetManager = am;

}());
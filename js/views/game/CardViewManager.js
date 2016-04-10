/**
 * Created by manderscheid on 4/25/15.
 */

(function () {

    window.amg.views = window.amg.views || {};

    var cvm = {
        model: null,
        config: null,
        deckSprite: null,
        trashSprite: null
    };

    cvm.init = function () {
        this.config = amg.managers.AssetManager.config.cardViewManager;
        this.buildDeckSprite();
    };

    cvm.buildDeckSprite = function () {
        var cardTexture = PIXI.Texture.fromFrame("back");
        var trashTexture = PIXI.Texture.fromFrame("trash");
        this.deckSprite = new PIXI.Sprite(cardTexture);
        this.trashSprite = new PIXI.Sprite(trashTexture);
        this.deckSprite.interactive = true;
        this.deckSprite.anchor.set(0.5, 0.5);
        this.deckSprite.position = {x: this.config.gameDeck.x, y: this.config.gameDeck.y};
        this.trashSprite.anchor.set(0.5, 0.5);
        this.trashSprite.position = {x: this.config.trash.x, y: this.config.trash.y};
        this.stage.addChild(this.deckSprite);
        this.stage.addChild(this.trashSprite);
    };

    window.amg.views.CardViewManager = cvm;

}());
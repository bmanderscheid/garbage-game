/**
 * Created by manderscheid on 6/5/15.
 */
(function () {

    window.amg.sprites = window.amg.sprites || {};

    function Character(texture) {
        PIXI.Sprite.call(this, texture);
        this.anchor.set(0.5, 0.5);
    }

    var p = Character.prototype = Object.create(PIXI.Sprite.prototype);

    Character.prototype.constructor = Character;

    p.model = null;

    window.amg.sprites.Character = Character;

}());
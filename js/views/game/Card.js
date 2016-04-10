(function () {

    window.amg.sprites = window.amg.sprites || {};

    function Card(texture) {
        PIXI.Sprite.call(this, texture);
        this.anchor.set(0.5, 0.5);
    }

    var p = Card.prototype = Object.create(PIXI.Sprite.prototype);

    Card.prototype.constructor = Card;

    p.model = null;

    p.flip = function(){
        var cardTexture = PIXI.Texture.fromFrame(this.model.cardModelObject.frame);
        this.setTexture(cardTexture);
        this.model.flipped = true;
    };

    p.updateCardTexture = function(){
        var cardTexture = PIXI.Texture.fromFrame(this.model.frame);
        this.setTexture(cardTexture);
    };

    p.updateRealmCard = function(cardModelObject){
        this.model.cardModelObject = cardModelObject;
        this.flip();
    };

    p.updateCardInPlay = function(cardModelObject){
        this.cardModelObject = cardModelObject;
        var cardTexture = PIXI.Texture.fromFrame(this.model.frame);
        this.setTexture(cardTexture);
    };
    window.amg.sprites.Card = Card;

}());
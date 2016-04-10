/**
 * Created by manderscheid on 6/5/15.
 */

(function () {

    window.amg.views = window.amg.views || {};

    var csv = {
        stage: null,
        model: null,
        config: null,
        chosenCharacter: null,
        startBtn: null
    };

    csv.init = function (stage) {
        this.stage = stage;
        this.config = amg.managers.AssetManager.config.chooseScreen;
        this.buildScreen();
        this.setListeners();
    };

    csv.buildScreen = function () {
        var bg, characters, character, i, texture, title, startBtn;
        var xPos = this.config.avatars.x;
        var yPos = this.config.avatars.y;
        var hGap = this.config.avatars.hGap;
        var avatarWidth = this.config.avatars.width;
        var me = this;
        //bg
        bg = new PIXI.Sprite.fromImage('assets/images/chooseScreenBG@2x.png'); // TODO get from config
        this.stage.addChild(bg);
        //title
        texture = PIXI.Texture.fromFrame("chooseTitle");
        title = new PIXI.Sprite(texture);
        title.position.set(this.config.title.x, this.config.title.y);
        this.stage.addChild(title);
        //characters
        characters = this.model.characters;
        for (i = 0; i < characters.length; i++) {
            texture = PIXI.Texture.fromFrame(characters[i].frame);
            character = new amg.sprites.Character(texture);
            character.model = characters[i];
            character.position.set(xPos, yPos);
            character.scale.set(.9);
            character.interactive = true;
            character.mousedown = character.touchstart = function (data) {
                data.originalEvent.preventDefault();
                if (me.chosenCharacter !== null) {
                    me.chosenCharacter.scale.set(.9);
                }
                me.chosenCharacter = this;
                me.chosenCharacter.scale.set(1);
                me.startBtn.alpha = 1;
                me.startBtn.interactive = true;
            };
            this.stage.addChild(character);
            xPos += (avatarWidth + hGap);
        }
        // start button
        texture = PIXI.Texture.fromFrame("start");
        this.startBtn = new PIXI.Sprite(texture);
        this.startBtn.alpha = .5;
        this.startBtn.interactive = false;
        this.startBtn.position.set(this.config.startBtn.x, this.config.startBtn.y);
        this.stage.addChild(this.startBtn);
    };

    csv.setListeners = function () {
        var me = this;
        this.startBtn.mousedown = this.startBtn.touchstart = function (data) {
            data.originalEvent.preventDefault();
            me.model.selectCharacterForPlayer(me.chosenCharacter.model);
            document.dispatchEvent(new CustomEvent(amg.events.GameEvents.viewEvents.CHARACTER_CHOSEN_AND_START_PRESSED));
        }
    };

    window.amg.views.ChooseCharacterScreenView = csv;

}());
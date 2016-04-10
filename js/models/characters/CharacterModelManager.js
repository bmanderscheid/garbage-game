/**
 * Created by manderscheid on 6/5/15.
 */

(function () {

    window.amg.models = window.amg.models || {};

    var cmm = {
        characters: null,
        playerCharacter: null,
        botCharacter: null
    };

    cmm.init = function () {
        var i, character;
        var data = amg.managers.AssetManager.characters.characters;
        this.characters = [];
        for (i = 0; i < data.length; i++) {
            character = Object.create(amg.models.CharacterModel);
            character.createFromData(data[i]);
            this.characters.push(character);
        }
    };

    cmm.selectCharacterForPlayer = function (character) {
        this.playerCharacter = character;
        this.selecteCharacterForBot();
        console.log("bot", this.botCharacter);
    };

    cmm.selecteCharacterForBot = function () {
        var i;
        var notPlayers = [];
        for (i = 0; i < this.characters.length; i++) {
            if (this.characters[i] !== this.playerCharacter) {
                notPlayers.push(this.characters[i]);
            }
        }
        this.botCharacter = notPlayers[Math.floor(Math.random() * notPlayers.length)];
    };

    window.amg.models.CharacterModelManager = cmm;

}());
/**
 * Created by manderscheid on 5/3/15.
 */

(function () {

    window.amg.managers = window.amg.managers || {};

    var pmm = {
        players: null,
        currentPlayer: null
    };

    pmm.createVsBot = function () {

        //TODO: this will have an object at some point
        // - example: name,level,etc
        var player, bot;
        player = Object.create(amg.models.PlayerModelObject);
        player.createPlayer(0, "Jennifer", false);
        this.currentPlayer = player;
        bot = Object.create(amg.models.PlayerModelObject);
        bot.createPlayer(1, "Bot", true);
        this.players = [player, bot];
    };

    pmm.changePlayer = function () {
        var newPlayerId = this.currentPlayer.id === 0 ? 1 : 0;
        this.currentPlayer = this.players[newPlayerId];
        this.currentPlayer.allowDraw = true;
        this.currentPlayer.playStreak = 0;
    };

    pmm.disableCurrentPlayerDraw = function () {
        this.currentPlayer.allowDraw = false;
    };

    pmm.addPointsForCurrentPlayer = function () {
        this.currentPlayer.points++;
        this.currentPlayer.playStreak++;
        if (this.currentPlayer.points >= this.currentPlayer.level) {
            this.currentPlayer.win = true;
            this.currentPlayer.level--;
            if (this.currentPlayer.level === 0) {
                this.currentPlayer.winAll = true;
            }
        }
    };

    pmm.evaluateCardForAchievements = function (currentCardInPlay) {
        this.currentPlayer.jokersPlayed = currentCardInPlay.type === "wild" ? this.currentPlayer.jokersPlayed + 1 : this.currentPlayer.jokersPlayed;
    };

    pmm.updateWinStreaksForPlayers = function(){
        var i;
        for (i = 0; i < this.players.length; i++) {
            this.players[i].updateWinStreak();
        }
    };

    pmm.resetPlayers = function () {
        var i;
        for (i = 0; i < this.players.length; i++) {
            this.players[i].resetPlayer();
        }
    };

    window.amg.managers.PlayerModelManager = pmm;

}());
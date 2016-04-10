/**
 * Created by manderscheid on 4/25/15.
 */

(function () {

    window.amg.events = window.amg.events || {};

    var ge = {GAME_ASSETS_LOADED: "gameAssetsLoaded"};


    ge.viewEvents = {
        CHARACTER_CHOSEN_AND_START_PRESSED: "characterChosenAndStartPressed",
        NEW_GAME_READY: "viewEventNewGameReady",
        CARD_DROP_SUCCESS: "viewEventCardDropSuccess",
        CARD_DRAWN: "viewEventCardDrawn",
        CARD_DISCARDED: "viewEventCardDiscarded",
        GAME_VIEW_UPDATED_FOR_BOT_MOVE: "viewEventGameViewUpdatedForBotMove",
        ROUND_WON: "viewEventRoundWon",
    };

    ge.botEvents = {
        BOT_FOUND_MOVE_ON_REALM: "botEventBotFoundMoveOnRealm",
        BOT_DRAW_CARD: "botEventBtoDrawCard",
        BOT_DISCARDED: "botEventBotDiscarded"
    };

    ge.stateEvents = {
        CHANGE_STATE_TO_GAME: "changeStateToGame",
        CHANGE_STATE_TO_ACHIEVEMENTS_SCREEN: "changeStateToAchievementsScreen",
        CHANGE_STATE_TO_HOME: "changeStateToHome"
    };

    ge.modelEvents = {};


    window.amg.events.GameEvents = ge;

}());
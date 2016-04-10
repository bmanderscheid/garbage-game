/**
 * Created by manderscheid on 5/8/15.
 */

(function () {

    window.amg.models = window.amg.models || {};

    var am = {
        player: null,
        view: null,
        achievements: null,
        streakData: null,
        jokerData: null,
        gameStreakData: null,
        ACHIEVEMENT_TYPE_INGAME: "achievementTypeInGame",
        ACHIEVEMENT_TYPE_ROUND_OVER: "achievementTypeRoundOver"
    };

    am.init = function () {
        var i, achievement;
        var data = amg.managers.AssetManager.achievements.achievements;
        var numAchievements = data.length;
        this.streakData = amg.managers.AssetManager.achievements.streakAchievements;
        this.jokerData = amg.managers.AssetManager.achievements.jokerAchievements;
        this.gameStreakData = amg.managers.AssetManager.achievements.winStreakAchievements;
        this.achievements = [];
        for (i = 0; i < numAchievements; i++) {
            achievement = Object.create(amg.models.AchievementModel);
            achievement.buildObjectWithData(data[i]);
            this.achievements.push(achievement);
        }
    };

    am.update = function (achievementType) {
        switch (achievementType) {
            case this.ACHIEVEMENT_TYPE_INGAME:
                this.updateInGameAchievements();
                break;
            case this.ACHIEVEMENT_TYPE_ROUND_OVER:
                this.updateRoundOverAchievements();
                break;
        }
    };

    am.updateInGameAchievements = function () {
        if (this.player.playStreak >= this.streakData.min && this.player.playStreak <= this.streakData.max) {
            this.awardStreakAchievement(this.player.playStreak);
        }
        if (this.player.jokersPlayed > this.player.lastJokerCount && this.player.jokersPlayed <= this.jokerData.max) {
            this.player.lastJokerCount = this.player.jokersPlayed;
            this.awardJokerAchievement(this.player.jokersPlayed);
        }
    };

    am.updateRoundOverAchievements = function () {
        if (this.player.winStreak >= this.gameStreakData.min && this.player.winStreak <= this.gameStreakData.max) {
            this.awardGameStreak(this.player.winStreak);
        }
    };

    am.awardStreakAchievement = function (streak) {
        var id = "streak" + streak;
        //TODO check local storage
        var achievementModel = this.findAchievementById(id);
        var canBeEarned = this.achievementCanBeEarned(achievementModel);
        if (achievementModel && canBeEarned) {
            achievementModel.updateCurrentEarned();
            this.view.achievementEarned(achievementModel);
        }
    };

    am.awardJokerAchievement = function (num) {
        var id = "joker" + num;
        //TODO check local storage
        var achievementModel = this.findAchievementById(id);
        var canBeEarned = this.achievementCanBeEarned(achievementModel);
        if (achievementModel && canBeEarned) {
            achievementModel.updateCurrentEarned();
            this.view.achievementEarned(achievementModel);
        }
    };

    am.awardGameStreak = function (streak) {
        var id = "game" + streak;
        var achievementModel = this.findAchievementById(id);
        if (achievementModel) {
            this.view.achievementEarned(achievementModel);
        }
    };

    am.findAchievementById = function (id) {
        var i;
        for (i = 0; i < this.achievements.length; i++) {
            if (this.achievements[i].id === id) {
                return this.achievements[i];
            }
        }
        return false; // no achievement found
    };

    am.achievementCanBeEarned = function(achievementModel){
        return (achievementModel && localStorage.getItem(achievementModel.id) < achievementModel.maxEarned);
    };

    window.amg.models.AchievementModelManager = am;

}()
)
;
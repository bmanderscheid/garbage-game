/**
 * Created by manderscheid on 4/14/15.
 * builds deck from data
 * draw, discard, shuffle, reuse discards, restart deck, ...
 */

(function () {

    window.amg.managers = window.amg.managers || {};

    var cm = {
        deck: null,
        nextCardIndex: 0,
        cardInPlay: null,
        trash: null
    };

    cm.init = function () {

    };

    cm.createDeckFromData = function (data) {
        var i, cardModelObject;
        this.deck = [];
        for (i = 0; i < data.length; i++) {
            cardModelObject = Object.create(amg.models.CardModelObject);
            cardModelObject.createCardFromData(data[i]);
            this.deck.push(cardModelObject);
        }
        this.nextCardIndex = this.deck.length - 1;
        this.shuffleDeck();
    };

    cm.shuffleDeck = function () {
        for (var j, x, i = this.deck.length; i; j = Math.floor(Math.random() * i), x = this.deck[--i], this.deck[i] = this.deck[j], this.deck[j] = x);
    };

    cm.drawCard = function () {
        //return this.deck.pop(); // pop
        var card = this.deck[this.nextCardIndex];
        this.nextCardIndex--;
        return card;
    };

    cm.drawCards = function (numCards) {
        var lastIndexInDeck = this.deck.length - 1;
        this.nextCardIndex = lastIndexInDeck - numCards - 1;
        console.log(this.nextCardIndex);
        return this.deck.slice(lastIndexInDeck - numCards, lastIndexInDeck);
    };

    //splice
    cm._drawCards = function (numCards) {
        var lastIndexInDeck = this.deck.length - 1;
        return this.deck.splice(lastIndexInDeck - numCards, numCards);
    };

    cm.resetDeck = function () {
        this.shuffleDeck();
    };

    window.amg.managers.CardManager = cm;

}());
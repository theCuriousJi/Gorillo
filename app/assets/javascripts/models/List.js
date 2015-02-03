TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: 'api/lists',

  cards: function () {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards();
    }
    return this._cards
  }

})

TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST['cards/card-form'],
  tagName: 'form',

  events: {
    "submit": "createCard"
  },

  createCard: function (event) {
    event.preventDefault();
    $currentTarget = $(event.currentTarget)
    data = $currentTarget.serializeJSON()
    var newCard = new TrelloClone.Models.Card(data);
    data.card.list_id = this.model.id
    var that = this;
    newCard.save({}, {
      success: function () {
        that.collection.add(newCard);
        that.$('title').val("");

      }
    })

  },

  render: function () {
    var content = this.template({list: this.model});
    this.$el.html(content);
    return this;

  }

})

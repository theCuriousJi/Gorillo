TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST['cards/card-form-hidden'],
  visibleTemplate: JST['cards/card-form'],
  tagName: 'form',

  initialize: function (options) {
    this.list = options.list
    this.hidden = true;
    // this.$el.addClass('hidden-form')
  },

  events: {
    "submit": "createCard",
    "click .hidden-form": "showForm",
    "click .glyphicon-remove": "removeForm"
  },

  showForm: function () {
    this.hidden = false;
    this.render();
  },

  removeForm: function () {
    this.hidden = true;
    this.render();
  },

  createCard: function (event) {
    event.preventDefault();
    $currentTarget = $(event.currentTarget);
    data = $currentTarget.serializeJSON();
    var newCard = new TrelloClone.Models.Card(data);
    data.card.list_id = this.list.id;
    data.card.ord = this.collection.length;
    var that = this;
    newCard.save({}, {
      success: function () {
        that.collection.add(newCard);
        that.$('textarea').val("");
        that.hidden = true;
        that.render();
      }
    })

  },

  render: function () {
    if(this.hidden){
      var content = this.template({card: {}});
    }  else {
      var content = this.visibleTemplate({card: {}});
    }
    this.$el.html(content);
    return this;

  }

})

TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST['cards/card-form-hidden'],
  visibleTemplate: JST['cards/card-form'],
  tagName: 'form',

  initialize: function () {
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
    // $('.hidden-form').toggle();
    this.render();
  },

  removeForm: function () {
    // $('.hidden-form').toggle();
    this.hidden = true;
    // $('.shown-form').toggle();
    this.render();

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
        that.$('textarea').val("");
        that.hidden = true;
        that.render();
      }
    })

  },

  render: function () {
    if(this.hidden){
      var content = this.template({list: this.model});
    }  else {
      var content = this.visibleTemplate({list: this.model});
    }
    this.$el.html(content);
    return this;

  }

})

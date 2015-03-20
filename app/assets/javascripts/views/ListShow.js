TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list-show'],

  initialize: function () {
    this.cards = this.model.cards();
    // this.cards.fetch();
    this.listenTo(this.cards, 'add', this.addCard);
    this.addCardForm();
    var that = this;
    this.cards.each(function (card) {
      that.addCard(card)
    })


  },

  addCardForm: function () {
    var formView = new TrelloClone.Views.CardForm({model: this.model, collection: this.cards});
    this.addSubview('.card-form', formView);
  },

  addCard: function (card) {
    var cardView = new TrelloClone.Views.CardShow({model: card})
    this.addSubview('.cards', cardView)
  },

  render: function () {
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }


})

TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list-show'],

  initialize: function () {
    this.collection = this.model.cards();
    this.listenTo(this.collection, 'add', this.addCard);
    var formView = new TrelloClone.Views.CardForm({model: this});
    this.addSubview('.card-form', formView);

  },

  addCard: function (card) {

  },

  render: function () {
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }


})

TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST['cards/card-form'],

  render: function () {
    var content = this.template({list: this.model});
    this.$el.html(content);
    return this;

  }

})

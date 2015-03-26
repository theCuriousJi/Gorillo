TrelloClone.Views.BoardShowHeader = Backbone.CompositeView.extend({
  template: JST['boards/show-header'],

  render: function () {
    var content = this.template({board: this.model});
    this.$el.html(content);
    return this;
  }

})

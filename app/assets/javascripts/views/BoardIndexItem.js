TrelloClone.Views.BoardIndexItem = Backbone.View.extend({
  template: JST['boards/index-item'],
  tagName: 'div',

  render: function () {
    var content = this.template({board: this.model})
    this.$el.html(content);
    return this;
  }

})

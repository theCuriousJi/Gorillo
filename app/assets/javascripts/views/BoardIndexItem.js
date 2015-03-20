TrelloClone.Views.BoardIndexItem = Backbone.View.extend({
  template: JST['boards/index-item'],
  tagName: 'li',

  events: {
    'click button.delete-board': 'removeBoard'
  },

  removeBoard: function (event) {
    $currentTarget= $(event.currentTarget);
    var boardID = $currentTarget.data('id');
    var model = TrelloClone.boards.get(boardID)
    model.destroy();
  },


  render: function () {
    var content = this.template({board: this.model})
    this.$el.html(content);
    return this;
  }

})

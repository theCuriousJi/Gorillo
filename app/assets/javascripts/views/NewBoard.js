TrelloClone.Views.NewBoard = Backbone.View.extend({
  template: JST['boards/new'],

  events: {
    "submit form": 'createBoard'
  },


  createBoard: function (event) {
    event.preventDefault()
    $currentTarget = $(event.currentTarget);
    var data = $currentTarget.serializeJSON();
    var newBoard = new TrelloClone.Models.Board(data);
    newBoard.save({}, {
      success: function () {
        TrelloClone.boards.add(newBoard);
        this.$('#title').val("");
      }
    })
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }



});

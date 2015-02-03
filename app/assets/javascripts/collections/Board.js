TrelloClone.Collections.Board = Backbone.Collection.extend ({
  model: TrelloClone.Models.Board,
  url: 'api/boards',
  comparator: function (board) {
    board.get('id');
  },

  getOrFetch: function (id) {
    var board = this.get(id);
    if(board) {
      board.fetch();
    } else {
      board = new TrelloClone.Models.Board({id: id});
        board.fetch ( {
        success: function () {
          this.add(board);
        }.bind(this)
      });
    }
    return board;

  }
});

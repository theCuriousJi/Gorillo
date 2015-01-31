window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#main')
    TrelloClone.boards = new TrelloClone.Collections.Board();
    TrelloClone.boards.comparator = 'title';
    TrelloClone.boards.fetch();
    new TrelloClone.Routers.Router(TrelloClone.boards, $rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
});

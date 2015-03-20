window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#main')
    TrelloClone.boards = new TrelloClone.Collections.Board();
    TrelloClone.boards.comparator = 'title';
    new TrelloClone.Routers.Router($rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
});

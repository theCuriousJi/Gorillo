TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function (boards, $rootEl) {
    this.boards = boards
    this.$rootEl = $rootEl;
  },

  routes: {
    "": 'index',
    "boards/:id": "show"
  },

  index: function () {
    this.boards.fetch();
    var view = new TrelloClone.Views.BoardIndex({collection: this.boards });
    this.$rootEl.html(view.render().$el);
  },

  show: function (id) {
    var board = this.boards.getOrFetch(id);
    var view = new TrelloClone.Views.BoardShow({model: board});
    this.$rootEl.html(view.render().$el);
  }


})

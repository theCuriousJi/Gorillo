TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.boards = TrelloClone.boards
    this.boards.fetch();
    this.$rootEl = $rootEl;
  },

  routes: {
    "": 'index',
    "boards/:id": "show"
  },

  index: function () {
    this.boards.fetch();
    var view = new TrelloClone.Views.BoardIndex({collection: this.boards });
    this._swapView(view)
  },

  show: function (id) {
    var board = this.boards.getOrFetch(id);
    var view = new TrelloClone.Views.BoardShow({model: board});
    this._swapView(view)
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})

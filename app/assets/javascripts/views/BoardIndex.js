TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({

  template: JST['boards/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addBoard);
    this.listenTo(this.collection, 'remove', this.removeBoard)
    this.$el.addClass('board-index')
    // We listen to an add event
    // when we fetch in the router, the first time, the collection is empty
    // but when the fetch completes, a bunch of add events will occur, so
    // that way stuff gets added in
    this.collection.each(function (board) {
      this.addBoard(board);
    }.bind(this));

    var newForm = new TrelloClone.Views.BoardForm();
    this.addSubview('.new-board', newForm);
  },

  removeBoard: function (model) {
    var that = this;
    _(this.subviews()).each(function (subviews, selector) {
      _(subviews).each(function (subview) {
        if(subview.model === model) {
          that.removeSubview(selector, subview)
        }
      });
    })
  },


  addBoard:  function (board) {
    var view = new TrelloClone.Views.BoardIndexItem({model: board});
    view.$el.addClass('board-item')
    this.addSubview('.board-list', view);

  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});

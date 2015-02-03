TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function () {
    this.collection = this.model.lists();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addList);
    var view = new TrelloClone.Views.ListForm({model: this.model,
    collection: this.collection});
    this.addSubview('#new-list', view);
  },

  addList: function (list) {
    var view = new TrelloClone.Views.ListShow({model: list});
    view.$el.addClass("list")
    this.addSubview('#lists', view);
  },

  render: function () {
    var content = this.template({board: this.model});
    this.$el.html(content);
    this.attachSubviews()
    return this;
  }

})

TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  events: {
    'sortstop #lists': 'saveOrds',
    'click button.delete-board': 'removeBoard'

  },

  initialize: function () {
    this.collection = this.model.lists();
    this.listenTo(this.model, 'sync', this.addTitle);
    this.addListForm();
    this.listenTo(this.collection, 'add', this.addList);
    this.collection.each(function (list) {
      this.addList(list)
    }.bind(this));
  },

  removeBoard: function (event) {
    event.preventDefault();
    this.model.destroy( {
      success: function () {
        Backbone.history.navigate('#', { trigger: true });
      }
    });
  },

  addTitle: function () {
    var view = new TrelloClone.Views.BoardShowHeader({model:this.model});
    this.addSubview('.board-show-title', view);
  },

  addList: function (list) {
    var view = new TrelloClone.Views.ListShow({model: list});
    this.addSubview('#lists', view);
  },

  addListForm: function () {var view = new TrelloClone.Views.ListForm({model: this.model,
  collection: this.collection});
  this.addSubview('.list-form', view);
  },

  resortSubviews: function() {
      var subviews = this.subviews(".lists");
      subviews.sort(function(subview1, subview2) {
      return subview1.model.get('ord') - subview2.model.get('ord');
    });
  },

  saveOrds: function () {
    var listElements = this.$('.list');
    listElements.each(function (index, element) {
      var listId = $(element).find('.list-header').data('list-id');
      var list = this.collection.get(listId);
      if(list.ord === index){
        return;
      }
      list.save({ord: index});
    }.bind(this));

    this.collection.sort();
    this.resortSubviews();
  },

  render: function () {
    var content = this.template({board: this.model});
    this.$el.html(content);
    this.$('#lists').sortable();
    this.attachSubviews();
    return this;
  }

})

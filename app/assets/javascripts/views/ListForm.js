TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST['lists/list-form'],
  hiddenTemplate: JST['lists/hidden-form'],
  tagName: 'form',

  initialize: function () {
    this.hidden = true;
    this.notClicked = true;
  },

  events: {
    'click .submit': 'submitForm',
    'click .hidden-list-form': 'showForm',
    'click .glyphicon-remove': 'removeForm',
    'click .list-text-input': 'clearForm'
  },

  clearForm: function () {
    this.notClicked && $('.list-text-input').val("");
    this.notClicked = false;


  },

  showForm: function () {
    this.hidden = false;
    this.render();
    $('list-text-input').val("Add a list...")
  },

  removeForm: function () {
    this.hidden = true;
    this.notClicked = true;
    this.render();
  },

  submitForm: function (event) {
    event.preventDefault;
    var data = this.$el.serializeJSON();
    var newList = new TrelloClone.Models.List(data);
    data.list.board_id = this.model.id
    data.list.ord = this.collection.length
    var that = this;
    newList.save({}, {
      success: function () {
        that.collection.add(newList);
        that.$('title').val("");
      }
    })
  },

  render: function () {
    if(this.hidden) {
      var content = this.hiddenTemplate({board: this.model})
    } else {
      var content = this.template();
    }

    this.$el.html(content);
    return this;

  }

})

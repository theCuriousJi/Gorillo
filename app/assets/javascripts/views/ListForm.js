TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST['lists/list-form'],

  events: {
    'submit form': 'submitForm'
  },

  submitForm: function (event) {
    event.preventDefault;
    var data = $(event.currentTarget).serializeJSON();
    var newList = new TrelloClone.Models.List(data);
    var that = this;
    newList.save({}, {
      success: function () {
        that.collection.add(newList);
        that.$('title').val("");
      }
    })
  },

  render: function () {
    var content = this.template({board: this.model})
    this.$el.html(content);
    return this;

  }

})

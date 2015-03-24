TrelloClone.Views.CardShow = Backbone.View.extend({

  template: JST['cards/show'],
  visibleTemplate: JST['cards/card-form-with-show'],
  // tagName: 'li',

  initialize: function () {
    this.hidden = true
  },

  events: {
    'click .edit': "showForm",
    "click .submit": "updateCard",
    "click .glyphicon-remove": "removeForm",
    "click .delete": "deleteCard",

  },

  attributes: function() {
  return {
    'data-card-id': this.model.id
  };
},

  showForm: function () {
    this.hidden = false;
    this.render();
  },

  deleteCard: function () {
    this.model.destroy()
  },

  removeForm: function () {
    this.hidden = true;
    this.render();

  },

  updateCard: function (event) {
    event.preventDefault();
    data = $('.card-edit').serializeJSON()
    var that = this;
    this.model.save(data, {
      success: function () {
        that.$('textarea').val("");
        that.hidden = true;
        that.render();
      }
    })

  },

  render: function () {
    if(this.hidden){
      var content = this.template({card: this.model});
    }  else {
      var content = this.visibleTemplate({card: this.model});
    }
    this.$el.html(content)
    return this;

  }

})

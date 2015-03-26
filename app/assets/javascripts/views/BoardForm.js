TrelloClone.Views.BoardForm = Backbone.View.extend({
  template: JST['boards/form'],
  hiddenTemplate: JST['boards/form-hidden'],
  tagName: 'form',

  initialize: function () {
      this.hidden = true;
      // this.$el.addClass('board-form')
  },

  events: {
    "click .submit": 'createBoard',
    "click .glyphicon-remove": "removeForm",
    "click .hidden-board-form": "showForm"
  },

  showForm: function (event) {
    console.log(event.currentTarget);
    this.hidden = false;
    this.render();

  },

  removeForm: function () {
    this.hidden = true;
    this.render();
  },

  createBoard: function (event) {
    event.preventDefault()
    $currentTarget = $(event.currentTarget);
    var data = this.$el.serializeJSON();
    var newBoard = new TrelloClone.Models.Board(data);
    var that = this;
    newBoard.save({}, {
      success: function () {
        TrelloClone.boards.add(newBoard);
        that.$('#title').val("");
        that.removeForm();
      }
    })
  },

  render: function () {
    if(this.hidden){
      var content = this.hiddenTemplate();
    } else{
      var content = this.template();
    }
    this.$el.html(content);
    return this;
  }



});

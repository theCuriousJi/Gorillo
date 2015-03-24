TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list-show'],
  formTemplate: JST['lists/list-show-with-form'],
  events: {
    "click .options": 'showOptions',
    "click .glyphicon-remove": 'removeOptions',
    "click .delete": "deleteList",
    "click .save": "updateList",
    // "sortstart .cards": "cardDrag",
    // "sortstop .cards": "cardDrop",
    "sortstop": "saveOrds",
    // "sortupdate": "receiveCard"
  },

  initialize: function () {
    this.opts = false;
    this.$el.addClass('list')
    this.cards = this.model.cards();
    this.listenTo(this.cards, 'add', this.addCard);
    this.listenTo(this.cards, 'remove', this.removeCard);
    this.listenTo(this.model, 'sync change', this.render);
    var that = this;
  },

  deleteList: function (event) {
    this.model.destroy();
  },

  // receiveCard: function(event,ui){
  //     debugger
  //     var that = this;
  //     var id = ui.item.data("card-id");
  //     var $ul = this.$el.find('.list-header')
  //     var listId = $ul.data("list-id");
  //     var cards = this.cards;
  //     var that = this;
  //     if (!cards.get(id)) {
  //       var card = new TrelloClone.Models.Card();
  //       card.set({
  //         id: id,
  //         list_id: listId
  //       });
  //       card.save([], {
  //         success: function () {
  //           cards.add(card, { silent: true });
  //           TrelloClone.Utils.SaveOrder($ul, cards, card);
  //         }
  //       });
  //     } else {
  //       TrelloClone.Utils.SaveOrder($ul, cards);
  //     }
  //
  //     event.stopPropagation();
  //   // console.log('asdfasdfds');
  // },

  updateList: function (event) {
    event.preventDefault();
    var data = $('.list-edit').serializeJSON()
    var that = this;
    this.model.save(data, {
    success: function () {
      that.removeOptions()
      }
    });
  },

  resortSubviews: function() {
      var subviews = this.subviews(".cards");
      subviews.sort(function(subview1, subview2) {
      return subview1.model.get('ord') - subview2.model.get('ord');
    });
  },

  // saveOrder = function ($ul, collection, newModel) {
  // if (collection.length > 0) {
  //   var i = 1;
  //   $ul.children().each(function (index, li) {
  //     var $li = $(li);
  //     var id = $li.data("id");
  //     var model = collection.get(id) || newModel;
  //     model.set("ord", i);
  //     $li.attr("data-ord", i)
  //     model.save([]);
  //     i++;
  //     });
  //   }
  // };


  saveOrds: function () {
    var cardElements = this.$('.card');
    cardElements.each(function (index, element) {
      var cardId = $(element).data('card-id');
      var card = this.cards.get(cardId);
      if(card.ord === index){
        return;
      }
      card.save({ord: index });
    }.bind(this));

    this.cards.sort();
    this.resortSubviews();
  },


  showOptions: function () {
    this.opts = true;
    this.render();
  },

  removeOptions: function () {
    this.opts = false;
    this.render();
  },

  removeCard: function (model) {
    var that = this;
    var card = model.id;
    var mySelector;
    var mySubview;
    _(this.subviews()).each(function (subviews, selector) {
      _(subviews).each(function (subview) {
        if(subview.model === model){
          model;
          mySelector = selector;
          mySubview = subview;
        }
      })
    });

    this.removeSubview(mySelector, mySubview)
  },

  addCardForm: function () {
    var formView = new TrelloClone.Views.CardForm({list: this.model, collection: this.cards});
    this.addSubview('.card-form', formView);
  },

  addCard: function (card) {
    var cardView = new TrelloClone.Views.CardShow({model: card})
    this.addSubview('.cards', cardView)
  },

  renderCards: function () {
    this.cards.each(this.addCard.bind(this));
    this.$('.cards').sortable({connectWith: '.cards'});
  },

  render: function () {
    if(this.opts) {
      var content = this.formTemplate({title: this.model.get('title')});
    } else {
      var content = this.template({list: this.model});
    }
    this.$el.html(content);
    this.addCardForm();
    this.renderCards();

    return this;
  },

  cardDrag: function (event, ui) {
    ui.item.addClass("dragged");
    ui.placeholder.height(ui.helper.height());
    event.stopPropagation();
  },

  cardDrop: function (event, ui) {
    ui.item.removeClass("dragged");
    event.stopPropagation();
  }
})

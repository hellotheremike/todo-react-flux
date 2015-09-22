var $ = require('jquery');

module.exports = {

  componentDidMount: function() {
    this.listClass = "todos-list";
    this.listItemClass = "todo-item";
    this.placeholder = document.createElement("li");
    this.placeholder.className = "placeholder " +  this.listItemClass;
  },

  dragStart: function(e) {
    this.dragged = $(e.currentTarget);
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  },

  dragEnd: function(e) {
    this.dragged.css({display:  "block"});
    $("." + this.listClass + " .placeholder").remove();

    var from = Number(this.dragged.data("id"));
    var to = Number(this.over.data("id"));
    if(from < to) to--;

    if(from != to && this._dragAndDropAction){
      this._dragAndDropAction(from, to);
    }
  },

  dragOver: function(e) {
    e.preventDefault();
    this.dragged.css({display:  "none"});
    var target = $(e.target);

    if(target.hasClass("placeholder")) return;
    if(target.hasClass(this.listItemClass)){
      this.over = $(e.target.parentNode);
      $(this.placeholder).insertBefore( e.target);
    }
  }

}

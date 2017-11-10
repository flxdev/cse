export default function CitySelect() {
  this.triggers = document.querySelectorAll('.js-city-select');
  this.target = document.querySelector('.js-city-select-target');
  this.input = document.querySelector('.js-city-select-input');
  this.container = document.querySelector('.js-city-select-containter');
  this.close = document.querySelector('.js-city-select-close');
  this.init();

}
CitySelect.prototype = {
  init: function() {
    this.initOpenClose();
    this.initFilter();
  },
  initOpenClose: function() {
  	var self = this;
    Array.from(this.triggers).forEach((item) => {
      item.addEventListener('click',() => {
        if(!self.target.classList.contains('open')) {
        	self.target.classList.add('open');
        	window.DOM.hideScroll();
        } 
      });
    });
    this.close.addEventListener('click',() => {
    	if(self.target.classList.contains('open')) {
    		self.target.classList.remove('open');
    		window.DOM.showScroll();
    	}
    });
  },
  initFilter: function() {
  	let self = this;
  	let items =  Array.from(this.container.querySelectorAll('.city-elem'));
  	let links =  Array.from(this.container.querySelectorAll('a'));

  	window.DOM.addListenerMulti(self.input,'change keyup',() => {

  		let filter = self.input.value.toLowerCase();

  		links.forEach((item) => {
  		 	let text = item.textContent;
  		 	text.toLowerCase().indexOf(filter) || text === '' ? item.classList.add('hide') : item.classList.remove('hide');
  		 });
  		items.forEach((item) => {
  			let itemsleng = item.querySelectorAll('a:not(.hidden)');
  			console.log(itemsleng);
       		itemsleng.length>0 ? item.classList.remove('hide') :item.classList.add('hide');
  		});
  	});
  }
};

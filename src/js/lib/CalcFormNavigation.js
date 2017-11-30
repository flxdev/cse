export default function CalcFormNavigation() {
  this.formBlocks = $('.form-step');
  this.formNav = $('.js-calcNav');
  this.formNavItems = this.formNav.find('.calc-steps-item');
  if(this.formBlocks.length && this.formNav.length) {
    this.init();
  }
}

CalcFormNavigation.prototype = {
  init: function() {
    this.formBlocks.hide().first().show().addClass('is-current');
    this.formNavItems.removeClass('active').removeClass('current').first().addClass('active').addClass('current');
    this.addEvents();
  },
  addEvents: function() {
  	const self = this;
    this.formNavItems.each(function() {
      let _ = $(this);
      _.on('click',() => {
        let target = _.data('step');
        _.hasClass('active') && !_.hasClass('current') ? self.moveTo(target) : false;
      });
    });
  },
  moveNext: function() {
  	let currentBlock = this.formBlocks.filter('.is-current');
  	let curStep = currentBlock.data('step');
  	let currentBlockPosition = currentBlock.data('step');
  	if(currentBlockPosition < this.formBlocks.length) {
  		this.ScrollTop();
      currentBlock.removeClass('is-current').slideUp('normal');
      this.formBlocks.filter(`[data-step="${++curStep}"]`).addClass('is-current').slideDown('normal');
  		this.formNavItems.filter('.current').removeClass('current').next().addClass('active').addClass('current');
  		setTimeout(() => {
  			// this.ScrollTop();
  		},300);
  		
  	}
  },
  moveTo: function(target) {
  	this.ScrollTop();
  	let currentBlock = this.formBlocks.filter('.is-current');
  	currentBlock.removeClass('is-current').slideUp('normal');
  	this.formBlocks.filter(`[data-step="${target}"]`).addClass('is-current').slideDown('normal');
  	this.formNavItems.removeClass('current').filter(`[data-step="${target}"]`).addClass('current').nextAll().removeClass('active');
  		setTimeout(() => {
  			
  		},300);
  },
  ScrollTop() {
    let offset = this.formBlocks.filter('.is-current').offset().top;
  	$('html:not(:animated), body:not(:animated), .out:not(:animated)').animate({scrollTop: offset - 300}, 500);
  }

};

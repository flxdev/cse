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
    this.formNavItems.each(function() {
      let _ = $(this);
      _.on('click',() => {
        let target = _.data('step');
        _.hasClass('active') && !_.hasClass('current') ? this.moveTo(target) : false;
      });
    });
  },
  moveNext: function() {
  	let currentBlock = this.formBlocks.filter('.is-current');
  	let curStep = currentBlock.data('step');
  	let currentBlockPosition = currentBlock.data('step');
  	if(currentBlockPosition < this.formBlocks.length) {
      currentBlock.removeClass('is-current').slideUp('normal');
      this.formBlocks.filter(`[data-step="${++curStep}"]`).addClass('is-current').slideDown('normal');
  		this.formNavItems.filter('.current').removeClass('current').next().addClass('active').addClass('current');
  	}
  },
  moveTo: function(target) {
  	this.formNavItems.filter(`[data-step="${target}"]`).removeClass('current').next().addClass('active').addClass('current');
  },

};

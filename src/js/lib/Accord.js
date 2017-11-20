import $ from 'jquery/dist/jquery';

export default function Accord() {
  let trigers = $('.js-accord-trigger');
  let targets = $('.js-accord-target');
  trigers.each(function() {
  	let _ = $(this);
  	_.off('click touchstart').on('click touchstart',() => {
  		let id = _.data('target');
  		if (!id) return;
  		let textCont = _.find('.js-toggletext');
  		let target = targets.filter(`[data-target=${id}]`);
  		if(!_.hasClass('active')) {
    		_.addClass('active');
  			target.slideDown('normal',() => {
  				let offset = target.offset().top;
  			$('html:not(:animated), body:not(:animated), .out:not(:animated)').animate({scrollTop: offset - 120}, 500);
  			}).addClass('active');
  			
  		}else{
  			_.removeClass('active');
  			target.slideUp().removeClass('active');
  		}
  		textCont.toggleText();	
  	
  	});
  });
}

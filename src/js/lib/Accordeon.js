import $ from 'jquery/dist/jquery';
export default function Accordeon() {
  let triggers = $('.js-accordeon-trigger');
  triggers.each(function() {
    let _ = $(this);
    _.off('click').on('click',() => {
   		let head = _.closest('.accordeon-head');
      let parent = _.closest('.accordeon-wrapper');
      let target = parent.find('.accordeon-body');
      let text = _.find('.js-toggle-text');
      if(!_.hasClass('anim')) {
      	 _.addClass('anim');
	      if(target.hasClass('active')) {
	      	head.add(_).removeClass('active');
	        target.removeClass('active').slideUp('normal');
	      }else{
	      	head.add(_).addClass('active');
	        target.addClass('active').slideDown();
	      }
	      text.toggleText();
	      setTimeout(() => {
	      	_.removeClass('anim');
	      },500);
      }
    });
  });
}

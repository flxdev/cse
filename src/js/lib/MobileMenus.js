export default function Menu() {
  var trigger = $('.js-menu'),
    OpenClass = 'active',
    bg = window.DOM.header,
    OpenClass2 = 'visible';

  trigger.each(function() {
    let _ = $(this),
      targetLink = _.data('menu'),
      target = $(`[data-menutarget=${targetLink}]`);

	  _.on('click', function(e) {
	    if (!_.hasClass('anim')) {

	      _.addClass('anim');

	      if(trigger.hasClass(OpenClass)) {
	     //    if (!div.is(e.target) 
          // && div.has(e.target).length === 0) {
	          _.add(target).removeClass(OpenClass);
	          bg.removeClass(OpenClass2);
	          window.DOM.showScroll();
	          
	        // }
	      }else{
	        _.add(target).addClass(OpenClass);
          	bg.addClass(OpenClass2);
	        window.DOM.hideScroll();
	        
	      }
	      setTimeout(function() {
	        _.removeClass('anim');
	      }, 500);
	    }
	  });
   	$(window).on('click touchstart',(e) => {
   		if(target.hasClass('active') && !_.hasClass('anim')) {
        if (!target.is(e.target) 
				&& target.has(e.target).length === 0) {
        	_.add(target).removeClass(OpenClass);
          bg.removeClass(OpenClass2);
          window.DOM.showScroll();
        }
   		}

    });
  });
}

export default function Modals() {
  var _this = $(this);
  _this.b = {
    open: $('.js-popup-button'),
  };
  _this.c = {
    popup: $('.js-popup-container'),
  };
  _this.f = {};
  _this.conf = {
    body_class: 'modal_open',
    active_class: 'active',
    close_selector: '.closePopup',
    initial_class: 'popup-initialed',
  };
  _this.initModalActions = function(_popup) {
    /**
		 * Close buttons.
		 */
   
    $(_popup).on('click', '.modal-container', function(e) {
      if (!$(_this.conf.close_selector).is(e.target)) {
        e.stopPropagation();
      }
    });
    _popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup', function(e) {
      if($(e.target).hasClass('js-city-select')) {
        _popup.removeClass('active');
      }else{
        _this.closePopup(_popup);
      }
      
    });
  };
  _this.closePopup = function(_popup) {
    let _cont = _popup.find('.modal-container-content:not(.response)'),
      _response = _popup.find('.response');
    _popup.removeClass(_this.conf.active_class);
    window.DOM.showScroll();
    setTimeout(function() {
      _cont.removeAttr('style');
      _response.removeClass('visible');
    }, 500);
  };
  _this.openPopup = function(_popup) {
    _popup.addClass(_this.conf.active_class);
    window.DOM.hideScroll();
  };
  /**
	 * Initial.
	 */
  $.each(_this.c.popup.not('.' + _this.conf.initial_class), function() {
    let _popup = $(this);
    _this.initModalActions(_popup);
    _popup.off('reinit').on('reinit', function() {
      _this.initModalActions(_popup);
    });
    _popup.addClass(_this.conf.initial_class);
  });
  _this.b.open.off('click.popup').on('click.popup', function(e) {
    let _popup = _this.c.popup.filter('[data-modal=\''+$(this).data('modal')+'\']');
    let vacancy = $(this).data('vacancy');

    if(typeof vacancy != 'undefined') {
      let input = _popup.find('.js-vacancy-type');
      input.val(vacancy);
    }
    e.preventDefault();
    _this.openPopup(_popup);
    return false;
  });
};

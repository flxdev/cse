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
  _this.f.initModalActions = function(_popup) {
    /**
		 * Close buttons.
		 */
    $(_popup).on('click', '.modal-container', function(e) {
      if (!$(_this.conf.close_selector).is(e.target)) {
        e.stopPropagation();
      }
    });
    _popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup', function() {
      _this.f.closePopup(_popup);
    });
  };
  _this.f.closePopup = function(_popup) {
    var _cont = _popup.find('.modal-container-content:not(.response)'),
      _response = _popup.find('.response');
    _popup.removeClass(_this.conf.active_class);
    window.DOM.showScroll();
    setTimeout(function() {
      _cont.removeAttr('style');
      _response.removeClass('visible');
    }, 500);
  };
  _this.f.openPopup = function(_popup) {
    _popup.addClass(_this.conf.active_class);
    window.DOM.hideScroll();
  };
  /**
	 * Initial.
	 */
  $.each(_this.c.popup.not('.' + _this.conf.initial_class), function() {
    var _popup = $(this);
    _this.f.initModalActions(_popup);
    _popup.off('reinit').on('reinit', function() {
      _this.f.initModalActions(_popup);
    });
    _popup.addClass(_this.conf.initial_class);
  });
  _this.b.open.off('click.popup').on('click.popup', function(e) {
    var _popup = _this.c.popup.filter('[data-modal=\''+$(this).data('modal')+'\']');
    e.preventDefault();
    _this.f.openPopup(_popup);
    return false;
  });
}

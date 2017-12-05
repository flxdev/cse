export default function AjaxLoading(el) {
  var _this = this;

  _this.ajaxLink = el;
  _this.appendMain = $('body').find('.modal-layout[data-modal="'+ el.data('modal')+'"]');


  _this.initEvents = function() {

    $('.ajax-trigger').off('click.trigger').on('click.trigger', function(e) {
      var link = $(this).data('href');
      _this.appendMain.removeClass('active');
      _this.action(link);
      e.preventDefault();
      return false;
    });
  };

  _this.action = function(link) {
    $.ajax({
      url: link,
      dataType: 'html',
      success: function(content) {
        var mainContent = $(content).html();
        _this.appendMain.html(mainContent).promise().done(function() {
          _this.initEvents();
          _this.appendMain.addClass('active').trigger('reinit');
        });
      }
    });
  };
  _this.initEvents();
}

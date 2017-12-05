export default function HideInput() {
  let triggers = $('[data-display]');
  triggers.each(function() {
    let _ = $(this);
    let displayName = _.data('display');
    let displayVal = _.data('display-value').toString();
    let target = _.closest('form').find('[data-display-target="'+displayName+'"]');
    _.on('init.hide change.hide',() => {
      let val = _.val().toString();
      if(val === displayVal) {
        target.show();
      }else{
        target.hide();
      }
    });
    _.trigger('init.hide');
  });
}

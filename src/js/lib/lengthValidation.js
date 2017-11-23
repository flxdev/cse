import $ from 'jquery/dist/jquery';

export default function validateLength() {
  window.DOM.MaxLength = () => {
    let inputs = $('.maxlength');
    inputs.each(function() {
      let input = $(this);
      let countLimit = parseInt(input.data('countdown'));
      let counterTarget;
      if(input.hasClass('maxLength-inited')) {
        counterTarget = input.parent().find('.js-countdown');
      }else{
        input.parent().append(`<div class="input-countdown"> <span class='js-countdown'>0</span> <span> / ${countLimit}</span ></div>'`);
        counterTarget = input.parent().find('.js-countdown');
        input.addClass('maxLength-inited');
      }

      input.off('input paste').on('input paste',() => {
        // setTimeout(() => {
        let charCount = $(this).val().length;
        counterTarget.text(charCount);
        if(charCount >= countLimit) {
          counterTarget.text(countLimit);
          input[0].value = input[0].value.substring(0, countLimit);
        } 

      });
    });
  };
  window.DOM.MaxLength();
}

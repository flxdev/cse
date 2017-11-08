import $ from 'jquery/dist/jquery';

export default function validateLength() {
  let inputs = $('.maxlength');
  inputs.each(function() {
    let input = $(this);
    let countLimit = parseInt(input.data('countdown'));
    input.parent().append(`<div class="input-countdown"> <span class='js-countdown'>0</span> <span> / ${countLimit}</span ></div>'`);
    let counterTarget = input.parent().find('.js-countdown');

    input.on('input paste',() => {
      let charCount = $(this).val().length;
      counterTarget.text(charCount);
      if(charCount >= countLimit) {
      	counterTarget.text(countLimit);
      	input[0].value = input[0].value.substring(0, countLimit);
      }
    });
  });
}

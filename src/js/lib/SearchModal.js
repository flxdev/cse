export default function SearchModal() {
  let input = $('.js-searchmodal-input');
  let modal = $('.modal-layout').filter('[data-modal="search"]');
  let modalInput = modal.find('.js-searchmodal-targetinput');
  input.on('focus input',() => {
    let v = input.val();
    let modalval = modalInput.val();
    if(v.length > 0) {
    	modal.addClass('active').siblings().removeClass('active');
    	window.DOM.hideScroll();
    	modalInput[0].value = input[0].value;
    	modalInput.focus();
    }
    modalInput.on('input',() => {
   		input[0].value =	modalInput[0].value;
    });
  });
}

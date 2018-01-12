import $ from 'jquery/dist/jquery';
import 'jquery-form-validator/form-validator/jquery.form-validator.min';
import 'jquery-form-validator/form-validator/logic.js';

export default window.DOM.validateForms = () => {
  let _form = $('.js-validate');
  if (_form.length) {
    _form.each(function() {
      let FormThis = $(this);
      $.formUtils.addValidator({
        name : 'siteUrl',
        validatorFunction : function(value, $el, config, language, $form) {
          let ind = value.indexOf('.');
          return ind !== -1 && value.length > ind + 2;
        },
        // errorMessage : 'You have to answer an even number',
        errorMessageKey: 'badEvenNumber'
      });

      $.validate({
        form: FormThis,
        modules: 'logic',
        borderColorOnError: true,
        scrollToTopOnError: true,
        inlineErrorMessageCallback:  function($input, errorMessage) {
          if (errorMessage) {
            singleErrorMessages($input, errorMessage);
          } else {
            singleRemoveErrorMessages($input);
          }
          return false; // prevent default behaviour
        },
        onValidate: () => {
          
        },
        // onElementValidate:  (valid, $el, $form, errorMessage) => {
        //   if($el.attr('type') === 'url') {
        //     let val  = $el.val();
        //     if(val.indexOf('.') === -1) {
        //       setTimeout(() => {
        //         valid = false;
        //         singleErrorMessages($el,errorMessage);   
        //       },10);

        //     }else{
        //       singleRemoveErrorMessages($el);
        //     }
        //   }
        // },
        onSuccess: () => {
          // formResponse(form_this);
          // resetForm(form_this);
          return false;
        },
      });
    });
    function singleErrorMessages(item, errorMessage)
    {
      var currentElementParentObject = item.parent().parent();
      currentElementParentObject.find('.form-error').remove();
      currentElementParentObject.append(`<div class='help-block form-error'>${errorMessage}</div>`);
    }

    function singleRemoveErrorMessages(item)
    {
      var currentElementParentObject = item.parent().parent();
      currentElementParentObject.find('.form-error').remove();
    }
  }
};


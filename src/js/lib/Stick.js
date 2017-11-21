import 'sticky-kit/dist/sticky-kit.min.js';
import $ from 'jquery/dist/jquery';

export default function Stick() {
  setTimeout(function() {
    $('.js-stick').stick_in_parent({
      parent: '.js-stick-parent',
      offset_top: 120,
    });
  }, 1);
}

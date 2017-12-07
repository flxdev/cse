import inView from 'in-view/dist/in-view.min';

export default function ScrollAnimations() {
  inView.offset({
    top: 0,
    bottom: 20,
  });
  inView.threshold(0.01);
  inView('.promoblock-wrapper .promoblock-item')
    .on('enter', function(el) {
      if(!el.done) {
        el.classList.add('active');
      }
    }).on('exit', function(el) {
      el.done = true;
    });
  inView('.js-anim')
    .on('enter', function(el) {
      if(!el.done) {
        el.classList.add('active');
      }
    }).on('exit', function(el) {
      el.done = true;
    });
}

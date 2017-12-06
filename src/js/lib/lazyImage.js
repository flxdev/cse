export default function lazyImage() {
  // Get all of the images that are marked up to lazy load
  var arr = document.querySelectorAll('.js-image');
  var images = [];
  for(var i = 0; i < arr.length; i++) {
    images.push(arr[i]);
  }

  var config = {
    rootMargin: '-100px 0px',
    threshold: 0.01
  };

  var imageCount = images.length;
  var observer = void 0;
  // If we don't have support for intersection observer, loads the images immediately
  if (!('IntersectionObserver' in window) || window.navigator.userAgent.indexOf('Edge') > -1) {
    for(var i = 0; i < imageCount; i++) {
      preloadImage(images[i]);
    }
  } else {
    // It is supported, load the images
    observer = new IntersectionObserver(onIntersection, config);

    for(var i = 0; i< imageCount; i++) {

      if (images[i].classList.contains('js-image-handled')) {
        // return;
      }
      else{

        observer.observe(images[i]);
      }
    }
  }

  /**
	 * Fetchs the image for the given URL
	 * @param {string} url 
	 */
  function fetchImage(url) {

    return new Promise(function(resolve, reject) {
      var image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  /**
	 * Preloads the image
	 * @param {object} image 
	 */
  function preloadImage(image) {
		
    var src = image.dataset.src;

    if (!src) {

      return;
    }

    return fetchImage(src).then(function() {

      applyImage(image, src);
    });
  }

  /**
	 * Load all of the images immediately
	 * @param {array} images 
	 */
  function loadImagesImmediately(images) {
    for(var i = 0; i< images.length; i++) {
      return preloadImage(images[i]);
    }
    // Array.from(images).forEach(function (image) {
    // 	return preloadImage(image);
    // });
  }

  /**
	 * Disconnect the observer
	 */
  function disconnect() {
    if (!observer) {
      return;
    }

    observer.disconnect();
  }

  /**
	 * On intersection
	 * @param {array} entries 
	 */
  function onIntersection(entries) {
    // Disconnect if we've already loaded all of the images
    if (imageCount === 0) {
      observer.disconnect();
    }

    // Loop through the entries

    entries.forEach(function(entry) {
      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
        imageCount--;
        // Stop watching and load the image
        observer.unobserve(entry.target);
        preloadImage(entry.target);
      }
    });
  }

  /**
	 * Apply the image
	 * @param {object} img 
	 * @param {string} src 
	 */
  function applyImage(img, src) {
    // Prevent this from being lazy loaded a second time.
    img.classList.add('js-image-handled');
    if(img.classList.contains('bg')) {
      img.style.backgroundImage = 'url('+src+')';

    }else{
      img.src = src;

    }
    img.classList.add('fade-in');
    $(img).parent().addClass('fade-in-parent');
  }	
}

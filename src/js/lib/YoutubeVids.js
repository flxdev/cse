export default function YoutubeVids() {

  let youtube = document.querySelectorAll( '.youtube' );
	
  for (let i = 0; i < youtube.length; i++) {
		
    let source = 'https://img.youtube.com/vi/'+ youtube[i].dataset.embed +'/maxresdefault.jpg';

    let image = new Image();
    image.src = source;
    image.addEventListener( 'load', () => {
      youtube[ i ].appendChild( image );
    });
	
    youtube[i].addEventListener( 'click', function() {

      var iframe = document.createElement( 'iframe' );

      iframe.setAttribute( 'frameborder', '0' );
      iframe.setAttribute( 'allowfullscreen', '' );
      // iframe.setAttribute( "wmode", "Opaque" );
      iframe.setAttribute( 'src', 'https://www.youtube.com/embed/'+ this.dataset.embed +'?wmode=opaque&rel=0&showinfo=0&autoplay=1' );

      this.innerHTML = '';
      this.appendChild( iframe );
    } );	
  };
	
}

document.addEventListener('DOMContentLoaded', function() {

  if(document.querySelector('#bigTitle')) {
    var typed = new Typed('#bigTitle', {
      stringsElement: '#typed-strings',
      typeSpeed: 20,
      backDelay: 1500,
      backSpeed: 30,
    });
  }

  var getOffsetTop = function (elem) {
  	// Set our distance placeholder
  	var distance = 0;

  	// Loop up the DOM
  	if (elem.offsetParent) {
  		do {
  			distance += elem.offsetTop;
  			elem = elem.offsetParent;
  		} while (elem);
  	}

  	// Return our distance
  	return distance < 0 ? 0 : distance;
  };


  if(document.querySelector('#scroll')) {
    const scroll = document.querySelector('#scroll');
    const fixedElement = document.querySelector('#scroll .column.w-30 .wrapper');
    const offset = getOffsetTop(scroll);

    window.addEventListener('scroll', function() {
      let scrollTop = this.scrollY;

      if(scrollTop > offset - 50) {
        scroll.classList.add('is-fixed');
        if(window.innerWidth > 1024) {
          fixedElement.style.top = scrollTop - 275 + "px";
        }
      }
      else {
        scroll.classList.remove('is-fixed');
      }
    });
  }


  function scrollIt(destination, duration = 200, easing = 'linear', callback) {

    const easings = {
      linear(t) {
        return t;
      },
      easeInQuad(t) {
        return t * t;
      },
      easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic(t) {
        return (--t) * t * t + 1;
      },
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
      },
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      },
      easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint(t) {
        return 1 + (--t) * t * t * t * t;
      },
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      }
    };

    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }

    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();
  }



  if(document.querySelector('.box-service-1')) {
    let boxService = document.querySelectorAll('.box-service-1');
    let boxServiceLink = document.querySelector('.box-service-1').getAttribute("href");



    for(let i=0; i<boxService.length;i++) {

      // Scroll to section 1
      boxService[i].addEventListener('click', () => {

        console.log(boxService[i].getAttribute('href'));
        scrollIt(
          document.querySelector(boxService[i].getAttribute('href')),
          500,
          'easeOutQuad',
          () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
        );
      });
    }
  }

}, false);

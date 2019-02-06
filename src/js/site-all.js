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

}, false);

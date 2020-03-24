var elem = document.getElementsByClassName('img-fluid img-profile')[0];
elem.addEventListener('click',function()
{if(elem.className==" "){elem.className='img-fluid img-profile';}else{elem.className=" ";}}
);

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
    window.signature.initialize();
    return setTimeout(function() {
      return window.signature.animate();
    }, 2500);
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict



(function() {
  window.signature = {
    initialize: function() {
      return $('.signature svg').each(function() {
        var delay, i, len, length, path, paths, previousStrokeLength, results, speed;
        paths = $('path, circle, rect', this);
        delay = 0;
        results = [];
        for (i = 0, len = paths.length; i < len; i++) {
          path = paths[i];
          length = path.getTotalLength();
          previousStrokeLength = speed || 0;
          speed = length < 100 ? 20 : Math.floor(length);
          delay += previousStrokeLength + 100;
          results.push($(path).css('transition', 'none').attr('data-length', length).attr('data-speed', speed).attr('data-delay', delay).attr('stroke-dashoffset', length).attr('stroke-dasharray', length + ',' + length));
        }
        return results;
      });
    },
    animate: function() {
      return $('.signature svg').each(function() {
        var delay, i, len, length, path, paths, results, speed;
        paths = $('path, circle, rect', this);
        results = [];
        for (i = 0, len = paths.length; i < len; i++) {
          path = paths[i];
          length = $(path).attr('data-length');
          speed = $(path).attr('data-speed');
          delay = $(path).attr('data-delay');
          results.push($(path).css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear').attr('stroke-dashoffset', '0'));
        }
        return results;
      });
    }
  };


  $(window).load(function() {
    return window.signature.animate();
  });

}).call(this);
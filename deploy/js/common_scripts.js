$(function(){

  $(window).ready(function(){

    $('.main-menu-btn').on('click', function() {
      $('html').addClass('open-main-menu');
    });


    $('.close-btn').on('click', function() {
      $('html').removeClass('open-main-menu');
    });

    $('.main-menu a').on('click', function() {
      $('html').removeClass('open-main-menu');
    });

    function scrolledHeader() {
      var scrolled = $(window).scrollTop();
      var headerHeight = $('#header').height();

      if (scrolled > headerHeight) {
        $('.main-menu-btn').addClass('fixed');
      } else {
        $('.main-menu-btn').removeClass('fixed');
      }
    }


    function parallax(){
      var scrolled = $(window).scrollTop();
      var windowHeight = $(window).height();
      var $parallaxBg = $('.parallax-bg');

      $parallaxBg.each(function() {
        var startScroll = parseInt($(this).attr('data-start-position')),
            speed = parseFloat($(this).attr('data-parallax-speed')),
            parentRelative = $(this).attr('data-parent-relative'),
            side = $(this).attr('data-start-side'),
            parentOffset = $(this).parent().offset().top,
            parentHeight = $(this).parent().height();

        if (parentRelative) {
          if (scrolled + windowHeight > parentOffset) {
            if (side === 'bottom') {
              $(this).css('bottom', startScroll + (scrolled + windowHeight-parentOffset)*speed - parentHeight*speed +'px');
            } else {
              $(this).css('top', startScroll - (scrolled + windowHeight-parentOffset)*speed + parentHeight*speed+'px');
            }
          }
        } else {
          if (side === 'bottom') {
            $(this).css('bottom', startScroll + scrolled *speed  + 'px');
          } else {
            $(this).css('top', startScroll - scrolled *speed  + 'px');
          }
        }

      })
    }

    parallax();

    $(window).scroll(function(e){
      scrolledHeader();
      parallax();
    });


    function activeCurrentMenuItem() {
      var $mainMenuLinks = $('.main-menu a');
      var location = window.location.href;

      var locationArray = location.split('/');
      var currentPage = locationArray[locationArray.length -1];

      $mainMenuLinks.each(function() {
        if ($(this).attr('href') === currentPage) {
          $(this).addClass('current')
        }
      });
    }

    activeCurrentMenuItem()




  });

}());

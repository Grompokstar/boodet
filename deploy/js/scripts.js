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

    function howMachLoseSetPositions() {
      var $playContainer = $('#play-container')
      var $playContainerWidth = $playContainer.width();
      var playContainerHeight = $playContainer.height();
      var $playIcon = $('.play-icon');
      var $waveIcon = $('.wave-icon');

      var bgLeftPosition = $playContainerWidth/2 - playContainerHeight - 38;


      $playContainer.css('background-position', bgLeftPosition + 'px 0px');
      $playIcon.css('margin-left', $playContainerWidth/2 + 'px');
      $waveIcon.css('margin-left', $playContainerWidth/2 - 20 + 'px');
    }

    howMachLoseSetPositions();



    $(window).resize(howMachLoseSetPositions);

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
            side = $(this).attr('data-start-side'),
            parentOffset = $(this).parent().offset().top,
            parentHeight = $(this).parent().height();


        if (scrolled + windowHeight > parentOffset) {
          if (side === 'bottom') {
            $(this).css('bottom', startScroll + (scrolled + windowHeight-parentOffset)*speed - parentHeight*speed +'px');
          } else {
            $(this).css('top', startScroll - (scrolled + windowHeight-parentOffset)*speed + parentHeight*speed+'px');
          }
        }

      })
    }

    parallax();

    $(window).scroll(function(e){
      scrolledHeader();
      parallax();
    });
  });

}());

$(function(){
  var obt1 = new Vivus('pic1', {type: 'sync', duration: 50, start: 'manual'}),
      obt2 = new Vivus('pic2', {type: 'sync', duration: 50, start: 'manual'}),
      obt3 = new Vivus('pic3', {type: 'sync', duration: 50, start: 'manual'}),
      obt4 = new Vivus('pic4', {type: 'sync', duration: 50, start: 'manual'}),
      obt5 = new Vivus('pic5', {type: 'sync', duration: 50, start: 'manual'}),
      obt6 = new Vivus('pic6', {type: 'sync', duration: 50, start: 'manual'}),
      obt7 = new Vivus('pic7', {type: 'sync', duration: 50, start: 'manual'}),
      obt8 = new Vivus('pic8', {type: 'sync', duration: 50, start: 'manual'}),
      obt9 = new Vivus('pic9', {type: 'sync', duration: 50, start: 'manual'}),
      obt10 = new Vivus('playwave', {type: 'sync', duration: 50, start: 'autostart'});

  var vivusObjects = {
    '0': obt1,
    '1': obt2,
    '2': obt3,
    '3': obt4,
    '4': obt5,
    '5': obt6,
    '6': obt7,
    '7': obt8,
    '8': obt9
  }

  $("#playbuttt").mouseover(function () {
    obt10.reset().play()
  });

  function initSvgAnimation() {
    var scrolled = $(window).scrollTop();
    var windowHeight = $(window).height();
    var $blocks = $('.block');


    $blocks.each(function() {
      var offsetTop = $(this).offset().top;
      var blockHeight = $(this).height();
      var svgId = $(this).attr('data-svg-id');

      if (scrolled + windowHeight > offsetTop + blockHeight) {
        vivusObjects[svgId].play();
      }
    })
  }


  $(window).scroll(function(e){
    initSvgAnimation()
  });
}());


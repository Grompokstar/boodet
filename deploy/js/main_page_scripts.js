$(function(){

  $(window).ready(function(){

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
  });

}());

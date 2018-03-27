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


    //slider

    var timerId = setInterval(function() {
      var $sliderContainer = $('.slider-container');
      var activeSlide = $sliderContainer.attr('data-active-slide');
      console.log(activeSlide);

      activeSlide++;

      if (activeSlide > 3) {
        activeSlide = 1;
      }

      $sliderContainer.attr('data-active-slide', activeSlide);
    }, 5000);

    //-------------------
  });

}());

document.addEventListener('DOMContentLoaded', resize, false);
window.addEventListener('resize', resize, false);
    
function resize() {
  var sliders = document.querySelectorAll('#slider, #slider .slide-item');
  sliders.forEach((slider) => {
    slider.style.height = null;
    if(slider.clientHeight > slider.clientWidth / 2) {
      slider.style.height = `${slider.clientWidth / 2}px`;
    } else if(slider.clientHeight < slider.clientWidth / 3) {
      slider.style.height = `${slider.clientWidth / 3}px`;
    }
  });    
}

class Animation {
  promiseTime(functionTimeout = null, timeDelay = 10) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        functionTimeout();
        resolve();
      }, timeDelay); 
    });
  }
    
  process() {
    return this.promiseTime(this.animate.bind(this), this.delay);
  }
    
  animate() {
       
  }
    
  run() {
    this.process()
      .then(() => {
        return this.run(); 
    });
  }
}

class Swap extends Animation {
  constructor(object = {}) {
    super();
    this.prefixId = object.prefixId;
    this.currentNum = object.currentNum || 1;
    this.preventNum = object.preventNum || 2;
    this.minNum = object.minNum || this.currentNum;
    this.maxNum = object.maxNum || this.maxNum;
    this.delay = object.delay || 250;
    this.countCircles = object.countCircles || 0;
    this.resultFunction = object.resultFunction || null;
    this.currentStep = 0;
    this.run();
  }
        
  animate() {
    var currentEl = this.getEl(this.currentNum);
    var preventEl = this.getEl(this.preventNum);
    currentEl.classList.remove('hide');
    preventEl.classList.add('hide');
    this.preventNum = this.currentNum;
    this.currentNum = (this.currentNum + 1 > this.maxNum) ? this.minNum : this.currentNum + 1;
  }
        
  getId(num = 0) {
    return `${this.prefixId}${num}`;
  }
    
  getEl(num = 0) {
    return document.getElementById(this.getId(num));
  }
    
  run() {
    this.process()
      .then(() => {
        var countSteps = this.countCircles * (this.maxNum - this.minNum + 1);
        if(!countSteps || typeof this.resultFunction != 'function' ||  this.currentStep < countSteps) {
          this.currentStep++;
          this.run();
        } else if(countSteps <= this.currentStep){
          this.resultFunction();
        } 
      });
  }
}

class Serfing {
  constructor() {
    this.prefixId = '#girl_w_';
    this.countCirclesWalk = 2;
    this.firstId = 1;
    this.endWalkId = 8;
          
    this.tramplin = $('#slide_kipr #tramplin');
    this.city = $('#slide_kipr #city');
    this.board = $('#slide_kipr #board');
    this.parashute = $('#slide_kipr #parashute');
           
    this.start();
  }
        
  start() {
    $('#slide_kipr .girl_img').addClass('hide').removeClass('transition_none');
    this.tramplin.removeClass('tramplin_top tramplin_top_fixed tramplin_animation tramplin_top ');
    this.city.removeClass('city_animation city_remove city_before_water transition_none');
    this.board.removeClass('board_visible board_rotate');
           
    $('#slide_kipr #girl_w_8').removeClass('hide');
    this.city.insertBefore($('#slide_kipr #cloud_1')).addClass('city_animation');
    this.tramplin.addClass('tramplin_animation');
    this.walk();
  }
        
  getId(id = 0) {
    return `${this.prefixId}${id}`;
  }
        
  swap(currentNum = 0, preventNum = 0) {
    $('#slide_kipr ' + this.getId(currentNum)).removeClass('hide');
    $('#slide_kipr ' + this.getId(preventNum)).addClass('hide');
  } 
        
  promiseSwap(currentId = 0, preventId = 0, timeResolve = 0, timeSwap = 0, afterSwapFunction = null) {
    timeSwap = timeSwap || timeResolve; 
    return new Promise((resolve, reject) => {
      setTimeout((currentId = '', preventId = '') => {
        this.swap(currentId, preventId);
        if(typeof afterSwapFunction === 'function') {
          afterSwapFunction(currentId, preventId);
        }
      }, timeSwap, currentId, preventId);
      setTimeout(() => resolve(currentId), timeResolve);
    });
  }
        
  walk() {
    var swapWalk = new Swap({
      delay: 300,
      prefixId: 'girl_w_',
      minNum: this.firstId,
      maxNum: this.endWalkId,
      currentNum: this.firstId,
      preventNum: this.endWalkId,
      countCircles: this.countCirclesWalk,
      resultFunction: () => {
        swapWalk = null;
        this.afterWalk(); 
      }
    });
  }
        
  afterWalk() {
    this.promiseSwap(this.endWalkId + 1, this.firstId, 1250, 250)
      .then((preventId = 0) => {
        return this.promiseSwap(preventId + 1, preventId, 250);
      }).then((preventId = 0) => {
        return this.promiseSwap(preventId + 1, preventId, 2000, 500, (currentId) => {
          this.tramplin.addClass('tramplin_top');
          $('#slide_kipr ' + this.getId(currentId)).addClass('bounce');
          this.city.addClass('city_top');
        });
      }).then((preventId = 0) => {
        $('#slide_kipr ' + this.getId(preventId)).removeClass('bounce');
        return this.promiseSwap(preventId + 1, preventId, 2010, 10, (currentId) => {
          $('#slide_kipr ' + this.getId(currentId)).addClass('rotate'); 
        });
      }).then((preventId = 0) => {
        this.tramplin.addClass('tramplin_top_fixed');
        $('#slide_kipr ' + this.getId(preventId)).removeClass('rotate');
        return this.promiseSwap(preventId + 1, preventId, 7010, 10, (currentId) => {
          this.parashute.addClass('move');
          $('#slide_kipr ' + this.getId(currentId)).addClass('fly');
        });
      }).then((preventId = 0) => {
        $('#slide_kipr ' + this.getId(preventId)).removeClass('fly');
        return this.promiseSwap(preventId + 1, preventId, 250, 10, (currentId) => {
          this.city.removeClass('city_top');
          this.parashute.removeClass('move');
          this.board.addClass('board_visible');
          this.cityMove();
        });
      }).then((preventId = 0) => {
        this.finish(preventId + 1, preventId);
      });
  }
        
  finish(currentId = 0, preventId = 0) {
    this.board.addClass('board_rotate');
    var swapGirlBoard = new Swap({
      delay: 500,
      minNum: preventId,
      maxNum: currentId,
      currentNum: currentId,
      preventNum: preventId,
      prefixId: 'girl_w_',
      countCircles: 11,
      resultFunction: () => {
        swapGirlBoard = null;
        this.start();
      }
    });
  }
        
  cityMove() {
    this.city.addClass('city_remove');
    setTimeout(() => {
      this.city.insertBefore($('#slide_kipr #water')).addClass('city_before_water');
    }, 1000);
  }
}

class ScrollTape extends Animation {
  constructor() {
    super();
    this.wrap = document.getElementById('scroll_tape');
    this.step = 1;
    this.delay = 50;
        
    this.wrap.scrollTop = 0;
    this.run();
  }
        
  animate() {
    var newScroll = this.wrap.scrollTop + this.step;
    if(newScroll >= this.getScrollTopMax() / 2) {
      var currentTape = this.wrap.children[1];
      var preventTape = this.wrap.children[0];
      this.wrap.insertBefore(currentTape, preventTape);
      this.wrap.scrollTop = newScroll - this.getScrollTopMax() / 2;
    } else {
      this.wrap.scrollTop = newScroll;        
    }    
  }
        
  getScrollTopMax() {
    return this.wrap.children[0].clientHeight * 2;
  }
}

/* surf */
new Serfing();

/* safe */
new Swap({
  delay: 200,
  minNum: 1,
  maxNum: 5,
  currentNum: 1,
  preventNum: 5,
  prefixId: 'ep3_man1_c'
});

new Swap({
  delay: 200,
  minNum: 1,
  maxNum: 5,
  currentNum: 1,
  preventNum: 5,
  prefixId: 'ep3_man2_c'
});

/* scroll */
new ScrollTape();
new Swap({
  prefixId: 'girl_',
  currentNum: 1,
  preventNum: 3,
  minNum: 1,
  maxNum: 3,
  delay: 350
});

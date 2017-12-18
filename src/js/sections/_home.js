import "../plugins/jquery.fullpage.min"
import "../plugins/jquery.fullpage.extensions.min"

// implementation of the module
var home = {
  modules: {
    canvasPLay: require('../modules/_canvasPlay'),
  },

  props: {
    mobileThreshold: 960,
    scrollingSpeed: 600
  },

  registerEvents: function() {
    $('#arrowDown').on('click', this.onArrowClick.bind(this));
  },

  onArrowClick: function() {
    $.fn.fullpage.moveSectionDown();
  },

  activateFullPage: function() {
    $('#landingPage').fullpage({
      scrollingSpeed: this.props.scrollingSpeed,
      controlArrows: false,
      slidesNavigation: true,
      autoScrolling: true,
      paddingTop: ($(window).width() > this.props.mobileThreshold) ? 0 : '4rem',
      afterRender: function() {
        document.querySelector('.visual-pattern.formats video').play();
      },
      onLeave: function(index, nextIndex) { 
        // homepage heros
        if (nextIndex === 1) {
          document.body.classList.remove('in-carousel');
        }

        // homepage carousel
        if (nextIndex === 2) {
          document.body.classList.add('in-carousel');
        }
      },
      onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {
        var currentSlide = document.querySelectorAll('.slide-inner')[nextSlideIndex];
        
        currentSlide.querySelector('video').load();
        currentSlide.querySelector('video').play();

        document.body.classList.add('sliding');
      },
      afterSlideLoad: function(index, slideIndex) {
        document.body.classList.remove('sliding');
      }
    });
  },

  canvasPLay: function() {
    var videoElement = document.querySelector('.visual-pattern.formats video');
    var canvasElement = document.getElementById('waves');

    this.modules.canvasPLay(videoElement, canvasElement);
  },

  init: function() {
    this.registerEvents();
    this.activateFullPage();

    console.log('hallo');
  }
}

module.exports = home;
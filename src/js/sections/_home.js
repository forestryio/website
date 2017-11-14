// implementation of the module
var home = {
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
      paddingTop: ($(window).width() > this.props.mobileThreshold) ? 0 : '4em',
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
        
        currentSlide.querySelector('video').play();

        // console.log('slide leaving, next is: ', nextSlideIndex);

        document.body.classList.add('sliding');
      },
      afterSlideLoad: function(index, slideIndex) {
        // console.log('after slide loaded', index, slideIndex);

        document.body.classList.remove('sliding');
      }
    });
  },

  canvasPLay: function() {
    // console.log('trying out some canvas stuff');
  },

  init: function() {
    this.registerEvents();
    this.activateFullPage();
    this.canvasPLay();
  }
}

module.exports = home;
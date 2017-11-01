// JS Goes here - ES6 supported
$(function() {
  var yieldmo = {
    modules: {
      navigation: require('./modules/_navigation.js')
    },

    props: {
      mobileThreshold: 768,
      scrollingSpeed: 600
    },

    registerEvents: function() {
      $("#arrowDown").on("click", this.onArrowClick);
    },

    onArrowClick: function() {
      // $("html, body").animate({ scrollTop: $("#heroCarousel").position().top }, 600);
      $.fn.fullpage.moveSectionDown();
    },

    updateActivePage: function(element, index) {
      var commandingElement = document.body;
      var pageNumber = index;

      $(commandingElement).removeClass('stage-intro stage-showcase');

      if (pageNumber !== Number(element.dataset.page)) {
        $(commandingElement).removeClass('active-' + commandingElement.dataset.page);
        $(commandingElement).addClass('active-' + pageNumber);
        $(commandingElement).attr("data-page", pageNumber);
      }

      if (index <= 3) {
        $(commandingElement).addClass('stage-intro');
      } else {
        $(commandingElement).addClass('stage-showcase');
      }
    },

    init: function() {
      this.modules.navigation();
      this.registerEvents();

      if (window.section === 'home') {
        $('#landingPage').fullpage({
          scrollingSpeed: this.props.scrollingSpeed,
          controlArrows: false,
          slidesNavigation: true,
          autoScrolling: true,
          paddingTop: ($(window).width() > this.props.mobileThreshold) ? 0 : '4em'
        });
      }

      if (window.section === 'formats') {
        $('#sectionFormats').fullpage({
          scrollingSpeed: this.props.scrollingSpeed,
          paddingTop: ($(window).width() > this.props.mobileThreshold) ? 0 : '4em',
          afterLoad: function(anchorLink, index) {
            if (index >= 4) {
              document.querySelector('.fp-section.active video').play();
            }
          },

          onLeave: function(index, nextIndex, direction) {
            this.updateActivePage(document.body, nextIndex);
          }.bind(this),

          afterRender: function() {
            // document.querySelector('')
          }
        });
      }
    }
  };

  yieldmo.init();
});
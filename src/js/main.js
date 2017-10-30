// JS Goes here - ES6 supported
$(function() {
  var yieldmo = {
    modules: {
      navigation: require('./modules/_navigation.js')
    },

    registerEvents: function() {
      $("#arrowDown").on("click", this.onArrowClick);
    },

    onArrowClick: function() {
      $("html, body").animate({ scrollTop: $("#heroCarousel").position().top }, 600);
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
        /* http://kenwheeler.github.io/slick/#settings */
        $('#heroCarousel').slick({
          dots: true,
          arrows: false,
          // autoplay: true,
          autoplaySpeed: 2000
        });

        // $('#siteWrapper').fullpage();
      }

      if (window.section === 'formats') {
        $('#sectionFormats').fullpage({
          afterLoad: function(anchorLink, index) {
            // console.log('anchorLink', anchorLink, index);

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
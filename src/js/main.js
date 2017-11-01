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
      $('#arrowDown').on('click', this.onArrowClick.bind(this));
    },

    onArrowClick: function() {
      // $("html, body").animate({ scrollTop: $("#heroCarousel").position().top }, 600);
      $.fn.fullpage.moveSectionDown();
    },

    jumpToFormat: function(e) {
      console.log(e.target.dataset.index);

      $("html, body").animate({ scrollTop: $(".page-4").position().top }, 600);
      this.updateActiveFormat(e);
    },

    updateActiveFormat: function(e) {
      var chosenTarget;
      var chosenIndex;

      if (e.target.tagName === 'SPAN') {
        chosenTarget = e.target.parentNode;
      } else {
        chosenTarget = e.target;
      }

      chosenIndex = chosenTarget.dataset.index;

      if (chosenIndex) {
        $('#innerNav .headline-cap').removeClass('active');
        $('#formatsElaboration .format').removeClass('active');

        // $(chosenTarget).addClass('active');
        $('#innerNav .headline-cap:nth-child(' + chosenIndex + ')').addClass('active');       
        $('#formatsElaboration .format:nth-child(' + chosenIndex + ')').addClass('active');        
      }
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
          paddingTop: ($(window).width() > this.props.mobileThreshold) ? 0 : '4em',
          afterLoad: function(anchorLink, index) {
            // if (index >= 4) {
            document.querySelector('.visual-pattern.formats video').play();
            document.querySelector('.visual-pattern.insights video').play();
            // }
          },
        });
      }

      if (window.section === 'formats') {
        // $('#sectionFormats').fullpage({
        //   scrollingSpeed: 1200,
        //   paddingTop: ($(window).width() > this.props.mobileThreshold) ? 0 : '4em',
        //   afterLoad: function(anchorLink, index) {
        //     if (index >= 4) {
        //       document.querySelector('.fp-section.active video').play();
        //     }
        //   },

        //   onLeave: function(index, nextIndex, direction) {
        //     this.updateActivePage(document.body, nextIndex);
        //   }.bind(this),

        //   afterRender: function() {
        //     // document.querySelector('')
        //   }
        // });

        $('#innerNav').on('click', this.updateActiveFormat.bind(this));
        $('#formatsCategory').on('click', this.jumpToFormat.bind(this));
      }
    }
  };

  yieldmo.init();
});
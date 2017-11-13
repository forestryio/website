// JS Goes here - ES6 supported
$(function() {
  var yieldmo = {
    modules: {
      navigation: require('./modules/_navigation.js')
    },

    props: {
      mobileThreshold: 960,
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
      var extraPadding = ($(window).width() > this.props.mobileThreshold) ? 0 : '64';

      $("html, body").animate({ scrollTop: ($(".page-4").position().top - extraPadding) }, 600);
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

      // TODO: re-initiate on resize
      if (window.section === 'home') {
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

        // TODO: "sorry, please increase your browser window height"
      }

      if (window.section === 'formats') {
        $('#innerNav').on('click', this.updateActiveFormat.bind(this));
        $('#formatsCategory').on('click', this.jumpToFormat.bind(this));
      }

      if (window.section === 'leadership') {
        var self = this;

        $('.team-list a').on('click', function(e) {
          var extraPadding = ($(window).width() > self.props.mobileThreshold) ? 0 : '64';
          var selector = '.team-bios div[data-name="' + e.target.parentNode.dataset.anchor + '"]';

          $("html, body").animate({ scrollTop: ($(selector).position().top - 0) }, 600);
        });
      }

      if (window.section === 'contact') {
        $('.contact-form .row:nth-of-type(2) label').on('click', function(e) {
          $('.contact-form .row:nth-of-type(2) label').removeClass('active');
          $(e.target).addClass('active');
        });
      }

      if (window.section === 'blog') {
        $('#blogTabs').on('click', function(e) {
          $('#blogTabs > a').removeClass('active');
          $(e.target).addClass('active');

          $('.section-blog').attr('class', 'section-wrapper section-blog');
          $('.section-blog').addClass('activate-' + e.target.dataset.category);
        })
      }      
    }
  };

  yieldmo.init();
});
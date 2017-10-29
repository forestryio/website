// JS Goes here - ES6 supported
$(function() {
  var yieldmo = {
    modules: {
      navigation: require('./modules/_navigation.js')
    },

    registerEvents: function() {
      $("#arrowDown").on("click", this.onArrowClick);
      $("#sectionFormats").on("scroll", this.onScroll);
    },

    initSlickSlider: function() {
      /* http://kenwheeler.github.io/slick/#settings */
      $('#heroCarousel').slick({
        dots: true,
        arrows: false,
        // autoplay: true,
        autoplaySpeed: 2000
      });
    },

    onArrowClick: function() {
      $("html, body").animate({ scrollTop: $("#heroCarousel").position().top }, 600);
    },

    onScroll: function() {
      var currentScrollTop = $(this).scrollTop();
      var viewportHeight = $(this).height();
      var pageNumber = parseInt((currentScrollTop)/viewportHeight);

      // console.log(currentScrollTop, pageNumber);

      if (pageNumber !== Number(this.dataset.page)) {
        $(this).removeClass('active-' + this.dataset.page);
        $(this).addClass('active-' + pageNumber);
        $(this).attr("data-page", pageNumber);
      }
    },

    init: function() {
      this.modules.navigation();
      this.registerEvents();

      if (window.section === 'home') {
        this.initSlickSlider();
      }
    }
  };

  yieldmo.init();
});
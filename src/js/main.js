// JS Goes here - ES6 supported
$(function() {
  var yieldmo = {
    modules: {
      navigation: require('./modules/_navigation.js')
    },

    initSlickSlider: function() {
      /* http://kenwheeler.github.io/slick/#settings */
      $('.hero-carousel').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
      });
    },

    init: function() {
      this.modules.navigation();

      if (window.section === 'home') {
        this.initSlickSlider();
      }
    }
  };

  yieldmo.init();
});
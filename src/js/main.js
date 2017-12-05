import $ from "jquery";

// Make jQuery available to other scripts
window.$ = window.jQuery = $;

// JS Goes here - ES6 supported
$(function() {
  var yieldmo = {
    modules: {
      about: require('./modules/_about.js')
    },

    init: function() {
      var greetings = this.modules.about('new yieldmo');

      // Say hello
      console.log(greetings);
    }
  };

  yieldmo.init();
});
import $ from "jquery";

// Make jQuery available to other scripts
window.$ = window.jQuery = $;

// JS Goes here - ES6 supported
$(function() {
  var yieldmo = {
    modules: {
      navigation: require('./modules/_navigation.js')
    },

    sections: {
      home: require('./sections/_home')
    },

    props: {
      mobileThreshold: 960,
      scrollingSpeed: 600
    },

    jumpToFormat: function(e) {
      var extraPadding = ($(window).width() > this.props.mobileThreshold) ? 0 : '64';

      $("html, body").animate({ scrollTop: ($(".page-4").position().top - 0) }, 600);
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
      // global modules
      this.modules.navigation();

      // invoke section module if the current section has one
      if (this.sections[window.section]) {
        this.sections[window.section].init();
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
          var selectedType = document.getElementById(e.target.getAttribute('for'));

          $('.contact-form .row:nth-of-type(2) label').removeClass('active');
          $(e.target).addClass('active');
          $(selectedType).prop("checked", true);
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
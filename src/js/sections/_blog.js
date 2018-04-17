var blog = {
  modules: {
  },

  props: {
  },

  toggleTabs: function(e) {
    $('#blogTabs > a').removeClass('active');
    $(e.target).addClass('active');

    $('.section-blog').attr('class', 'section-wrapper section-blog');
    $('.section-blog').addClass('activate-' + e.target.dataset.category);
  },

  registerEvents: function() {
    $('#blogTabs').on('click', this.toggleTabs.bind(this));
  },

  init: function() {
    this.registerEvents();
  }
}

module.exports = blog;
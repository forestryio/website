var download = {
  modules: {
  },

  props: {
  },

  registerEvents: function() {
    console.log('download stuff');
  },

  init: function() {
    this.registerEvents();

    $('.file-download').featherlight($content, configuration);
  }
}

module.exports = download;
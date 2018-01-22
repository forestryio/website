import "../plugins/featherlight"

var download = {
  registerEvents: function() {
    $('#download').on('click', this.onDownload.bind(this));
  },

  isAnyRequiredInputEmpty: function() {
    var result = false;

    $('.featherlight input[required]').each(function(i) {
      if ($(this).val().length === 0) {
        result = true;
      }
    });

    return result;
  },

  emulateDownload: function() {
    /*
     * Click the anchor
     */

    // Chrome can do anchor.click(), but let's do something that Firefox can handle too

    // Create event
    var ev = document.createEvent("MouseEvents");
    
    ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    // Fire event
    document.querySelector('#downloadAction').dispatchEvent(ev);
  },

  onDownload: function(e) {
    var current = $.featherlight.current();

    if (!this.isAnyRequiredInputEmpty()) {
      // e.preventDefault();
      current.close();
      this.emulateDownload();
    }
  },

  init: function() {
    this.registerEvents();

    $('#fileDownload').featherlight();
  }
}

module.exports = download;
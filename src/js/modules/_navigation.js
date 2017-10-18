// implementation of the module
function navigation(name) {
  var navIconClicked = function(e) {
    $(document.body).toggleClass('open');
  };

  // register event listeners
  $('#navIcon').on('click', navIconClicked);
}

module.exports = navigation;
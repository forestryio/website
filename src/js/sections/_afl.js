var afl = {
  registerEvents: function() {
    $('.interior-page.page-1 .charts').click(function(e) {
      $('.interior-page.page-1').removeClass('init-con');
      $('.interior-page.page-1').removeClass('init-adv');
      $('.interior-page.page-1').removeClass('init-pub');

      $('.interior-page.page-1').addClass(e.target.dataset.trigger);
    });
  },

  introduction: function() {
    setTimeout(function() {
      $('.interior-page.page-1').addClass('init-con');
    }, 1000);

    setTimeout(function() {
      $('.interior-page.page-1').removeClass('init-con');
      $('.interior-page.page-1').addClass('init-adv');
    }, 3000);

    setTimeout(function() {
      $('.interior-page.page-1').removeClass('init-adv');
      $('.interior-page.page-1').addClass('init-pub');
    }, 5000);

    setTimeout(function() {
      $('.interior-page.page-1').addClass('all-charts');
    }, 6000);
  },

  init: function() {
    this.introduction();
    this.registerEvents();
  }
}

module.exports = afl;
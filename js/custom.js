/*global jQuery:false */
jQuery(document).ready(function($) {
  "use strict";


  //add some elements with animate effect

  $(".big-cta").hover(
    function() {
      $('.cta a').addClass("animated shake");
    },
    function() {
      $('.cta a').removeClass("animated shake");
    }
  );
  $(".box").hover(
    function() {
      $(this).find('.icon').addClass("animated fadeInDown");
      $(this).find('p').addClass("animated fadeInUp");
    },
    function() {
      $(this).find('.icon').removeClass("animated fadeInDown");
      $(this).find('p').removeClass("animated fadeInUp");
    }
  );


  $('.accordion').on('show', function(e) {

    $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
    $(e.target).prev('.accordion-heading').find('.accordion-toggle i').removeClass('icon-plus');
    $(e.target).prev('.accordion-heading').find('.accordion-toggle i').addClass('icon-minus');
  });

  $('.accordion').on('hide', function(e) {
    $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
    $(this).find('.accordion-toggle i').not($(e.target)).removeClass('icon-minus');
    $(this).find('.accordion-toggle i').not($(e.target)).addClass('icon-plus');
  });

  // tooltip
  $('.social-network li a, .options_box .color a').tooltip();

  //scroll to top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
  $('.scrollup').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
    return false;
  });

  //search
  if( $('#sb-search').length ) {
    new UISearch(document.getElementById('sb-search'));
  }  

  // add listener for load more click
  $('.cbp-l-loadMore-button-link').on('click', function(e) {

    e.preventDefault();

    var clicks, me = $(this),
      oMsg;

    if (me.hasClass('cbp-l-loadMore-button-stop')) return;

    // get the number of times the loadMore link has been clicked
    clicks = $.data(this, 'numberOfClicks');
    clicks = (clicks) ? ++clicks : 1;
    $.data(this, 'numberOfClicks', clicks);

    // set loading status
    oMsg = me.text();
    me.text('LOADING...');

    // perform ajax request
    $.ajax({
        url: me.attr('href'),
        type: 'GET',
        dataType: 'HTML'
      })
      .done(function(result) {
        var items, itemsNext;

        // find current container
        items = $(result).filter(function() {
          return $(this).is('div' + '.cbp-loadMore-block' + clicks);
        });

        gridContainer.cubeportfolio('appendItems', items.html(),
          function() {
            // put the original message back
            me.text(oMsg);

            // check if we have more works
            itemsNext = $(result).filter(function() {
              return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
            });

            if (itemsNext.length === 0) {
              me.text('NO MORE WORKS');
              me.addClass('cbp-l-loadMore-button-stop');
            }

          });

      })
      .fail(function() {
        // error
      });

  });

});

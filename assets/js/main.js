
$(function(){
  var navBar = $('#header nav').height();
  var aTop = $('#home').height();
  if ($(window).width() < 760) {
    $('#home').css('padding-top', navBar * 3);
  }
  else {
    $('#home').css('padding-top', navBar);
  }
  $('#nav-toggle').click(function(){
    $('#nav-menu').css('top', '0rem');
  });
  $('#nav-menu a').click(function(){
    $('#nav-menu').css('top', '-17rem');
  });
  $(window).scroll(function(){
    if($(this).scrollTop()>= aTop){
      $('#scroll-up').css('bottom', '3rem');
    }else{
      $('#scroll-up').css('bottom', '-50%');
    }
    if($(this).scrollTop()>= navBar){
      $('#header nav').addClass('shadow');
    }else{
      $('#header nav').removeClass('shadow');
    }
  });
});

// Scroll reveal
const sr = ScrollReveal({
 origin: 'top',
 distance: '60px',
 duration: 2500,
 delay: 400,
});

sr.reveal('#home-image, #newsletter, #footer-info, #footer-content .mb-12');
sr.reveal('#home-data', {origin: 'bottom'});
sr.reveal('#about-image, #recently-image', {origin: 'right'});
sr.reveal('#about-data, #recently-data', {origin: 'left'});
sr.reveal('.menu-container', {interval: 150});
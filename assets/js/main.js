$(document).ready(function () {
  var navBar = $('#header nav').height();
  var navBlock = $('#block-nav');
  var aTop = $('#home').height();
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
    if($(this).scrollTop()>= 8){
      navBlock.css('height', `${navBar-8}px`);
      $('#header nav').addClass('shadow fixed');
      $('#header nav').removeClass('relative');
    }else{
      navBlock.css('height', `0px`);
      $('#header nav').removeClass('shadow fixed');
      $('#header nav').addClass('relative');
    }
  });
  // Smooth scroll function
  sections  = $('section')
  for(ind in sections){
    section = sections[ind];
    $('a[href^="#'+section.id+'"]').on('click', function (e) {
        e.preventDefault();
  
        var target = this.hash,
            $target = $(target);
        console.log(target);
        console.log($('html, body'));
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 100
        }, 400, 'swing', function () {
            // window.location.hash = target;
        });
    });
  }
});

function darkTheme() {
  $('body').toggleClass('dark-theme');
  if($('body').hasClass('dark-theme')){
    $('.dark-button').html('<i class="ri-sun-line"></i>');
  }else{
    $('.dark-button').html('<i class="ri-moon-line"></i>');
  }
}

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
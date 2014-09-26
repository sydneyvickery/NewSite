$(function() {

    var pathname = window.location.pathname;

    if ( pathname.indexOf("resume") >= 0) {
        var target = 'resume';
        $('#resume').attr('href','#top');
    } else if (pathname == '/') { 
        var target = 'work'; 
        $('#work').attr('href','#top');
    } else {
        var target = 'work'; 
    }
    //$('.'+target).addClass('active');


    $(window).scroll(function () {
        var wrapper_height = $('.wrapper').height();
        var bottom_dist = $(window).height() + $(window).scrollTop();

        if ( (wrapper_height - bottom_dist) <= 200) {
            $('#contact').addClass('active');
            $('#'+target).removeClass('active');
            console.log('remove');
        }
        else if ( (wrapper_height - bottom_dist) >= 450) {
            $('#'+target).addClass('active');
            $('#contact').removeClass('active');
            console.log('add');
        }
    });


    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
               if (target.length) {
                 $('html,body').animate({
                     scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

});
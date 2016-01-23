(function($) {
    "use strict";

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 60
    });

    $('#topNav').affix({
        offset: {
            top: 200
        }
    });
    
    new WOW().init();
    
    $('a.page-scroll').bind('click', function(event) {
        var link = $(this).attr('href');
        link = link == "#" ? "#first" : link;
        $('html, body').stop().animate({
            scrollTop: ($(link).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.navbar-collapse ul li a').click(function() {
        /* always close responsive nav after click */
        $('.navbar-toggle:visible').click();
    });

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr("src",$(e.relatedTarget).data("src"));
    });

})(jQuery);

window.onload = function() {
    changeLanguage(document.l10n.supportedLocales[0]);
};

function changeLanguage(lang){
    document.l10n.requestLocales(lang)
    $(".listLocales a").removeClass("currentLanguage");
    $("#"+lang+"Language").addClass("currentLanguage");

    document.l10n.localize(['video'], function(l10n) { 
        $("#video-background").find("source").attr("src", l10n.entities.video.attributes.src);
        $("#video-background").load();
    });
    
}

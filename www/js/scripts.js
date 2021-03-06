(function($){
	"use strict";
	$('body').scrollspy({target:'.navbar-fixed-top',offset:60});
	$('#topNav').affix({offset:{top:50}});
	new WOW().init();
	$('a.page-scroll').bind('click',function(event){
		var link=$(this).attr('href');
		link=link=="#"?"#first":link;
		$('html, body').stop().animate({scrollTop:($(link).offset().top-60)},1450,'easeInOutExpo');
		event.preventDefault();
	});
	$('.navbar-collapse ul li a').click(function(){
		$('.navbar-toggle:visible').click();
	});
	$('#galleryModal').on('show.bs.modal',function(e){
		$('#galleryImage').attr("src",$(e.relatedTarget).data("src"));
	});
})(jQuery);
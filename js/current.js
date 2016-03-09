var fixed_menu = true;
window.jQuery = window.$ = jQuery;

/* Custom Scripts */
function calculateScroll() {
	"use strict";
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	$('.navmenu li.scrollable').find('a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.navmenu li.scrollable')
			.removeClass('active')
			.eq(i).addClass('active');
			
			$('#top .navmenu li').first().addClass('active');
			jQuery('.mobile_menu_wrapper').css({'display' : 'none'});			
		}
	})
};

function menu_update() {
	"use strict";
	if (jQuery(window).width() > 767) {
		jQuery('nav.navmenu li a').css({'line-height': jQuery('#logo').height() + 'px'});		
	} else {
		jQuery('nav.navmenu li a').css({'line-height': 'auto'});		
	}
}

function fullwidthslider() {
	"use strict";
	var full_slider_w = jQuery(window).width();
	if (jQuery(window).width() > 767) {
		var full_slider_h = jQuery(window).height();
	} 
	else {
		var full_slider_h = jQuery(window).width()*0.7;
	}
		
	jQuery('.full_slider .flexslider, .full_slider .flexslider li').css({'width': full_slider_w, 'height': full_slider_h});	
	jQuery('.full_slider, .full_slider .flexslider li img.slide_bg').attr('style', 'height: '+full_slider_h+'px');		
	jQuery('.full_slider').css({'min-height': full_slider_h + 'px'});
	jQuery('.full_slider_caption .container').css({'padding-bottom': full_slider_h*0.079 + 'px'});	
};

jQuery(document).ready(function() {
	"use strict";
	
	fullwidthslider();
	
	calculateScroll();
	
	//Fixed Menu
	if (jQuery('.fixed-menu').size() && fixed_menu == true) {		
		jQuery('.fixed-menu').append('<div class="fixed-menu-wrapper">'+jQuery('#top header').html()+'</div>');
		jQuery('.fixed-menu').find('.menu').children('li').each(function(){
			jQuery(this).children('a').append('<div class="menu_fadder"/>');
		});
		var fixd_menu = setInterval(scrolled_menu, 10);
	}
	
	//MobileMenu
	jQuery('#top header').append('<a href="javascript:void(0)" class="menu_toggler"/>');
	jQuery('#top').append('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');	
	jQuery('.mobile_menu').html(jQuery('#top header').find('.navmenu').html());
	jQuery('.mobile_menu_wrapper').hide();
	jQuery('.menu_toggler').click(function(){
		jQuery('.mobile_menu_wrapper').slideToggle(300);
	});
		
	
	$(window).scroll(function(event) {
		calculateScroll();
	});
	
	$('.navmenu ul li.scrollable a, .mobile_menu ul li.scrollable a, .next_section, #logo a, .go_section').click(function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - jQuery('#logo').height() - 46}, 1000);
		return false;
	});
		
	// prettyPhoto
	$("a[rel^='prettyPhoto'], .prettyPhoto").prettyPhoto();	
	
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});
	
	//Iframe transparent
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
	
	jQuery('.full_slider .flexslider li img.slide_bg').each(function(){
		jQuery(this).parent().attr('style', 'background-image:url('+$(this).attr('src')+');');		
	});
			
	jQuery('.flexslider').flexslider({
        slideshow: false,
		animation: "fade",
		controlNav: false,
		directionNav: true
    });
	
	// contact form
	jQuery("#ajax-contact-form").submit(function() {
		var str = $(this).serialize();		
		$.ajax({
			type: "POST",
			url: "contact_form/contact_process.php",
			data: str,
			success: function(msg) {
				// Message Sent - Show the 'Thank You' message and hide the form
				if(msg == 'OK') {
					var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
					jQuery("#fields").hide();
				} else {
					var result = msg;
				}
				jQuery('#note').html(result);
			}
		});
		return false;
	});
	
	jQuery('.shortcode_tabs').each(function(index) {									
		/* GET ALL HEADERS */
		var i = 1;
		jQuery('.shortcode_tab_item_title').each(function(index) {
			jQuery(this).addClass('it'+i); jQuery(this).attr('data-open', 'body'+i);

			jQuery(this).addClass('head'+i);
			jQuery(this).parents('.shortcode_tabs').find('.all_heads_cont').append(this);
			i++;
		});
		/* GET ALL BODY */
		var i = 1;
		jQuery('.shortcode_tab_item_body').each(function(index) {
			jQuery(this).addClass('body'+i);
			jQuery(this).addClass('it'+i);
			jQuery(this).parents('.shortcode_tabs').find('.all_body_cont').append(this);
			i++;
		});
	});
	jQuery('.shortcode_tabs .all_body_cont div:first-child').addClass('active').fadeIn(500);
	jQuery('.shortcode_tabs .all_heads_cont div:first-child').addClass('active');
	
	jQuery('.shortcode_tab_item_title').click(function(){
		jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_body').removeClass('active').hide();
		jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_title').removeClass('active');
		var whatopen = jQuery(this).attr('data-open');
		jQuery(this).parents('.shortcode_tabs').find('.'+whatopen).addClass('active').fadeIn(1500);
		jQuery(this).addClass('active');
	}); 	
	
	menu_update();	
			
});

jQuery(window).load(function(){
	"use strict";
		
	fullwidthslider();
	
	menu_update();
	
	jQuery('.full_slider').removeClass('preloader');
	jQuery('.next_section').removeClass('hide');
});


jQuery(window).resize(function(){	
	"use strict";
	
	fullwidthslider();
	
	menu_update();
			
});

function scrolled_menu() {
	"use strict";
	if (jQuery(window).scrollTop() > (jQuery(window).height() - jQuery('#logo').height() - 47)) {
		jQuery('.fixed-menu').addClass('fixed_show');
	} else {
		jQuery('.fixed-menu').removeClass('fixed_show');
	}
};



$(function() {
	$(window).on('load', function() {
		$('.animated').removeClass('animated');
	});
	
	$(window).on('load', function() {
		var cagenda = $("#cagenda").html();
		$("#notification").html(cagenda);
		if($("#notification").html() != "0"){
			$("#notification").css("display","block");
		}else{
			$("#nonevent").css("display","block");
		}
	});
	
	$("#menu-mobile").click(function() {
		if($("nav").hasClass("slideInDown") == true) {
			$("nav").removeClass( "slideInDown animated" ).addClass( "slideOutUp animated" );
		}else{
			$("nav").css("display","block");
			$("nav").removeClass( "slideOutUp" ).removeClass( "animated" ).addClass( "slideInDown animated" );
		}
	});
	$( window ).resize(function() {
		if(window.matchMedia("(min-width: 768px)").matches) {
			$("nav").css("display","block");
			$("nav").removeClass( "slideInDown" ).removeClass( "slideOutUp" ).removeClass( "animated" );
		}else{
			$("nav").css("display","none");
		}
	});
	$("#events").click(function() {
	var heightevents = $("#list-events").height() + 2;
		if($("#list-events").hasClass("slideInDown") == true) {
			setTimeout(function(){
				$("#bloc-events").css("height","");
			}, 500);
			$("#events").removeClass( "eventsok" );
			$("#list-events").removeClass( "slideInDown" ).removeClass( "animated" ).addClass( "slideOutUp animated" );
		}else{
			$("#bloc-events").css("height",heightevents);
			$("#events").addClass( "eventsok" );
			$("#list-events").removeClass( "slideOutUp" ).removeClass( "animated" ).addClass( "slideInDown animated" );
		}
	});
    
    
    // NH : Nouveau
    
	$(".changement-iles").click(function() {
    var heightchangement = $(this).find(".changement").outerHeight();
	var heightiles = $(this).find(".liste-iles").height() + heightchangement;
		if($(this).find(".liste-iles").hasClass("slideInDown") == true) {
		}else{
            $(this).find(".liste-iles").css("position","absolute");
            $(this).find(".changement").css("border-radius","3px 3px 0 0");
			$(this).find(".liste-iles").removeClass( "slideOutUp" ).removeClass( "animated" ).addClass( "slideInDown animated" );
		}
	});
    
	$(".hemisphere").on("click", function(e) {
        if (e.originalEvent !== undefined){
            if($(this).is('.ile')){
                $(".ile").trigger('click');
            }else{
                $(".no-ile").trigger('click');
            }
        }else{
            //e.stopPropagation();
        }
	});
    
    // NH
    
	
	$(window).on('load', function() {
		$('.affichage-liste .fond img').each(function(){
			  var parentHeight = $(this).parent().parent().height();
			  var myHeight = $(this).height();
			  var diffHeight = ((parentHeight - myHeight) / 2);
			  $(this).css("margin-top", diffHeight);
			  $(this).parent().css("height", parentHeight);
		});
	});
	$(window).resize(function() {
		$('.affichage-liste .fond img').each(function(){
			  var parentHeight = $(this).parent().parent().height();
			  var myHeight = $(this).height();
			  var diffHeight = ((parentHeight - myHeight) / 2);
			  $(this).css("margin-top", diffHeight);
			  $(this).parent().css("height", parentHeight);
		});
	});
	
	$('#deroule1').click(function(){
		$("#deroule1bloc").slideToggle( "slow" );
		
		if($("#deroule1signe").hasClass("fa-minus") == true) {
			$("#deroule1signe").removeClass( "fa-minus" ).addClass( "fa-plus" );
		}else{
			$("#deroule1signe").removeClass( "fa-plus" ).addClass( "fa-minus" );
            if ($(this).parents('body').hasClass("evenements") == true) {
                var $grid = $('.content').isotope({
                    itemSelector: '.mosaique',
                    layoutMode: 'fitRows',
                    getSortData: {
                        name: '.name2',
                        place: '.place',
                        plus: '.price parseInt',
                        moins: '.price parseInt',
                        weight: function( itemElem ) {
                            var weight = $( itemElem ).find('.weight').text();
                            return parseFloat( weight.replace( /[\(\)]/g, '') );
                        }
                    }
                });
                $grid.isotope({
                    sortAscending: {
                        moins: true,
                        plus: false,
                        place: true,
                        name: true
                    }
                });
            }else{
                if ($(this).parents('body').hasClass("insectes") == true) {
                    onmasquelesokinsectes();
                }
                if ($(this).parents('body').hasClass("poissons") == true) {
                    onmasquelesokpoissons();
                }
                if ($(this).parents('body').hasClass("fondsmarins") == true) {
                    onmasquelesokfondsmarins();
                }
                if ($(this).parents('body').hasClass("all") == true) {
                    onmasquelesokinsectes();
                }
            }
		}		
		$('.affichage-liste .fond img').each(function(){
			  var parentHeight = $(this).parent().parent().height();
			  var myHeight = $(this).height();
			  var diffHeight = ((parentHeight - myHeight) / 2);
			  $(this).css("margin-top", diffHeight);
			  $(this).parent().css("height", parentHeight);
		});
	})
	$('#deroule2').click(function(){
		$("#deroule2bloc").slideToggle( "slow" );
		
		if($("#deroule2signe").hasClass("fa-minus") == true) {
			$("#deroule2signe").removeClass( "fa-minus" ).addClass( "fa-plus" );
		}else{
			$("#deroule2signe").removeClass( "fa-plus" ).addClass( "fa-minus" );
            if ($(this).parents('body').hasClass("evenements") == true) {
                var $grid = $('.content').isotope({
                    itemSelector: '.mosaique',
                    layoutMode: 'fitRows',
                    getSortData: {
                        name: '.name2',
                        place: '.place',
                        plus: '.price parseInt',
                        moins: '.price parseInt',
                        weight: function( itemElem ) {
                            var weight = $( itemElem ).find('.weight').text();
                            return parseFloat( weight.replace( /[\(\)]/g, '') );
                        }
                    }
                });
                $grid.isotope({
                    sortAscending: {
                        moins: true,
                        plus: false,
                        place: true,
                        name: true
                    }
                });
            }else{
                if ($(this).parents('body').hasClass("insectes") == true) {
                    onmasquelesokinsectesmois();
                }
                if ($(this).parents('body').hasClass("poissons") == true) {
                    onmasquelesokpoissonsmois();
                }
                if ($(this).parents('body').hasClass("fondsmarins") == true) {
                    onmasquelesokfondsmarinsmois();
                }
                if ($(this).parents('body').hasClass("all") == true) {
                    onmasquelesokpoissons();
                }
            }
		}		
		$('.affichage-liste .fond img').each(function(){
			  var parentHeight = $(this).parent().parent().height();
			  var myHeight = $(this).height();
			  var diffHeight = ((parentHeight - myHeight) / 2);
			  $(this).css("margin-top", diffHeight);
			  $(this).parent().css("height", parentHeight);
		});
	})
	$('#deroule3').click(function(){
		$("#deroule3bloc").slideToggle( "slow" );
		
		if($("#deroule3signe").hasClass("fa-minus") == true) {
			$("#deroule3signe").removeClass( "fa-minus" ).addClass( "fa-plus" );
		}else{
			$("#deroule3signe").removeClass( "fa-plus" ).addClass( "fa-minus" );
            if ($(this).parents('body').hasClass("evenements") == true) {
                var $grid = $('.content').isotope({
                    itemSelector: '.mosaique',
                    layoutMode: 'fitRows',
                    getSortData: {
                        name: '.name2',
                        place: '.place',
                        plus: '.price parseInt',
                        moins: '.price parseInt',
                        weight: function( itemElem ) {
                            var weight = $( itemElem ).find('.weight').text();
                            return parseFloat( weight.replace( /[\(\)]/g, '') );
                        }
                    }
                });
                $grid.isotope({
                    sortAscending: {
                        moins: true,
                        plus: false,
                        place: true,
                        name: true
                    }
                });
            }else{
                if ($(this).parents('body').hasClass("insectes") == true) {
                    onmasquelesokinsectesall();
                }
                if ($(this).parents('body').hasClass("poissons") == true) {
                    onmasquelesokpoissonsall();
                }
                if ($(this).parents('body').hasClass("fondsmarins") == true) {
                    onmasquelesokfondsmarinsall();
                }
                if ($(this).parents('body').hasClass("all") == true) {
                    onmasquelesokfondsmarins();
                }
            }
		}		
		$('.affichage-liste .fond img').each(function(){
			  var parentHeight = $(this).parent().parent().height();
			  var myHeight = $(this).height();
			  var diffHeight = ((parentHeight - myHeight) / 2);
			  $(this).css("margin-top", diffHeight);
			  $(this).parent().css("height", parentHeight);
		});
	})
	
	$('.ile').click(function(){
		$(".ileview").removeClass( "ileview" );
	})
	
	$('label').click(function(){
		var forid = $(this).attr("for").substring(0,3);
		var tabId = $(this).attr("for").split("-").pop();
		if($("#" + $(this).attr("for")).is(':checked')){
			if(tabId == "now"){
				$("#" + forid + "-month").prop('checked',false);
				$("#" + forid + "-all").prop('checked',false);
			}
			if(tabId == "month"){
				$("#" + forid + "-now").prop('checked',false);
				$("#" + forid + "-all").prop('checked',false);
			}
			if(tabId == "all"){
				$("#" + forid + "-now").prop('checked',false);
				$("#" + forid + "-month").prop('checked',false);
			}
		}else{
			if(tabId == "now"){
				$("#" + forid + "-month").prop('checked',true);
				$("#" + forid + "-all").prop('checked',true);
			}
			if(tabId == "month"){
				$("#" + forid + "-now").prop('checked',true);
				$("#" + forid + "-all").prop('checked',true);
			}
			if(tabId == "all"){
				$("#" + forid + "-now").prop('checked',true);
				$("#" + forid + "-month").prop('checked',true);
			}
		}
	}) 
	
	$('.btn_liste').click(function(){
		$('.content').removeClass("affichage-mosaique");
		$('.content').addClass("affichage-liste");
		$('#mosaique1').removeClass("btn_active");
		$('#mosaique2').removeClass("btn_active");
		$('#mosaique3').removeClass("btn_active");
		$('#liste1').addClass("btn_active");
		$('#liste2').addClass("btn_active");
		$('#liste3').addClass("btn_active");
		$('.fond img').each(function(){
			  var parentHeight = $(this).parent().parent().height();
			  var myHeight = $(this).height();
			  var diffHeight = ((parentHeight - myHeight) / 2);
			  $(this).css("margin-top", diffHeight);
			  $(this).parent().css("height", parentHeight);
		});
        if ($(this).parents('body').hasClass("evenements") == true) {
            var $grid = $('.content').isotope({
                itemSelector: '.mosaique',
                layoutMode: 'fitRows',
                getSortData: {
                    name: '.name2',
                    place: '.place',
                    plus: '.price parseInt',
                    moins: '.price parseInt',
                    weight: function( itemElem ) {
                        var weight = $( itemElem ).find('.weight').text();
                        return parseFloat( weight.replace( /[\(\)]/g, '') );
                    }
                }
            });
            $grid.isotope({
                sortAscending: {
                    moins: true,
                    plus: false,
                    place: true,
                    name: true
                }
            });
        }else{
            if ($(this).parents('body').hasClass("insectes") == true) {
                onmasquelesokinsectes();
                onmasquelesokinsectesmois();
                onmasquelesokinsectesall();
            }
            if ($(this).parents('body').hasClass("poissons") == true) {
                onmasquelesokpoissons();
                onmasquelesokpoissonsmois();
                onmasquelesokpoissonsall();
            }
            if ($(this).parents('body').hasClass("fondsmarins") == true) {
                onmasquelesokfondsmarins();
                onmasquelesokfondsmarinsmois();
                onmasquelesokfondsmarinsall();
            }
            if ($(this).parents('body').hasClass("all") == true) {
                onmasquelesokinsectes();
                onmasquelesokpoissons();
                onmasquelesokfondsmarins();
            }
        }
	}) 
	
	$('.btn_mosaique').click(function(){
		$('.content').removeClass("affichage-liste");
		$('.content').addClass("affichage-mosaique");
		$('#liste1').removeClass("btn_active");
		$('#liste2').removeClass("btn_active");
		$('#liste3').removeClass("btn_active");
		$('#mosaique1').addClass("btn_active");
		$('#mosaique2').addClass("btn_active");
		$('#mosaique3').addClass("btn_active");
		$('.fond img').each(function(){
			  $(this).css("margin-top", "");
			  $(this).parent().css("height", "");
		});
        if ($(this).parents('body').hasClass("evenements") == true) {
            var $grid = $('.content').isotope({
                itemSelector: '.mosaique',
                layoutMode: 'fitRows',
                getSortData: {
                    name: '.name2',
                    place: '.place',
                    plus: '.price parseInt',
                    moins: '.price parseInt',
                    weight: function( itemElem ) {
                        var weight = $( itemElem ).find('.weight').text();
                        return parseFloat( weight.replace( /[\(\)]/g, '') );
                    }
                }
            });
            $grid.isotope({
                sortAscending: {
                    moins: true,
                    plus: false,
                    place: true,
                    name: true
                }
            });
        }else{
            if ($(this).parents('body').hasClass("insectes") == true) {
                onmasquelesokinsectes();
                onmasquelesokinsectesmois();
                onmasquelesokinsectesall();
            }
            if ($(this).parents('body').hasClass("poissons") == true) {
                onmasquelesokpoissons();
                onmasquelesokpoissonsmois();
                onmasquelesokpoissonsall();
            }
            if ($(this).parents('body').hasClass("fondsmarins") == true) {
                onmasquelesokfondsmarins();
                onmasquelesokfondsmarinsmois();
                onmasquelesokfondsmarinsall();
            }
            if ($(this).parents('body').hasClass("all") == true) {
                onmasquelesokinsectes();
                onmasquelesokpoissons();
                onmasquelesokfondsmarins();
            }
        }
	})
	
	$('html').addClass('no-touch');
	var ua = navigator.userAgent.toLowerCase();
	function removeSpaces(ua) {
		return ua.split(' ').join('');
	}
	ua = removeSpaces(ua);
	var iOS = ua.match(/(iphone|ipod|ipad)/);
	if(iOS) {
		$('html').removeClass('no-touch');
	}
	var iPad = ua.match(/(ipad)/);
	if(iPad) {
		$('html').removeClass('no-touch');
	}
	var iPhone = ua.match(/(iphone|ipod)/);
	if(iPhone) {
		$('html').removeClass('no-touch');
	}
	var android = ua.indexOf("android") > -1; 
	if(android) {
		$('html').removeClass('no-touch');
	}
	var android4 = ua.indexOf("android4") > -1; 
	if(android4) {
		$('html').removeClass('no-touch');
	}
	var android2 = ua.indexOf("android2") > -1; 
	if(android2) {
		$('html').removeClass('no-touch');
	}
	
	var isSamsungBrowser = navigator.userAgent.match(/SamsungBrowser/i)
	if(isSamsungBrowser == "SamsungBrowser"){
		$('html').addClass('samsungbrowser');
	}
	
	$(".zonetotale").unbind().click(function(){
		var idprecheck = $(this).attr("for").split('-');;
		var idcheck = idprecheck[1];
		if ($(this).parents('.checkyes-village').length > 0) {
			$(this).parents('.mosaique').removeClass("checkyes-village");
			$(this).parents('.mosaique').addClass("checkno-village");
		}else{
			if ($(this).parents('.checkno-village').length > 0) {
				$(this).parents('.mosaique').removeClass("checkno-village");
				$(this).parents('.mosaique').addClass("checkyes-village");
			}
		}
		if ($(this).parents('.checkyes-ile').length > 0) {
			$(this).parents('.mosaique').removeClass("checkyes-ile");
			$(this).parents('.mosaique').addClass("checkno-ile");
		}else{
			if ($(this).parents('.checkno-ile').length > 0) {
				$(this).parents('.mosaique').removeClass("checkno-ile");
				$(this).parents('.mosaique').addClass("checkyes-ile");
			}
		}
		$("#checkbox-" + idcheck).unbind().click(function(){
			if($(this).is(":checked")){
				$("#checkboxbis-" + idcheck).prop('checked', true);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxmois-" + idcheck).prop('checked', true);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxmoisbis-" + idcheck).prop('checked', true);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxtotal-" + idcheck).prop('checked', true);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxtotalbis-" + idcheck).prop('checked', true);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}else{
				$("#checkboxbis-" + idcheck).prop('checked', false);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxmois-" + idcheck).prop('checked', false);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxmoisbis-" + idcheck).prop('checked', false);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxtotal-" + idcheck).prop('checked', false);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxtotalbis-" + idcheck).prop('checked', false);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}
		})
		$("#checkboxbis-" + idcheck).unbind().click(function(){
			if($(this).is(":checked")){
				$("#checkbox-" + idcheck).prop('checked', true);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxmois-" + idcheck).prop('checked', true);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxmoisbis-" + idcheck).prop('checked', true);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxtotal-" + idcheck).prop('checked', true);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxtotalbis-" + idcheck).prop('checked', true);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}else{
				$("#checkbox-" + idcheck).prop('checked', false);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxmois-" + idcheck).prop('checked', false);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxmoisbis-" + idcheck).prop('checked', false);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxtotal-" + idcheck).prop('checked', false);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxtotalbis-" + idcheck).prop('checked', false);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}
		})
		
		$("#checkboxmois-" + idcheck).unbind().click(function(){
			if($(this).is(":checked")){
				$("#checkbox-" + idcheck).prop('checked', true);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxbis-" + idcheck).prop('checked', true);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxmoisbis-" + idcheck).prop('checked', true);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxtotal-" + idcheck).prop('checked', true);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxtotalbis-" + idcheck).prop('checked', true);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}else{
				$("#checkbox-" + idcheck).prop('checked', false);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxbis-" + idcheck).prop('checked', false);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxmoisbis-" + idcheck).prop('checked', false);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxtotal-" + idcheck).prop('checked', false);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxtotalbis-" + idcheck).prop('checked', false);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}
		})
		
		$("#checkboxmoisbis-" + idcheck).unbind().click(function(){
			if($(this).is(":checked")){
				$("#checkbox-" + idcheck).prop('checked', true);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxbis-" + idcheck).prop('checked', true);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxmois-" + idcheck).prop('checked', true);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxtotal-" + idcheck).prop('checked', true);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxtotalbis-" + idcheck).prop('checked', true);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}else{
				$("#checkbox-" + idcheck).prop('checked', false);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxbis-" + idcheck).prop('checked', false);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxmois-" + idcheck).prop('checked', false);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxtotal-" + idcheck).prop('checked', false);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxtotalbis-" + idcheck).prop('checked', false);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}
		})
		
		$("#checkboxtotal-" + idcheck).unbind().click(function(){
			if($(this).is(":checked")){
				$("#checkbox-" + idcheck).prop('checked', true);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxbis-" + idcheck).prop('checked', true);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxmois-" + idcheck).prop('checked', true);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxmoisbis-" + idcheck).prop('checked', true);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxtotalbis-" + idcheck).prop('checked', true);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}else{
				$("#checkbox-" + idcheck).prop('checked', false);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxbis-" + idcheck).prop('checked', false);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxmois-" + idcheck).prop('checked', false);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxmoisbis-" + idcheck).prop('checked', false);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxtotalbis-" + idcheck).prop('checked', false);
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxtotalbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}
		})
		
		$("#checkboxtotalbis-" + idcheck).unbind().click(function(){
			if($(this).is(":checked")){
				$("#checkbox-" + idcheck).prop('checked', true);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxbis-" + idcheck).prop('checked', true);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxmois-" + idcheck).prop('checked', true);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				$("#checkboxmoisbis-" + idcheck).prop('checked', true);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkno-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkyes-ile");
				$("#checkboxtotal-" + idcheck).prop('checked', true);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkno-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkyes-village");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}else{
				$("#checkbox-" + idcheck).prop('checked', false);
				$("#checkbox-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkbox-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxbis-" + idcheck).prop('checked', false);
				$("#checkboxbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxmois-" + idcheck).prop('checked', false);
				$("#checkboxmois-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxmois-" + idcheck).parents('.mosaique').addClass("checkno-village");
				$("#checkboxmoisbis-" + idcheck).prop('checked', false);
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').removeClass("checkyes-ile");
				$("#checkboxmoisbis-" + idcheck).parents('.mosaique').addClass("checkno-ile");
				$("#checkboxtotal-" + idcheck).prop('checked', false);
				$("#checkboxtotal-" + idcheck).parents('.mosaique').removeClass("checkyes-village");
				$("#checkboxtotal-" + idcheck).parents('.mosaique').addClass("checkno-village");
				if ($(this).parents('body').hasClass("insectes") == true) {
					onmasquelesokinsectes();
					onmasquelesokinsectesmois();
					onmasquelesokinsectesall();
				}
				if ($(this).parents('body').hasClass("poissons") == true) {
					onmasquelesokpoissons();
					onmasquelesokpoissonsmois();
					onmasquelesokpoissonsall();
				}
				if ($(this).parents('body').hasClass("fondsmarins") == true) {
					onmasquelesokfondsmarins();
					onmasquelesokfondsmarinsmois();
					onmasquelesokfondsmarinsall();
				}
				if ($(this).parents('body').hasClass("all") == true) {
					onmasquelesokinsectes();
					onmasquelesokpoissons();
					onmasquelesokfondsmarins();
				}
			}
		})
	})
	
});
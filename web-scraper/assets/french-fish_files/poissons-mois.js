var onmasquelesokpoissonsactionmois;

$(document).ready(function() {
	
    // ON SUPPRIME LES ACCENTS
    
	String.prototype.removeAccents = function() {
	  return this
		.toLowerCase()
		.replace(/[áàãâä]/gi, "a")
		.replace(/[éèëê]/gi, "e")
		.replace(/[íìïî]/gi, "i")
		.replace(/[óòöôõø]/gi, "o")
		.replace(/[úùüû]/gi, "u")
		.replace(/[ç]/gi, "c")
		.replace(/[ñ]/gi, "n");
	}
    
    // ON REINITIALISE LA BARRE DE RECHERCHE AU CHARGEMENT
	
	if($('#searchpoissons2').val() != ""){
		$('#searchpoissons2').val("")
	}
    
    // ON INITIALISE ISOTOPE

    var $grid = $('.content-poissons-mois').isotope({
        itemSelector: '.mosaique',
        layoutMode: 'fitRows',
        getSortData: {
            name: function(itemElem) { // function
			  return String($(itemElem).find('.name2').text()).removeAccents();
			},
            place: '.place',
            plus: '.price parseInt',
            moins: '.price parseInt',
            weight: function(itemElem) {
                var weight = $(itemElem).find('.weight').text();
                return parseFloat(weight.replace(/[\(\)]/g, ''));
            }
        }
    });

    $('.content-poissons-mois').isotope({
        sortAscending: {
            moins: true,
            plus: false,
            place: true,
            name: true
        }
    });
    
    // FONCTION RECHERCHE

    var qsRegex;

    var $quicksearch = $('#searchpoissons2').keyup(debounce(function() {
        onmasquelesokpoissonsmois();
    }, 200));
	
	function recherche(){
        var sortValue = $('#filter-poissons-mois').find('.is-checked').attr('data-sort-value');
        qsRegex = new RegExp($('#searchpoissons2').val(), 'gi');
        $('.content-poissons-mois').isotope({
            sortBy: sortValue,
            filter: function() {
                var searchResult = qsRegex ? $(this).text().match(qsRegex) : true;
                var buttonResult = buttonFilter ? $(this).is(buttonFilter) : true;
                return buttonResult && searchResult;
            },
        })		
	updateFilterCount();
	}

    function debounce(fn, threshold) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
            clearTimeout(timeout);
            var args = arguments;
            var _this = this;

            function delayed() {
                fn.apply(_this, args);
            }
            timeout = setTimeout(delayed, threshold);
        };
    }
    
    if($('#searchpoissons2').val() != ""){
		$('#closepoissons2').css("display","block");
		$('#closepoissons2bis').css("display","none");
	}else{
		$('#closepoissons2').css("display","none");
		$('#closepoissons2bis').css("display","block");
	}
	$('#searchpoissons2').keyup(function() {
		if($('#searchpoissons2').val() != ""){
			$('#closepoissons2').css("display","block");
			$('#closepoissons2bis').css("display","none");
		}else{
			$('#closepoissons2').css("display","none");
			$('#closepoissons2bis').css("display","block");
		}
	});
	$('#closepoissons2').click(function() {
		$('#searchpoissons2').val("");
		$('#closepoissons2').css("display","none");
		$('#closepoissons2bis').css("display","block");
		debounce(recherche());
		updateFilterCount();
    });
    
    // ON ACTIVE L'OEIL
    
	$('#filter-poissons-mois').on('click', '#filtrecheckpoissons-mois', function() {
        if ($("#filtrecheckpoissons-mois").hasClass("activation") == true) {
            $(this).removeClass('is-oeil');
            $(this).removeClass('activation');
        }else{
            $(this).addClass('is-oeil');
            $(this).addClass('activation');
        }
    });
    
    // ON ACTIVE VISUELLEMENT LE TRI
    
	$('#filter-poissons-mois').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            if ($(this).attr('data-pers') != 'localisation-filter') {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
            }
            if (($(this).attr('data-filter') != '.checkyes') && ($(this).attr('data-pers') != 'localisation-filter')) {
                $(this).addClass('is-checked');
            }
            var newbutton = $buttonGroup.find('.is-checked').attr('data-sort-value');
            $('.' + newbutton + '-filter-poissons-mois').addClass('is-checked');
        });
    });
    
    $('#filter-poissons-mois .ile').click(function() {
        $("#filter-poissons-mois .ile").css("display", "none");
        $("#filter-poissons-mois .no-ile").css("display", "block");
        $("#filter-poissons-mois .choice-filter").css("display", "none");
        $("#filter-poissons-mois .no-choice-filter").css("display", "block");
		$('#filtrecheckpoissons-mois').attr('data-filter2','.select-ile');
    });

    $('#filter-poissons-mois .no-ile').click(function() {
        $("#filter-poissons-mois .no-ile").css("display", "none");
        $("#filter-poissons-mois .ile").css("display", "block");
        $("#filter-poissons-mois .no-choice-filter").css("display", "none");
        $("#filter-poissons-mois .choice-filter").css("display", "block");
        $("#filter-poissons-mois .ile").removeClass('is-checked');
		$('#filtrecheckpoissons-mois').attr('data-filter2','.select-village');
    });
    
    $('#filter-poissons-mois .ile').click(function() {
        $("#filter-poissons-mois .ile").addClass('is-checked2');
        $("#filter-poissons-mois .no-ile").removeClass('is-checked2');
    });
    $('#filter-poissons-mois .no-ile').click(function() {
        $("#filter-poissons-mois .no-ile").addClass('is-checked2');
        $("#filter-poissons-mois .ile").removeClass('is-checked2');
    });
    
    // TRI

    $('#filter-poissons-mois').on('click', 'button', function() {
        onmasquelesokpoissonsmois();        
    });

    // MISE A JOUR DU COMPTEUR
    
    var iso = $grid.data('isotope');
	function updateFilterCount() {
		var nombreencours = iso.filteredItems.length;
		if(nombreencours == 0){
			if(($("#c2messagepoissons").css("display") == "block") || ($("#c2messagepoissonsbis").css("display") == "block")){
				$("#c2messagepoissonsmaj").css("display","none");
			}else{
				$("#c2messagepoissonsmaj").css("display","block");	
			}
		}else{
			$("#c2messagepoissonsmaj").css("display","none");
		}
	}
	updateFilterCount();
    
    // FONCTION FILTRES
	
	onmasquelesokpoissonsactionmois = function(){
		var filters = [];
		
		if ($("#filtrecheckpoissons-mois").hasClass("activation") == true) {
			var filterValue2 = $("#filtrecheckpoissons-mois").attr('data-filter2');
			if(filterValue2 == ".select-village"){
				var filterValue = ".checkno-village";
			}
			if(filterValue2 == ".select-ile"){
				var filterValue = ".checkno-ile";
			}
		}else{
			var filterValue2 = $("#filtrecheckpoissons-mois").attr('data-filter2');
			if(filterValue2 == ".select-village"){
				var filterValue = ".select-village";
			}
			if(filterValue2 == ".select-ile"){
				var filterValue = ".select-ile";
			}
		}
		filters.push(filterValue);
		filters = filters.join('');
		buttonFilter = filters;
		debounce(recherche());
		updateFilterCount();
	}
    
});
	
function onmasquelesokpoissonsmois() {
	onmasquelesokpoissonsactionmois();
}
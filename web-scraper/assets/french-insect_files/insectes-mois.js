var onmasquelesokinsectesactionmois;

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
	
	if($('#searchinsectes2').val() != ""){
		$('#searchinsectes2').val("")
	}
    
    // ON INITIALISE ISOTOPE

    var $grid = $('.content-insectes-mois').isotope({
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

    $('.content-insectes-mois').isotope({
        sortAscending: {
            moins: true,
            plus: false,
            place: true,
            name: true
        }
    });
    
    // FONCTION RECHERCHE

    var qsRegex;

    var $quicksearch = $('#searchinsectes2').keyup(debounce(function() {
        onmasquelesokinsectesmois();
    }, 200));
	
	function recherche(){
        var sortValue = $('#filter-insectes-mois').find('.is-checked').attr('data-sort-value');
        qsRegex = new RegExp($('#searchinsectes2').val(), 'gi');
        $('.content-insectes-mois').isotope({
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
    
    if($('#searchinsectes2').val() != ""){
		$('#closeinsectes2').css("display","block");
		$('#closeinsectes2bis').css("display","none");
	}else{
		$('#closeinsectes2').css("display","none");
		$('#closeinsectes2bis').css("display","block");
	}
	$('#searchinsectes2').keyup(function() {
		if($('#searchinsectes2').val() != ""){
			$('#closeinsectes2').css("display","block");
			$('#closeinsectes2bis').css("display","none");
		}else{
			$('#closeinsectes2').css("display","none");
			$('#closeinsectes2bis').css("display","block");
		}
	});
	$('#closeinsectes2').click(function() {
		$('#searchinsectes2').val("");
		$('#closeinsectes2').css("display","none");
		$('#closeinsectes2bis').css("display","block");
		debounce(recherche());
		updateFilterCount();
    });
    
    // ON ACTIVE L'OEIL
    
	$('#filter-insectes-mois').on('click', '#filtrecheckinsectes-mois', function() {
        if ($("#filtrecheckinsectes-mois").hasClass("activation") == true) {
            $(this).removeClass('is-oeil');
            $(this).removeClass('activation');
        }else{
            $(this).addClass('is-oeil');
            $(this).addClass('activation');
        }
    });
    
    // ON ACTIVE VISUELLEMENT LE TRI
    
	$('#filter-insectes-mois').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            if ($(this).attr('data-pers') != 'localisation-filter') {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
            }
            if (($(this).attr('data-filter') != '.checkyes') && ($(this).attr('data-pers') != 'localisation-filter')) {
                $(this).addClass('is-checked');
            }
            var newbutton = $buttonGroup.find('.is-checked').attr('data-sort-value');
            $('.' + newbutton + '-filter-insectes-mois').addClass('is-checked');
        });
    });
    
    $('#filter-insectes-mois .ile').click(function() {
        $("#filter-insectes-mois .ile").css("display", "none");
        $("#filter-insectes-mois .no-ile").css("display", "block");
        $("#filter-insectes-mois .choice-filter").css("display", "none");
        $("#filter-insectes-mois .no-choice-filter").css("display", "block");
		$('#filtrecheckinsectes-mois').attr('data-filter2','.select-ile');
    });

    $('#filter-insectes-mois .no-ile').click(function() {
        $("#filter-insectes-mois .no-ile").css("display", "none");
        $("#filter-insectes-mois .ile").css("display", "block");
        $("#filter-insectes-mois .no-choice-filter").css("display", "none");
        $("#filter-insectes-mois .choice-filter").css("display", "block");
        $("#filter-insectes-mois .ile").removeClass('is-checked');
		$('#filtrecheckinsectes-mois').attr('data-filter2','.select-village');
    });
    
    $('#filter-insectes-mois .ile').click(function() {
        $("#filter-insectes-mois .ile").addClass('is-checked2');
        $("#filter-insectes-mois .no-ile").removeClass('is-checked2');
    });
    $('#filter-insectes-mois .no-ile').click(function() {
        $("#filter-insectes-mois .no-ile").addClass('is-checked2');
        $("#filter-insectes-mois .ile").removeClass('is-checked2');
    });
    
    // TRI

    $('#filter-insectes-mois').on('click', 'button', function() {
        onmasquelesokinsectesmois();        
    });

    // MISE A JOUR DU COMPTEUR
    
    var iso = $grid.data('isotope');
	function updateFilterCount() {
		var nombreencours = iso.filteredItems.length;
		if(nombreencours == 0){
			if(($("#c2messageinsectes").css("display") == "block") || ($("#c2messageinsectesbis").css("display") == "block")){
				$("#c2messageinsectesmaj").css("display","none");
			}else{
				$("#c2messageinsectesmaj").css("display","block");	
			}
		}else{
			$("#c2messageinsectesmaj").css("display","none");
		}
	}
	updateFilterCount();
    
    // FONCTION FILTRES
	
	onmasquelesokinsectesactionmois = function(){
		var filters = [];
		
		if ($("#filtrecheckinsectes-mois").hasClass("activation") == true) {
			var filterValue2 = $("#filtrecheckinsectes-mois").attr('data-filter2');
			if(filterValue2 == ".select-village"){
				var filterValue = ".checkno-village";
			}
			if(filterValue2 == ".select-ile"){
				var filterValue = ".checkno-ile";
			}
		}else{
			var filterValue2 = $("#filtrecheckinsectes-mois").attr('data-filter2');
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
	
function onmasquelesokinsectesmois() {
	onmasquelesokinsectesactionmois();
}
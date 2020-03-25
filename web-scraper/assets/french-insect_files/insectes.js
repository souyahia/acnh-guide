var onmasquelesokinsectesaction;

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
	
	if($('#searchinsectes1').val() != ""){
		$('#searchinsectes1').val("")
	}
    
    // ON INITIALISE ISOTOPE

    var $grid = $('.content-insectes').isotope({
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

    $('.content-insectes').isotope({
        sortAscending: {
            moins: true,
            plus: false,
            place: true,
            name: true
        }
    });
    
    // FONCTION RECHERCHE

    var qsRegex;

    var $quicksearch = $('#searchinsectes1').keyup(debounce(function() {
        onmasquelesokinsectes();
    }, 200));
	
	function recherche(){
        var sortValue = $('#filter-insectes').find('.is-checked').attr('data-sort-value');
        qsRegex = new RegExp($('#searchinsectes1').val(), 'gi');
        $('.content-insectes').isotope({
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
    
    if($('#searchinsectes1').val() != ""){
		$('#closeinsectes1').css("display","block");
		$('#closeinsectes1bis').css("display","none");
	}else{
		$('#closeinsectes1').css("display","none");
		$('#closeinsectes1bis').css("display","block");
	}
	$('#searchinsectes1').keyup(function() {
		if($('#searchinsectes1').val() != ""){
			$('#closeinsectes1').css("display","block");
			$('#closeinsectes1bis').css("display","none");
		}else{
			$('#closeinsectes1').css("display","none");
			$('#closeinsectes1bis').css("display","block");
		}
	});
	$('#closeinsectes1').click(function() {
		$('#searchinsectes1').val("");
		$('#closeinsectes1').css("display","none");
		$('#closeinsectes1bis').css("display","block");
		debounce(recherche());
		updateFilterCount();
    });
    
    // ON ACTIVE L'OEIL
    
	$('#filter-insectes').on('click', '#filtrecheckinsectes', function() {
        if ($("#filtrecheckinsectes").hasClass("activation") == true) {
            $(this).removeClass('is-oeil');
            $(this).removeClass('activation');
        }else{
            $(this).addClass('is-oeil');
            $(this).addClass('activation');
        }
    });
    
    // ON ACTIVE VISUELLEMENT LE TRI
    
	$('#filter-insectes').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            if ($(this).attr('data-pers') != 'localisation-filter') {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
            }
            if (($(this).attr('data-filter') != '.checkyes') && ($(this).attr('data-pers') != 'localisation-filter')) {
                $(this).addClass('is-checked');
            }
            var newbutton = $buttonGroup.find('.is-checked').attr('data-sort-value');
            $('.' + newbutton + '-filter-insectes').addClass('is-checked');
        });
    });
    
    $('#filter-insectes .ile').click(function() {
        $("#filter-insectes .ile").css("display", "none");
        $("#filter-insectes .no-ile").css("display", "block");
        $("#filter-insectes .choice-filter").css("display", "none");
        $("#filter-insectes .no-choice-filter").css("display", "block");
		$('#filtrecheckinsectes').attr('data-filter2','.select-ile');
    });

    $('#filter-insectes .no-ile').click(function() {
        $("#filter-insectes .no-ile").css("display", "none");
        $("#filter-insectes .ile").css("display", "block");
        $("#filter-insectes .no-choice-filter").css("display", "none");
        $("#filter-insectes .choice-filter").css("display", "block");
        $("#filter-insectes .ile").removeClass('is-checked');
		$('#filtrecheckinsectes').attr('data-filter2','.select-village');
    });
    
    $('#filter-insectes .ile').click(function() {
        $("#filter-insectes .ile").addClass('is-checked2');
        $("#filter-insectes .no-ile").removeClass('is-checked2');
    });
    $('#filter-insectes .no-ile').click(function() {
        $("#filter-insectes .no-ile").addClass('is-checked2');
        $("#filter-insectes .ile").removeClass('is-checked2');
    });
    
    // TRI

    $('#filter-insectes').on('click', 'button', function() {
        onmasquelesokinsectes();        
    });

    // MISE A JOUR DU COMPTEUR
    
    var iso = $grid.data('isotope');
	function updateFilterCount() {
		var nombreencours = iso.filteredItems.length;
		if(nombreencours == 0){
			if(($("#c1messageinsectes").css("display") == "block") || ($("#c1messageinsectesbis").css("display") == "block")){
				$("#c1messageinsectesmaj").css("display","none");
			}else{
				$("#c1messageinsectesmaj").css("display","block");	
			}
		}else{
			$("#c1messageinsectesmaj").css("display","none");
		}
	}
	updateFilterCount();
    
    // FONCTION FILTRES
	
	onmasquelesokinsectesaction = function(){
		var filters = [];
		
		if ($("#filtrecheckinsectes").hasClass("activation") == true) {
			var filterValue2 = $("#filtrecheckinsectes").attr('data-filter2');
			if(filterValue2 == ".select-village"){
				var filterValue = ".checkno-village";
			}
			if(filterValue2 == ".select-ile"){
				var filterValue = ".checkno-ile";
			}
		}else{
			var filterValue2 = $("#filtrecheckinsectes").attr('data-filter2');
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
	
function onmasquelesokinsectes() {
	onmasquelesokinsectesaction();
}
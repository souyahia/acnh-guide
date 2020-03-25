var onmasquelesokpoissonsaction;

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
	
	if($('#searchpoissons1').val() != ""){
		$('#searchpoissons1').val("")
	}
    
    // ON INITIALISE ISOTOPE

    var $grid = $('.content-poissons').isotope({
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

    $('.content-poissons').isotope({
        sortAscending: {
            moins: true,
            plus: false,
            place: true,
            name: true
        }
    });
    
    // FONCTION RECHERCHE

    var qsRegex;

    var $quicksearch = $('#searchpoissons1').keyup(debounce(function() {
		onmasquelesokpoissons();
    }, 200));
	
	function recherche(){
        var sortValue = $('#filter-poissons').find('.is-checked').attr('data-sort-value');
        qsRegex = new RegExp($('#searchpoissons1').val(), 'gi');
        $('.content-poissons').isotope({
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
    
    if($('#searchpoissons1').val() != ""){
		$('#closepoissons1').css("display","block");
		$('#closepoissons1bis').css("display","none");
	}else{
		$('#closepoissons1').css("display","none");
		$('#closepoissons1bis').css("display","block");
	}
	$('#searchpoissons1').keyup(function() {
		if($('#searchpoissons1').val() != ""){
			$('#closepoissons1').css("display","block");
			$('#closepoissons1bis').css("display","none");
		}else{
			$('#closepoissons1').css("display","none");
			$('#closepoissons1bis').css("display","block");
		}
	});
	$('#closepoissons1').click(function() {
		$('#searchpoissons1').val("");
		$('#closepoissons1').css("display","none");
		$('#closepoissons1bis').css("display","block");
		debounce(recherche());
		updateFilterCount();
    });
    
    // ON ACTIVE L'OEIL
    
	$('#filter-poissons').on('click', '#filtrecheckpoissons', function() {
        if ($("#filtrecheckpoissons").hasClass("activation") == true) {
            $(this).removeClass('is-oeil');
            $(this).removeClass('activation');
        }else{
            $(this).addClass('is-oeil');
            $(this).addClass('activation');
        }
    });
    
    // ON ACTIVE VISUELLEMENT LE TRI
    
	$('#filter-poissons').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            if ($(this).attr('data-pers') != 'localisation-filter') {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
            }
            if (($(this).attr('data-filter') != '.checkyes') && ($(this).attr('data-pers') != 'localisation-filter')) {
                $(this).addClass('is-checked');
            }
            var newbutton = $buttonGroup.find('.is-checked').attr('data-sort-value');
            $('.' + newbutton + '-filter-poissons').addClass('is-checked');
        });
    });
    
    $('#filter-poissons .ile').click(function() {
        $("#filter-poissons .ile").css("display", "none");
        $("#filter-poissons .no-ile").css("display", "block");
        $("#filter-poissons .choice-filter").css("display", "none");
        $("#filter-poissons .no-choice-filter").css("display", "block");
		$('#filtrecheckpoissons').attr('data-filter2','.select-ile');
    });

    $('#filter-poissons .no-ile').click(function() {
        $("#filter-poissons .no-ile").css("display", "none");
        $("#filter-poissons .ile").css("display", "block");
        $("#filter-poissons .no-choice-filter").css("display", "none");
        $("#filter-poissons .choice-filter").css("display", "block");
        $("#filter-poissons .ile").removeClass('is-checked');
		$('#filtrecheckpoissons').attr('data-filter2','.select-village');
    });
    
    $('#filter-poissons .ile').click(function() {
        $("#filter-poissons .ile").addClass('is-checked2');
        $("#filter-poissons .no-ile").removeClass('is-checked2');
    });
    $('#filter-poissons .no-ile').click(function() {
        $("#filter-poissons .no-ile").addClass('is-checked2');
        $("#filter-poissons .ile").removeClass('is-checked2');
    });
    
    // TRI

    $('#filter-poissons').on('click', 'button', function() {
        onmasquelesokpoissons();        
    });

    // MISE A JOUR DU COMPTEUR
    
    var iso = $grid.data('isotope');
	function updateFilterCount() {
		var nombreencours = iso.filteredItems.length;
		if(nombreencours == 0){
			if(($("#c1messagepoissons").css("display") == "block") || ($("#c1messagepoissonsbis").css("display") == "block")){
				$("#c1messagepoissonsmaj").css("display","none");
			}else{
				$("#c1messagepoissonsmaj").css("display","block");	
			}
		}else{
			$("#c1messagepoissonsmaj").css("display","none");
		}
	}
	updateFilterCount();
    
    // FONCTION FILTRES
	
	onmasquelesokpoissonsaction = function(){
		var filters = [];
		
		if ($("#filtrecheckpoissons").hasClass("activation") == true) {
			var filterValue2 = $("#filtrecheckpoissons").attr('data-filter2');
			if(filterValue2 == ".select-village"){
				var filterValue = ".checkno-village";
			}
			if(filterValue2 == ".select-ile"){
				var filterValue = ".checkno-ile";
			}
		}else{
			var filterValue2 = $("#filtrecheckpoissons").attr('data-filter2');
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
	
function onmasquelesokpoissons() {
	onmasquelesokpoissonsaction();
}
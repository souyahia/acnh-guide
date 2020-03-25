var onmasquelesokpoissonsactionall;

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
	
	if($('#searchpoissons3').val() != ""){
		$('#searchpoissons3').val("")
	}
    
    // ON INITIALISE ISOTOPE

    var $grid = $('.content-poissons-all').isotope({
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

    $('.content-poissons-all').isotope({
        sortAscending: {
            moins: true,
            plus: false,
            place: true,
            name: true
        }
    });
    
    // FONCTION RECHERCHE

    var qsRegex;

    var $quicksearch = $('#searchpoissons3').keyup(debounce(function() {
        onmasquelesokpoissonsall();
    }, 200));
	
	function recherche(){
        var sortValue = $('#filter-poissons-all').find('.is-checked').attr('data-sort-value');
        qsRegex = new RegExp($('#searchpoissons3').val(), 'gi');
        $('.content-poissons-all').isotope({
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
    
    if($('#searchpoissons3').val() != ""){
		$('#closepoissons3').css("display","block");
		$('#closepoissons3bis').css("display","none");
	}else{
		$('#closepoissons3').css("display","none");
		$('#closepoissons3bis').css("display","block");
	}
	$('#searchpoissons3').keyup(function() {
		if($('#searchpoissons3').val() != ""){
			$('#closepoissons3').css("display","block");
			$('#closepoissons3bis').css("display","none");
		}else{
			$('#closepoissons3').css("display","none");
			$('#closepoissons3bis').css("display","block");
		}
	});
	$('#closepoissons3').click(function() {
		$('#searchpoissons3').val("");
		$('#closepoissons3').css("display","none");
		$('#closepoissons3bis').css("display","block");
		debounce(recherche());
		updateFilterCount();
    });
    
    // ON ACTIVE L'OEIL
    
	$('#filter-poissons-all').on('click', '#filtrecheckpoissons-all', function() {
        if ($("#filtrecheckpoissons-all").hasClass("activation") == true) {
            $(this).removeClass('is-oeil');
            $(this).removeClass('activation');
        }else{
            $(this).addClass('is-oeil');
            $(this).addClass('activation');
        }
    });
    
    // ON ACTIVE VISUELLEMENT LE TRI
    
	$('#filter-poissons-all').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            if ($(this).attr('data-pers') != 'localisation-filter') {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
            }
            if (($(this).attr('data-filter') != '.checkyes') && ($(this).attr('data-pers') != 'localisation-filter')) {
                $(this).addClass('is-checked');
            }
            var newbutton = $buttonGroup.find('.is-checked').attr('data-sort-value');
            $('.' + newbutton + '-filter-poissons-all').addClass('is-checked');
        });
    });
    
    $('#filter-poissons-all .ile').click(function() {
        $("#filter-poissons-all .ile").css("display", "none");
        $("#filter-poissons-all .no-ile").css("display", "block");
        $("#filter-poissons-all .choice-filter").css("display", "none");
        $("#filter-poissons-all .no-choice-filter").css("display", "block");
		$('#filtrecheckpoissons-all').attr('data-filter2','.select-ile');
    });

    $('#filter-poissons-all .no-ile').click(function() {
        $("#filter-poissons-all .no-ile").css("display", "none");
        $("#filter-poissons-all .ile").css("display", "block");
        $("#filter-poissons-all .no-choice-filter").css("display", "none");
        $("#filter-poissons-all .choice-filter").css("display", "block");
        $("#filter-poissons-all .ile").removeClass('is-checked');
		$('#filtrecheckpoissons-all').attr('data-filter2','.select-village');
    });
    
    $('#filter-poissons-all .ile').click(function() {
        $("#filter-poissons-all .ile").addClass('is-checked2');
        $("#filter-poissons-all .no-ile").removeClass('is-checked2');
    });
    $('#filter-poissons-all .no-ile').click(function() {
        $("#filter-poissons-all .no-ile").addClass('is-checked2');
        $("#filter-poissons-all .ile").removeClass('is-checked2');
    });
    
    // TRI

    $('#filter-poissons-all').on('click', 'button', function() {
        onmasquelesokpoissonsall();        
    });

    // MISE A JOUR DU COMPTEUR
    
    var iso = $grid.data('isotope');
	function updateFilterCount() {
		var nombreencours = iso.filteredItems.length;
		if(nombreencours == 0){
			if(($("#c3messagepoissons").css("display") == "block") || ($("#c3messagepoissonsbis").css("display") == "block")){
				$("#c3messagepoissonsmaj").css("display","none");
			}else{
				$("#c3messagepoissonsmaj").css("display","block");	
			}
		}else{
			$("#c3messagepoissonsmaj").css("display","none");
		}
	}
	updateFilterCount();
    
    // FONCTION FILTRES
	
	onmasquelesokpoissonsactionall = function(){
		var filters = [];
		
		if ($("#filtrecheckpoissons-all").hasClass("activation") == true) {
			var filterValue2 = $("#filtrecheckpoissons-all").attr('data-filter2');
			if(filterValue2 == ".select-village"){
				var filterValue = ".checkno-village";
			}
			if(filterValue2 == ".select-ile"){
				var filterValue = ".checkno-ile";
			}
		}else{
			var filterValue2 = $("#filtrecheckpoissons-all").attr('data-filter2');
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
	
function onmasquelesokpoissonsall() {
	onmasquelesokpoissonsactionall();
}
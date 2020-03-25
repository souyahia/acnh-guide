var onmasquelesokinsectesactionall;

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
	
	if($('#searchinsectes3').val() != ""){
		$('#searchinsectes3').val("")
	}
    
    // ON INITIALISE ISOTOPE

    var $grid = $('.content-insectes-all').isotope({
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

    $('.content-insectes-all').isotope({
        sortAscending: {
            moins: true,
            plus: false,
            place: true,
            name: true
        }
    });
    
    // FONCTION RECHERCHE

    var qsRegex;

    var $quicksearch = $('#searchinsectes3').keyup(debounce(function() {
        onmasquelesokinsectesall();
    }, 200));
	
	function recherche(){
        var sortValue = $('#filter-insectes-all').find('.is-checked').attr('data-sort-value');
        qsRegex = new RegExp($('#searchinsectes3').val(), 'gi');
        $('.content-insectes-all').isotope({
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
    
    if($('#searchinsectes3').val() != ""){
		$('#closeinsectes3').css("display","block");
		$('#closeinsectes3bis').css("display","none");
	}else{
		$('#closeinsectes3').css("display","none");
		$('#closeinsectes3bis').css("display","block");
	}
	$('#searchinsectes3').keyup(function() {
		if($('#searchinsectes3').val() != ""){
			$('#closeinsectes3').css("display","block");
			$('#closeinsectes3bis').css("display","none");
		}else{
			$('#closeinsectes3').css("display","none");
			$('#closeinsectes3bis').css("display","block");
		}
	});
	$('#closeinsectes3').click(function() {
		$('#searchinsectes3').val("");
		$('#closeinsectes3').css("display","none");
		$('#closeinsectes3bis').css("display","block");
		debounce(recherche());
		updateFilterCount();
    });
    
    // ON ACTIVE L'OEIL
    
	$('#filter-insectes-all').on('click', '#filtrecheckinsectes-all', function() {
        if ($("#filtrecheckinsectes-all").hasClass("activation") == true) {
            $(this).removeClass('is-oeil');
            $(this).removeClass('activation');
        }else{
            $(this).addClass('is-oeil');
            $(this).addClass('activation');
        }
    });
    
    // ON ACTIVE VISUELLEMENT LE TRI
    
	$('#filter-insectes-all').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            if ($(this).attr('data-pers') != 'localisation-filter') {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
            }
            if (($(this).attr('data-filter') != '.checkyes') && ($(this).attr('data-pers') != 'localisation-filter')) {
                $(this).addClass('is-checked');
            }
            var newbutton = $buttonGroup.find('.is-checked').attr('data-sort-value');
            $('.' + newbutton + '-filter-insectes-all').addClass('is-checked');
        });
    });
    
    $('#filter-insectes-all .ile').click(function() {
        $("#filter-insectes-all .ile").css("display", "none");
        $("#filter-insectes-all .no-ile").css("display", "block");
        $("#filter-insectes-all .choice-filter").css("display", "none");
        $("#filter-insectes-all .no-choice-filter").css("display", "block");
		$('#filtrecheckinsectes-all').attr('data-filter2','.select-ile');
    });

    $('#filter-insectes-all .no-ile').click(function() {
        $("#filter-insectes-all .no-ile").css("display", "none");
        $("#filter-insectes-all .ile").css("display", "block");
        $("#filter-insectes-all .no-choice-filter").css("display", "none");
        $("#filter-insectes-all .choice-filter").css("display", "block");
        $("#filter-insectes-all .ile").removeClass('is-checked');
		$('#filtrecheckinsectes-all').attr('data-filter2','.select-village');
    });
    
    $('#filter-insectes-all .ile').click(function() {
        $("#filter-insectes-all .ile").addClass('is-checked2');
        $("#filter-insectes-all .no-ile").removeClass('is-checked2');
    });
    $('#filter-insectes-all .no-ile').click(function() {
        $("#filter-insectes-all .no-ile").addClass('is-checked2');
        $("#filter-insectes-all .ile").removeClass('is-checked2');
    });
    
    // TRI

    $('#filter-insectes-all').on('click', 'button', function() {
        onmasquelesokinsectesall();        
    });

    // MISE A JOUR DU COMPTEUR
    
    var iso = $grid.data('isotope');
	function updateFilterCount() {
		var nombreencours = iso.filteredItems.length;
		if(nombreencours == 0){
			if(($("#c3messageinsectes").css("display") == "block") || ($("#c3messageinsectesbis").css("display") == "block")){
				$("#c3messageinsectesmaj").css("display","none");
			}else{
				$("#c3messageinsectesmaj").css("display","block");	
			}
		}else{
			$("#c3messageinsectesmaj").css("display","none");
		}
	}
	updateFilterCount();
    
    // FONCTION FILTRES
	
	onmasquelesokinsectesactionall = function(){
		var filters = [];
		
		if ($("#filtrecheckinsectes-all").hasClass("activation") == true) {
			var filterValue2 = $("#filtrecheckinsectes-all").attr('data-filter2');
			if(filterValue2 == ".select-village"){
				var filterValue = ".checkno-village";
			}
			if(filterValue2 == ".select-ile"){
				var filterValue = ".checkno-ile";
			}
		}else{
			var filterValue2 = $("#filtrecheckinsectes-all").attr('data-filter2');
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
	
function onmasquelesokinsectesall() {
	onmasquelesokinsectesactionall();
}
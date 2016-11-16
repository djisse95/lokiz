$(document).ready(function() {
	var $regions = $('.regions');
	var $departements = $('.departements');
	var $villes = $('.villes');
	var $codePostal = $('.codePostal');
	var $codePostalRegex= '^[0-9]{5,5}$';

    // chargement des régions
    if($regions.find('option').attr('value') == 0){
        $.ajax({
           url: 'index.php?action=localisation',
        data: 'go', // on envoie $_GET['go']
        dataType: 'json', // on veut un retour JSON
        success: function(json) {
            $.each(json, function(index, value) { 
                // on ajoute l option dans la liste
                $regions.append('<option value="'+ index +'">'+ value +'</option>');
            });
            $regions.trigger("custom");
        }
    });
    }
    // à la sélection d une région dans la liste
    $regions.on('change', function() {
        var val = $(this).val(); // on récupère la valeur de la région

        if(val != '' && val!='0') {
            $departements.empty(); // on vide la liste des départements
            $.ajax({
            	url: 'index.php?action=localisation',
                data: 'id_region='+ val, // on envoie $_GET['id_region']
                dataType: 'json',
                success: function(json) {
                	$departements.append('<option value="">Département</option>');
                	$.each(json, function(index, value) {
                		$departements.append('<option value="'+ index +'">'+value[0][1] +' - '+ value[0][0] +'</option>');
                	});
                    $departements.trigger("custom");
                    $villes.empty();
                    $villes.append('<option value="">Ville</option>');
                    $villes.trigger("custom");
                }
            });
        }else{
        	$departements.empty();
        	$departements.append('<option value="">Département</option>');
            $departements.trigger("custom");
            $villes.empty();
            $villes.append('<option value="">Ville</option>');
            $villes.trigger("custom");
            $codePostal.val('');
        }
    });
    // à la sélection d'un département dans la liste
    $departements.on('change', function() {
        var val = $(this).val(); // on récupère la valeur du département
        if(val != '' && val!='0') {
            $villes.empty(); // on vide la liste des villes

            $.ajax({
            	url: 'index.php?action=localisation',
                data: 'id_departement='+ val, // on envoie $_GET['id_region']
                dataType: 'json',
                success: function(json) {
                	$villes.append('<option value="">Ville</option>');
                	$.each(json, function(index, value) {
                		$villes.append('<option value="'+ index +'">'+ value +'</option>');
                	});
                    $villes.trigger("custom");
                    $codePostal.val('');
                }
            });
        }else{
        	$villes.empty();
        	$villes.append('<option value="">Ville</option>');
            $villes.trigger("custom");
            $codePostal.val('');
        }
    });

    // à la sélection d'une ville dans la liste
    $villes.on('change', function() {
        var val = $(this).val(); // on récupère la valeur du département

        if(val != '' && val !='0') {
            $codePostal.val(''); // on vide la liste des villes

            $.ajax({
            	url: 'index.php?action=localisation',
                data: 'id_ville='+ val, // on envoie $_GET['id_region']
                dataType: 'json',
                success: function(json) {
                	$.each(json, function(index, value) {
                		$codePostal.val(value);
                	});
                }
            });
        }else{
        	$villes.empty();
        	$villes.append('<option value="">Ville</option>');
        }
    });


    // à la saisie d'un code postal valide
    $codePostal.on('change', function() {
    	var val = $(this).val(); // on récupère le code postal
		$('.codePostal').val(val);
    	if(val.match($codePostalRegex)){
        	$villes.empty(); // on vide la liste des villes
        	$departements.empty(); // on vide la liste des villes
        	$regions.empty(); // on vide la liste des villes
            $regions.removeClass('active');
            $regions.parent().find('input.value-holder').removeClass("active");
            $departements.removeClass('active');
            $departements.parent().find('input.value-holder').removeClass("active");
            $villes.removeClass('active');
            $villes.parent().find('input.value-holder').removeClass("active");

        	$.ajax({
        		url: 'index.php?action=localisation',
                data: 'codePostal='+ val, // on envoie le code postal
                dataType: 'json',
                success: function(json) {
                	$.each(json, function(index, value) {
                		$villes.append('<option value="'+ index +'">'+ value +'</option>');
                	});
                    $villes.trigger("custom");
                }
            });
        	$.ajax({
        		url: 'index.php?action=localisation',
                data: 'codePostalRegion='+ val, // on envoie le code postal
                dataType: 'json',
                success: function(json) {
                	$.each(json, function(index, value) {
                		$regions.append('<option value="'+ index +'">'+ value +'</option>');
                	});
                    $regions.trigger("custom");
                }
            });
        	$.ajax({
        		url: 'index.php?action=localisation',
                data: 'codePostalDepartement='+ val, // on envoie le code postal
                dataType: 'json',
                success: function(json) {
                	$.each(json, function(index, value) {
                		$departements.append('<option value="'+ index +'">'+value[0][1] +' - '+ value[0][0] +'</option>');
                	});
                    $departements.trigger("custom");
                }
            });
        }else{
        	//on vide tous les champs
        	$villes.empty(); // on vide la liste des villes
        	$departements.empty(); // on vide la liste des villes
        	$regions.empty(); // on vide la liste des villes
        	$regions.append('<option value="">Région</option>');
           $departements.append('<option value="">Département</option>');
           $villes.append('<option value="">Ville</option>');


           $.ajax({
              url: 'index.php?action=localisation',
        		data: 'go', // on envoie $_GET['go']
    		    dataType: 'json', // on veut un retour JSON
    		    success: function(json) {

            	$.each(json, function(index, value) { // pour chaque noeud JSON
                	// on ajoute l option dans la liste
                	$regions.append('<option value="'+ index +'">'+ value +'</option>');
                });
                $villes.trigger("custom");
                $departements.trigger("custom");
                $regions.trigger("custom");
            }
        });
       }
   });


});
function objectAjax(){
	var xmlhttp = false;
	try{
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e){
		try{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");			
		} catch (E){
			xmlhttp = false;	
		}		
	}
	if(!xmlhttp && typeof XMLHttpRequest!='undefined'){
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}
//Inicializo automaticamente la funcion read al entrar a la pagina o recargar la pagina;
addEventListener('load', read, false);

function read(){
        $.ajax({        
        		type: 'POST',
                url:   '?c=administrator&m=table_users',               
                beforeSend: function () {
                        $("#information").html("Procesando, espere por favor...");
                },
                success:  function (response) {
                        $("#information").html(response);
                }
        });
}

function register(){
	let name 		= document.formUser.name.value;
	let last_name 	= document.formUser.last_name.value;
	let email 		= document.formUser.email.value;
	let ajax = objectAjax();
	ajax.open("POST", "?c=administrator&m=registeruser", true);
	$.ajax({
        type: 'POST',
        url: "?c=administrator&m=registeruser",
        data: { name: name, last_name: last_name, email: email },
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                read();
                alert('Los datos se guardaron correctamente.');
                $('#addUser').modal('hide');
            } else {
                alert(response.message);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error AJAX:", error);
            console.log("xhr:", xhr); // esto puede proporcionar info útil en caso de error de conexión
            alert('Error al registrar el usuario. Verifica tu conexión a internet.');
        }
    });
}

function update(){
	let id 			= document.formUserUpdate.id.value;
	let name 		= document.formUserUpdate.name.value;
	let last_name 	= document.formUserUpdate.last_name.value;
	let email 		= document.formUserUpdate.email.value;

	$.ajax({
		type: 'POST',
		url: "?c=administrator&m=updateuser",
		data: { id: id, name: name, last_name: last_name, email: email },
		dataType: 'json',
		success: function(response) {
			if (response.success) {
				read();
				alert('Los datos se actualizaron correctamente.');
				$('#updateUser').modal('hide');
			} else {
				alert(response.message);
			}
		},
		error: function(xhr, status, error) {
			console.log("Error AJAX:", error);
			console.log("xhr:", xhr); 
			alert('Error al actualizar el usuario. Verifica tu conexión a internet.');
		}
	});
}

function deleteUser(id){	
	if(confirm('¿Esta seguro de eliminar este registro?')){						
	ajax = objectAjax();
	ajax.open("POST", "?c=administrator&m=deleteuser", true);
	ajax.onreadystatechange=function() {
		if(ajax.readyState==4){			
			read();		
		}
	}
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send("id="+id);
	}
}

function ModalRegister(){
	$('#addUser').modal('show');
}

function ModalUpdate(id,name,last_name,email){			
	document.formUserUpdate.id.value 			= id;
	document.formUserUpdate.name.value 			= name;
	document.formUserUpdate.last_name.value 	= last_name;
	document.formUserUpdate.email.value 		= email;
	$('#updateUser').modal('show');
}


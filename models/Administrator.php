<?php

class Administrator extends db{
	
	private function view_users(){
		try {
			$SQL = "SELECT * FROM users";
			$result = $this->connect()->prepare($SQL);
			$result->execute();
			return $result->fetchAll(PDO::FETCH_OBJ);	
		} catch (Exception $e) {
			die('Error Administrator(view_users) '.$e->getMessage());
		} finally{
			$result = null;
		}
	}

	function get_view_users(){
		return $this->view_users();
	}

	private function register_users($data){
		try {
			// Verificar si el correo ya está registrado
			$checkSQL = 'SELECT COUNT(*) FROM users WHERE email_user = ?';
			$checkResult = $this->connect()->prepare($checkSQL);
			$checkResult->execute(array($data['email']));
			$emailExists = $checkResult->fetchColumn();
	
			if ($emailExists > 0) {
				throw new Exception('El correo ya está registrado.');
			}
	
			$SQL = 'INSERT INTO users (name_user,last_name_user,email_user) VALUES (?,?,?)';
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$data['name'],
				$data['last_name'],
				$data['email']
			));
			echo json_encode(['success' => true, 'message' => 'Usuario registrado']); // Respuesta JSON de éxito
		} catch (Exception $e) {
			echo json_encode(['success' => false, 'message' => $e->getMessage()]); // Respuesta JSON con el error
		} finally {
			$result = null;
			$checkResult = null;
		}
		exit; // Importante: Detener la ejecución del script
	}

	function set_register_user($data){
		$this->register_users($data);
	}

	private function update_user($data){
		try {
			// Verificar si el correo ya está registrado por otro usuario
			$checkSQL = 'SELECT COUNT(*) FROM users WHERE email_user = ? AND id_user != ?';
			$checkResult = $this->connect()->prepare($checkSQL);
			$checkResult->execute(array($data['email'], $data['id']));
			$emailExists = $checkResult->fetchColumn();
	
			if ($emailExists > 0) {
				throw new Exception('El correo ya está registrado por otro usuario.');
			}
	
			$SQL = 'UPDATE users SET name_user = ?, last_name_user = ?, email_user = ? WHERE id_user = ?';
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$data['name'],
				$data['last_name'],
				$data['email'],
				$data['id']
			));
			echo json_encode(['success' => true, 'message' => 'Usuario actualizado']); // Respuesta JSON de éxito
		} catch (Exception $e) {
			echo json_encode(['success' => false, 'message' => $e->getMessage()]); // Respuesta JSON con el error
		} finally {
			$result = null;
			$checkResult = null;
		}
		exit; // Importante: Detener la ejecución del script
	}

	function set_update_user($data){
		$this->update_user($data);
	}

	private function delete_user($id){
		try {
			$SQL = 'DELETE FROM users WHERE id_user = ?';
			$result = $this->connect()->prepare($SQL);
			$result->execute(array($id));			
		} catch (Exception $e) {
			die('Error Administrator(delete_user) '.$e->getMessage());
		} finally{
			$result = null;
		}
	}

	function set_delete_user($id){
		$this->delete_user($id);
	}	
}
?>
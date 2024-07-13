<?php


require "../model/dbconnect.php";

class Hostel {

    private $conn;
   

    public function __construct() {
        $this->conn = new Database();
        $this->conn = $this->conn->getConnection();
    }
    
    public function getData() {
        $query = "SELECT * FROM pet_hostel_users " ;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
      
    }

    public function createData($data) {
        $query = "INSERT INTO  testdb (username, email,password) VALUES (?,?,?)";
        $stmt = $this->conn->executeQuery( $query,$data );
        // $stmt->bindParam(':value1', $data['value1']);
        // $stmt->bindParam(':value2', $data['value2']);
        return $stmt;
    }

    public function updateData($data) {
        $query = "UPDATE pet_hostel_users SET column1 = :value1, column2 = :value2 WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':value1', $data['value1']);
        $stmt->bindParam(':value2', $data['value2']);
        $stmt->bindParam(':id', $data['id']);
        return $stmt->execute();
    }

    public function deleteData($id) {
        $query = "DELETE FROM pet_hostel_users WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}






?>

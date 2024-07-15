<?php


require "../model/dbconnect.php";

class Hostel {

    private $db;
 
   

    public function __construct() {
      
        $this->db = new Database();
        // $this->db = $this->db->getConnection();
    }
    
    public function getData($id) {

echo "pay";

        $query = "SELECT * FROM pet_hostel_users " ;

        if($id){
            $query = "SELECT * FROM pet_hostel_users Where id=$id " ;
            echo "pay";

        }


        $stmt = $this->db->executeQuery( $query);
        // $stmt = $this->conn->prepare($query);
echo "pay";
        
        // $stmt->execute();
        return $stmt;
      
    }

    public function createData($data) {

        $sql = "INSERT INTO pet_hostel_users (
            pet_type, breeds, age, gender, start_date, end_date, pet_behaviour, are_you_a_pet_parent, user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";


        $stmt = $this->db->executeQuery($sql,$data);

     
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

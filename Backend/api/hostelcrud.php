<?php


require "../model/dbconnect.php";

class Hostel {

    private $db;
 
   

    public function __construct() {
      
        $this->db = new Database();
        // $this->db = $this->db->getConnection();
    }
    
    public function getData($id = null) {
        echo "Starting getData function<br>";

        // Base query
        $query = "SELECT * FROM pet_hostel_users";
        if ($id) {
            $query .= " WHERE id = :id";
            echo "Modified query to include ID<br>";
        }

        // Prepare the statement
        $stmt = $this->db->conn->prepare($query);
        if ($id) {
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        }

        // Execute the statement
        $stmt->execute();

        // Fetch the results
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // echo "Query executed successfully<br>";
        print_r($results);

        return $results;
    }

    public function createData($data) {
        // Prepare the SQL statement with placeholders
        $sql = "INSERT INTO pet_hostel_users (
            pet_type, breeds, age, gender, start_date, end_date, pet_behaviour, are_you_a_pet_parent, user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {
            // Prepare the statement
            $stmt = $this->db->conn->prepare($sql);
// print_r($data);
              // Bind the parameters using bindValue
              $stmt->bindValue(1, $data['petType'], PDO::PARAM_STR);
              $stmt->bindValue(2, $data['breed'], PDO::PARAM_STR);
              $stmt->bindValue(3, $data['age'], PDO::PARAM_INT);
              $stmt->bindValue(4, $data['gender'], PDO::PARAM_STR);
              $stmt->bindValue(5, $data['checkin'], PDO::PARAM_STR);
              $stmt->bindValue(6, $data['checkout'], PDO::PARAM_STR);
              $stmt->bindValue(7, $data['behavior'], PDO::PARAM_STR);
              $stmt->bindValue(8, $data['petParent'], PDO::PARAM_STR);
              $stmt->bindValue(9, 1, PDO::PARAM_INT);

            // Execute the statement
            $stmt->execute();

            return ["name"=>"Data inserted successfully<br>"];

            // return true; // Return true on success
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage() . "<br>";
            return false; // Return false on failure
        }
    }

    public function updateData($data,$id) {
        // Prepare the SQL statement
        $query = "UPDATE pet_hostel_users SET 
                  pet_type = :petType, 
                  breeds = :breed, 
                  age = :age, 
                  gender = :gender, 
                  start_date = :checkin, 
                  end_date = :checkout, 
                  pet_behaviour = :behavior, 
                  are_you_a_pet_parent = :petParent 
                  WHERE id = :id";
                  
        $stmt = $this->db->conn->prepare($query);
    
        // Bind parameters
        $stmt->bindValue(':petType', $data['petType'], PDO::PARAM_STR);
        $stmt->bindValue(':breed', $data['breed'], PDO::PARAM_STR);
        $stmt->bindValue(':age', $data['age'], PDO::PARAM_INT);
        $stmt->bindValue(':gender', $data['gender'], PDO::PARAM_STR);
        $stmt->bindValue(':checkin', $data['checkin'], PDO::PARAM_STR);
        $stmt->bindValue(':checkout', $data['checkout'], PDO::PARAM_STR);
        $stmt->bindValue(':behavior', $data['behavior'], PDO::PARAM_STR);
        $stmt->bindValue(':petParent', $data['petParent'], PDO::PARAM_STR);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    
        // Execute the statement
        try {
            $stmt->execute();
            return "true"; // Return true if update was successful
        } catch (PDOException $e) {
            // Handle errors (optional: log or display error message)
            echo "Error";
        }    
    }

    public function deleteData($id) {
        $query = "DELETE FROM pet_hostel_users WHERE id = :id";
        $stmt = $this->db->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return "sucess";
    }
}






?>
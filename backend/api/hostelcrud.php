





<?php

require "../model/dbconnect.php";

class Hostel {

    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getData($query, $params = []) {
        $stmt = $this->db->conn->prepare($query);
    
        // Bind parameters if any are provided
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
    
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    

    public function createData($data,$sql) {
       
        return $this->executeQuery($sql, $data);
    }

    public function updateData($query, $params = []) {
        try {
            $stmt = $this->db->conn->prepare($query);
            
            // Bind parameters
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            
            // Execute the query
            $result = $stmt->execute();
            
            return $result; // This will be true if the query was successful, false otherwise
        } catch (PDOException $e) {
            // Handle exception
            error_log("Error executing query: " . $e->getMessage());
            return false;
        }
    }
    

    public function deleteData($id) {
        $query = "DELETE FROM pet_hostel_users WHERE id = :id";
        return $this->executeQuery($query, ['id' => $id]);
    }

    public function getAllHosData() {
        $query = "SELECT * FROM pet_hostels";
        return $this->executeQuery($query, []);
    }

    public function bookHostel($hosId, $data, $user_id) {

        $query = "INSERT INTO hostel_bookings (
            hos_id, service_type, pet_type, breed_type, pet_name, age, gender, expectations, user_id,checkin_date,checkout_date
        ) VALUES (:hos_id, :serviceType, :petType, :breedType, :petName, :age, :gender, :expectations, :user_id,:checkin_date,:checkout_date)";
    
        // Add hostel ID and user ID to data array
        $data['hos_id'] = $hosId;
        $data['user_id'] = $user_id;
    
        $stmt = $this->db->conn->prepare($query);

        // Bind each parameter individually
        $stmt->bindValue(':hos_id', $data['hos_id'] ?? null);
        $stmt->bindValue(':serviceType', $data['serviceType'] ?? null);
        $stmt->bindValue(':petType', $data['petType'] ?? null);
        $stmt->bindValue(':breedType', $data['breedType'] ?? null);
        $stmt->bindValue(':petName', $data['petName'] ?? null);
        $stmt->bindValue(':age', $data['age'] ?? null);
        $stmt->bindValue(':gender', $data['gender'] ?? null);
        $stmt->bindValue(':expectations', $data['expectations'] ?? null);
        $stmt->bindValue(':user_id', $data['user_id'] ?? null);
        $stmt->bindValue(':checkin_date', $data['checkin'] ?? null);
        $stmt->bindValue(':checkout_date', $data['checkout'] ?? null);

    
        try {
            $stmt->execute();
            return ["message" => "Operation successful"];
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }

        // Execute the query with the bound data
        // return $this->executeQuery($query, $data);
    }
    

    private function executeQuery($query, $data) {
        $stmt = $this->db->conn->prepare($query);

        foreach ($data as $key => $value) {
            $param = ":$key";
            // $paramType = is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR;
            $stmt->bindValue($param, $value );
        }

        try {
            $stmt->execute();
            return ['status'=>'success',"message" => "Operation successful"];
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    function getDataForEmail($hosId){

        $sql = "SELECT users.*, pet_hostels.*
            FROM users
            JOIN pet_hostels ON users.id = pet_hostels.user_id
            WHERE pet_hostels.id = :hostel_id";
            // return $hosId;
        // Prepare the statement
    $stmt = $this->db->conn->prepare($sql);

    // Bind the parameter
    $stmt->bindParam(':hostel_id', $hosId);

    // Execute the statement
    $stmt->execute();

    // Fetch the result
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Output the details
    if ($result) {
      return $result;
    } else {
        echo "No details found for hostel_id $hostel_id.";
    }
//   return $hosId;

    }


}



?>




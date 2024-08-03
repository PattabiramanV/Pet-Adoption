<?php


// require "../model/dbconnect.php";

// class Hostel {

//     private $db;
 
   

//     public function __construct() {
      
//         $this->db = new Database();
//         // $this->db = $this->db->getConnection();
//     }
    
    
//     public function getData($id = null) {

//         echo "Starting getData function<br>";

//         // Base query
//         $query = "SELECT * FROM pet_hostel_users";
//         if ($id) {
//             $query .= " WHERE id = :id";
//             echo "Modified query to include ID<br>";
//         }

//         // Prepare the statement
//         $stmt = $this->db->conn->prepare($query);
//         if ($id) {
//             $stmt->bindParam(':id', $id, PDO::PARAM_INT);
//         }

//         // Execute the statement
//         $stmt->execute();

//         // Fetch the results
//         $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

//         // echo "Query executed successfully<br>";
//         // print_r($results);

//         return $results;
//     }

//     public function createData($data) {
//         // Prepare the SQL statement with placeholders
//         $sql = "INSERT INTO pet_hostel_users (
//             pet_type, breeds, age, gender, start_date, end_date, pet_behaviour, are_you_a_pet_parent, user_id
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

//         try {
//             // Prepare the statement
//             $stmt = $this->db->conn->prepare($sql);
// // print_r($data);
//               // Bind the parameters using bindValue
//               $stmt->bindValue(1, $data['petType'], PDO::PARAM_STR);
//               $stmt->bindValue(2, $data['breed'], PDO::PARAM_STR);
//               $stmt->bindValue(3, $data['age'], PDO::PARAM_INT);
//               $stmt->bindValue(4, $data['gender'], PDO::PARAM_STR);
//               $stmt->bindValue(5, $data['checkin'], PDO::PARAM_STR);
//               $stmt->bindValue(6, $data['checkout'], PDO::PARAM_STR);
//               $stmt->bindValue(7, $data['behavior'], PDO::PARAM_STR);
//               $stmt->bindValue(8, $data['petParent'], PDO::PARAM_STR);
//               $stmt->bindValue(9, 1, PDO::PARAM_INT);

//             // Execute the statement
//             $stmt->execute();

//             return ["name"=>"Data inserted successfully<br>"];

//             // return true; // Return true on success
//         } catch (PDOException $e) {
//             echo "Error: " . $e->getMessage() . "<br>";
//             return false; // Return false on failure
//         }
//     }

//     public function updateData($data,$id) {
//         // Prepare the SQL statement
//         $query = "UPDATE pet_hostel_users SET 
//                   pet_type = :petType, 
//                   breeds = :breed, 
//                   age = :age, 
//                   gender = :gender, 
//                   start_date = :checkin, 
//                   end_date = :checkout, 
//                   pet_behaviour = :behavior, 
//                   are_you_a_pet_parent = :petParent 
//                   WHERE id = :id";
                  
//         $stmt = $this->db->conn->prepare($query);
    
//         // Bind parameters
//         $stmt->bindValue(':petType', $data['petType'], PDO::PARAM_STR);
//         $stmt->bindValue(':breed', $data['breed'], PDO::PARAM_STR);
//         $stmt->bindValue(':age', $data['age'], PDO::PARAM_INT);
//         $stmt->bindValue(':gender', $data['gender'], PDO::PARAM_STR);
//         $stmt->bindValue(':checkin', $data['checkin'], PDO::PARAM_STR);
//         $stmt->bindValue(':checkout', $data['checkout'], PDO::PARAM_STR);
//         $stmt->bindValue(':behavior', $data['behavior'], PDO::PARAM_STR);
//         $stmt->bindValue(':petParent', $data['petParent'], PDO::PARAM_STR);
//         $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    
//         // Execute the statement
//         try {
//             $stmt->execute();
//             return "true"; // Return true if update was successful
//         } catch (PDOException $e) {
//             // Handle errors (optional: log or display error message)
//             echo "Error";
//         }    
//     }

//     public function deleteData($id) {
//         $query = "DELETE FROM pet_hostel_users WHERE id = :id";
//         $stmt = $this->db->conn->prepare($query);
//         $stmt->bindParam(':id', $id);
//         $stmt->execute();
//         return "sucess";
//     }


//     public function getAllHosData() {
//         // echo "Starting getData function<br>";

//         // Base query
//         $query = "SELECT * FROM pet_hostels";
//         // if ($id) {
//         //     $query .= " WHERE id = :id";
//         //     echo "Modified query to include ID<br>";
//         // }

//         // Prepare the statement
//         $stmt = $this->db->conn->prepare($query);
//         // if ($id) {
//         //     $stmt->bindParam(':id', $id, PDO::PARAM_INT);
//         // }

//         // Execute the statement
//         $stmt->execute();

//         // Fetch the results
//         $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

//         // echo "Query executed successfully<br>";
//         // print_r($results);

//         return $results;
//     }
// public function bookHostel($hosId,$data,$user_id){

// $query = "INSERT INTO hostel_bookings (
//     hos_id, 
//     service_type, 
//     pet_type, 
//     breed_type, 
//     pet_name, 
//     age, 
//     gender, 
//     expectations, 
//     parent_name, 
//     parent_phone, 
//     parent_state, 
//     parent_city,
//     user_id
// ) VALUES (:hos_id, :service_type, :pet_type, :breed_type, :pet_name, :age, :gender, :expectations, :parent_name, :parent_phone, :parent_state, :parent_city,:user_id)";

// $stmt = $this->db->conn->prepare($query);

// // Bind parameters  
// $stmt->bindParam(':hos_id', $hosId, PDO::PARAM_INT);
// $stmt->bindParam(':service_type', $data['serviceType'], PDO::PARAM_STR);
// $stmt->bindParam(':pet_type', $data['petType'], PDO::PARAM_STR);
// $stmt->bindParam(':breed_type', $data['breedType'], PDO::PARAM_STR);
// $stmt->bindParam(':pet_name', $data['parentName'], PDO::PARAM_STR);
// $stmt->bindParam(':age', $data['age'], PDO::PARAM_INT);
// $stmt->bindParam(':gender', $data['gender'], PDO::PARAM_STR);
// $stmt->bindParam(':expectations', $data['expectations'], PDO::PARAM_STR);
// $stmt->bindParam(':parent_name', $data['parentName'], PDO::PARAM_STR);
// $stmt->bindParam(':parent_phone', $data['parentPhone'], PDO::PARAM_STR);
// $stmt->bindParam(':parent_state', $data['parentState'], PDO::PARAM_STR);
// $stmt->bindParam(':parent_city', $data['parentCity'], PDO::PARAM_STR);
// $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);


// // Execute the statement
// if ($stmt->execute()) {
//     echo "Hostel Booking successfully.";
    
// } else {
//     echo "Error: " . implode(" ", $stmt->errorInfo());
// }


// }



// // public function emailSendFun(){


// // }




// }

?>





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
    

    public function createData($data) {
        $sql = "INSERT INTO pet_hostel_users (
            pet_type, breeds, age, gender, start_date, end_date, pet_behaviour, are_you_a_pet_parent, user_id
        ) VALUES (:petType, :breed, :age, :gender, :checkin, :checkout, :behavior, :petParent, :userId)";

        return $this->executeQuery($sql, $data);
    }

    public function updateData($query, $params = []) {
        $stmt = $this->db->conn->prepare($query);
    
        // Bind parameters if any are provided
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
    
        $stmt->execute();
        // $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return  $stmt;
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
            hos_id, service_type, pet_type, breed_type, pet_name, age, gender, expectations, user_id
        ) VALUES (:hos_id, :serviceType, :petType, :breedType, :petName, :age, :gender, :expectations, :user_id)";
    
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
            return ["message" => "Operation successful"];
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




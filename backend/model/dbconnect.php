<?php



class Database {

    private $host = 'localhost';
    private $db_name = 'pet_adoption';
    private $username = 'dckap';
    private $password = 'Dckap2023Ecommerce';
    // private $password = 'Dckap2023Ubuntu';

    public $conn;
    
    // Get the database connection
  public function __construct(){

        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

    // Execute a query

    public function executeQuery($query, $params = []) {

        try {

    echo $query;

            $stmt = $this->conn->prepare($query);
            // Loop through parameters and bind them
            foreach ($params as $key => &$value) {
                echo "ram";
                // If the key is numeric, treat it as positional parameter
                if (is_int($key)) {
                    $stmt->bindParam($key + 1, $value); // Positional binding
                } else {
                    $stmt->bindParam(':' . $key, $value); // Named binding
                }
            }

            // Execute the prepared statement
            
            $result=$stmt->execute();

            return $result;

        } catch (PDOException $exception) {
            echo "Query error: " . $exception->getMessage();
            return null;
        }
    }


      
}



?>

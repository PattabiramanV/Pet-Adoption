<?php



class Database {
    private $host = 'localhost';
    private $db_name = 'pet_adoption';
    private $username = 'dckap';
    private $password = 'Dckap2023Ubuntu';
    private $conn;

    // Get the database connection
    public function getConnection() {
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
            
                $stmt = $this->conn->prepare($query);
        
                foreach ($params as $key => $value) {
                    $stmt->bindValue($key + 1, $value); // Bind values to the placeholders
                }
        
                $stmt->execute();
                
                return $stmt;
        
        
        } catch(PDOException $exception) {
            echo "Query error: " . $exception->getMessage();
            return null;
        }
    }
}

?>

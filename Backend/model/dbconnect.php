<?php

class database
{
    private $server = 'localhost';
    private $dbname = 'pet_adoption';
    private $user = 'dckap';
    private $pass = 'Dckap2023Ecommerce';

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }

}

?>

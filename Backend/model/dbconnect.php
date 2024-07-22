<?php

class database
{
    private $server = 'localhost';
    private $dbname = 'pet_adoption';
    private $user = 'dckap';
    private $pass = 'Dckap2023Ubuntu';

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' .$server .';dbname=' . $dbname, $user, $pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }

}

?>

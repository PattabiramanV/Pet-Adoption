<?php
class Pet {
    private $conn;
    private $table = 'pets';

    public $id;
    public $name;
    public $user_id;
    public $description;
    // Add other pet properties here

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAdoptedPets() {
        $query = 'SELECT * FROM adopted_pets WHERE user_id = :user_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->execute();
        return $stmt;
    }
}
?>

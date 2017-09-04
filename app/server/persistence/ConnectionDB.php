<?php
//namespace persistence;

class ConnectionDB
{
    
    private const HOST = 'localhost';
    private const USER_NAME = 'root';
    private const PASSWORD = '';
    private const DB_NAME = 'work_note_manager_db';
    protected $conn;
    
    protected function __construct(){
        $this->conn = null;
    }
       
    protected function connectDB() {
        if($this->conn == null) {
            try {
                $this->conn = new PDO(
                    'mysql:host='.self::HOST.';dbname='.self::DB_NAME, 
                    self::USER_NAME, 
                    self::PASSWORD
                    );
                // set the PDO error mode to exception
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                //echo "Connected successfully";
            }
            catch(PDOException $e)
            {
                $this->close();
            }
        }
    }
    
    protected function close() {
        $this->conn = null;
    }
}


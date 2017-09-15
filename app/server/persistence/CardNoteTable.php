<?php
//namespace persistence;

class CardNoteTable extends \ConnectionDB
{

    public function __construct()
    {
        parent::__construct();
        $this->createTable();
    }
    
    private function createTable() {
        try {
            $sql = "CREATE TABLE IF NOT EXISTS card_notes (
                    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    tittle varchar(50) NOT NULL,
                    details text NOT NULL,
                    date_begin date NOT NULL,
                    date_end date NOT NULL,
                    is_done boolean NOT NULL
                    )";
            
            $this->connectDB();
            $this->conn->exec($sql);
            $this->close(); // close connection DB
            
            //echo "table created successfully";
        } catch (\PDOException $e) {
            echo "ERROR - createTable() ".$e->getMessage();
        }
    }
    
    /**
     * 
     * @param CardNote $cardNoteOject
     * @return boolean
     */
    public function insertCardNote($tittle, $details, $date_begin, $date_end) {
        try {
           $this->connectDB();
           
           $sql = "INSERT INTO card_notes (tittle, details, date_begin, date_end, is_done) 
                  VALUES (?,?,?,?,?)";
           $statement = $this->conn->prepare($sql);
           $is_done = false; // value default
           $statement->bindParam(1, $tittle);
           $statement->bindParam(2, $details);
           $statement->bindParam(3, $date_begin);
           $statement->bindParam(4, $date_end);           
           $statement->bindParam(5, $is_done, PDO::PARAM_BOOL);
           $statement->execute();
           
           $this->close(); // close connection DB
           return true;
           
        } catch (\PDOException $e) {
            echo "ERROR - insertCardNote() ".$e->getMessage();
            return false;
        }
    }
    
    /**
     * 
     * @param int id
     * @param boolean $is_done
     * @return boolean true if is update or false if is not update
     */
    public function updateIsDone($id, $is_done) {
        try {
            $this->connectDB();
            
            $sql = "UPDATE card_notes SET is_done = :isdone WHERE id = $id";         
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(':isdone', $is_done);
            $statement->execute();
            
            $this->close(); // close connection DB
            return true;
        } catch (PDOException $e) {
            echo "ERROR - updateCardNote() ".$e->getMessage();
            return false;
        }
    }
    
    /**
     * @param int id
     * @param string tittle, details, date_begin, date_end
     */
    public function updateNoteCard($id, $tittle, $details, $date_begin, $date_end) {
        try {
            $this->connectDB();
            
            $sql = "UPDATE card_notes SET tittle = :tittle, details = :details,
                    date_begin = :dbegin, date_end = :dend  
                    WHERE id = $id";
            
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(':tittle', $tittle);
            $statement->bindParam(':details', $details);
            $statement->bindParam(':dbegin', $date_begin);
            $statement->bindParam(':dend', $date_end);
            $statement->execute();
            
            $this->close(); // close connection DB
            return true;
            
        } catch (PDOException $e) {
            echo "ERROR updateNoteCard() - ".$e->getMessage();
            return false;
        }
    }
    
    /**
     * 
     * @param integer $id
     * @return boolean 
     */
    public function deleteById($id) {
        try {
            $this->connectDB();
            $sql = "DELETE FROM card_notes WHERE id = :id";
            
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(':id', $id);
            $statement->execute();
            
            $this->close();
            return true;
            
        } catch (PDOException $e) {
            echo "ERROR deleteById() - ".$e->getMessage();
            return false;
        }
    }
    
    /**
     * Delete all note where is done
     * @return boolean
     */
    public function deleteAllDone() {
        try {
            $this->connectDB();
            $sql = "DELETE FROM card_notes WHERE is_done = 1";
            $this->conn->exec($sql);
            
            $this->close();
        } catch (PDOException $e) {
            echo "ERROR deleteAllDone() - ".$e->getMessage();
            return false;
        }
    }
    
    /**
     * 
     * @return array|boolean 
     */
    public function getAll() {
        try {
            $this->connectDB();
            
            $sql = "SELECT id, tittle, details, date_begin, date_end, is_done FROM card_notes";
            $sth = $this->conn->prepare($sql);
            $sth->execute();
            $result = array();
            while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
                // Pass id value fronm string to int
                $row['id'] = intval($row['id']);
                // Pass is_done value fronm string to boolean
                $row['is_done'] = boolval($row['is_done']);
                // Add to $result array
                $result[] = $row;
            }
                        
            $this->close(); // close connection DB
            return $result;
        } catch (PDOException $e) {
            echo "ERROR: ". $e->getMessage();
        }
    }
}


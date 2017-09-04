<?php
//namespace models;

class CardNote
{

    private $id;
    private $tittle;
    private $deatails;
    private $date_begin;
    private $date_end;
    private $is_done;
    
    public function __construct($id, $tittle, $details, $date_begin, $date_end, $is_done)
    {
        $this->id = $id;
        $this->tittle = $tittle;
        $this->deatails = $details;
        $this->date_begin = $date_begin;
        $this->date_end = $date_end;
        $this->is_done = $is_done;
    }        
    
    // GETTERS --------------------------
    /**
     * @return int $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string $tittle
     */
    public function getTittle()
    {
        return $this->tittle;
    }

    /**
     * @return string $deatails
     */
    public function getDeatails()
    {
        return $this->deatails;
    }

    /**
     * @return string $date_begin
     */
    public function getDate_begin()
    {
        return $this->date_begin;
    }

    /**
     * @return string $date_end
     */
    public function getDate_end()
    {
        return $this->date_end;
    }

    /**
     * @return boolean $is_done
     */
    public function getIs_done()
    {
        return $this->is_done;
    }

    // SETTERS --------------------------
    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param string $tittle
     */
    public function setTittle($tittle)
    {
        $this->tittle = $tittle;
    }

    /**
     * @param string $deatails
     */
    public function setDeatails($deatails)
    {
        $this->deatails = $deatails;
    }

    /**
     * @param string $date_begin
     */
    public function setDate_begin($date_begin)
    {
        $this->date_begin = $date_begin;
    }

    /**
     * @param string $date_end
     */
    public function setDate_end($date_end)
    {
        $this->date_end = $date_end;
    }

    /**
     * @param Ambigous <boolean, unknown> $is_done
     */
    public function setIs_done($is_done)
    {
        $this->is_done = $is_done;
    }

    public function toString() {
        echo "id: $this->id, tittle: $this->tittle, details: $this->deatails, 
        date_begin: $this->date_begin, date_end: $this->date_end, is_done: $this->is_done";
    }
    
}


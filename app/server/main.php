<?php
    $notes_test = array( // notes for testing
        array(
            'id' => 01, 
            'tittle' => 'crear PHP', 
            'details' => 'crear un fichero PHP', 
            'date_begin' => '21-08-2017', 
            'date_end' => '30-08-2017'),
        array(
            'id' => 02, 
            'tittle' => 'modificar ficheros', 
            'details' => 'modificar ficheros *.less', 
            'date_begin' => '21-08-2017', 
            'date_end' => '05-09-2017'),
        array(
            'id' => 03, 
            'tittle' => 'Reunion', 
            'details' => 'reunion familiar', 
            'date_begin' => '20-09-2017', 
            'date_end' => '26-09-2017'),
    );

    if(isset($_POST['test'])){
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($notes_test);
        exit();
    }   
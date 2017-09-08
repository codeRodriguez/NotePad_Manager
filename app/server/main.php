<?php
    include 'autoloader.php';
    /*
    $notes_test = array( // notes for testing
        array(
            'id' => "1", 
            'tittle' => 'crear PHP', 
            'details' => 'crear un fichero PHP', 
            'date_begin' => '2017-08-29', 
            'date_end' => '2017-08-30',
            'is_done' => false),
        array(
            'id' => 02, 
            'tittle' => 'modificar ficheros', 
            'details' => 'modificar ficheros *.less', 
            'date_begin' => '2017-09-01', 
            'date_end' => '2017-09-02',
            'is_done' => false),
        array(
            'id' => 03, 
            'tittle' => 'Reunion', 
            'details' => 'reunion familiar', 
            'date_begin' => '2017-09-03', 
            'date_end' => '2017-09-04',
            'is_done' => true),
        array(
            'id' => 04, 
            'tittle' => 'Reunion - proveedor', 
            'details' => 'reunion Proveedor de ASUS', 
            'date_begin' => '2017-09-02', 
            'date_end' => '2017-09-12',
            'is_done' => false),
        array(
            'id' => 05, 
            'tittle' => 'Agregar plugin JQuery', 
            'details' => 'Agregar plugin mediante Jquery a la app', 
            'date_begin' => '2017-09-03', 
            'date_end' => '2017-09-08',
            'is_done' => true),
    ); */

    if(isset($_POST['updateList'])) {
        header('Content-type: application/json; charset=utf-8');
        $carNoteTable = new CardNoteTable();
        echo json_encode($carNoteTable->getAll());
        exit();
    }
    
    if(isset($_POST['saveNewNote'])) {
        header('Content-type: application/json; charset=utf-8');
        $carNoteTable = new CardNoteTable();
        $carNoteTable->insertCardNote(
            $_POST['saveNewNote']['tittle'], 
            $_POST['saveNewNote']['details'], 
            $_POST['saveNewNote']['date_begin'], 
            $_POST['saveNewNote']['date_end']
            );
        echo json_encode($carNoteTable->getAll());
        exit();
    }
    
    if(isset($_POST['update_is_done'])) {
        header('Content-type: application/json; charset=utf-8');
        $id = intval($_POST['update_is_done']['id']); // string to int
        $isDone = ($_POST['update_is_done']['isDone'] === 'true'); //string to boolean
        
        $carNoteTable = new CardNoteTable();
        $carNoteTable->updateIsDone($id, $isDone); 
        echo json_encode($carNoteTable->getAll());
        //echo "id: $id - isDone: $isDone";
        exit();
    }
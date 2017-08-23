<?php
    $notes_test = array( // notes for testing
        array(
            'id' => 01, 
            'tittle' => 'crear PHP', 
            'details' => 'crear un fichero PHP', 
            'date_begin' => '2017-08-29', 
            'date_end' => '2017-08-30'),
        array(
            'id' => 02, 
            'tittle' => 'modificar ficheros', 
            'details' => 'modificar ficheros *.less', 
            'date_begin' => '2017-09-01', 
            'date_end' => '2017-09-02'),
        array(
            'id' => 03, 
            'tittle' => 'Reunion', 
            'details' => 'reunion familiar', 
            'date_begin' => '2017-09-03', 
            'date_end' => '2017-09-04'),
        array(
            'id' => 04, 
            'tittle' => 'Reunion - proveedor', 
            'details' => 'reunion Proveedor de ASUS', 
            'date_begin' => '2017-09-02', 
            'date_end' => '2017-09-12'),
        array(
            'id' => 05, 
            'tittle' => 'Agregar plugin JQuery', 
            'details' => 'Agregar plugin mediante Jquery a la app', 
            'date_begin' => '2017-09-03', 
            'date_end' => '2017-09-08'),
    );

    if(isset($_POST['test'])){
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($notes_test);
        exit();
    }   
<?php
include 'autoloader.php';

//$s = new CardNote(34, 'Prueba', ' prueba de mis detalles', '2017-9-30', '2017-9-30', true);
$t = new CardNoteTable();

/*
$t->insertCardNote('Reunion', 'reunion con los empleados', '2017-9-20', '2017-9-20');
$t->insertCardNote('Prueba 2', 'prueba 2 de mis detalles', '2017-9-30', '2017-9-30');
$t->insertCardNote('Proyecto', 'terminar proyecto', '2017-9-15', '2017-9-30');
*/
echo json_encode($t->getAll());
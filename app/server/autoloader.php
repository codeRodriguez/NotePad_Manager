<?php
spl_autoload_register(function ($nombre_clase) {
    //include 'models/'.$nombre_clase . '.php';
    if(file_exists('models/'.$nombre_clase . '.php')) {
        include 'models/'.$nombre_clase . '.php';
    } else if(file_exists('persistence/'.$nombre_clase . '.php')) {
        include 'persistence/'.$nombre_clase . '.php';
    } else {
        echo "no existe";
    }
    
});
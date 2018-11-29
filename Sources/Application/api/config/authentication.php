<?php
function auth($permission) {
    if(checkAuth($permission)) return true;
    else {
        echo json_encode(
            array('permission' => 0)
        );
    }
}


function checkAuth($permission) {
    if(!isset($_SESSION))
        session_start();
        
    if(isset($_SESSION['role'])) {
        switch($permission) {
            case 'Admin': {
                if($_SESSION['role'] == 'Admin') return true;
                else return false;
                break;
            }
            case 'User': {
                if($_SESSION['role'] == 'User') return true;
                else return false;
                break;
            }
            case 'Journalist': {
                if($_SESSION['role'] == 'Journalist') return true;
                else return false;
                break;
            }
            default: 
                return true;
        }
    } else return false;
    
}
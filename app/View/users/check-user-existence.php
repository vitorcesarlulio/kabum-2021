<?php
include_once '../app/Model/connection-pdo.php';

$connectionDataBase = new ConnectionDataBase;

if (isset($_POST['loginUserRegister']) && !empty($_POST['loginUserRegister'])) {

    include_once '../app/Model/connection-pdo.php';
    
    # Verificando se ja existe o usuario no banco
    $userLogin  = filter_input(INPUT_POST, 'loginUserRegister', FILTER_SANITIZE_SPECIAL_CHARS);

    # Consultando no banco para ver se encontra algum usuário
    $queryCheckLogin = " SELECT usu_login FROM tb_usuarios WHERE usu_login=:usu_login; ";
    $selectLogin = $connectionDataBase::connectionDataBase()->prepare($queryCheckLogin);
    $selectLogin->bindParam("usu_login", $userLogin);
    $selectLogin->execute();

    # Vejo seencontrou alguma linha (registro) e retorno para o ajax falso ou verdadeiro
    if ($selectLogin->rowCount()) {
        $returnAjax = true;
    } else {
        $returnAjax = false;
    }
    header('Content-Type: application/json');
    echo json_encode($returnAjax);
}

?>
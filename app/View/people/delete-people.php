<?php
if (isset($_POST['data']) && !empty($_POST['data'])) {

    include_once '../app/Model/connection-pdo.php';
    $connectionDataBase = new ConnectionDataBase;

    $idPeople = filter_input(INPUT_POST, 'data', FILTER_SANITIZE_NUMBER_INT);

    //Para casos de deleção o ideal seria inativar ou verificar se existe algum vinculo para não prejudicar estrutura do banco de dados
    $queryDeleteContacts = " DELETE FROM tb_contatos WHERE pess_codigo=:pess_codigo; ";
    $deleteContacts = $connectionDataBase::connectionDataBase()->prepare($queryDeleteContacts);
    $deleteContacts->bindParam(":pess_codigo", $idPeople);
    $deleteContacts->execute();

    $queryDeleteUser = " DELETE FROM tb_pessoas WHERE pess_codigo=:pess_codigo; ";
    $deletePeople = $connectionDataBase::connectionDataBase()->prepare($queryDeleteUser);
    $deletePeople->bindParam(":pess_codigo", $idPeople);

    $deletePeople->execute() ? $returnAjax = true : $returnAjax = false;

    header('Content-Type: application/json');
    echo json_encode($returnAjax);
    exit;
}

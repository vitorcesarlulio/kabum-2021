<?php
if (isset($_POST['idContact']) && !empty($_POST['idContact'])) {
    
    include_once '../app/Model/connection-pdo.php';
    $connectionDataBase = new ConnectionDataBase;

    //Para casos de deleção o ideal seria inativar ou verificar se existe algum vinculo para não prejudicar estrutura do banco de dados
    $idContact = filter_input(INPUT_POST, 'idContact', FILTER_SANITIZE_NUMBER_INT);
    $queryDeleteContact = " DELETE FROM tb_contatos WHERE cont_codigo=:cont_codigo; ";
    $deleteContact = $connectionDataBase::connectionDataBase()->prepare($queryDeleteContact);
    $deleteContact->bindParam(":cont_codigo", $idContact);

    $deleteContact->execute() ? $returnAjax = true : $returnAjax = false;
    
    header('Content-Type: application/json');
    echo json_encode($returnAjax);
}
?>
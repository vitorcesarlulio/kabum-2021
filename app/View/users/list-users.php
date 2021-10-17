<?php
include_once '../app/Model/connection-pdo.php';
include_once '../app/View/method/method.php';

$connectionDataBase = new ConnectionDataBase;
$method = new Method;

# Filtros - Datas - Recebendo e validando 
$startDate  = $_POST['startDate'];
$endDate    = $_POST['endDate'];
((isset($startDate) && isset($endDate)) && ($startDate <> '' && $endDate <> '')) ? $dates = true : $dates = false;

# Filtros - Status - Recebendo e validando 
$getStatusUser = $_POST['statusUser'];
(isset($getStatusUser) && $getStatusUser <> '') ? $status = true : $status = false;

# Filtros - Nível de acesso - Recebendo e validando 
$getAccessLevel = $_POST['accessLevel'];
(isset($getAccessLevel) && $getAccessLevel <> '') ? $accessLevel = true : $accessLevel = false;

# Filtros - Login - Recebendo e validando 
$getFilterLogin = $_POST['filterLogin'];
(isset($getFilterLogin) && $getFilterLogin <> '') ? $login = true : $login = false;

# Filtros - Geral - Recebendo e validando 
$getSearchValue = $_POST["search"]["value"];
(isset($getSearchValue)) ? $geral = true : $geral = false;

# Filtros - Geral - Recebendo e validando 
$getSearchValue = $_POST["search"]["value"];
(isset($getSearchValue)) ? $geral = true : $geral = false;

# Limit
$getLimitLength = $_POST["length"];
$getLimitStart = $_POST["start"];
($getLimitLength <> -1) ? $limit = true : $limit = false;

$columns = [
   0 => 'usu_nome',
   1 => 'usu_sobrenome',
   2 => 'usu_login',
   3 => 'usu_permissoes',
   4 => 'usu_status',
   5 => 'usu_data_cadastro'
];

$querySelectLogin = "  SELECT 
               usu_codigo 
               ,usu_login
               ,DATE_FORMAT(usu_data_cadastro,'%d/%m/%Y %H:%i') AS usu_data_cadastro
               ,usu_nome
               ,usu_sobrenome
               ,usu_permissoes
               ,usu_status 
            FROM tb_usuarios 
            WHERE ";
# Filtros
   # Intervalo de Datas
   if ($dates) 
      $querySelectLogin .= " usu_data_cadastro BETWEEN DATE_FORMAT(:startDate, '%Y-%m-%d') AND DATE_FORMAT(:endDate, '%Y-%m-%d') AND ";
   # Status
   if ($status)
      $querySelectLogin .= " usu_status = :statusUser AND ";
   # Nível de Acesso
   if ($accessLevel)
      $querySelectLogin .= " usu_permissoes = :accessLevel AND ";
   # Login
   if ($login)
      $querySelectLogin .= " usu_codigo = :filterLogin AND ";
   # Geral
   if ($geral)
      $querySelectLogin .= " (usu_login LIKE :usu_login OR usu_nome LIKE :usu_nome OR usu_sobrenome LIKE :usu_sobrenome OR usu_permissoes LIKE :usu_permissoes OR DATE_FORMAT(usu_data_cadastro,'%d/%m/%Y') LIKE :usu_data_cadastro ) ";

if (isset($_POST["order"])) {
   $querySelectLogin .= " ORDER BY :orderColumn ".strtoupper($_POST['order']['0']['dir'])." ";
} else {
   $querySelectLogin .= ' ORDER BY usu_codigo DESC ';
}

if ($limit) {
   $querySelectLogin .= " LIMIT :start, :length ";
}

# Preparando Query
$selectLogin = $connectionDataBase::connectionDataBase()->prepare($querySelectLogin);
   # Atribuindo valores
      # Filtros
         // Intervalo de Datas
         if ($dates) {
            $selectLogin->bindParam("startDate", $startDate);
            $selectLogin->bindParam("endDate", $endDate);
         }
         // Status
         if ($status)
            $selectLogin->bindParam("statusUser", $getStatusUser);
         // Nível de Acesso
         if ($accessLevel)
            $selectLogin->bindParam("accessLevel", $getAccessLevel);
         // Login
         if ($login)
            $selectLogin->bindParam("filterLogin", $getFilterLogin);
         // Geral
         if ($geral) {
            $searchValue = "%".$getSearchValue."%";
            $selectLogin->bindParam("usu_login", $searchValue);
            $selectLogin->bindParam("usu_nome", $searchValue);
            $selectLogin->bindParam("usu_sobrenome", $searchValue);
            $selectLogin->bindParam("usu_permissoes", $searchValue);
            $selectLogin->bindParam("usu_data_cadastro", $searchValue);
         }
      if (isset($_POST["order"])) {
         $selectLogin->bindParam("orderColumn", $columns[$_POST['order']['0']['column']]);
      }
      if ($limit) {
         $selectLogin->bindParam("start", $getLimitStart);
         $selectLogin->bindParam("length", $getLimitLength);
      }

# Executando query
$selectLogin->execute();

# Total de registros filtrados
$numberFilteredRow =  $selectLogin->rowCount();

# Tradução dos tipos
$permitionUser = [
   "admin" => "Administrador",
   "user" => "Usuário"
];

$statusUser = [
   "A" => "Ativo",
   "I" => "Inativo"
];

$data = [];
while ($row = $selectLogin->fetch(\PDO::FETCH_ASSOC)) {
   $subArray   = [];
   $subArray[] = $row["usu_nome"] . " " . $row["usu_sobrenome"];
   $subArray[] = $row["usu_login"];
   $subArray[] = $permitionUser[$row["usu_permissoes"]];
   $subArray[] = $statusUser[$row["usu_status"]];
   $subArray[] = $row["usu_data_cadastro"];
   $subArray[] = '
   <div class="btn-group btn-group-sm">
      <button type="button" name="editUser" class="btn btn-warning btn-edit-user" id="' . $row["usu_codigo"] . '">
         <i class="fas fa-edit"></i>
      </button>    
      <button type="button" name="deleteUser" class="btn btn-danger btn-delete-user" id="deleteUser" onclick="confirmDeleteRecord(' . $row["usu_codigo"] . ', `/usuarios/apagar`, `#listUsers`, `Sucesso: usuário apagado!`, `Erro: usuário não apagado!`);">
         <i class="fas fa-trash"></i>
      </button>
   </div>';
   $data[]     = $subArray;
}

function getAllData($connectionDataBase){
   $querySelectTotalRecords = " SELECT COUNT(usu_codigo) AS totalRecords FROM tb_usuarios; ";
   $selectTotalRecords = $connectionDataBase->prepare($querySelectTotalRecords);
   $selectTotalRecords->execute();
   $selectTotalRecords = $selectTotalRecords->fetch(\PDO::FETCH_ASSOC);
   return $selectTotalRecords["totalRecords"];
}

$output = [
   "draw"            => intval($_POST["draw"]),
   "recordsTotal"    => $method::getAllData($connectionDataBase::connectionDataBase(), 'usu_codigo', 'tb_usuarios'), // Total de registros
   "recordsFiltered" => $numberFilteredRow, // Total de registros filtrados
   "data"            => $data // Dados
];

echo json_encode($output);
<?php
include_once '../app/Model/connection-pdo.php';
include_once '../app/View/method/method.php';

$connectionDataBase = new ConnectionDataBase;
$method = new Method;

# Filtros - Datas - Recebendo e validando 
$startDate  = $_POST['startDate'];
$endDate    = $_POST['endDate'];
((isset($startDate) && isset($endDate)) && ($startDate <> '' && $endDate <> '')) ? $dates = true : $dates = false;

# Filtros - Geral - Recebendo e validando 
$getSearchValue = $_POST["search"]["value"];
(isset($getSearchValue)) ? $geral = true : $geral = false;

# Limit
$getLimitLength = $_POST["length"];
$getLimitStart = $_POST["start"];
($getLimitLength <> -1) ? $limit = true : $limit = false;

$columns = [
   0 => 'pess_nome',
   1 => 'pess_cpfcnpj',
   2 => 'pess_classificacao',
   3 => 'pess_logradouro',
   4 => 'pess_cep',
   5 => 'pess_observacao'
];

$querySelectPeople = " SELECT * FROM tb_pessoas WHERE ";

# Filtros
   # Intervalo de Datas
   if ($dates) {
      $querySelectPeople .= " pess_data_cadastro BETWEEN DATE_FORMAT(:startDate, '%Y-%m-%d') AND DATE_FORMAT(:endDate, '%Y-%m-%d') AND ";
   }
   # Geral
   if ($geral)
      $querySelectPeople .= " (pess_tipo LIKE :pess_tipo OR pess_nome LIKE :pess_nome OR pess_sobrenome LIKE :pess_sobrenome OR pess_logradouro LIKE :pess_logradouro OR pess_cidade LIKE :pess_cidade) ";

if (isset($_POST["order"])) {
   $querySelectPeople .= " ORDER BY :orderColumn ".strtoupper($_POST['order']['0']['dir'])." ";
} else {
   $querySelectPeople .= ' ORDER BY usu_codigo DESC ';
}

if ($limit) {
   $querySelectPeople .= " LIMIT :start, :length ";
}

# Preparando Query
$selectPeople= $connectionDataBase::connectionDataBase()->prepare($querySelectPeople);
   # Atribuindo valores
      # Filtros
         // Intervalo de Datas
         if ($dates) {
            $selectPeople->bindParam("startDate", $startDate);
            $selectPeople->bindParam("endDate", $endDate);
         }
         // Geral
         if ($geral) {
            $searchValue = "%".$getSearchValue."%";
            $selectPeople->bindParam("pess_tipo", $searchValue);
            $selectPeople->bindParam("pess_nome", $searchValue);
            $selectPeople->bindParam("pess_sobrenome", $searchValue);
            $selectPeople->bindParam("pess_logradouro", $searchValue);
            $selectPeople->bindParam("pess_cidade", $searchValue);
         }
      if (isset($_POST["order"])) {
         $selectPeople->bindParam("orderColumn", $columns[$_POST['order']['0']['column']]);
      }
      if ($limit) {
         $selectPeople->bindParam("start", $getLimitStart);
         $selectPeople->bindParam("length", $getLimitLength);
      }

# Executando query
$selectPeople->execute();

# Total de registros filtrados
$numberFilteredRow =  $selectPeople->rowCount();

$classificationPeople = [
   "C" => "Cliente",
   "F" => "Fornecedor"
];

$data = [];
while ($row = $selectPeople->fetch(\PDO::FETCH_ASSOC)) {
   $subArray   = [];
   $subArray[] = $row["pess_nome"] . " " . $row["pess_sobrenome"] . " " . $row["pess_razao_social"];
   $subArray[] = $row["pess_cpfcnpj"];
   $subArray[] = $classificationPeople[$row["pess_classificacao"]];;
   $subArray[] = $row["pess_logradouro"] . ", " . $row["pess_log_numero"] . " - " . $row["pess_bairro"];
   $subArray[] = $row["pess_cidade"]. ", " . $row["pess_estado"];
   $subArray[] = $row["pess_cep"];
   $subArray[] = '
   <div class="btn-group btn-group-sm">
      <button type="button" name="editPeople" class="btn btn-warning btn-edit-people" id="' . $row["pess_codigo"] . '"><i class="fas fa-edit"></i></button>     
      <button type="button" name="deletePeople" class="btn btn-danger btn-delete-people" id="deletePeople" onclick="confirmDeleteRecord(' . $row["pess_codigo"] . ', `/pessoas/apagar`, `#listPeople`, `Sucesso: pessoa e seus contatos apagados!`, `Erro: pessoa e seus contatos não apagada!`);">
         <i class="fas fa-trash"></i>
      </button>
   </div>';
   $data[]     = $subArray;
}

$output = [
   "draw"            => intval($_POST["draw"]),
   "recordsTotal"    => $method::getAllData($connectionDataBase::connectionDataBase(), 'pess_codigo', 'tb_pessoas'),
   "recordsFiltered" => $numberFilteredRow,
   "data"            => $data
];

echo json_encode($output);

<?php
session_start();
include_once '../app/Model/connection-pdo.php';
include_once '../app/View/method/method.php';

$connectionDataBase = new ConnectionDataBase;
$method = new Method;

$userLogin = $_SESSION["loginUser"];

# Consultando no banco para ver se encontra algum usuário
$queryCheckLogin = " SELECT usu_login, usu_permissoes, usu_status FROM tb_usuarios WHERE usu_login=:usu_login; ";
$selectLogin = $connectionDataBase::connectionDataBase()->prepare($queryCheckLogin);
$selectLogin->bindParam("usu_login", $userLogin);
$selectLogin->execute();
$dataUserCheck = $selectLogin->fetch(\PDO::FETCH_ASSOC);

# Vejo seencontrou alguma linha (registro)
$countRow = 0;
$countRow = $selectLogin->rowCount();

if ($countRow === 0) {
    foreach (array_keys($_SESSION) as $key) {
        unset($_SESSION[$key]);
    }
    session_destroy();
    header("Location: /"); 
}

# Pegando IP do usuário
$ipAdressUser = method::ipUser();

# Proteger contra roubo de sessão
session_regenerate_id(true);

if ($_SESSION['canary']['IP'] !== $ipAdressUser) {
    # Destruir as sessoes, caso o ip seja diferente no meio da sessao
    foreach (array_keys($_SESSION) as $key) {
        unset($_SESSION[$key]);
        # Seto uma nova sessao
        $_SESSION['canary'] = [
            "birth" => time(),
            "IP" => $ipAdressUser
        ];
    }
}

# Se passou 5 minutos quer dizer que é o mesmo usuario 
if ($_SESSION['canary']['birth'] < time() - CONFIRMUSERTIME) {
    $_SESSION['canary'] = [
        "birth" => time(),
        "IP" => $ipAdressUser,
        "time" => time()
    ];
}

# Verificando as paginas internas
if (!isset($_SESSION['login']) || !isset($_SESSION['permition']) || !isset($_SESSION['canary'])) {
    foreach (array_keys($_SESSION) as $key) {
        unset($_SESSION[$key]);
    }
    echo " <script> alert('Você não está logado'); window.location.href='/'; </script> ";
} else {
    if ($_SESSION['time'] >= time() - BLOCKEDTIME) {
        $_SESSION['time'] = time();
    } else {
        foreach (array_keys($_SESSION) as $key) {
            unset($_SESSION[$key]);
        }
        echo " <script> alert('Sua sessão expirou. Faça login novamente!'); window.location.href='/'; </script> ";
exit;
    }
}

# Verificando se os dados do banco sao iguais as sessions, se eu trocar a permissao dele qaundo ele carrega a pagina ja faço ele fazer login dnv, se nao ele tem acesso ao sistema enquanto nao fizer logout
if ($dataUserCheck['usu_permissoes'] === $_SESSION['permition']) {
}else{
    foreach (array_keys($_SESSION) as $key) {
        unset($_SESSION[$key]);
    }
    session_destroy();
    echo " <script> alert('Sua permissão foi alterada. Faça login novamente!'); window.location.href='/'; </script> ";
}

# Verificando se os dados do banco sao iguais as sessions, se eu trocar o status dele qaundo ele carrega a pagina ja faço ele fazer login dnv, se nao ele tem acesso ao sistema enquanto nao fizer logout
if ($dataUserCheck['usu_status'] === "A") {
}else{
    foreach (array_keys($_SESSION) as $key) {
        unset($_SESSION[$key]);
    }
    session_destroy();
    echo " <script> alert('Seu status foi alterado. Faça login novamente!'); window.location.href='/'; </script> ";
}

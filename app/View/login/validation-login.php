<?php
include_once '../app/Model/connection-pdo.php';
include_once '../app/View/method/method.php';

# Instanciando objetos
$connectionDataBase = new ConnectionDataBase;
$method = new Method;

# Recebendo os dados que o usuário informou e verifcando se existe os dados
// se null isset() retornará false
if (isset($_POST['userLogin']) && isset($_POST['passwordLogin'])) {
    //PDO já trata contra SQL Injection
    $userLogin     = filter_input(INPUT_POST, 'userLogin', FILTER_SANITIZE_SPECIAL_CHARS);
    $passwordLogin = filter_input(INPUT_POST, 'passwordLogin', FILTER_DEFAULT);
}
$remember = (isset($_POST['remember'])) ? $_POST['remember'] : '';

# Verifico se nao esta vazio esses dados (Pode se tornar redundante empty)
if (!empty($userLogin) && !empty($passwordLogin)) {
    # Pegando IP do usuário
    $ipAdressUser = method::ipUser();

    # Consultando no banco para ver se encontra algum usuário
    $queryCheckLogin = " SELECT usu_login, usu_senha, usu_nome, usu_sobrenome, usu_permissoes, usu_status FROM tb_usuarios WHERE usu_login=:usu_login; ";
    $selectLogin = $connectionDataBase::connectionDataBase()->prepare($queryCheckLogin);
    $selectLogin->bindParam("usu_login", $userLogin);
    $selectLogin->execute();
    //Deveria fechar a conexão
    //$connectionDataBase = null;
    //Opção tambem de colocar try catch, se fosse uma transação em lote é quase obrigatorio, assim se der algum erro da pra dar rollback

    # Vejo se encontrou alguma linha (registro)
    $countRow = 0;
    $countRow = $selectLogin->rowCount();

    # Pegando os dados do usuario que esta tentando fazer o login
    $dataUserLogin = $selectLogin->fetch(\PDO::FETCH_ASSOC);

    # Verifico se encontrou o registro (1 sim, 0 não) e se a senha bate com a do banco
    if ($countRow === 1 && password_verify($passwordLogin, $dataUserLogin['usu_senha'])) {
        # verifico se o status dele é ativo
        if ($dataUserLogin['usu_status'] === "A") {
            # Deletando as tentativas do usuario de acordo com o IP que ele esta acessando
            $queryDeleteAttempt = " DELETE FROM tb_tentativas WHERE ten_ip=:ten_ip; ";
            $deleteAttempt = $connectionDataBase::connectionDataBase()->prepare($queryDeleteAttempt);
            $deleteAttempt->bindParam("ten_ip", $ipAdressUser);
            $deleteAttempt->execute();

            # Criando as sessions que vou usar
            session_start();
            $_SESSION["login"]     = true;
            $_SESSION["time"]      = time();
            $_SESSION["name"]      = $dataUserLogin['usu_nome'] . " " . $dataUserLogin['usu_sobrenome'];
            $_SESSION["loginUser"] = $dataUserLogin['usu_login'];
            $_SESSION["permition"] = $dataUserLogin['usu_permissoes'];

            # Proteger contra roubo de sessão
            $par = null;
            if ($par == null) {
                // Criando variavel array de sessão
                $_SESSION['canary'] = [
                    "birth" => time(),
                    "IP" => $ipAdressUser
                ];
            } else {
                $_SESSION['canary']['birth'] = time();
            }

            # Dizendo que não houve tentativas
            $attempts       = false;
            $errors         = false;
            $errorStatus    = false;
            $opportunities  = false;

            # Criando Cookies para o "Lembre-me"
            if ($remember == 'rememberYes') {
                setCookie('CookieRemember', base64_encode('rememberYes'), EXPIRECOOKIE);
                setCookie('CookieUser', base64_encode($userLogin), EXPIRECOOKIE);
                setCookie('CookiePassword', base64_encode($passwordLogin), EXPIRECOOKIE);
            } else {
                setCookie('CookieRemember');
                setCookie('CookieUser');
                setCookie('CookiePassword');
            }    

        } else {
            $errorStatus = true;
            $attempts = "";
            $errors = "";
            $opportunities = false;
        }
    } else {
        # Dizendo que houve tentativas
        $errors = true;
        $errorStatus = false;

        # Opcional
        //$_SESSION["login"]     = false;

        # Tentativas
        $r = method::attempt($ipAdressUser, $connectionDataBase::connectionDataBase());

        # Vendo se ja foram X tentativas, se sim, para de inserir
        if ($r < ATTEMPTS) {
            $queryinsertAttempt = " INSERT INTO tb_tentativas (ten_ip) VALUES (:ten_ip); ";
            $insertAttempt = $connectionDataBase::connectionDataBase()->prepare($queryinsertAttempt);
            $insertAttempt->bindParam(':ten_ip', $ipAdressUser);
            $insertAttempt->execute();

            $opportunities = $r;
        }

        # Se errar mais de X vezes deixo a variavel $attempts como true
        if ($r >= ATTEMPTS) {
            $attempts = true;
            $opportunities = false;
        } else {
            $attempts = false;
        }
    }

    # Retornando os resultados para o Ajax
    $returnAjax = ['redirect' => '/home', 'attempts' => $attempts, 'errors' => $errors, 'errorStatus' => $errorStatus, 'opportunities' => $opportunities];
    header('Content-Type: application/json');
    echo json_encode($returnAjax);
}
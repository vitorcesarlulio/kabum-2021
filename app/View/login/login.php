<?php
include_once '../app/Model/connection-pdo.php';
include_once '../app/View/method/method.php';

session_start();
if($_SESSION){
    header("Location: /home");
}

$connectionDataBase = new ConnectionDataBase;
$method = new Method;

# Lembre-me
$loginRemember    = (isset($_COOKIE['CookieUser'])) ? base64_decode($_COOKIE['CookieUser']) : null;
$passwordRemember = (isset($_COOKIE['CookiePassword'])) ? base64_decode($_COOKIE['CookiePassword']) : null;
$remember         = (isset($_COOKIE['CookieRemember'])) ? base64_decode($_COOKIE['CookieRemember']) : null;
$checkedRemember  = ($remember == 'rememberYes') ? 'checked' : null;

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="Vítor César Lulio">
    <title>Kabum | Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?= DIRPLUGINS . 'fontawesome-free/css/all.min.css' ?>">
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" href="<?= DIRPLUGINS . 'icheck-bootstrap/icheck-bootstrap.min.css' ?>">
    <link rel="stylesheet" href="<?= DIRCSS . 'adminlte.min.css' ?>">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
    <link rel="stylesheet" href="<?= DIRPLUGINS . 'toastr/toastr.min.css' ?>">
    <style>

        .login-page {
            background-image: url("<?= DIRIMG . 'login-kabum.png' ?>") !important;
            max-width: 100% !important;
            background-size: 100% !important;
            background-repeat: no-repeat !important; 
            background-size: cover !important;
        }

        .btn-primary {
            background-color: #FF6500 !important;
            border-color: #FF6500 !important;
            color: #fff !important;
        }

        .btn-primary:hover {
            background-color: #803100 !important;
            border-color: #803100 !important;
            color: #fff !important;
        }

        .btn.disabled,
        .btn:disabled {
            background-color: #803100 !important;
            border-color: #803100 !important;
            color: #fff;
        }

        .icheck-primary>input:first-child:checked+input[type=hidden]+label::before,
        .icheck-primary>input:first-child:checked+label::before {
            background-color: #FE5000 !important;
            border-color: #FE5000 !important;
        }

        .login-card-body,
        .register-card-body {
            color: #000 !important;
        }

        .alert {
            text-align: center !important;
            border-radius: .0rem !important;
            background: #961500 !important;
            border-color: #961500 !important;
        }
    </style>

</head>

<body class="hold-transition login-page">
    <div class="login-box">

        <div class="card">

            <div class="card-body login-card-body">
                <div class="login-logo"><img src="<?= DIRIMG . 'login-logotipo-kabum.png' ?>" value="Logotipo - Kabum"></div>
                <p class="login-box-msg">Faça login para iniciar sua sessão</p>
                <form id="formLogin" method="POST" autocomplete="off">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Usuário" name="userLogin" id="userLogin" value="<?= $loginRemember ?>">
                        <div class="input-group-append">
                            <div class="input-group-text">
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" placeholder="Senha" name="passwordLogin" id="passwordLogin" value="<?= $passwordRemember ?>">
                        <div class="input-group-append">
                            <div class="input-group-text" id="divShowPassword">
                                <span class="far fa-eye" onclick="showHidePassword()" style="cursor: pointer;" id="showPassword">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember" name="remember" value="rememberYes" <?= $checkedRemember ?>>
                                <label for="remember">Lembre-me</label>
                            </div>
                        </div>
                        <div class="col-4" id="divBtnLogin">
                            <button type="submit" value="Entrar" class="btn btn-primary btn-block" id="btnLogin">Entrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="<?= DIRPLUGINS . 'jquery/jquery.min.js' ?>"></script>
    <script src="<?= DIRPLUGINS . 'bootstrap/js/bootstrap.bundle.min.js' ?>"></script>
    <script src="<?= DIRJS . 'adminlte.min.js' ?>"></script>
    <script src="<?= DIRPLUGINS . 'jquery-validation/jquery.validate.min.js' ?>"></script>
    <script src="<?= DIRPLUGINS . 'jquery-validation/additional-methods.min.js' ?>"></script>
    <script src="<?= DIRPLUGINS . 'moment/moment.min.js' ?>"></script>
    <script src="<?= DIRJS . 'login/login.min.js' ?>"></script>
    <script src="<?= DIRPLUGINS . 'toastr/toastr.min.js' ?>"></script>

    <?php
        # Pegando IP do usuário
        $ipAdressUser = method::ipUser();

        # Tentativas
        $r = method::attempt($ipAdressUser, $connectionDataBase::connectionDataBase());

        if ($r >= ATTEMPTS) {
            //pegando a ultimo registro daquele ip bloqueado so para exibir para o user e somar X minutos
            $querySelectAttemp2 = " SELECT ten_id, ten_data, ten_ip FROM tb_tentativas WHERE ten_ip=:ten_ip ORDER BY ten_id DESC ";
            $selectAttemp2 = $connectionDataBase::connectionDataBase()->prepare($querySelectAttemp2);
            $selectAttemp2->bindParam('ten_ip', $ipAdressUser);
            $selectAttemp2->execute();
            $selectAttemp2 = $selectAttemp2->fetch(\PDO::FETCH_ASSOC); //não esta pegando a ultima data ele pega a primeira vez que o user errou

            //Somando X minutos
            $dateTime = new DateTime(date("H:i", strtotime($selectAttemp2['ten_data'])));

            $dateTime = $dateTime->modify("+".BLOCKEDTIME." second")->format("H:i");

            echo '
            <script>
                function block() {
                    $(".login-box").html(`
                    <div class="alert alert-danger alert-dismissible" id="divErrors">
                        <h5><i class="icon fas fa-ban"></i>Tentativas excedidas!</h5>
                        Tente novamente às <b>'.$dateTime.' '.(BLOCKEDTIME/60).' minuto(s)</b> ou entre em contato com o Administrador do sistema!
                    </div>`);
                }

                block();
            </script>';
        } else {
            echo ` $(".alert alert-danger").remove(); ` ;//if ($(this).hasClass(".alert alert-danger")) {  }
        }
    ?>
</body>

</html>
<?php
//header("Content-Type: text/html; charset=utf-8");
require_once '../app/View/login/check-login.php';

# Periodos do dia para Saudar User
$hour = new DateTime("now", (new DateTimeZone("America/Sao_Paulo")));
$hour = date_format($hour, 'H');
if ($hour >= 12 && $hour < 18) {
  $periodDay = "Boa tarde, ";
} else if ($hour >= 0 && $hour < 12) {
  $periodDay = "Bom dia, ";
} else {
  $periodDay = "Boa noite, ";
}

$nameUser = explode(" ", $_SESSION['name']);
$nameUser = $nameUser[0];
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="author" content="Ouse Inteligência em Marcas">
  <title>Kabum | <?php echo $__env->yieldContent('title'); ?></title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="<?= DIRPLUGINS . 'fontawesome-free/css/all.min.css' ?>">
  <?php echo $__env->yieldContent('head'); ?>
  <!-- Theme style -->
  <link rel="stylesheet" href="<?= DIRCSS . 'adminlte.min.css' ?>">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="<?= DIRPLUGINS . 'overlayScrollbars/css/OverlayScrollbars.min.css' ?>">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
  <!-- pace-progress -->
  <link rel="stylesheet" href="<?= DIRPLUGINS . 'pace-progress/themes/black/pace-theme-flat-top.css' ?>">
  <link rel="stylesheet" href="<?= DIRPLUGINS . 'toastr/toastr.min.css' ?>">
  <?php echo $__env->yieldContent('css'); ?>
  <style>
    .brand-link .brand-image {
      margin-top: 3px !important;
    }

    .brand-text {
      margin-left: 2px !important;
    }

    .elevation-2 {
      box-shadow: none !important;
    }

    .main-header {
      border-bottom: none;
    }

    [class*=sidebar-dark] .brand-link {
      border-bottom: none !important;
    }

    [class*=sidebar-dark-] .sidebar a {
      color: #fff !important;
    }

    .d-md-inline {
      color: rgba(0, 0, 0, 0.5) !important;
    }

    .modal-header{
        background-color: #3BA4BF !important;
        color: #fff !important;
    }
  </style>
</head>

<body class="hold-transition pace-primary pace-done sidebar-mini sidebar-collapse">
  <div class="pace pace-inactive">
    <div class="pace-progress" data-progress-text="100%" data-progress="99" style="transform: translate3d(100%, 0px, 0px);">
      <div class="pace-progress-inner"></div>
    </div>
    <div class="pace-activity"></div>
  </div>
  <div class="wrapper">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
      </ul>
      <span class="d-none d-md-inline"> <?= $periodDay . $nameUser . "!"; ?> </span>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown user-menu">
          <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <img src="<?= DIRIMG . "/image-user.png"; ?>" class="user-image img-circle elevation-2" alt="User Image">
            <span class="d-none d-md-inline"> <?= $_SESSION['name']; ?> </span>
          </a>
          <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right" style="left: inherit; right: 0px;">
            <li class="user-header bg-primary">
              <img src="<?= DIRIMG . "/image-user.png"; ?>" class="img-circle elevation-2" alt="User Image">
              <p>
                <?= $_SESSION['name']; ?>
                <small> <b>Nível de acesso:</b> <?php if ($_SESSION['permition'] === 'admin') {
                                                  echo 'Administrador';
                                                } else {
                                                  echo 'Usuário';
                                                } ?> </small>
              </p>
            </li>
            <li class="user-footer">
              <a href="/logout" class="btn btn-default btn-flat float-right"><i class="fas fa-sign-out-alt"></i></a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/home" class="brand-link">
        <img src=<?= DIRIMG . 'home-pictograma-habum.png' ?> alt="Kabum - Pictograma" class="brand-image">
        <span class="brand-text font-weight-light"></span>
      </a>

      <div class="sidebar">
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column nav-legacy" data-widget="treeview" role="menu" data-accordion="false"> <!-- se quiser tirar o nav-legacy -->
            <?php
            if ($_SESSION["permition"] === "admin") {
              echo '<li class="nav-item has-treeview"> <a href="/usuarios" class="nav-link"> <i class="nav-icon fas fa-users"></i> <p> Usuários </p> </a> </li>';
            }
            ?>

            <li class="nav-header">OUTROS</li>
            <li class="nav-item">
              <a href="/readme" class="nav-link" target="_blank">
                <i class="nav-icon far fas fa-file-alt"></i>
                <p class="text">Readme</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="https://github.com/vitorcesarlulio/" class="nav-link" target="_blank">
                <i class="nav-icon fab fa-github"></i>
                <p class="text">GitHub</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="https://www.linkedin.com/in/vitor-cesar-lulio/" class="nav-link" target="_blank">
                <i class="nav-icon fab fa-linkedin"></i>
                <p class="text">LinkedIn</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="https://www.youtube.com/channel/UC8gstlxBhvKSsMVnEQhb8Cg?view_as=subscriber" class="nav-link" target="_blank">
                <i class="nav-icon fab fa-youtube"></i>
                <p class="text">YouTube</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="malito:vitorcesarlulio@hotmail.com" class="nav-link" target="_blank">
                <i class="nav-icon fas fa-envelope"></i>
                <p class="text">E-mail</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1><?php echo $__env->yieldContent('title'); ?></h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="/home">Home</a></li>
                <?php echo $__env->yieldContent('breadcrumb'); ?>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section class="content">
        <?php echo $__env->yieldContent('content'); ?>
        <!-- <a id="back-to-top" href="#" class="btn btn-primary back-to-top" role="button" aria-label="Scroll to top">
          <i class="fas fa-chevron-up"></i>
        </a> -->
      </section>
    </div>

    <footer class="main-footer">
      <strong>Copyright &copy; <?php echo e(date('Y')); ?> <a href="https://www.linkedin.com/in/vitor-cesar-lulio/" target="_blank">Vítor César Lulio</a>.</strong>
      Todos os direitos reservados.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 0.0.0
      </div>
    </footer>
  </div>

  <!-- Scripts, JavaScript (efeitos, validaçoes), jQuery -->
  <!-- PADRÃO jQuery -->
  <script src="<?= DIRPLUGINS . 'jquery/jquery.min.js' ?>"></script>

  <!-- Bootstrap 4 (nao sei o que é) -->
  <script src="<?= DIRPLUGINS . 'bootstrap/js/bootstrap.bundle.min.js' ?>"></script>

  <!-- jQuery UI -->
  <script src="<?= DIRPLUGINS . 'jquery-ui/jquery-ui.min.js' ?>"></script>

  <!-- AdminLTE App (nao sei o que é)-->
  <script src="<?= DIRJS . 'adminlte.min.js' ?>"></script>

  <!-- overlayScrollbars -->
  <script src="<?= DIRPLUGINS . 'overlayScrollbars/js/jquery.overlayScrollbars.min.js' ?>"></script>

  <!-- AdminLTE for demo purposes (nao sei o que é) -->
  <script src="<?= DIRJS . 'demo.js' ?>"></script>

  <!-- JQuery validation -->
  <script src="<?= DIRPLUGINS . 'jquery-validation/jquery.validate.min.js' ?>"></script>
  <script src="<?= DIRPLUGINS . 'jquery-validation/additional-methods.min.js' ?>"></script>

  <!-- Alerta de cadastro - Toastr Examples -->
  <script src="<?= DIRPLUGINS . 'toastr/toastr.min.js' ?>"></script>
  <!-- Modal de confirmação -->
  <script src="<?= DIRJS . 'global-functions/confirm-action.min.js' ?>"></script>
  <?php echo $__env->yieldContent('script'); ?>

  <script>
  </script>
  <!-- PADRÃO pace-progress (ao carregar a pagina faz o efeito na barra de favoritos)-->
  <script src="<?= DIRPLUGINS . 'pace-progress/pace.min.js' ?>"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>
</body>

</html><?php /**PATH C:\xampp\htdocs\kabum-vitor-cesar-luio\app\View/templates/default.blade.php ENDPATH**/ ?>
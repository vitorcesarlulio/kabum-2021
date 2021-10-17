<?php
require_once "../src/vendor/autoload.php"; //composer
use Jenssegers\Blade\Blade; //Blade template
use \PlugRoute\PlugRoute;
use \PlugRoute\RouteContainer;
use \PlugRoute\Http\RequestCreator;

$blade = new Blade('../app/View/', '../app/View/cache');

$route = new PlugRoute(new RouteContainer(), RequestCreator::create());

/**
 * Login
 */
$route->get('/', function () {
    #Verifico se ja esta logado e direciono para home
    /* if (isset($_SESSION['login']) && isset($_SESSION['name']) && isset($_SESSION['canary']) && isset($_SESSION['name']) && isset($_SESSION['loginUser']) && isset($_SESSION['permition'])) {
    echo " <script> window.location.href='/home'; </script> ";
} */
    include '../app/View/login/login.php';
});

/**
 * Verificar Login
 */
$route->post('/verificar-login', function () {
    include '../app/View/login/validation-login.php';
});

/**
 * Loading
 */
$route->get('/carregar', function () {
    include '../app/View/templates/loading.php';
});

/**
 * Home
 */
$route->get('/home', function () use ($blade) {
    echo $blade->render('home.home');
});

/**
 * Usuários
 */
$route->group(['prefix' => '/usuarios'], function ($route) use ($blade) {

    $route->get('', function () use ($blade) {
        echo $blade->render('users.users');
    });

    $route->post('/listar', function () {
        include '../app/View/users/list-users.php';
    });

    $route->post('/verificar-existencia-usuario', function () {
        include '../app/View/users/check-user-existence.php';
    });

    $route->post('/cadastrar', function () {
        include '../app/View/users/register-user.php';
    });

    $route->post('/listar-editar', function () {
        include '../app/View/users/list-user-edit.php';
    });

    $route->post('/editar', function () {
        include '../app/View/users/edit-user.php';
    });

    $route->post('/apagar', function () {
        include '../app/View/users/delete-users.php';
    });
});

/**
 * Pessoas
 */
$route->group(['prefix' => '/pessoas'], function ($route) use ($blade) {

    $route->get('', function () use ($blade) {
        echo $blade->render('people.people');
    });
    $route->post('/listar', function () {
        include '../app/View/people/list-people.php';
    });

    $route->post('/verificar-existencia-pessoa', function () {
        include '../app/View/people/check-people-existence.php';
    });
    $route->post('/cadastrar', function () {
        include '../app/View/people/register-people.php';
    });

    $route->post('/listar-editar', function () {
        include '../app/View/people/list-people-edit.php';
    });
    $route->post('/editar', function () {
        include '../app/View/people/edit-people.php';
    });
    $route->post('/listar-contatos', function () {
        include '../app/View/people/list-people-contact.php';
    });
    $route->post('/deletar-contato', function () {
        include '../app/View/people/delete-contact.php';
    });
    $route->post('/cadastrar-contato', function () {
        include '../app/View/people/register-contact.php';
    });

    $route->post('/apagar', function () {
        include '../app/View/people/delete-people.php';
    });
});

/**
 * Rota de Erros
 */
$route->notFound(function () use ($blade) {
    echo $blade->render('templates.404');
});

/**
 * Logout
 */
$route->get('/logout', function () {
    include '../app/View/login/logout.php';
});

$route->on();

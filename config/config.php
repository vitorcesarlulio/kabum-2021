<?php

/**
 * Arquivos diretórios raízes
 */
$PastaInterna = ""; //Caso o sistema fique dentro de uma pasta, voce deve colocar o nome da pasta entre as aspats duplas. Exemplo: http://localhost/kabum/ ($PastaInterna = "kabum";)
define('DIRPAGE', "http://{$_SERVER['HTTP_HOST']}/{$PastaInterna}"); //CAMINHO DO SISTEMA NO LOCAL HOST (HTTP) URL. Exemplo: http://localhost/

//
/**
 * CAMINHO FISICO (C:...)
 * SE A ULTIMA LETRA DO SERVER FOR IGUAL A UMA BARRA
 */
if (substr($_SERVER['DOCUMENT_ROOT'], -1) == '/') {
    define('DIRREQ', "{$_SERVER['DOCUMENT_ROOT']}{$PastaInterna}"); //NO LOCALHOST JA VEM COM A BARRA NO FINAL, MAS NA MAIORIA DOS SERVIDORES NAO
} else {
    define('DIRREQ', "{$_SERVER['DOCUMENT_ROOT']}/{$PastaInterna}"); //ADICCIONANDO A BARRA NO FINAL CASO NAO TENHA A BARRA NO FINAL
}

/**
 * Diretórios Específicos
 */
    define('DIRIMG',     "../img/"); //SE QUISER ADD DIRPAGE."../img/"
    define('DIRCSS',     "../css/");
    define('DIRPLUGINS', "../plugins/");
    define('DIRJS',      "../js/");
    define("DOMAIN",$_SERVER["HTTP_HOST"]);

/**
 * Acesso ao banco de dados
 */
    define('HOST', "127.0.0.1");
    define('PORT', "3306");
    define('DATABASE', "database_kabum_2021");
    define('USER', "root");
    define('PASSWORD', "");
    define('CHARSET', "utf8mb4");

/**
 * Parâmetros do módulo
 */

    # Segurança
        define('EXPIRECOOKIE', time() + 60 * 60 * 24 * 30); //30 dias

        define('ATTEMPTS', 5); //5 Tentativas o úsurio tem para login

        // Somente é permitido trabalhar com segundos e que o bloqueio dure mais de 60 segundos
        define('BLOCKEDTIME', 1200); //1200 = 20 minutos

        define('CONFIRMUSERTIME', 300); //300 = 5 minutos

    # Datas
        date_default_timezone_set('America/Sao_Paulo');

    # Descomente para exibir erros
        # ini_set('display_errors', 0 );
        # error_reporting(0);
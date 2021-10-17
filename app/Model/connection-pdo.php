<?php

class ConnectionDataBase {
    private static $connection;

    public function __construct() {

    }

    public static function connectionDataBase(){
        try {
            if (!isset(self::$connection)) {
                self::$connection = new \PDO("mysql:host=" . HOST .":" . PORT . ";dbname=" . DATABASE . ";charset=". CHARSET , USER, PASSWORD, [
                    PDO::ATTR_PERSISTENT => true
                    ,PDO::ATTR_EMULATE_PREPARES => false 
                    ,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION // Consultas de banco de dados não revelarão dados confidenciais
                    ,PDO::NULL_EMPTY_STRING => true // Converter a cadeia vazia para NULL
            ]);
            //opção de salvar no banco ultimas conexoes?
            }
        } catch(\PDOException $e){
            return "Erro C01, encaminhe para adminstrador do sistema"; // . $e->getMessage();
        }

        return self::$connection;
    }
}

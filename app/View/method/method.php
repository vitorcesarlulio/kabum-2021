<?php
include_once '../app/Model/connection-pdo.php';

class Method {

    public static $ipAdressUser;

    public function __construct() {

    }

    public static function ipUser(){
        self::$ipAdressUser = '';

        //Opção seria utilizar um switch case
        if (getenv('HTTP_CLIENT_IP')){
            self::$ipAdressUser = getenv('HTTP_CLIENT_IP');
        }else if (getenv('HTTP_X_FORWARDED_FOR')){
            self::$ipAdressUser = getenv('HTTP_X_FORWARDED_FOR');
        }else if (getenv('HTTP_X_FORWARDED')){
            self::$ipAdressUser = getenv('HTTP_X_FORWARDED');
        }else if (getenv('HTTP_FORWARDED_FOR')){
            self::$ipAdressUser = getenv('HTTP_FORWARDED_FOR');
        }else if (getenv('HTTP_FORWARDED')){
            self::$ipAdressUser = getenv('HTTP_FORWARDED');
        }else if (getenv('REMOTE_ADDR')){
            self::$ipAdressUser = getenv('REMOTE_ADDR');
        }else
        self::$ipAdressUser = 'UNKNOWN';

        return  self::$ipAdressUser;
    }

    public static function attempt($ipAdressUser, $connectionDataBase){
        # Contando as tentativas de erro
        $querySelectAttempt = " SELECT ten_ip, ten_data FROM tb_tentativas WHERE ten_ip=:ten_ip ";
        $selectAttempt = $connectionDataBase->prepare($querySelectAttempt);
        $selectAttempt->bindParam('ten_ip', $ipAdressUser);
        $selectAttempt->execute();

        $r = 0;
        while ($f = $selectAttempt->fetch(\PDO::FETCH_ASSOC)) {
            if (strtotime($f['ten_data']) > strtotime(date('Y-m-d H:i:s')) - BLOCKEDTIME) {
                $r++;
            }
        }

        return $r;
    }

    public static function getAllData($connectionDataBase, $column, $table){
        $querySelectTotalRecords = " SELECT COUNT(".$column.") AS totalRecords FROM ".$table."; ";
        $selectTotalRecords = $connectionDataBase->prepare($querySelectTotalRecords);
        $selectTotalRecords->execute();
        $selectTotalRecords = $selectTotalRecords->fetch(\PDO::FETCH_ASSOC);
        return $selectTotalRecords["totalRecords"];
     }

}
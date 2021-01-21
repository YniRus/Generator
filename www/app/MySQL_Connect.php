<?php
$host='localhost'; // имя хоста (уточняется у провайдера)
$database='generator'; // имя базы данных, которую вы должны создать
$user='root'; // заданное вами имя пользователя, либо определенное провайдером
$password=''; // заданный вами пароль

define('ROOTPATH', __DIR__);

require_once ROOTPATH.'/rb-mysql.php';

R::setup( "mysql:host=$host;dbname=$database", $user, $password );

R::useFeatureSet( 'novice/latest' );

R::ext('xdispense', function( $type ){
    return R::getRedBean()->dispense( $type );
});

$db = new mysqli($host, $user, $password, $database);

if (!R::testConnection()) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

?>

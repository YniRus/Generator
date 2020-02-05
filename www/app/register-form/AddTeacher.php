<?php  
require_once '../MySQL_Connect.php';

$Password = md5($_GET[Password]);

$stmt = $db->prepare("CALL AddTeacher(?,?,?,?,?)");
$stmt->bind_param('iisss', $_GET[ID_University],$_GET[ID_Department],$_GET[FIO],$_GET[Login],$Password);
$stmt->execute();

$results = $stmt->get_result();
$data = $results->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);
?>

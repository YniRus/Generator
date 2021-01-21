<?php  
require_once '../MySQL_Connect.php';

$Password = md5($_GET['Password']);
$stmt = $db->prepare("SELECT ID_Teacher, FIO, Login, `Password` FROM teacher WHERE `Login` = ? AND `Password` = ?");
$stmt->bind_param('ss', $_GET['Login'], $Password);
$stmt->execute();

$results = $stmt->get_result();
$data = $results->fetch_all(MYSQLI_ASSOC);

echo json_encode($data);
?>

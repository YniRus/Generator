<?php  
require_once '../MySQL_Connect.php';

$Password = md5($_GET['password']);
$stmt = $db->prepare("SELECT teacher_id, fio, login, `password` FROM teacher WHERE `login` = ? AND `password` = ?");
$stmt->bind_param('ss', $_GET['login'], $password);
$stmt->execute();

$results = $stmt->get_result();
$data = $results->fetch_all(MYSQLI_ASSOC);

echo json_encode($data);
?>

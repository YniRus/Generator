<?php
require_once '../MySQL_Connect.php';

$stmt = $db->prepare("SELECT ID_Teacher, FIO FROM teacher WHERE ID_University = ? AND ID_Department = ?");
$stmt->bind_param('ii', $_GET['university'],$_GET['department']);
$stmt->execute();

$results = $stmt->get_result();
$data = $results->fetch_all();
echo json_encode($data);
?>

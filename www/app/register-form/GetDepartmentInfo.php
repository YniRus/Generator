<?php  
require_once '../MySQL_Connect.php';

$stmt = $db->prepare("SELECT ID_Department, Name FROM department WHERE ID_University = ?");
$stmt->bind_param('i', $_GET[ID]);
$stmt->execute();

$results = $stmt->get_result();
$data = $results->fetch_all();
echo json_encode($data);
?>

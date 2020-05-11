<?php
require_once '../MySQL_Connect.php';

$stmt = $db->prepare("CALL UpdateQuestionName(?,?)");
$stmt->bind_param('is',$_GET['ID'],$_GET['Name']);
$stmt->execute();

$results = $stmt->get_result();
$data = $results->fetch_assoc();
echo json_encode($data);
?>

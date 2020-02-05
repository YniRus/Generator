<?php  
require_once '../MySQL_Connect.php';

$Password = md5($_GET[Password]);

$stmt = $db->prepare("SELECT `question`.`Name` AS Name,`question_type`.`ID_Type` AS Type, `question`.`ID_Theme` AS Theme, `question`.`Document` AS Document FROM `question` INNER JOIN `question_type` WHERE `question`.`ID_Subject` = ? AND `question`.`Type` = `question_type`.`Name` ORDER BY Name");
$stmt->bind_param('i', $_GET[ID]);
$stmt->execute();

$results = $stmt->get_result();
$data = $results->fetch_all();
echo json_encode($data);
?>

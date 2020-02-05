<?php  
require_once '../../../../MySQL_Connect.php';

$query = "CALL UpdateQuestionDocument('$_GET[ID]','$_GET[Name]')";

$results = $db->query($query);
$data = $results->fetch_all();

echo json_encode($data);
?>

<?php  
require_once '../../../../MySQL_Connect.php';

$query = "SELECT * FROM question_type";

$results = $db->query($query);
$data = $results->fetch_all();

echo json_encode($data);
?>

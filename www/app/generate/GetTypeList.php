<?php  
require_once '../MySQL_Connect.php';

$query = "SELECT ID_Type, Name FROM question_type WHERE 1 = 1";

$results = $db->query($query);
$data = $results->fetch_all();

echo json_encode($data);
?>

<?php  
require_once '../MySQL_Connect.php';

$query = "SELECT * FROM university";

$results = $db->query($query);
$data = $results->fetch_all();
echo json_encode($data);
?>

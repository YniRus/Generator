<?php  
require_once '../MySQL_Connect.php';

$query = "SELECT ID_Subject, Name FROM subject WHERE ID_Teacher = '$_GET[ID]'";

$results = $db->query($query);
$data = $results->fetch_all();

echo json_encode($data);
?>

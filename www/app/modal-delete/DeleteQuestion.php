<?php
require_once '../MySQL_Connect.php';

$query = "CALL DeleteQuestion('$_GET[ID]')";

$results = $db->query($query);
$data = $results->fetch_assoc();

echo json_encode($data);
?>

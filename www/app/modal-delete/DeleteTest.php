<?php
require_once '../MySQL_Connect.php';

$id = $_GET['ID'];

$query = "DELETE FROM `tests` WHERE id = $id;";

$results = $db->query($query);
$data = $results->fetch_assoc();

echo json_encode($data);
?>

<?php
require_once '../MySQL_Connect.php';

$id = $_GET['id'];

$query = "SELECT * FROM `tests` WHERE `tests`.`id` = {$id}";

$results = $db->query($query);
echo json_encode(mysqli_fetch_assoc($results));

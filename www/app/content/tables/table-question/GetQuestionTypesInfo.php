<?php
require_once '../../../MySQL_Connect.php';

$forTests = $_GET['forTests'];

$query = "SELECT * FROM question_type WHERE `ForTests` = {$forTests}";

$results = $db->query($query);
$data = array();
while($row = mysqli_fetch_assoc($results)) {
    $data[] = $row;
}

echo json_encode($data);
?>
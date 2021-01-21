<?php
require_once '../../../MySQL_Connect.php';

$date = date('Y-m-d H:i:s',strtotime('+1 hour'));

$query = "UPDATE `tests` SET `access_until` = '{$date}' WHERE `tests`.`id` = {$_GET['id']}";

$results = $db->query($query);
if($results) {
    echo json_encode([
        'success' => true
    ]);
} else {
    echo json_encode($db->error_list);
}
?>

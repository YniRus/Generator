<?php
require_once '../../../../MySQL_Connect.php';

$query = "UPDATE `question` SET `Answers` = '{$_GET['answer']}' WHERE `question`.`ID_Question` = {$_GET['id']}";

$results = $db->query($query);
if($results) {
    echo json_encode([
        'success' => true
    ]);
} else {
    echo json_encode($db->error_list);
}
?>

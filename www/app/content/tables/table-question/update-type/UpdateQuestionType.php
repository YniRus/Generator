<?php  
require_once '../../../../MySQL_Connect.php';

$query = "UPDATE `question` SET `Type` = '{$_GET['type']}' WHERE `question`.`ID_Question` = {$_GET['id']}";

$results = $db->query($query);
if($results) {
    echo json_encode([
        'success' => true
    ]);
} else {
    echo json_encode($db->error_list);
}
?>

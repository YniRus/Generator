<?php  
require_once '../MySQL_Connect.php';

$stmt = $db->prepare("INSERT INTO `theme`(ID_Subject,Name) VALUES(?,?)");
$stmt->bind_param('is',$_GET['parentId'],$_GET['title']);
$stmt->execute();

$results = $stmt->get_result();
if($db->insert_id) {
    echo json_encode([
        'id' => $db->insert_id
    ]);
} else {
    echo json_encode($db->error_list);
}
?>

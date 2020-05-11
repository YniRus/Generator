<?php
require_once '../MySQL_Connect.php';

$stmt = $db->prepare("
INSERT INTO subject(ID_University,ID_Department,ID_Teacher,Name) 
VALUES(
    (SELECT ID_University FROM teacher  WHERE ID_Teacher = ?),
    (SELECT ID_Department FROM teacher WHERE ID_Teacher = ?),
    ?,
    ?
);
    ");
$stmt->bind_param('iiis',$_GET['parentId'],$_GET['parentId'],$_GET['parentId'],$_GET['title']);
$stmt->execute();

if($db->insert_id) {
    echo json_encode([
        'id' => $db->insert_id
    ]);
} else {
    echo json_encode($db->error_list);
}
?>

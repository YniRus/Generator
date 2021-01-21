<?php
require_once '../MySQL_Connect.php';

$stmt = $db->prepare("
    INSERT INTO question(ID_Subject,ID_Theme,Type,Name,Document,Answers) 
    VALUES((SELECT ID_Subject FROM theme WHERE theme.ID_Theme = ?),?,?,?,?,?);
");

$document = $_GET['document'] ? $_GET['document'] : NULL;
$answer = $_GET['answer'] ? $_GET['answer'] : NULL;

$stmt->bind_param('iissss',$_GET['parentId'],$_GET['parentId'],$_GET['type'],$_GET['title'],$document,$answer);
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

<?php
require_once '../../../../MySQL_Connect.php';

$stmt = $db->prepare("
    UPDATE `tests` SET  
        `teacher_id` = ?,
        `title`= ?,
        `subject_id`= ?,
        `theme_id`= ?,
        `time`= ?,
        `question_count`= ?,
        `difficult`= ?
    WHERE `tests`.`id` = {$_GET['id']};
");

$theme_id = $_GET['theme_id'] ? $_GET['theme_id'] : NULL;

$stmt->bind_param('isiiiii',$_GET['teacher_id'],$_GET['title'],$_GET['subject_id'],$theme_id,$_GET['time'],$_GET['question_count'],$_GET['difficult']);
$stmt->execute();

$results = $stmt->get_result();
if(empty($db->error_list)) {
    echo json_encode([
        'id' => $_GET['id']
    ]);
} else {
    echo json_encode($db->error_list);
}
?>

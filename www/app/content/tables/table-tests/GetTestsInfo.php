<?php
require_once '../../../MySQL_Connect.php';

$orderBy = $_GET['OrderBy'];
$order = $_GET['Order'];
$teacherId = $_GET['WhereID'];

$date = date('Y-m-d H:i:s',0);
if(!empty($_GET['IsActive'])) {
    $date = date('Y-m-d H:i:s');
}

$query = "SELECT 
       `tests`.*,
       NOW() as now,
       `subject`.Name as `subject_name`,
       `t`.Name as `theme_name`
    FROM `tests`
    LEFT JOIN subject on tests.subject_id = subject.ID_Subject
    LEFT JOIN theme t on tests.theme_id = t.ID_Theme
    WHERE `tests`.`teacher_id` = {$teacherId} 
    AND `tests`.`access_until` > '{$date}'
    ORDER BY `tests`.{$orderBy} {$order}";

$results = $db->query($query);
$data = array();
while($row = mysqli_fetch_assoc($results)) {
    $logDir = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.'www'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'res'.DIRECTORY_SEPARATOR.'test-logs'.DIRECTORY_SEPARATOR."test_{$row['id']}".DIRECTORY_SEPARATOR;
    $row['log_dir'] = file_exists($logDir) ? "test_{$row['id']}" : null;
    $data[] = $row;
}

echo json_encode($data);

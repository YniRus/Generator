<?php
require_once '../../../MySQL_Connect.php';

$orderBy = $_GET['OrderBy'];
$order = $_GET['Order'];
$teacherId = $_GET['WhereID'];

$query = "SELECT 
       `tests`.*,
       NOW() as now,
       `subject`.Name as `subject_name`,
       `t`.Name as `theme_name`
    FROM `tests`
    LEFT JOIN subject on tests.subject_id = subject.ID_Subject
    LEFT JOIN theme t on tests.theme_id = t.ID_Theme
    WHERE `tests`.`teacher_id` = {$teacherId}
    ORDER BY `tests`.{$orderBy} {$order}";

$results = $db->query($query);
$data = array();
while($row = mysqli_fetch_assoc($results)) {
    $data[] = $row;
}

echo json_encode($data);

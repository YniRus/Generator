<?php  
require_once '../../../MySQL_Connect.php';

$orderBy = $_GET['OrderBy'];
$order = $_GET['Order'];
$id = $_GET['WhereID'];

$query = "SELECT
   `subject`.`ID_Subject`,
   `subject`.`Name` AS SubjectName,
   (SELECT COUNT(*) FROM `theme` WHERE `theme`.`ID_Subject` = `subject`.`ID_Subject`) AS CountTheme
   FROM `subject`
   WHERE `subject`.`ID_Teacher` = {$id}
   ORDER BY {$orderBy} {$order}";

$data = R::getAll($query);

echo json_encode($data);

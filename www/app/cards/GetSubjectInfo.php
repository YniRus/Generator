<?php  
require_once '../MySQL_Connect.php';

$query = "SELECT `subject`.`ID_Subject`,`subject`.`Name`, `university`.`Name` AS University, `department`.`Name` AS Department, `teacher`.`FIO` AS Teacher FROM `subject` INNER JOIN `university`, `department`, `teacher` WHERE `subject`.`ID_University` = `university`.`ID_University` AND `subject`.`ID_Department` = `department`.`ID_Department` AND `subject`.`ID_Teacher` = `teacher`.`ID_Teacher` AND `subject`.`ID_Subject` = '$_GET[ID]'";

$results = $db->query($query);
$data = $results->fetch_all();

echo json_encode($data);
?>

<?php  
require_once '../../../MySQL_Connect.php';

$orderBy = $_GET['OrderBy'];
$order = $_GET['Order'];
$id = $_GET['WhereID'];

$query = "SELECT 
   `question`.`ID_Question`,
   `question`.`Name`,
   `question`.`Type`,
   `question`.`Document`
   FROM `question`
   WHERE `question`.`ID_Theme` = {$id}
   ORDER BY {$orderBy} {$order}";

$results = $db->query($query);
$data = array();
while($row = mysqli_fetch_assoc($results)) {
    $data[] = $row;
}

echo json_encode($data);
?>
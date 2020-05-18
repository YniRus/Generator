<?php  
require_once '../../../MySQL_Connect.php';

$orderBy = $_GET['OrderBy'];
$order = $_GET['Order'];
$id = $_GET['WhereID'];
$forTests = $_GET['ForTests'];

$query = "SELECT 
	`question`.`ID_Question`,
	`question`.`Name`,
	`question`.`Type`,
	`question`.`Document`
	FROM `question`
	LEFT JOIN `question_type` ON `question_type`.`Name` = `question`.`Type`
	WHERE `question`.`ID_Theme` = {$id}
	AND `question_type`.`ForTests` = '{$forTests}'
    ORDER BY {$orderBy} {$order}";

$results = $db->query($query);
$data = array();
while($row = mysqli_fetch_assoc($results)) {
    $data[] = $row;
}

echo json_encode($data);
?>
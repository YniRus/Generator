<?php  
require_once '../MySQL_Connect.php';

$subjectId = $_GET['subject_id'];
$themeId = $_GET['theme_id'];

$conditions = [
    "`question`.`ID_Subject` = {$subjectId}"
];

if($themeId) {
    $conditions[] = "`question`.`ID_Theme` = {$themeId}";
}

$conditions = implode(' AND ', $conditions);

$query = "SELECT 
	`question`.`ID_Question`,
	`question`.`Name`,
	`question`.`Type`,
	`question`.`Document`,
    `question`.`Answers`,
    `question`.`Difficult`,
    `question`.`Stats`
	FROM `question`
	LEFT JOIN `question_type` ON `question_type`.`Name` = `question`.`Type`
	WHERE {$conditions}
	AND `question_type`.`ForTests` = '1'";
$results = $db->query($query);
$data = array();
while($row = mysqli_fetch_assoc($results)) {
    $data[] = $row;
}

echo json_encode($data);
?>
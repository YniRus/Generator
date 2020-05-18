<?php
require_once '../../../MySQL_Connect.php';

$orderBy = $_GET['OrderBy'];
$order = $_GET['Order'];
$id = $_GET['WhereID'];
$questionsForTests = $_GET['CountForTests'] ? $_GET['CountForTests'] : 0;

$query = "SELECT
`theme`.`ID_Theme`,
`theme`.`Name` AS ThemeName,
(SELECT COUNT(*) FROM `question`  
    LEFT JOIN `question_type` ON `question_type`.`Name` = `question`.`Type` 
    WHERE `question`.`ID_Theme` = `theme`.`ID_Theme` AND `question_type`.`ForTests` = '{$questionsForTests}'
) AS CountQuestion
FROM `theme`
WHERE `theme`.`ID_Subject` = {$id}
ORDER BY {$orderBy} {$order}";

$results = $db->query($query);
$data = array();
while($row = mysqli_fetch_assoc($results)) {
    $data[] = $row;
}

echo json_encode($data);
?>
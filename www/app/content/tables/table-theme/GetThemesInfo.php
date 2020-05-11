<?php
require_once '../../../MySQL_Connect.php';

$orderBy = $_GET['OrderBy'];
$order = $_GET['Order'];
$id = $_GET['WhereID'];

$query = "SELECT
`theme`.`ID_Theme`,
`theme`.`Name` AS ThemeName,
(SELECT COUNT(*) FROM `question` WHERE `question`.`ID_Theme` = `theme`.`ID_Theme` ) AS CountQuestion
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
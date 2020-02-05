<?php  
require_once '../../../MySQL_Connect.php';

$query = "CALL GetThemesInfo('$_GET[OrderBy]','$_GET[Desc]','$_GET[WhereID]')";

$results = $db->query($query);
$data = $results->fetch_all();

echo json_encode($data);
?>

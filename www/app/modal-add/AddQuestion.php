<?php  
require_once '../MySQL_Connect.php';

$stmt = $db->prepare("CALL AddQuestion(?,?,?,?,?)");
$stmt->bind_param('iisss',$_GET[SubjectID],$_GET[ThemeID],$_GET[Type],$_GET[Name],$_GET[Document]);
$stmt->execute();

$results = $stmt->get_result();
$data = $results->fetch_all();
echo json_encode($data);
?>

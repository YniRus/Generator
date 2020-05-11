<?php
$uploaddir = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'www' . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'res' . DIRECTORY_SEPARATOR . 'question-documents' . DIRECTORY_SEPARATOR;
$uploadfile = $uploaddir . $_GET['filename'];

error_reporting(E_ALL ^ E_WARNING);
unlink($uploadfile);
error_reporting(E_ALL);

require_once '../../../../MySQL_Connect.php';

$query = "UPDATE `question` SET `Document` = '' WHERE ID_Question = {$_GET['id']}";
$results = $db->query($query);
if ($results) {
    echo json_encode([
        'success' => true
    ]);
    return;
}

echo json_encode([
    'success' => false
]);

?>

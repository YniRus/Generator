<?php
$uploaddir = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.'www'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'res'.DIRECTORY_SEPARATOR.'question-documents'.DIRECTORY_SEPARATOR;
$uploadfile = $uploaddir . basename($_FILES['file']['name']);

if(!empty($_POST['deleteFile'])) {
    $deleteFile = $uploaddir . basename($_POST['deleteFile']);
    try {
        unlink($deleteFile);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'text' => $e->getMessage()
        ]);
        exit;
    }
}

if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
    require_once '../../../../MySQL_Connect.php';

    $query = "UPDATE `question` SET `Document` = '{$_FILES['file']['name']}' WHERE ID_Question = {$_POST['id']}";
    $results = $db->query($query);
    if($results) {
        echo json_encode([
            'success' => true
        ]);
    } else {
        echo json_encode($db->error_list);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => $_FILES["file"]["error"]
    ]);
}

function deleteFile() {

}
?>

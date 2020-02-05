<?php

$uploaddir = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.'www'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'res'.DIRECTORY_SEPARATOR.'question-documents'.DIRECTORY_SEPARATOR;
$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);

if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    $out = "Файл корректен и был успешно загружен.\n";
} else {
    $out = "Возможная атака с помощью файловой загрузки!\n";
}

echo $out;

?>

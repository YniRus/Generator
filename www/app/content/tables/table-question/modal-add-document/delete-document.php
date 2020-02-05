<?php

$uploaddir = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.'www'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'res'.DIRECTORY_SEPARATOR.'question-documents'.DIRECTORY_SEPARATOR;

$uploadfile = $uploaddir . $_GET[DeleteFileName];

echo $uploadfile;

if (unlink($uploadfile)) {
    $out = "Файл успешно удален.\n";
} else {
    $out = "Файл не удален!\n";
}

echo $out;

?>

<?php
$data = $_POST['data'];
$user = $_POST['user'];
$testId = $_POST['test_id'];

$user['name'] = str_replace(' ','_',$user['name']);
$user['group'] = str_replace(' ','_',$user['group']);
$date = date('dmy_His');

$dirName = "test_{$testId}/";
$fileName = "{$user['name']}__{$user['group']}__$date";

$path = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.'www'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'res'.DIRECTORY_SEPARATOR.'test-logs'.DIRECTORY_SEPARATOR;

if (!file_exists($path.$dirName)) {
    mkdir($path.$dirName, 0777);
}

file_put_contents($path.$dirName.$fileName.".json",json_encode($data,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));


<?php

$image = 'http://generator/www/app/res/question-documents/'.$_GET[FileName];
// Read image path, convert to base64 encoding
$imageData = base64_encode(file_get_contents($image));

$info = getimagesize($image);
// Format the image SRC:  data:{mime};base64,{data};
$src = 'data:'.$info['mime'].';base64,'.$imageData;

// Echo out a sample image
echo '<img src="'.$src.'" class="QuestionImage">';
//	echo "<img src='http://generator/www/app/res/question-documents/".$_GET[FileName]."' class='QuestionImage'>";
//	echo "<img src='../res/question-documents/" + $_GET[FileName] + "' class='QuestionImage'>";
?>

<?php  
require_once '../../../../MySQL_Connect.php';

$query = "UPDATE `question` SET `Type` = '$_GET[Type]' WHERE `question`.`ID_Question` = '$_GET[ID]'";

$results = $db->query($query);

echo $results; 
echo " ";
echo $_GET[ID];
echo " ";
echo $_GET[Type];

?>

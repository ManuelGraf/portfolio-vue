<?php

$upload_dir = "img/";  //implement this function yourself
$img = $_POST['imgData'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = $upload_dir."HTML5created.png";
$success = file_put_contents($file, $data);

$query = $_SERVER['PHP_SELF'];
$path = pathinfo( $query );
$page = $path['dirname']. (substr($path['dirname'],strlen($path['dirname'])-1,1)=='/'?'':'/').$file;

echo $success ? "Image saved. <a href='$page'>download</a>" : "error saving image.";

?>

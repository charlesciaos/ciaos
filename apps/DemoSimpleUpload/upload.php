<?php

	if($_FILES['file']['error'] > 0)
	{
		echo "Error:".$_FILES['file']['error'];
	}
	else
	{
		echo "檔案名稱: ".$_FILES['file']['name']."<br/>";
		echo "檔案類型: ".$_FILES['file']['type']."<br/>";
		echo "檔案大小: ".$_FILES['file']['size']."<br/>";
		echo "<br/>";

		if(file_exists("uploads/".$_FILES['file']['name']))
		{
			echo "檔案已經存在, 請勿重複上傳相同檔名檔案";
		}
		else
		{
			move_uploaded_file($_FILES['file']['tmp_name'], "uploads/".$_FILES['file']['name']);
		}

	}
?>
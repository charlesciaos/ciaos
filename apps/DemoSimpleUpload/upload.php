<?php

	if($_FILES['file']['error'] > 0)
	{
		echo "Error:".$_FILES['file']['error'];
	}
	else
	{
		echo "            : ".$_FILES['file']['name']."<br/>";
		echo "            : ".$_FILES['file']['type']."<br/>";
		echo "            : ".$_FILES['file']['size']."<br/>";
		echo "<br/>";

		if(file_exists("uploads/".$_FILES['file']['name']))
		{
			echo "                  ,                                     ";
		}
		else
		{
			move_uploaded_file($_FILES['file']['tmp_name'], "uploads/".$_FILES['file']['name']);
		}

	}
?>
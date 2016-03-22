<?php
    $iNum = 500;
    $nDuration= 1000;
    $outVideoName = "temp.webm";

    if(isset($_GET["iNum"]))
    {
        $iNum = $_GET["iNum"];
    }    
    if(isset($_GET["nDuration"]))
    {
        $nDuration = $_GET["nDuration"];
    }
    if(isset($_GET["outVideoName"]))
    {
        $outVideoName = $_GET["outVideoName"];
    }

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>上傳檔案</title>
<link rel="stylesheet" type="text/css" href="css/upload.css">
<script type="text/javascript" src="js/upload.js"></script>
</head>

<body>

<?
include_once(".include/class.ssh2.php");

$shell = new ssh2("192.168.2.111");
//$shell->authPassword("pi","raspiberry");
$shell->authPassword("root","java2sdk");

$cmd = "cd /home/pi/projects/VideoStream/time-lapse/;";
$cmd .= "ls;";
//$cmd .= "python genReduceTimeVideo.py;";
//$cmd .= $iNum.";";
//$cmd .= $outVideoName.";";
//$cmd .= $nDuration.";";
//$cmd .= "python uploadFileToFTP.py;";
echo "cmd:". $cmd . "<br><br>";
$result=$shell->cmdExec($cmd);

echo $result;
?>

<?php 
class NiceSSH
{ 
    // SSH Host 
    private $ssh_host = 'myserver.example.com'; 
    // SSH Port 
    private $ssh_port = 22; 
    // SSH Server Fingerprint 
    private $ssh_server_fp = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; 
    // SSH Username 
    private $ssh_auth_user = 'username'; 
    // SSH Public Key File 
    private $ssh_auth_pub = '/home/username/.ssh/id_rsa.pub'; 
    // SSH Private Key File 
    private $ssh_auth_priv = '/home/username/.ssh/id_rsa'; 
    // SSH Private Key Passphrase (null == no passphrase) 
    private $ssh_auth_pass; 
    // SSH Connection 
    private $connection; 
    
    public function connect() { 
        if (!($this->connection = ssh2_connect($this->ssh_host, $this->ssh_port))) { 
            throw new Exception('Cannot connect to server'); 
        } 
        $fingerprint = ssh2_fingerprint($this->connection, SSH2_FINGERPRINT_MD5 | SSH2_FINGERPRINT_HEX); 
        if (strcmp($this->ssh_server_fp, $fingerprint) !== 0) { 
            throw new Exception('Unable to verify server identity!'); 
        } 
        if (!ssh2_auth_pubkey_file($this->connection, $this->ssh_auth_user, $this->ssh_auth_pub, $this->ssh_auth_priv, $this->ssh_auth_pass)) { 
            throw new Exception('Autentication rejected by server'); 
        } 
    } 
    public function exec($cmd) { 
        if (!($stream = ssh2_exec($this->connection, $cmd))) { 
            throw new Exception('SSH command failed'); 
        } 
        stream_set_blocking($stream, true); 
        $data = ""; 
        while ($buf = fread($stream, 4096)) { 
            $data .= $buf; 
        } 
        fclose($stream); 
        return $data; 
    } 
    public function disconnect() { 
        $this->exec('echo "EXITING" && exit;'); 
        $this->connection = null; 
    } 
    public function __destruct() { 
        $this->disconnect(); 
    } 
} 
?> 

</body>


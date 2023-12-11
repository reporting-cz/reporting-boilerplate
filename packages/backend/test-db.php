<?php
$serverName = empty($_ENV['DOCKER_RUNNING'])
	? "127.0.0.1, 1433"		// from host machine
	: "bp-database, 1433";	// from docker container

$connectionInfo = [
	"Database" => "Test",
	"UID" => "sa",
	"PWD" => "sysadmin@1",
	"TrustServerCertificate" => "1"
];

$conn = sqlsrv_connect($serverName, $connectionInfo);

header('Content-Type: text/plain');
if ($conn) {
	echo "Connection established.";
} else {
	echo "Connection could not be established.";
	die(print_r(sqlsrv_errors(), true));
}

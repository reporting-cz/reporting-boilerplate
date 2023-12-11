<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Nette\Utils\Json;

$app = AppFactory::create();

$db = dibi::connect([
	'driver' => 'sqlsrv',
	'host' => empty($_ENV['DOCKER_RUNNING'])
		? "127.0.0.1, 1433"		// from host machine
		: "bp-database, 1433",	// from docker container
	'username' => 'sa',
	'password' => 'sysadmin@1',
	'database' => 'Test',
	"charset" => "UTF-8",
	"lazy" => true,
	"options" => [
		"ReturnDatesAsStrings" => 1,
		"TransactionIsolation" => SQLSRV_TXN_READ_UNCOMMITTED,
		"TrustServerCertificate" => 1,
		"FormatDecimals" => 1,
		"ConnectionPooling" => 0
	]
]);

$app->get('/test', function (Request $request, Response $response, array $args) use ($db) {
	$res = $db->fetchAll("select * from [TEST_DATA] order by IDZ");
	$response->getBody()->write(Json::encode($res));
	return $response->withHeader('Content-Type', 'application/json');
});

return $app;

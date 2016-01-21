<?php

require_once __DIR__.'/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app['debug'] = true;

$app['db'] = function() {
    return new \PDO('mysql:host=localhost;dbname=estudo_agenda','root','root');
};

$app->get('/', function() use ($app) {
    return new Response(file_get_contents('assets/js/agenda/templates/template.html'), 200);
});

$app->post('/contatos', function(Request $request) use ($app) {
    $data = $request->getContent();
    parse_str($data, $out);

    $stmt = $app['db']->prepare("INSERT INTO contacts(name, email, cellphone) VALUE(:name, :email, :cellphone)");
    $stmt->bindParam('name', $out['name']);
    $stmt->bindParam('email', $out['email']);
    $stmt->bindParam('cellphone', $out['cellphone']);
    $stmt->execute();

    return $app->json(array('success'=>true));
});

$app->get('/contatos', function() use ($app) {
    $stmt = $app['db']->query("SELECT * FROM contacts");
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $app->json($result);
});

$app->get('/contatos/{id}', function($id) use ($app) {
    $stmt = $app['db']->prepare("SELECT * FROM contacts WHERE id=:id");
    $stmt->bindParam('id',$id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return $app->json($result);
});

$app->put('/contatos/{id}', function(Request $request, $id) use ($app) {
    $data = $request->getContent();
    parse_str($data, $out);

    $stmt = $app['db']->prepare("UPDATE contacts SET name=:name, email=:email, cellphone=:cellphone WHERE id=:id");
    $stmt->bindParam('id',$id);
    $stmt->bindParam('name', $out['name']);
    $stmt->bindParam('email', $out['email']);
    $stmt->bindParam('cellphone', $out['cellphone']);
    $stmt->execute();

    return $app->json(array('success'=>true));
});


$app->delete('/contatos/{id}', function($id) use ($app) {
    $stmt = $app['db']->prepare("DELETE FROM contacts WHERE id=:id");
    $stmt->bindParam('id',$id);
    $stmt->execute();

    return $app->json(array('success'=>true));
});

$app->run();

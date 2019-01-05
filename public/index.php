<html>

<head>
  <title>GMRI Backedn</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
</head>

<body>
  <h1>GMRI Backend</h1>
  <?php
$r = new HttpRequest('/data', HttpRequest::METH_GET);
try {
    $r->send();
    if ($r->getResponseCode() == 200) {
        file_put_contents('local.rss', $r->getResponseBody());
    }
} catch (HttpException $ex) {
    echo $ex;
}
?>

</body>

</html>

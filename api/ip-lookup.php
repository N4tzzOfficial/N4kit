<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$ip = isset($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];

if ($ip === '::1' || $ip === '127.0.0.1' || $ip === 'localhost') {
    echo json_encode([
        'ip' => '127.0.0.1',
        'city' => 'Localhost',
        'region' => 'Local',
        'country' => 'Local Machine',
        'isp' => 'Local Network',
        'timezone' => date_default_timezone_get(),
        'postal' => '-',
        'lat' => 0,
        'lon' => 0,
        'asn' => '-'
    ]);
    exit;
}

if (!filter_var($ip, FILTER_VALIDATE_IP)) {
    echo json_encode(['error' => 'Invalid IP address']);
    exit;
}

$apis = [
    [
        'url' => "http://ip-api.com/json/{$ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query",
        'parse' => function($data) {
            if ($data['status'] === 'fail') return null;
            return [
                'ip' => $data['query'],
                'city' => $data['city'],
                'region' => $data['regionName'],
                'country' => $data['country'],
                'isp' => $data['isp'],
                'timezone' => $data['timezone'],
                'postal' => $data['zip'],
                'lat' => $data['lat'],
                'lon' => $data['lon'],
                'asn' => $data['as'] ?? '-'
            ];
        }
    ]
];

foreach ($apis as $api) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api['url']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200 && $response) {
        $data = json_decode($response, true);
        $result = $api['parse']($data);
        if ($result) {
            echo json_encode($result);
            exit;
        }
    }
}

echo json_encode([
    'ip' => $ip,
    'city' => 'Unknown',
    'region' => 'Unknown',
    'country' => 'Unknown',
    'isp' => 'Unknown',
    'timezone' => 'UTC',
    'postal' => '-',
    'lat' => 0,
    'lon' => 0,
    'asn' => '-'
]);
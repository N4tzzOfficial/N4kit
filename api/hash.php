<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'POST required']);
    exit;
}

$text = isset($_POST['text']) ? trim($_POST['text']) : '';
$algo = isset($_POST['algo']) ? strtoupper(trim($_POST['algo'])) : '';

if (empty($text)) {
    echo json_encode(['error' => 'Text is required']);
    exit;
}

if (empty($algo)) {
    echo json_encode(['error' => 'Algorithm is required']);
    exit;
}

$allowed = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'];
if (!in_array($algo, $allowed)) {
    echo json_encode(['error' => 'Invalid algorithm. Use: MD5, SHA-1, SHA-256, SHA-512']);
    exit;
}

$algoMap = [
    'MD5' => 'md5',
    'SHA-1' => 'sha1',
    'SHA-256' => 'sha256',
    'SHA-512' => 'sha512'
];

$hash = hash($algoMap[$algo], $text);

echo json_encode([
    'success' => true,
    'hash' => $hash,
    'algo' => $algo,
    'text_length' => strlen($text)
]);
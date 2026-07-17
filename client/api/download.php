<?php
/**
 * Plugin Download Gateway for Portfolio Marketplace
 * Fetches latest releases from GitHub API securely.
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// 1. Simple .env Loader
function loadEnv($path)
{
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $_ENV[trim($name)] = trim($value);
        }
    }
}
loadEnv(__DIR__ . '/../../.env');

// Configuration
$config = [
    'github_user' => 'JoelPallero', // User or Organization
    'github_token' => $_ENV['GITHUB_TOKEN'] ?? '', 
    'user_agent' => 'Portfolio-Gateway/1.0',
    'allowed_plugins' => [
        'nabi-backup' => 'Backup-for-Wordpress',
        'nabi-filter' => 'Filters-for-WooCommerce',
        'nabi-webp' => 'Converter-to-webp-for-Wordpress',
        'nabi-duplicator' => 'Duplicator-for-Wordpress',
        'nabi-master' => 'Nabi-Master',
        'nabi-pack' => 'Nabi-Master' // Assuming pack might be related or the same for now
    ]
];

// 1. Validate Plugin ID
$pluginSlug = $_GET['plugin'] ?? '';

if (empty($pluginSlug) || !isset($config['allowed_plugins'][$pluginSlug])) {
    http_response_code(404);
    echo json_encode(['error' => 'Plugin not found or not authorized.']);
    exit;
}

$repoName = $config['allowed_plugins'][$pluginSlug];
$repoUrl = "https://api.github.com/repos/{$config['github_user']}/{$repoName}/releases/latest";

// 2. Prevent Hotlinking (Optional but professional)
// Check Referer header if needed

// 3. Fetch Latest Release Info
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $repoUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, $config['user_agent']);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: token {$config['github_token']}"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($httpCode !== 200 || !$response) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not connect to distribution server.', 'details' => $response]);
    exit;
}

$data = json_decode($response, true);
$zipUrl = $data['zipball_url'] ?? '';

if (!$zipUrl) {
    http_response_code(404);
    echo json_encode(['error' => 'No downloadable assets found for this release.']);
    exit;
}

// 4. Download and Stream the ZIP
// We use CURL to fetch the file and stream it to avoid exposing the private redirect URL
header('Content-Type: application/zip');
header("Content-Disposition: attachment; filename=\"{$pluginSlug}.zip\"");

$ch_file = curl_init($zipUrl);
curl_setopt($ch_file, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch_file, CURLOPT_USERAGENT, $config['user_agent']);
curl_setopt($ch_file, CURLOPT_HTTPHEADER, [
    "Authorization: token {$config['github_token']}"
]);

// Stream directly to output
curl_exec($ch_file);
curl_close($ch_file);

exit;

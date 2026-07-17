<?php
// 1. Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 2. Robust .env Loader
function loadEnv($path)
{
    if (!file_exists($path))
        return false;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false)
        return false;

    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0 || strpos($line, '=') === false)
            continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
    return true;
}

// Try multiple levels back to reach the root .env
if (!loadEnv(__DIR__ . '/../../.env')) {
    loadEnv(__DIR__ . '/../.env'); // Fallback to 1 level back
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Only POST requests allowed"]);
    exit;
}

// 2. Get the JSON data from the request body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

// 3. Prepare data for logging
$ip = $data['ip'] ?? 'Unknown';
$country = $data['country'] ?? 'Unknown';
$city = $data['city'] ?? 'Unknown';
$org = $data['org'] ?? 'Unknown';
$timestamp = $data['timestamp'] ?? date('Y-m-d H:i:s');
$userAgent = $data['userAgent'] ?? 'Unknown';
$fullUrl = $data['fullUrl'] ?? 'Unknown';
$referrer = $data['referrer'] ?? 'Direct';
$page = $data['page'] ?? parse_url($fullUrl, PHP_URL_PATH) ?? '/';

$logEntry = "[$timestamp] IP: $ip ($country, $city) | ISP: $org | URL: $fullUrl | Ref: $referrer" . PHP_EOL;

// 4. Save to backing TXT file
$logFile = 'visitors.txt';
file_put_contents($logFile, $logEntry, FILE_APPEND);

// 5. IP Filter: Do not send email for specific IPs (e.g., developer's IP)
$excludedIPs = [
    '127.0.0.1',
    '::1',
    '186.13.126.234',
    '181.171.129.65',
    '192.168.100.7',
    '2803:9800:9885:be00:9a68:9741:ce4e:5a6f'
];

$ip = trim($ip);

if (in_array($ip, $excludedIPs)) {
    echo json_encode([
        "status" => "success",
        "message" => "Log saved (email skipped for excluded IP: $ip)"
    ]);
    exit;
}

// 5b. Path Filter: Only email for the onepage root ('/') or the /servicios site and its subpages
$page = '/' . ltrim($page, '/');
$isRoot = $page === '/';
$isServicios = $page === '/servicios' || strpos($page, '/servicios/') === 0;

if (!$isRoot && !$isServicios) {
    echo json_encode([
        "status" => "success",
        "message" => "Log saved (email skipped for non-notifiable path: $page)"
    ]);
    exit;
}

// 6. Send Email Notification
$to = $_ENV['MAIL_TO'] ?? 'esteban.pallero@gmail.com';
$subject = "Nueva visita: $country, $city ($ip)";
$from = $_ENV['MAIL_FROM'] ?? 'no-replay@joelpallero.com.ar';

// 5. Build HTML Message
$message = "
<html>
<body style='font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;'>
    <div style='background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 600px; margin: auto;'>
        <h2 style='color: #2d3748; border-bottom: 2px solid #edf2f7; padding-bottom: 10px;'>Nueva Visita Registrada</h2>
        <p><strong>Ubicación:</strong> $city, $country</p>
        <p><strong>IP:</strong> $ip</p>
        <p><strong>ISP:</strong> $org</p>
        <p><strong>Fecha/Hora:</strong> $timestamp</p>
        <p><strong>URL Completa:</strong> <a href='$fullUrl'>$fullUrl</a></p>
        <p><strong>Referente:</strong> $referrer</p>
        <div style='margin-top: 20px; padding: 10px; background-color: #f7fafc; font-size: 12px; color: #718096; border-radius: 4px;'>
            <strong>Navegador:</strong> $userAgent
        </div>
    </div>
</body>
</html>";

// Headers for HTML Email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Portfolio Web <$from>\r\n";
$headers .= "Reply-To: Portfolio Web <$from>\r\n";
$headers .= "Return-Path: $from\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Use -f flag to set the envelope sender (important for Hostinger/SMTP)
$mailSent = mail($to, $subject, $message, $headers, "-f" . $from);

if ($mailSent) {
    echo json_encode([
        "status" => "success",
        "message" => "Log saved and email sent",
        "email_to" => $to,
        "env_loaded" => isset($_ENV['SMTP_USER'])
    ]);
} else {
    echo json_encode([
        "status" => "partial",
        "message" => "Log saved but mail() returned false",
        "env_loaded" => isset($_ENV['SMTP_USER'])
    ]);
}
?>
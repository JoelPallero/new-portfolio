<?php
// 1. Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 2. Simple .env Loader
function loadEnv($path)
{
    if (!file_exists($path))
        return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0)
            continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}
loadEnv(__DIR__ . '/../../.env');

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

// --- HTML Email Body ---
$message = "
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; color: #51545e; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background-color: #2d3748; color: #ffffff; padding: 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px; }
        .content { padding: 30px; }
        .location-info { background-color: #edf2f7; border-radius: 6px; padding: 20px; margin-bottom: 25px; text-align: center; border-left: 4px solid #4a5568; }
        .location-info h2 { margin: 0; color: #2d3748; font-size: 24px; }
        .location-info p { margin: 5px 0 0; color: #718096; font-size: 14px; }
        .data-grid { display: block; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        .data-row { margin-bottom: 12px; display: flex; }
        .label { font-weight: bold; width: 140px; color: #4a5568; font-size: 13px; text-transform: uppercase; }
        .value { color: #2d3748; flex: 1; font-size: 14px; word-break: break-all; }
        .footer { background-color: #f4f4f7; padding: 20px; text-align: center; font-size: 12px; color: #a0aec0; }
        .tag { display: inline-block; background-color: #4a5568; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-left: 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>NUEVA VISITA REGISTRADA</h1>
        </div>
        <div class='content'>
            <div class='location-info'>
                <h2>$city, $country</h2>
                <p>IP: $ip <span class='tag'>$org</span></p>
            </div>
            
            <div class='data-grid'>
                <div class='data-row'>
                    <div class='label'>Fecha y Hora</div>
                    <div class='value'>$timestamp</div>
                </div>
                <div class='data-row'>
                    <div class='label'>URL Visitada</div>
                    <div class='value'><strong>$fullUrl</strong></div>
                </div>
                <div class='data-row'>
                    <div class='label'>Viene de</div>
                    <div class='value'>$referrer</div>
                </div>
                <div class='data-row' style='margin-top: 20px; border-top: 1px dashed #e2e8f0; padding-top: 15px;'>
                    <div class='label'>Navegador</div>
                    <div class='value'>$userAgent</div>
                </div>
            </div>
        </div>
        <div class='footer'>
            Sistema de Notificaciones Automáticas - joelpallero.com.ar
        </div>
    </div>
</body>
</html>
";

// Headers for HTML Email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $from\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    echo json_encode([
        "status" => "success",
        "message" => "Log saved and email sent",
        "email_to" => $to
    ]);
} else {
    echo json_encode([
        "status" => "partial",
        "message" => "Log saved but email failed. Check server mail configuration.",
        "log_file" => $logFile
    ]);
}
?>

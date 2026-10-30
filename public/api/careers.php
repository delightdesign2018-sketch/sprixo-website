<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if (!in_array($method, ['GET', 'POST'], true)) {
    header('Allow: GET, POST');
    respond(405, ['message' => 'Method not allowed.']);
}

ini_set('session.use_strict_mode', '1');
session_name('sprixo_careers');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/api/',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'httponly' => true,
    'samesite' => 'Strict',
]);
if (!session_start()) {
    respond(503, ['message' => 'Application service unavailable. Please try again later.']);
}
if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}
if ($method === 'GET') {
    respond(200, ['token' => $_SESSION['csrf']]);
}

if (!hash_equals($_SESSION['csrf'], $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '')) {
    respond(403, ['message' => 'Your form session expired. Please try again.']);
}
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    respond(415, ['message' => 'Please submit this form from the Careers page.']);
}
$raw = file_get_contents('php://input', false, null, 0, 32769);
if ($raw === false || strlen($raw) > 32768) {
    respond(413, ['message' => 'Your application is too large. Please shorten your message.']);
}
$input = json_decode($raw, true);
if (!is_array($input)) {
    respond(400, ['message' => 'Invalid application data.']);
}

$fields = ['name', 'email', 'phone', 'service', 'portfolio', 'message', 'companyWebsite'];
$values = [];
foreach ($fields as $field) {
    if (isset($input[$field]) && !is_string($input[$field])) {
        respond(422, ['message' => 'Please check your application fields.']);
    }
    $values[$field] = trim($input[$field] ?? '');
}
if ($values['companyWebsite'] !== '') {
    respond(422, ['message' => 'Unable to accept this application.']);
}

function withinLength(string $value, int $minimum, int $maximum): bool
{
    $length = preg_match_all('/./us', $value);
    return $length !== false && $length >= $minimum && $length <= $maximum;
}

$roles = ['Logo Design', 'Branding', 'Print media', 'Advertisement Designs', 'Website Design',
    'Creative Direction', 'Client Relationship Executive', 'Other'];
if (!withinLength($values['name'], 2, 120) || preg_match('/[\r\n\x00]/', $values['name'])) {
    respond(422, ['message' => 'Enter a name between 2 and 120 characters.']);
}
if (strlen($values['email']) > 254 || !filter_var($values['email'], FILTER_VALIDATE_EMAIL)
    || preg_match('/[\r\n\x00]/', $values['email'])) {
    respond(422, ['message' => 'Enter a valid email address.']);
}
if (!withinLength($values['phone'], 0, 40) || preg_match('/[\r\n\x00]/', $values['phone'])) {
    respond(422, ['message' => 'Enter a phone number of at most 40 characters.']);
}
if (!in_array($values['service'], $roles, true)) {
    respond(422, ['message' => 'Choose a position from the list.']);
}
if (!withinLength($values['portfolio'], 1, 1000)
    || !filter_var($values['portfolio'], FILTER_VALIDATE_URL)
    || !in_array(strtolower(parse_url($values['portfolio'], PHP_URL_SCHEME) ?? ''), ['http', 'https'], true)
    || preg_match('/[\r\n\x00]/', $values['portfolio'])) {
    respond(422, ['message' => 'Enter a valid HTTP or HTTPS portfolio or CV link.']);
}
if (!withinLength($values['message'], 10, 4000) || str_contains($values['message'], "\0")) {
    respond(422, ['message' => 'Enter a message between 10 and 4000 characters.']);
}
if (($input['consent'] ?? false) !== true) {
    respond(422, ['message' => 'Please agree to the privacy consent before submitting.']);
}

// Basic spam protection: honeypot, CSRF and five attempts per session per 15 minutes.
$now = time();
$_SESSION['attempts'] = array_values(array_filter($_SESSION['attempts'] ?? [],
    static fn ($timestamp) => $timestamp > $now - 900));
if (count($_SESSION['attempts']) >= 5) {
    header('Retry-After: 900');
    respond(429, ['message' => 'Too many attempts. Please try again in 15 minutes.']);
}
$_SESSION['attempts'][] = $now;

// public_html/api/careers.php -> sibling sprixo-private, never inside public_html.
$privateDirectory = dirname(__DIR__, 2) . '/sprixo-private';
$configFile = $privateDirectory . '/config.php';
$autoloadFile = $privateDirectory . '/vendor/autoload.php';
if (!is_file($configFile) || !is_file($autoloadFile)) {
    error_log('Sprixo careers: private SMTP configuration or PHPMailer is missing.');
    respond(503, ['message' => 'Application service unavailable. Please try again later.']);
}

try {
    $config = require $configFile;
    require_once $autoloadFile;
    $password = $config['smtp_password'] ?? '';
    if (!is_string($password) || $password === '' || $password === 'REPLACE_WITH_WORK_MAILBOX_PASSWORD') {
        throw new RuntimeException('Missing SMTP password.');
    }
    $mailer = new PHPMailer(true);
    $mailer->isSMTP();
    $mailer->Host = 'smtp.hostinger.com';
    $mailer->SMTPAuth = true;
    $mailer->Username = 'work@sprixo.com';
    $mailer->Password = $password;
    $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mailer->Port = 465;
    $mailer->Timeout = 20;
    $mailer->CharSet = 'UTF-8';
    $mailer->setFrom('work@sprixo.com', 'Sprixo Careers');
    $mailer->addAddress('work@sprixo.com');
    $mailer->addReplyTo($values['email'], $values['name']);
    $mailer->Subject = 'Career application — ' . $values['service'];
    $details = [
        'Name' => $values['name'], 'Email' => $values['email'],
        'Phone' => $values['phone'] !== '' ? $values['phone'] : '(not provided)',
        'Position' => $values['service'], 'Portfolio / CV URL' => $values['portfolio'],
        'Message' => $values['message'], 'Privacy consent' => 'Agreed',
    ];
    $html = '<h1>New Sprixo career application</h1><dl>';
    $plain = "New Sprixo career application\n\n";
    foreach ($details as $label => $value) {
        $html .= '<dt><strong>' . htmlspecialchars($label, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
            . '</strong></dt><dd>' . nl2br(htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) . '</dd>';
        $plain .= $label . ":\n" . $value . "\n\n";
    }
    $mailer->isHTML(true);
    $mailer->Body = $html . '</dl>';
    $mailer->AltBody = $plain;
    $mailer->send();
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    respond(200, ['success' => true, 'message' => 'Thank you. Your application has been sent to Sprixo.']);
} catch (Throwable $error) {
    // Avoid logging applicant content, credentials or raw SMTP diagnostics.
    error_log('Sprixo careers: SMTP submission failed (' . get_class($error) . ').');
    respond(502, ['message' => 'Your application could not be sent. Please try again later.']);
}

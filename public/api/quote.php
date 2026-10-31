<?php
declare(strict_types=1);
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $status, array $body): void { http_response_code($status); echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); exit; }
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
    ini_set('session.use_strict_mode', '1'); session_name('sprixo_quote'); session_set_cookie_params(['lifetime'=>0,'path'=>'/api/','secure'=>!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off','httponly'=>true,'samesite'=>'Strict']);
    if (!session_start()) respond(503, ['message'=>'Quote service unavailable.']);
    $_SESSION['csrf'] ??= bin2hex(random_bytes(32)); respond(200, ['token'=>$_SESSION['csrf']]);
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: GET, POST'); respond(405, ['message'=>'Method not allowed.']); }
ini_set('session.use_strict_mode', '1'); session_name('sprixo_quote'); session_set_cookie_params(['lifetime'=>0,'path'=>'/api/','secure'=>!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off','httponly'=>true,'samesite'=>'Strict']);
if (!session_start() || empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '')) respond(403, ['message'=>'Your form session expired. Please try again.']);
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) respond(415, ['message'=>'Please submit this form from the Quote page.']);
$raw = file_get_contents('php://input', false, null, 0, 32769); if ($raw === false || strlen($raw) > 32768) respond(413, ['message'=>'Your request is too large.']);
$input = json_decode($raw, true); if (!is_array($input)) respond(400, ['message'=>'Invalid quote data.']);
$fields = ['name','email','phone','service','message','companyWebsite']; $values = [];
foreach ($fields as $field) { if (isset($input[$field]) && !is_string($input[$field])) respond(422, ['message'=>'Please check your quote fields.']); $values[$field] = trim($input[$field] ?? ''); }
if ($values['companyWebsite'] !== '') respond(422, ['message'=>'Unable to accept this request.']);
function qlen(string $value, int $min, int $max): bool { $length = preg_match_all('/./us', $value); return $length !== false && $length >= $min && $length <= $max; }
$services = ['Logo Design','Branding','Print Media','Advertisement Designs','Website Design'];
if (!qlen($values['name'],2,120) || preg_match('/[\r\n\x00]/',$values['name'])) respond(422,['message'=>'Enter a name between 2 and 120 characters.']);
if (strlen($values['email']) > 254 || !filter_var($values['email'], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n\x00]/',$values['email'])) respond(422,['message'=>'Enter a valid email address.']);
if (!qlen($values['phone'],0,40) || preg_match('/[\r\n\x00]/',$values['phone'])) respond(422,['message'=>'Enter a phone number of at most 40 characters.']);
if (!in_array($values['service'],$services,true)) respond(422,['message'=>'Choose a service from the list.']);
if (!qlen($values['message'],10,4000) || str_contains($values['message'],"\0")) respond(422,['message'=>'Enter project details between 10 and 4000 characters.']);
if (($input['consent'] ?? false) !== true) respond(422,['message'=>'Please agree to the privacy consent before submitting.']);
$now=time(); $_SESSION['attempts']=array_values(array_filter($_SESSION['attempts']??[],static fn($t)=>$t>$now-900)); if(count($_SESSION['attempts'])>=5){header('Retry-After: 900');respond(429,['message'=>'Too many attempts. Please try again later.']);} $_SESSION['attempts'][]=$now;
$privateDirectory = dirname(__DIR__, 2) . '/sprixo-private'; $configFile=$privateDirectory.'/config.php'; $autoloadFile=$privateDirectory.'/vendor/autoload.php';
if (!is_file($configFile) || !is_file($autoloadFile)) { error_log('Sprixo quote: private SMTP configuration or PHPMailer is missing.'); respond(503,['message'=>'Quote service unavailable. Please try again later.']); }
try { $config=require $configFile; require_once $autoloadFile; $password=$config['smtp_password']??''; $recipient=$config['quote_recipient']??''; $username=$config['smtp_username']??'work@sprixo.com'; $from=$config['smtp_from']??$username; if(!is_string($password)||$password===''||!is_string($recipient)||!filter_var($recipient,FILTER_VALIDATE_EMAIL)) throw new RuntimeException('Missing quote SMTP configuration.'); $mailer=new PHPMailer(true); $mailer->isSMTP(); $mailer->Host='smtp.hostinger.com'; $mailer->SMTPAuth=true; $mailer->Username=$username; $mailer->Password=$password; $mailer->SMTPSecure=PHPMailer::ENCRYPTION_SMTPS; $mailer->Port=465; $mailer->Timeout=20; $mailer->CharSet='UTF-8'; $mailer->setFrom($from,'Sprixo Quotes'); $mailer->addAddress($recipient); $mailer->addReplyTo($values['email'],$values['name']); $mailer->Subject='New Quote Request - '.$values['name'].' - '.$values['service']; $details=['Name'=>$values['name'],'Email'=>$values['email'],'Phone'=>$values['phone']!==''?$values['phone']:'(not provided)','Service'=>$values['service'],'Project details'=>$values['message'],'Privacy consent'=>'Agreed']; $html='<h1>New Sprixo quote request</h1><dl>'; $plain="New Sprixo quote request\n\n"; foreach($details as $label=>$value){$safe=htmlspecialchars($value,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8');$html.='<dt><strong>'.htmlspecialchars($label,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8').'</strong></dt><dd>'.nl2br($safe).'</dd>'; $plain.=$label.":\n".$value."\n\n";} $mailer->isHTML(true); $mailer->Body=$html.'</dl>'; $mailer->AltBody=$plain; $mailer->send(); $_SESSION['csrf']=bin2hex(random_bytes(32)); respond(200,['success'=>true,'message'=>'Thank you. Your quote request has been sent to Sprixo.']); } catch(Throwable $error) { error_log('Sprixo quote: SMTP submission failed ('.get_class($error).').'); respond(502,['message'=>'Your quote request could not be sent. Please try again later.']); }

# Careers email setup on Hostinger

The build produces `dist/` for the public website (including `api/careers.php`)
and `dist-private/` for the private mailer package. Do not upload `dist-private`
inside the public directory. No SMTP password is included in the repository.

1. Select PHP 8.1 or later with OpenSSL and PHP sessions enabled in Hostinger.
2. Upload the contents of `dist/` to the domain's `public_html/` directory.
3. Create `sprixo-private/` beside `public_html/`, then copy the contents of
   `dist-private/` into it. The handler expects this exact sibling location.
4. From `sprixo-private/`, run:

   ```sh
   composer install --no-dev --prefer-dist --optimize-autoloader
   ```

   This installs the required PHPMailer dependency into the private `vendor/`
   directory. If Composer is unavailable on the host, run it on a machine with
   PHP 8.1+ and Composer, then upload `vendor/` and the resulting `composer.lock`
   to the same private directory. Keep the lock file for subsequent installs.
5. Copy `config.example.php` to `config.php` in that private directory. Replace
   the placeholder with the SMTP mailbox password for `work@sprixo.com`.
   Keep permissions restricted to the hosting account (for example, `600`).
6. Confirm that the `work@sprixo.com` mailbox exists and can authenticate at
   `smtp.hostinger.com:465` using implicit TLS. Sender and recipient are both
   this mailbox; Reply-To is the validated applicant email.
7. Open `/careers.html` over HTTPS and submit a test application. Confirm its
   arrival in the mailbox and that Reply targets the applicant. Check spam if
   needed. No test application was sent during implementation.

The handler validates all fields and consent, accepts only HTTP(S) portfolio
links, and uses a honeypot, CSRF token and session-based attempt limit. Session
storage must be writable by PHP. This is basic spam protection; it does not
provide a distributed per-IP rate limit. Applications are sent by email only.

Vite's development and preview servers do not execute PHP. Test the mail flow
on a PHP-capable server with the matching private directory structure. The UI
retains entered fields when email delivery fails and clears them only after
SMTP reports success. Public errors do not expose SMTP diagnostics or secrets.

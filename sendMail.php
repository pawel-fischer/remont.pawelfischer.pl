<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "remont@pawelfischer.pl";
    $subject = "Wiadomość z formularza kontaktowego";
    $message = "Imię: " . $_POST["name"] . "\n";
    $message .= "Email: " . $_POST["email"] . "\n";
    $message .= "Telefon: " . $_POST["phone"] . "\n";
    $message .= "Wiadomość:\n" . $_POST["message"];

    $headers = "From: " . $_POST["email"] . "\r\n" .
           "Reply-To: " . $_POST["email"] . "\r\n" .
           "Content-Type: text/plain; charset=utf-8";

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>

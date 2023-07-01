
<?php
$botToken = "6132189447:AAHgJTrTEOrTrCV13VNElRGqNgfTcm707F8";
$chatID = "@LilookGetMessageBot"; // ID чату або ім'я користувача в Telegram

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"];
  $phone = $_POST["phone"];
  $message = $_POST["message"];

  // Формування повідомлення для відправки в Telegram
  $telegramMessage = "Ім'я: " . $name . "\nТелефон: " . $phone . "\nПовідомлення: " . $message;

  // Відправка повідомлення до Telegram
  $telegramUrl = "https://api.telegram.org/bot" . $botToken . "/sendMessage";
  $telegramData = [
    'chat_id' => $chatID,
    'text' => $telegramMessage,
  ];

  // Відправка запиту до Telegram API
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $telegramUrl);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $telegramData);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $telegramResponse = curl_exec($ch);
  curl_close($ch);

  // Перевірка відповіді від Telegram API
  if ($telegramResponse === false) {
    // Обробка помилки відправки до Telegram
    echo "Помилка при відправці в Telegram.";
  } else {
    // Дії після успішної відправки до Telegram
    echo "Форма успішно відправлена до Telegram.";
  }
}
?>

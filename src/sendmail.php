<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	use PHPMailer\PHPMailer\SMTP;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'mail.adm.tools';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'mailer@novehub.es';                     //SMTP username
	$mail->Password   = 'x6xEX6_n3GzK8g8';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 
	

	//Від кого лист
	$mail->setFrom('mailer@novehub.es', 'Заявка на сайте'); // Вказати потрібний E-mail
	//Кому відправити
	$mail->addAddress('novehub.es@gmail.com'); // Вказати потрібний E-mail
	//Тема листа
	$mail->Subject = 'Заявка на сайте';

	//Тіло листа
	$body = '<h1>Новая заявка</h1>';

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '. $_POST['name']. '</p>';
	}	

	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Телефон:</strong> '. $_POST['phone']. '</p>';
	}	
	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Сообщение:</strong> '. $_POST['message']. '</p>';
	}	


	$body.='<p><strong>ДАТА:</strong></p>';
	if(trim(!empty($_POST['dataStart']))){
		$body.='<p><strong>ОТ:</strong> '. $_POST['dataStart']. '</p>';
	}		
	if(trim(!empty($_POST['dataEnd']))){
		$body.='<p><strong>ДО:</strong> '. $_POST['dataEnd']. '</p>';
	}	




	


	/*
	//Прикріпити файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//шлях завантаження файлу
		$filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name']; 
		//грузимо файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото у додатку</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	*/

	$mail->Body = $body;

	//Відправляємо
	if (!$mail->send()) {
		$message = 'Помилка';
	} else {
		$message = 'Дані надіслані!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>
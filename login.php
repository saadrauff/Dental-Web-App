<?php 
include 'db_connect.php'; 

$message = "";
$message_class = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username_or_email = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Prevent admin login
    if (strtolower($username_or_email) === 'admin') {
        $message = 'Login with username or email "admin" is not allowed.';
        $message_class = 'error';
    } else {
        $stmt = $conn->prepare("SELECT * FROM user WHERE username = ? OR email = ?");
        if (!$stmt) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("ss", $username_or_email, $username_or_email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $stored_hash = $row['password'];

            if (password_verify($password, $stored_hash)) {
                $message = "Login Successful!";
                $message_class = "success";

                // Redirect after showing success for 2 seconds
                header("refresh:2;url=home.html");
            } else {
                $message = "Incorrect Password!";
                $message_class = "error";
            }
        } else {
            $message = "Username or Email not found!";
            $message_class = "error";
        }

        $stmt->close();
    }

    $conn->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>E-Dental | Login</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    .message {
      text-align: center;
      margin-bottom: 15px;
      padding: 10px;
      border-radius: 6px;
      font-weight: bold;
    }
    .success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
  </style>
</head>
<body>

<div class="login-container" style="background-image: url(images/Image5/IMG-20251018-WA0011.jpg); background-size: cover; height: 100vh; margin: 0; background-repeat: no-repeat; background-position: center;">
  <div class="login-box">
    <h2>Login to E-Dental</h2>

    <?php if (!empty($message)): ?>
      <div class="message <?php echo $message_class; ?>"><?php echo htmlspecialchars($message); ?></div>
    <?php endif; ?>

    <form action="login.php" method="POST">
      <input type="text" id="username" name="username" placeholder="Username or Email" required>
      <input type="password" id="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>

    <p class="switch-text">
      Don’t have an account? <a href="signup.html">Sign up here</a>
    </p>
  </div>
</div>

</body>
</html>

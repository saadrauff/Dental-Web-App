<?php
include 'db_connect.php';
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
error_reporting(E_ALL);


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['fullname'];
  $email = $_POST['email'];
  $password = $_POST['newPassword'];
  $confirmPassword = $_POST['confirmPassword'];

  if (strtolower($username) === 'admin') {
  echo "<script>alert('The username \"admin\" is not allowed.'); window.location='signup.html';</script>";
  exit;
}


  if ($password !== $confirmPassword) {
    echo "<script>alert('Passwords do not match!'); window.location='signup.html';</script>";
    exit;
  }

  // Hash password
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  // Check duplicate
  $check = $conn->prepare("SELECT * FROM user WHERE username=? OR email=?");
  $check->bind_param("ss", $username, $email);
  $check->execute();
  $result = $check->get_result();

  if ($result->num_rows > 0) {
    echo "<script>alert('Username or Email already exists!'); window.location='signup.html';</script>";
  } else {
    $stmt = $conn->prepare("INSERT INTO user (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashed_password);
    if ($stmt->execute()) {
      echo "<script>alert('Account created successfully!'); window.location='index.html';</script>";
    } else {
      echo "<script>alert('Error while creating account!'); window.location='signup.html';</script>";
    }
    $stmt->close();
  }

  $check->close();
  $conn->close();
}
?>

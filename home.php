<?php
// Start session if needed (for cart, login, etc.)
session_start();

// Example: dynamic cart count (if using session)
$cart_count = isset($_SESSION['cart']) ? count($_SESSION['cart']) : 0;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>E-Dental | Home</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- Loader -->
  <div id="loader"><div class="spinner"></div></div>

  <!-- Header -->
  <header class="header">
    <div class="logo">E-Dental</div>
    <nav class="navbar">
      <a href="home.php">Home</a>
      <a href="appointment.php">Book Appointment</a>
      <a href="shop.php">Accessories</a>
      <a href="contact.php">Contact</a>
      <a href="cart.php">Cart (<span id="cart-count"><?php echo $cart_count; ?></span>)</a>
      <button class="login-btn" onclick="window.location.href='login.php'">Login</button>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-text">
      <h1>Brighten Your Smile with <span>E-Dental</span></h1>
      <p>Your One-Stop Solution for Dental Care & Accessories</p>
      <a href="appointment.php" class="btn">Book Appointment</a>
    </div>
  </section>

  <!-- Features -->
  <section class="features">
    <a href="appointment.php" class="feature-card">
      <img src="https://bwsolicitors.co.uk/wp-content/uploads/2021/05/Booking-An-Appointment-Now-768x768.jpg" alt="Appointment" />
      <h3>Easy Appointment</h3>
      <p>Book your appointment anytime, anywhere with ease!</p>
    </a>
    <a href="products.php" class="feature-card">
      <img src="https://png.pngtree.com/png-vector/20210806/ourlarge/pngtree-gold-medal-the-best-product-award-vector-png-image_3781469.jpg" alt="Products" />
      <h3>Quality Products</h3>
      <p>Shop toothpaste, mouthwash, and all dental accessories.</p>
    </a>
    <a href="contact.php" class="feature-card">
      <img src="https://st.depositphotos.com/2291517/4015/i/450/depositphotos_40155451-stock-photo-any-questions-concept.jpg" alt="Query" />
      <h3>Query</h3>
      <p>If you have any query, reach us here!</p>
    </a>
  </section>

  <!-- About -->
  <section class="about">
    <div class="about-text">
      <h2>Why Choose E-Dental?</h2>
      <p>
        E-Dental is your all-in-one solution for modern dental care, offering a seamless experience for both patients and dentists.
        With our smart appointment booking system, patients can easily schedule visits with automated or manual confirmations,
        while dentists can efficiently manage their calendars.
      </p>
      <p>
        Our integrated online shop provides high-quality dental products, ensuring that patients have access to essential oral care items
        right at their fingertips. Plus, with secure patient history management, dentists can track treatments, suggest personalized care plans,
        and ensure the best possible outcomes.
      </p>
      <p>
        With E-Dental, you get efficiency, convenience, and innovation — all designed to make dental care
        <strong>simpler, faster, and more effective.</strong> 🦷✨
      </p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p>&copy; 2025 E-Dental. All rights reserved.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>

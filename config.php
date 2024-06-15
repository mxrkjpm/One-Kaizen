<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login-register";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else{
    echo"Connected Successfully";
}

// Register user
if (isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validate username and password
    if (empty($username) || empty($password) || empty($confirm_password)) {
        $error = "Please fill in all fields";
    } elseif (strlen($password) < 8) {
        $error = "Password must be at least 8 characters long";
    } elseif ($password != $confirm_password) {
        $error = "Passwords do not match";
    } else {
        // Hash password for storage
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert user into database
        $query = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $success = "Registration successful!";
        } else {
            $error = "Registration failed: " . mysqli_error($conn);
        }
    }
}

// Display error or success message
if (isset($error)) {
    echo "<p style='color: red;'>$error</p>";
} elseif (isset($success)) {
    echo "<p style='color: green;'>$success</p>";
}
?>

<!-- Registration form -->
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <label for="name" id="name" name="name"></label>
    <input type="text" id="username" name="username" placeholder="Username"><br><br>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username"><br><br>
    <label for="contact number">contact number:</label>
    <input type="text" id="contact nunber" name="contact number"><br><br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password"><br><br>
    <label for="confirm_password">Confirm Password:</label>
    <input type="password" id="confirm_password" name="confirm_password"><br><br>
    <input type="submit" name="register" value="Register">
</form>
<?php
include("php/config.php");

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $contactnumber = $_POST['contact number'];

    // Verify unique username
    $verify_query = mysqli_query($con, "SELECT Username FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if (mysqli_num_rows($result) != 0) {
        echo "<div class='message'>
                <p>This username is used, try another One Please!</p>
              </div> <br>";
        echo "<a href='javascript:self.history.back'><button class='btn'>Go Back</button>";
    } else {
        // Hash password
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        
        // Verify contact number
        $contact_query = mysqli_query($con, "SELECT ContactNumber FROM users WHERE contactnumber = ? LIMIT 1");
        $stmt->bind_param("s", $contactnumber);
        $stmt->execute();
        $result = $stmt->get_result();
        // Insert into database
        $insert_query = mysqli_query($con, "INSERT INTO users (Name, Username, Password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $username, $hashed_password, $contactnumber);
        $stmt->execute();

        echo "<div class='message'>
                <p>Registration successfully!</p>
              </div> <br>";
        echo "<a href='register.php'><button class='btn'>Login Now</button>";
    }
}
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Register style.css">
    <title>Register Page</title>
</head>
<body>
    <div class="container">
        <div class="box form-box">
            <h1>Register</h1>
            <form action="register.php" method="post">
                <div class="field input"> 
                    <label for="Name">Name</label>
                    <input type="text" name="name" id="Name" required>
                </div>
                <div class="field input">
                    <label for="Contact Number">Contact Number</label>
                    <input type="text" name="contact_number" id="Contact Number" required autocomplete="off">
                </div>
                <div class="field input"> 
                    <label for="Username">Username</label>
                    <input type="text" name="username" id="Username" required autocomplete="off">
                </div>
                <div class="field input">
                    <label for="Password">Password</label> 
                    <input type="password" name="password" id="Password" required autocomplete="off">
                </div>
                <div class="field input">
                    <label for="Confirm Password">Confirm Password</label> 
                    <input type="password" name="confirm_password" id="Confirm Password" required autocomplete="off">
                </div>
                <div class="field">
                    <input type="submit" name="submit" value="Register" required>
                </div>
                <div class="link">
                    Have account? <a href="login.php">login</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
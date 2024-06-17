<!DOCTYPE html>
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
        <h1>Login</h1>
        <form action="login.php" method="post">
            <div class="field input"> 
                <label for="Name">Name</label>
                <input type="text" name="Name" id="Name" required>
            </div>
            <div class="field input">
                <label for="Password">Password</label> 
                <input type="password" name="Password" id="Password" required>
            </div>
            <div class="field">
                <input type="submit" name="Login" value="Login" required>
            </div>
            <div class="link">
                Don't have an account? <a href="Register.php">Register</a>
            </div>
        </form>
    </div>
</div>
</body>
</html>
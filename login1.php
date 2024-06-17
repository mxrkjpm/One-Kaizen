**memberlist.php**
```php
<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the input values
    $names = $_POST["Name"];

    // Process the input values (e.g., insert into database)
    foreach ($names as $name) {
        // Insert into database or perform other actions
        echo "Received name: $name<br>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Member List</title>
</head>
<body>
    <h1>Member List</h1>
    <p>Form submitted successfully!</p>
</body>
</html>
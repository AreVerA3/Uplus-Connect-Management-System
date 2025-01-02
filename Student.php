<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard</title>
    <link rel="stylesheet" href="Student.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
    <div class="dashboard">
        <div class="sidebar">
            <!-- Sidebar content can be added here -->
        </div>
        <div class="main-display" id="main-display">

            <div id="learningmaterial">
                <fieldset>
                    <legend>Learning Materials</legend>
                    <table id="materials-table" class="materials-table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>School Level</th>
                                <th>Subject</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            // Function to create a database connection
                            function getDBConnection() {
                                $servername = "localhost";
                                $username = "root";
                                $password = "";
                                $dbname = "student_db";
                                return new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                            }

                            try {
                                $conn = getDBConnection();
                                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                                $stmt = $conn->query("SELECT id, title, school_level, subject, file_path FROM learning_materials");
                                $materials = $stmt->fetchAll(PDO::FETCH_ASSOC);

                                if (empty($materials)) : ?>
                                    <tr>
                                        <td colspan="5">No materials available.</td>
                                    </tr>
                                <?php else : ?>
                                    <?php foreach ($materials as $material) : ?>
                                        <tr>
                                            <td><?php echo $material['id']; ?></td>
                                            <td><?php echo htmlspecialchars($material['title']); ?></td>
                                            <td><?php echo htmlspecialchars($material['school_level']); ?></td>
                                            <td><?php echo htmlspecialchars($material['subject']); ?></td>
                                            <td>
                                                <?php if ($material['file_path']) : ?>
                                                    <a href="<?php echo htmlspecialchars($material['file_path']); ?>" download>Download</a>
                                                <?php else : ?>
                                                    N/A
                                                <?php endif; ?>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                <?php endif;
                                $conn = null;
                            } catch (PDOException $e) {
                                // Log the error instead of displaying it
                                error_log($e->getMessage());
                                echo "<tr><td colspan='5'>Error fetching materials.</td></tr>";
                            }
                            ?>
                        </tbody>
                    </table>
                </fieldset>
            </div>

            <div id="payment" class="hidden">
                <div class="payment-container">
                    <h2>Payment</h2>
                    <div class="unpaid-items">
                        <h3>Unpaid Items</h3>
                        <form id="paymentForm" action="process_payment.php" method="post">
                            <table class="unpaid-items-table">
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>Description</th>
                                        <th >Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    try {
                                        $conn = getDBConnection();
                                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                                        $stmt = $conn->query("SELECT id, description, amount FROM unpaid_items");
                                        $unpaidItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

                                        if (empty($unpaidItems)) : ?>
                                            <tr>
                                                <td colspan="3">No unpaid items.</td>
                                            </tr>
                                        <?php else : ?>
                                            <?php foreach ($unpaidItems as $item) : ?>
                                                <tr>
                                                    <td><input type="checkbox" name="selected_items[]" value="<?php echo $item['id']; ?>" data-description="<?php echo htmlspecialchars($item['description']); ?>" data-amount="<?php echo $item['amount']; ?>"></td>
                                                    <td><?php echo htmlspecialchars($item['description']); ?></td>
                                                    <td><?php echo $item['amount']; ?></td>
                                                </tr>
                                            <?php endforeach; ?>
                                        <?php endif;
                                        $conn = null;
                                    } catch (PDOException $e) {
                                        error_log($e->getMessage());
                                        echo "<tr><td colspan='3'>Error fetching unpaid items.</td></tr>";
                                    }
                                    ?>
                                </tbody>
                            </table>
                            <div class="total-amount">
                                Total Amount: $<span id="totalAmount">0.00</span>
                            </div>
                            <input type="submit" value="Pay">
                        </form>
                    </div>
                    <div class="payment-methods">
                        <!-- Payment methods can be added here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showMainDisplay(displayId, clickedButton) {
            const displays = document.querySelectorAll('.main-display > div');
            const menuItems = document.querySelectorAll('.menu-item');

            displays.forEach(display => display.classList.add('hidden'));
            menuItems.forEach(item => item.classList.remove('active'));

            document.getElementById(displayId).classList.remove('hidden');
            clickedButton.classList.add('active');
        }

        document.getElementById('paymentForm').addEventListener('submit', function(event) {
            let checkedBoxes = document.querySelectorAll('input[name="selected_items[]"]:checked');
            if (checkedBoxes.length === 0) {
                alert("Please select at least one item to pay");
                event.preventDefault();
                return;
            }

            let descriptions = [];
            let amounts = [];
            checkedBoxes.forEach(box => {
                descriptions.push(box.dataset.description);
                amounts.push(box.dataset.amount);
            });

            descriptions.forEach(description => {
                let input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'descriptions[]';
                input.value = description;
                this.appendChild(input);
            });
            amounts.forEach(amount => {
                let input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'amounts[]';
                input.value = amount;
                this.appendChild(input);
            });
        });

        const bankTransferRadio = document.getElementById('bankTransferRadio');
        const bankInfoPopup = document.getElementById('bankInfoPopup');
        const bankInfoClose = document.getElementById('bankInfoClose');

        bankTransferRadio.addEventListener('change', () => {
            if (bankTransferRadio.checked) {
                bankInfoPopup.style.display = 'flex';
            }
        });

        bankInfoClose.addEventListener('click', () => {
            bankInfoPopup.style.display = 'none';
        });
    </script>
</body>

</html>
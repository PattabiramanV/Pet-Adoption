<?php
require '../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $doctorId = isset($_GET['doctorId']) ? intval($_GET['doctorId']) : 0;
    $appointmentDate = isset($_GET['date']) ? $_GET['date'] : '';

    if ($doctorId <= 0 || empty($appointmentDate)) {
        echo json_encode(["status" => "error", "message" => "Invalid input."]);
        exit;
    }

    $bookedSlots = [];

    try {
        // Fetch booked slots
        $query = "SELECT bookingslot FROM slot WHERE doctor_id = ? AND booking_date = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$doctorId, $appointmentDate]);

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $bookedSlots[] = json_decode($row['bookingslot'], true);
        }

        // Fetch doctor's available timings
        $query = "SELECT available_timing_from, available_timing_to FROM vetneries WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$doctorId]);
        $availability = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$availability) {
            echo json_encode(["status" => "error", "message" => "Doctor not available on this day."]);
            exit;
        }

        // Convert available timings to array of slots
        $availableTimingFrom = new DateTime($availability['available_timing_from']);
        $availableTimingTo = new DateTime($availability['available_timing_to']);
        $slots = [];

        $interval = new DateInterval('PT30M'); // 30-minute interval

        while ($availableTimingFrom < $availableTimingTo) {
            $slotStart = $availableTimingFrom->format('g:i A'); // Start time
            $availableTimingFrom->add($interval);
            $slotEnd = $availableTimingFrom->format('g:i A'); // End time

            if ($availableTimingFrom <= $availableTimingTo) {
                $slots[] = "$slotStart - $slotEnd";
            }
        }

        echo json_encode([
            "status" => "success",
            "slots" => $slots,
            "bookedSlots" => $bookedSlots
        ]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

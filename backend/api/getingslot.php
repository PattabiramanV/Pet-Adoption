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
            $bookedSlotTime = DateTime::createFromFormat('H:i:s', $row['bookingslot']);
            if ($bookedSlotTime) {
                $bookedSlots[] = $bookedSlotTime->format('h:i A');
            }
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

        // Generate all possible slots
        $startTime = new DateTime($availability['available_timing_from']);
        $endTime = new DateTime($availability['available_timing_to']);

        $interval = new DateInterval('PT30M');
        $allSlots = [];
        while ($startTime <= $endTime) {
            $allSlots[] = $startTime->format('H:i:s');
            $startTime->add($interval);
        }

        // Calculate available slots
        $availableSlots = array_diff($allSlots, array_map(function($slot) {
            $time = DateTime::createFromFormat('h:i A', $slot);
            return $time ? $time->format('H:i:s') : $slot;
        }, $bookedSlots));

        $availableSlotsFormatted = array_map(function($slot) {
            $time = DateTime::createFromFormat('H:i:s', $slot);
            return $time ? $time->format('h:i A') : $slot;
        }, $availableSlots);

        echo json_encode([
            "status" => "success",
            "slots" => $availableSlotsFormatted,
            "bookedSlots" => $bookedSlots
        ]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

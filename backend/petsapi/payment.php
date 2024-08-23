<?php
include_once '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


define('STRIPE_API_KEY', 'sk_test_51Pq6rqExou2bUsQnRODhTZIcvbZV6W2JOzMPMAyD1zXrYL1wdUMKHFxRt5PSQIVKDlqwVRlDCPFSmJgg7aAc879r00j80nnuAD');
define('STRIPE_PUBLISHABLE_KEY', 'pk_test_51Pq6rqExou2bUsQnneRSByj6C8adVq8Ab82OAdaWRsjMsUwPjdd79aAILL8usryWZeqiUPsRGQgBPwan1taw5S2Q00rnzb3NzE');
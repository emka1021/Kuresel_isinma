<?php
// Veritabanı bağlantısı
$servername = "localhost";
$username = "root";
$password = "";
$database = "kuresel";

// Bağlantı oluşturma
$conn = new mysqli($servername, $username, $password, $database);

// Bağlantıyı kontrol etme
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

// Veri ekleme işlemi
for ($year = 2000; $year <= 2050; $year++) {
    $temperature = getTemperatureForYear($year);

    $sql = "INSERT INTO kuresel (year, temperature) VALUES ('$year', '$temperature')";

    if ($conn->query($sql) === TRUE) {
        echo "Yıl: " . $year . " verisi başarıyla eklendi.<br>";
    } else {
        echo "Hata: " . $sql . "<br>" . $conn->error;
    }
}

// Veritabanı bağlantısını kapatma
$conn->close();

// Yıl için sıcaklık verisini alır veya hesaplar
function getTemperatureForYear($year) {
    // Bu örnekte sabit bir veri seti kullanılacak
    $temperatureData = array(
        2000 => 0.6, 2001 => 0.63, 2002 => 0.66, 2003 => 0.69, 2004 => 0.72, 2005 => 0.75,
        2006 => 0.78, 2007 => 0.81, 2008 => 0.84, 2009 => 0.87, 2010 => 0.9, 2011 => 0.93,
        2012 => 0.96, 2013 => 0.99, 2014 => 1.02, 2015 => 1.05, 2016 => 1.08, 2017 => 1.11,
        2018 => 1.14, 2019 => 1.17, 2020 => 1.2, 2021 => 1.23, 2022 => 1.26, 2023 => 1.29,
        2024 => 1.32, 2025 => 1.35, 2026 => 1.38, 2027 => 1.41, 2028 => 1.44, 2029 => 1.47,
        2030 => 1.5, 2031 => 1.53, 2032 => 1.56, 2033 => 1.59, 2034 => 1.62, 2035 => 1.65,
        2036 => 1.68, 2037 => 1.71, 2038 => 1.74, 2039 => 1.77, 2040 => 1.8, 2041 => 1.83,
        2042 => 1.86, 2043 => 1.89, 2044 => 1.92, 2045 => 1.95, 2046 => 1.98, 2047 => 2.01,
        2048 => 2.04, 2049 => 2.07, 2050 => 2.1
    );

    return isset($temperatureData[$year]) ? $temperatureData[$year] : 0;
}
?>

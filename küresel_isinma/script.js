function drawChart() {
    var input = document.getElementById("yearsInput").value;
    var years = input.split(",");
    var dataPoints = [];

    years.forEach(function (year) {
        var yearInt = parseInt(year);
        if (yearInt >= 2000 && yearInt <= 2050) {
            var temperature = getTemperatureForYear(yearInt);
            dataPoints.push({ label: year, y: temperature });
        } else {
            alert("Geçersiz yıl: " + year);
        }
    });

    for (var year = Math.min(...years); year <= Math.max(...years); year++) {
        if (!dataPoints.find(dataPoint => dataPoint.label === year.toString())) {
            var temperature = getTemperatureForYear(year);
            dataPoints.push({ label: year.toString(), y: temperature });
        }
    }

    dataPoints.sort((a, b) => parseInt(a.label) - parseInt(b.label));

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Ortalama Küresel Sıcaklık Artışı (°C)"
        },
        axisY: {
            title: "Sıcaklık Artışı",
            suffix: "°C"
        },
        data: [{
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: dataPoints
        }]
    });
    chart.render();

    updateAdvice(dataPoints[dataPoints.length - 1].y);
}

function getTemperatureForYear(year) {
    var temperatureData = {
        2000: 0.6, 2001: 0.63, 2002: 0.66, 2003: 0.69, 2004: 0.72, 2005: 0.75,
        2006: 0.78, 2007: 0.81, 2008: 0.84, 2009: 0.87, 2010: 0.9, 2011: 0.93,
        2012: 0.96, 2013: 0.99, 2014: 1.02, 2015: 1.05, 2016: 1.08, 2017: 1.11,
        2018: 1.14, 2019: 1.17, 2020: 1.2, 2021: 1.23, 2022: 1.26, 2023: 1.29,
        2024: 1.32, 2025: 1.35, 2026: 1.38, 2027: 1.41, 2028: 1.44, 2029: 1.47,
        2030: 1.5, 2031: 1.53, 2032: 1.56, 2033: 1.59, 2034: 1.62, 2035: 1.65,
        2036: 1.68, 2037: 1.71, 2038: 1.74, 2039: 1.77, 2040: 1.8, 2041: 1.83,
        2042: 1.86, 2043: 1.89, 2044: 1.92, 2045: 1.95, 2046: 1.98, 2047: 2.01,
        2048: 2.04, 2049: 2.07, 2050: 2.1
    };
    return temperatureData[year] || 0;
}

var advice = [
    {
        threshold: 0.5,
        message: [
            "Sera gazı emisyonlarını azaltmak için yenilenebilir enerji kaynaklarına geçiş.",
            "Enerji verimliliğini artıran teknolojilere yatırım.",
            "Bireysel enerji tüketimini azaltarak karbon ayak izini düşürmek."
        ]
    },
    {
        threshold: 1.0,
        message: [
            "Toplu taşıma araçlarını kullanarak fosil yakıt tüketimini azaltmak.",
            "Enerji tasarruflu cihazlar kullanmak.",
            "Binalarda yalıtım sağlayarak ısı kaybını azaltmak."
        ]
    },
    {
        threshold: 1.5,
        message: [
            "Elektrikli araçlara geçiş yapmak.",
            "Daha az et tüketmek ve bitkisel bazlı beslenmeye yönelmek.",
            "Güneş enerjisi panelleri gibi yenilenebilir enerji kaynaklarına yatırım yapmak."
        ]
    },
    {
        threshold: 2.0,
        message: [
            "Geri dönüşüm ve atık azaltma uygulamalarına katılmak.",
            "Yerel ve organik gıdaları tercih etmek.",
            "Sürdürülebilir tarım uygulamalarını desteklemek."
        ]
    },
    {
        threshold: 2.5,
        message: [
            "Küresel politikalar ve anlaşmalar yoluyla sera gazı emisyonlarını düzenlemek.",
            "Yeniden ağaçlandırma ve doğal habitatları koruma projelerine katılmak.",
            "Sera gazı emisyonlarını izlemek ve raporlamak için gelişmiş teknolojiler kullanmak."
        ]
    },
    {
        threshold: 3.0,
        message: [
            "Küresel ısınmanın etkilerine karşı adaptasyon ve dayanıklılık stratejileri geliştirmek.",
            "Deniz seviyesinin yükselmesi ve sel risklerine karşı kıyı bölgelerini korumak.",
            "İklim değişikliğine karşı toplumların farkındalığını artırmak ve eğitim programları düzenlemek."
        ]
    }
];

function updateAdvice(temperature) {
    var adviceList = document.getElementById("adviceList");
    adviceList.innerHTML = "";

    advice.forEach(function (item) {
        if (temperature >= item.threshold) {
            item.message.forEach(function (msg) {
                var listItem = document.createElement("li");
                listItem.textContent = msg;
                adviceList.appendChild(listItem);
            });
        }
    });
}

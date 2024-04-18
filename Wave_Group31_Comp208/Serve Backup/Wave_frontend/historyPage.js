function updateWidth() {
    var width75Percent = window.innerWidth * 0.75;
    
    var centeredElement = document.querySelector('.centered-page');
    
    centeredElement.style.width = width75Percent + 'px';
  }
  
  document.addEventListener('DOMContentLoaded', updateWidth);
   
   
   
   
   
   
   // 定义data对象
    const dataReal = {
        datasets: [{
            data: [30, 70],
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 0,
            borderRadius: [30,0],
            bodyAlign: 'center',
              
            borderColor: [
                'rgba(75, 192, 192, 1)', // 绿色
                'rgba(54, 162, 235, 1)'  // 蓝色
            ]
        }]
    };

    // 定义config对象
    const configReal = {
        type: 'doughnut',
        data: dataReal,
        options: {
            cutout: '65%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                            const currentValue = context.raw;
                            const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                            return percentage + "%";
                        }
                    }
                }
            }
        }
    };

    // 使用config创建Chart实例
    const myChart = new Chart(
        document.getElementById('dailyIntakeChart'),
        configReal
    );



    const dataHover = {
        datasets: [{
            data: [100],
            backgroundColor: [
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
            bodyAlign: 'center',
              
            borderColor: [
                'rgba(75, 192, 192, 1)', // 绿色
            ]
        }]
    };



    const configHover = {
        type: 'doughnut',
        data: dataHover,
        options: {
            cutout: '65%',
            responsive: true,
            maintainAspectRatio: false,
        }
    };


    const myChartHover = new Chart(
        document.getElementById('dailyHoverChart'),
        configHover
    );









    document.addEventListener('DOMContentLoaded', function() {
        const queryParams = new URLSearchParams(window.location.search);
        const date = queryParams.get('date');
    
        if (date) {
            document.getElementById('dateExpress').textContent = date;
            fetchData(date);
        }
    });
    
    function fetchData(date) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `http://43.157.48.178:8081/api/Wave/history?date=${date}`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { 
                if (xhr.status === 200) {  
                    const response = JSON.parse(xhr.responseText);
                    if (response.code === 1 && response.msg === 'success') {
                        // 更新图表
                        updateChart(response.data.history);
    
                        // 更新页面上的信息
                        document.getElementById('user-text').textContent = response.data.username;
                        document.getElementById('dietaryInformation').textContent = response.data.history.totalIntake.toFixed(1);
                        document.getElementById('motorInformation').textContent = response.data.history.totalConsumption.toFixed(1);
                        document.getElementById('carInformation').textContent = response.data.history.totalCarbs.toFixed(1);
                        document.getElementById('fatInformation').textContent = response.data.history.totalFat.toFixed(1);
                        document.getElementById('proteinInformation').textContent = response.data.history.totalProtein.toFixed(1);
                    }
                } else {
                    console.error('Error fetching data:', xhr.statusText);
                }
            }
        };
        xhr.send();
    }


    function updateChart(data) {
        // 如果intakeRatio超过了1（即超过了100%），将它设置为1
        var intakeRatio = Math.min(data.intakeRatio, 1);
        var remainRatio = intakeRatio < 1 ? Math.min(data.remainRatio, 1 - intakeRatio) : 0;
    
        // 转换为百分比
        var blueValue = intakeRatio * 100;
        var greenValue = remainRatio * 100;
    
        // 更新甜甜圈图的数据
        myChart.data.datasets[0].data[0] = blueValue;
        myChart.data.datasets[0].data[1] = greenValue;
    
        // 如果intakeRatio达到或超过100%，则将蓝色部分变为橙色
        if (intakeRatio >= 1) {
            myChart.data.datasets[0].backgroundColor[0] = 'rgba(255, 165, 0, 1)'; // 橙色
        } else {
            myChart.data.datasets[0].backgroundColor[0] = 'rgba(54, 162, 235, 1)'; // 蓝色
        }
    
        // 设置绿色部分的颜色
        myChart.data.datasets[0].backgroundColor[1] = 'rgba(75, 192, 192, 1)'; // 绿色
    
        // 更新图表以显示新数据
        myChart.update();
    }
    







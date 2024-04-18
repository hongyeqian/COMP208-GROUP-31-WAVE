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
                            const label = context.dataIndex === 0 ? 'intake' : 'remain';
                            return `${label}: ${percentage}%`;
                        }
                    }
                }
            }
        }
    };

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
        fetchData();
    });




    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `http://43.157.48.178:8081/api/Wave/sport`, true);
        xhr.responseType = 'json';
    
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = xhr.response;
                if (response.code === 1 && response.msg === 'success') {
                    updateChart(response.data);
    
                    // 更新页面上的膳食摄入、运动消耗等信息
                    document.getElementById('user-text').textContent = response.data.username;
                    document.getElementById('dietaryInformation').textContent = response.data.intake.toFixed(1);
                    document.getElementById('motorInformation').textContent = response.data.consumption.toFixed(1);
                    document.getElementById('carInformation').textContent = response.data.carbohydrate.toFixed(1);
                    document.getElementById('fatInformation').textContent = response.data.fat.toFixed(1);
                    document.getElementById('proteinInformation').textContent = response.data.protein.toFixed(1);
    
                    // 更新动态表格数据
                    updateDynamicTable(response.data.sportList);
                } else {
                    console.error('The response was not as expected:', response);
                }
            } else {
                console.error('Error fetching data:', xhr.statusText);
            }
        };
    
        xhr.onerror = function() {
            console.error('There was an error making the request.');
        };
        xhr.send();
    }
    
    function updateDynamicTable(sportList) {
        var table = document.querySelector('.calorie-table');
        var totalTime = 0;
    
        // 清除现有的表格数据
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
    
        // 插入新的食物数据
        sportList.forEach(function(sport) {
            totalTime += sport.sportTime;
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.textContent = sport.sportName;
            cell2.textContent = sport.sportTime + 'min';
        });
    
        // 添加总计行
        var totalRow = table.insertRow();
        totalRow.className = 'total';
        var cell1 = totalRow.insertCell(0);
        var cell2 = totalRow.insertCell(1);
        cell1.textContent = 'Total Time';
        cell2.textContent = totalTime.toFixed(1) + 'min';

        if(totalTime===0){
            setTimeout(function() {
                window.location.reload();
            }, 800);
            

        }
    }
    

    function updateChart(data) {
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

    // 发送POST请求
    $('#freeChoose').click(function() {
        $.ajax({
            url: 'http://43.157.48.178:8081/api/Wave/sport/delete',
            type: 'POST', // 请求类型为POST
            success: function() {
                console.log('POST请求已成功发送！');
            },
            error: function(xhr) {
                console.log('POST请求失败：', xhr.statusText);
            }
        });
    });






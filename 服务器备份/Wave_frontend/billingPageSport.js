function updateWidth() {
    // 获取屏幕宽度的75%
    var width75Percent = window.innerWidth * 0.75;
    
    // 选择.centered-page元素
    var centeredElement = document.querySelector('.centered-page');
    
    // 设置.centered-page的宽度为计算出的宽度值（以像素为单位）
    centeredElement.style.width = width75Percent + 'px';
  }
  
  // 在页面加载时设置宽度
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
                'rgba(75, 192, 192, 1)', // 绿色部分
                'rgba(54, 162, 235, 1)'  // 蓝色部分
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
                'rgba(75, 192, 192, 1)', // 绿色部分
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


    // // 当按钮被点击时发送POST请求
    // $('#freeChoose').click(function() {
    //     function sendpostrequest(){
    //         $.ajax({
    //             url: 'http://43.157.48.178:8081/api/Wave/sport/delete',// 请求的URL
    //             type: 'POST', // 请求类型为POST
    //             success: function() {
    //                 console.log('POST请求已成功发送！'); // 请求成功发送的日志
    //             },
    //             error: function(xhr) {
    //                 console.log('POST请求失败：', xhr.statusText); // 请求失败时的日志
    //             }
    //         });
    //     }

    //     while(response.code !== 1){
    //         sendpostrequest();
    //     }
        
    // });
    



    document.addEventListener('DOMContentLoaded', function() {
        // 直接调用fetchData函数获取数据
        fetchData();
    });




    function fetchData() {
        // 创建一个新的XMLHttpRequest对象
        var xhr = new XMLHttpRequest();
        // 设置请求的URL，这里应该是您的后端提供数据的API
        xhr.open('GET', `http://43.157.48.178:8081/api/Wave/sport`, true);
        // 设置期望的响应类型为JSON
        xhr.responseType = 'json';
    
        // 定义请求完成后的回调函数
        xhr.onload = function() {
            // 检查请求是否成功
            if (xhr.status === 200) {
                // 解析JSON响应
                const response = xhr.response;
                // 检查返回的数据是否符合预期格式
                if (response.code === 1 && response.msg === 'success') {
                    // 更新图表数据
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
                    // 如果返回的数据不符合预期，打印错误信息
                    console.error('The response was not as expected:', response);
                }
            } else {
                // 如果请求没有成功，打印出错误状态
                console.error('Error fetching data:', xhr.statusText);
            }
        };
    
        // 设置请求出错的回调函数
        xhr.onerror = function() {
            // 如果请求过程中发生错误，打印出错误信息
            console.error('There was an error making the request.');
        };
    
        // 发送请求
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
    
    // // 在页面加载完成后调用函数，开始获取数据
    // document.addEventListener('DOMContentLoaded', fetchData);

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

    // 当按钮被点击时发送POST请求
    $('#freeChoose').click(function() {
        $.ajax({
            url: 'http://43.157.48.178:8081/api/Wave/sport/delete', // 请求的URL
            type: 'POST', // 请求类型为POST
            success: function() {
                console.log('POST请求已成功发送！'); // 请求成功发送的日志
            },
            error: function(xhr) {
                console.log('POST请求失败：', xhr.statusText); // 请求失败时的日志
            }
        });
    });






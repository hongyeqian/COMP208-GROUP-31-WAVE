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


    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('.clickAbleImage');

    
        images.forEach(image => {
            // 当鼠标悬停在一张图片上时
            image.addEventListener('mouseover', function() {
                // 停止所有图片的浮动动画
                images.forEach(img => img.style.animationPlayState = 'running');
                // 仅停止当前悬停的图片的浮动动画
                this.style.animationPlayState = 'paused';
            });
    
            // 当鼠标离开图片时
            image.addEventListener('mouseout', function() {
                // 重新开始所有图片的浮动动画
                images.forEach(img => img.style.animationPlayState = 'running');
            });
        });
    });




    let calendar = document.querySelector('.calendar')

    const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
    }
    
    getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28
    }
    
    generateCalendar = (month, year) => {
    
        let calendar_days = calendar.querySelector('.calendar-days')
        let calendar_header_year = calendar.querySelector('#year')
    
        let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
        calendar_days.innerHTML = ''
    
        let currDate = new Date()
        if (!month && month !='0') month = currDate.getMonth()
        if (!year) year = currDate.getFullYear()
    
        let curr_month = `${month_names[month]}`
        month_picker.innerHTML = curr_month
        calendar_header_year.innerHTML = year
    
        // get first day of month
        
        let first_day = new Date(year, month, 1)
    
        for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
            let day = document.createElement('div')
            if (i >= first_day.getDay()) {
                day.classList.add('calendar-day-hover')
                day.innerHTML = i - first_day.getDay() + 1
                day.innerHTML += `<span></span>
                                <span></span>
                                <span></span>
                                <span></span>`
                if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                    day.classList.add('curr-date')
                }
                day.onclick = () => {
                    let formattedMonth = (month + 1).toString().padStart(2, '0');
                    let formattedDay = (i - first_day.getDay() + 1).toString().padStart(2, '0');
                    window.location.href = `historyPage.html?date=${year}-${formattedMonth}-${formattedDay}`;
                };
            }
          calendar_days.appendChild(day)
        }
    }
    
    let month_list = calendar.querySelector('.month-list')
    
    month_names.forEach((e, index) => {
        let month = document.createElement('div')
        month.innerHTML = `<div data-month="${index}">${e}</div>`
        month.querySelector('div').onclick = () => {
            month_list.classList.remove('show')
            curr_month.value = index
            generateCalendar(index, curr_year.value)
        }
        month_list.appendChild(month)
    })
    
    let month_picker = calendar.querySelector('#month-picker')
    
    month_picker.onclick = () => {
        month_list.classList.add('show')
    }
    
    let currDate = new Date()
    
    let curr_month = {value: currDate.getMonth()}
    let curr_year = {value: currDate.getFullYear()}
    
    generateCalendar(curr_month.value, curr_year.value)
    
    document.querySelector('#prev-year').onclick = () => {
        --curr_year.value
        generateCalendar(curr_month.value, curr_year.value)
    }
    
    document.querySelector('#next-year').onclick = () => {
        ++curr_year.value
        generateCalendar(curr_month.value, curr_year.value)
    }
    
    let dark_mode_toggle = document.querySelector('.dark-mode-switch')
    
    // dark_mode_toggle.onclick = () => {
    //     document.querySelector('body').classList.toggle('light')
    //     document.querySelector('body').classList.toggle('dark')
    // }




//发送请求
function updateDataAndCharts() {
    $.ajax({
      url: 'http://43.157.48.178:8081/api/Wave/homepage', // 替换为您的API端点
      method: 'GET', // 或者 POST, 取决于您的后端API
      dataType: 'json', // 假设后端响应格式为JSON
      success: function(response) {
        // 假设response的格式与您上传的JSON文件一致
        if (response.code === 1 && response.msg === 'success') {
          // 更新“Daily Attendance”和“Max Attendance”
          $('#daysOfCheckIn').text(response.data.combineAttendanceHeatPerday.daysOfCheckIn);
          $('#dayOfMaxCheckIn').text(response.data.combineAttendanceHeatPerday.dayOfMaxCheckIn);
          $('#user-text').text(response.data.username);
  
        // 更新图表
        updateChart(response.data.combineAttendanceHeatPerday);
        }
      },
      error: function(xhr, status, error) {
        // 处理错误
        console.error('AJAX请求失败:', error);
      }
    });
  }
  
  // 页面加载时更新数据和图表
  $(document).ready(function() {
    updateDataAndCharts();
  });



// 当按钮被点击时发送POST请求
$('#checkInButton').click(function() {
    $.ajax({
        url: 'http://43.157.48.178:8081/api/Wave/homepage/attendance', // 确保这个URL与后端的@PostMapping注解一致
        type: 'POST', // 指定请求类型为POST
        success: function(response) { // 使用success回调函数处理响应
            if (response.code === 1) {
                alert('Sign-in successful! Please refresh the page.'); // 弹出成功提示
            } else {
                alert('Today has been successfully signed in！'); // 弹出错误提示
            }
        },
        error: function() {
            alert('Request failed, please check your network or contact the administrator!'); // 网络或服务器错误时的处理
        }
    });

    


});


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
  

      
    
  



  
  














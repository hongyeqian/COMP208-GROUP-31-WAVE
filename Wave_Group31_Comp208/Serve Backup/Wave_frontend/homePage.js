function updateWidth() {
    var width75Percent = window.innerWidth * 0.75;
    
    var centeredElement = document.querySelector('.centered-page');
    
    centeredElement.style.width = width75Percent + 'px';
  }
  
  document.addEventListener('DOMContentLoaded', updateWidth);   
   
   
   
   // Define data object
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

    // define config object
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

    // Use config create Chart object
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
        const images = document.querySelectorAll('.clickAbleImage');

    
        images.forEach(image => {
            image.addEventListener('mouseover', function() {
                images.forEach(img => img.style.animationPlayState = 'running');
                this.style.animationPlayState = 'paused';
            });
    
            image.addEventListener('mouseout', function() {
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
    



//Send a request
function updateDataAndCharts() {
    $.ajax({
      url: 'http://43.157.48.178:8081/api/Wave/homepage',
      method: 'GET', 
      dataType: 'json', 
      success: function(response) {
        if (response.code === 1 && response.msg === 'success') {
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



// Send a request to check in
$('#checkInButton').click(function() {
    $.ajax({
        url: 'http://43.157.48.178:8081/api/Wave/homepage/attendance', 
        type: 'POST', 
        success: function(response) { 
            if (response.code === 1) {
                alert('Sign-in successful! Please refresh the page.'); 
            } else {
                alert('Today has been successfully signed in！'); 
            }
        },
        error: function() {
            alert('Request failed, please check your network or contact the administrator!'); // 网络或服务器错误时的处理
        }
    });

    


});


function updateChart(data) {
    var intakeRatio = Math.min(data.intakeRatio, 1);
    var remainRatio = intakeRatio < 1 ? Math.min(data.remainRatio, 1 - intakeRatio) : 0;

    var blueValue = intakeRatio * 100;
    var greenValue = remainRatio * 100;

    // 更新图表数据
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
  

      
    
  



  
  














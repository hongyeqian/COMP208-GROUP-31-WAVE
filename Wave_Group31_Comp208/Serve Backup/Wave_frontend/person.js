function updateWidth() {
  var width75Percent = window.innerWidth * 0.75;
  
  var centeredElement = document.querySelector('.centered-page');
  
  centeredElement.style.width = width75Percent + 'px';
}

document.addEventListener('DOMContentLoaded', updateWidth);





document.addEventListener('DOMContentLoaded', function () {
    const modifyBtn = document.getElementById('modify-btn');
    const saveBtn = document.getElementById('save-btn');
  

    modifyBtn.addEventListener('click', function() {
        // 获取所有的数据文本和输入框元素
        const dataTexts = document.querySelectorAll('.data-text');
        const dataInputs = document.querySelectorAll('.data-input');

        // 显示输入框，隐藏数据文本
        dataTexts.forEach((text, index) => {
            const input = dataInputs[index];
            input.style.display = 'inline-block';
            input.value = text.innerText;
            text.style.display = 'none';
        });
    });

    saveBtn.addEventListener('click', function() {
      const dataTexts = document.querySelectorAll('.data-text');
      const dataInputs = document.querySelectorAll('.data-input');

        // 收集数据
        var params = new URLSearchParams({
          Name: document.getElementById('name-input').value,
          Gender: document.getElementById('gender-input').value,
          Age: document.getElementById('age-input').value,
          Height: document.getElementById('height-input').value,
          Weight: document.getElementById('weight-input').value,
          IsVegetarian: document.getElementById('veg-input').value,
          ActivityLevel: document.getElementById('exe-input').value
      }).toString();
      
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://43.157.48.178:8081/api/Wave/person?' + params, true);
      
      
        xhr.send();
                dataInputs.forEach((input, index) => {
                  const text = dataTexts[index];
                  text.innerText = input.value;
                  text.style.display = 'inline-block';
                  input.style.display = 'none';
              });      
      });
});





// 此函数用于向后端发送GET请求，并处理返回的数据
function fetchUserData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://43.157.48.178:8081/api/Wave/person', true);
  xhr.responseType = 'json';
  xhr.onload = function () {
      if (xhr.status === 200) {
          var responseData = xhr.response;
          var userData = responseData.data[0]; 

          console.log('Fetched User Data:', userData);

          document.getElementById('name-text').textContent = userData.name || 'N/A';
          document.getElementById('age-text').textContent = userData.age || 'N/A';
          document.getElementById('gender-text').textContent = userData.gender || 'N/A';
          document.getElementById('weight-text').textContent = userData.weight || 'N/A';
          document.getElementById('height-text').textContent = userData.height || 'N/A';
          document.getElementById('veg-text').textContent = userData.isVegetarian || 'N/A';
          document.getElementById('exe-text').textContent = userData.activityLevel || 'N/A';
      } else {
          console.error('Error fetching user data:', xhr.statusText);
      }
  };
  xhr.onerror = function () {
      console.error('Network error trying to send GET request');
  };
  xhr.send();
}

document.addEventListener('DOMContentLoaded', function () {
  fetchUserData();
});


















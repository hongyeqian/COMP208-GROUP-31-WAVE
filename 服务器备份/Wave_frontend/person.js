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
      
        // 初始化一个 AJAX 请求
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://43.157.48.178:8081/api/Wave/person?' + params, true);
      
      
        // 发送数据
        xhr.send();

                // 隐藏输入框，更新并显示数据文本
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
          // 请求成功
          var responseData = xhr.response;
          // 假设响应数据是一个对象，其中有一个名为'data'的数组属性
          var userData = responseData.data[0]; // 取数组中的第一个元素

          // 在这里处理返回的用户数据
          console.log('Fetched User Data:', userData);

          // 示例：更新页面上的元素
          document.getElementById('name-text').textContent = userData.name || 'N/A';
          document.getElementById('age-text').textContent = userData.age || 'N/A';
          document.getElementById('gender-text').textContent = userData.gender || 'N/A';
          document.getElementById('weight-text').textContent = userData.weight || 'N/A';
          document.getElementById('height-text').textContent = userData.height || 'N/A';
          document.getElementById('veg-text').textContent = userData.isVegetarian || 'N/A';
          document.getElementById('exe-text').textContent = userData.activityLevel || 'N/A';
      } else {
          // 请求失败，处理错误
          console.error('Error fetching user data:', xhr.statusText);
      }
  };
  xhr.onerror = function () {
      // 网络或请求发送过程中发生错误
      console.error('Network error trying to send GET request');
  };
  xhr.send();
}

// 通常在页面加载完毕时调用此函数，或者在需要时调用
document.addEventListener('DOMContentLoaded', function () {
  fetchUserData();
});


















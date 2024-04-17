document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-button');
    const itemsDisplay = document.getElementById('items-display');
    const selectedItemsContainer = document.getElementById('selected-items');
    let selections = [];

    const categoryImages = {
        'Aerobic': [
            { name: 'Aerobic Dance', imageUrl: 'images/sport/Aerobic/Aerobic Dance.jpg' },
            { name: 'Badminton', imageUrl: 'images/sport/Aerobic/Badminton.jpg' },
            { name: 'Cross-country Skiing', imageUrl: 'images/sport/Aerobic/Cross-country Skiing.png' },
            { name: 'Cycling', imageUrl: 'images/sport/Aerobic/Cycling.png' },
            { name: 'Jogging', imageUrl: 'images/sport/Aerobic/Jogging.png' },
            { name: 'Jump Rope', imageUrl: 'images/sport/Aerobic/Jump Rope.jpg' },
            { name: 'Stair Climbing', imageUrl: 'images/sport/Aerobic/Stair Climbing.png' },
            { name: 'Stepping Machine', imageUrl: 'images/sport/Aerobic/Stepping Machine.jpg' },
            { name: 'Swimming', imageUrl: 'images/sport/Aerobic/Swimming.jpg' },
            { name: 'Walking', imageUrl: 'images/sport/Aerobic/Walking.jpg' },
        ],
        'Anaerobic': [
            { name: 'Boxing', imageUrl: 'images/sport/Anaerobic/Boxing.png' },
            { name: 'Functional Training', imageUrl: 'images/sport/Anaerobic/Functional Training.jpg' },
            { name: 'Gymnastics', imageUrl: 'images/sport/Anaerobic/Gymnastics.jpg' },
            { name: 'High-Intensity Interval Training (HIIT)', imageUrl: 'images/sport/Anaerobic/High-Intensity Interval Training (HIIT).jpg' },
            { name: 'Speed Climbing', imageUrl: 'images/sport/Anaerobic/Speed Climbing.png' },
            { name: 'Sprinting', imageUrl: 'images/sport/Anaerobic/Sprinting.png' },
            { name: 'Strength Training', imageUrl: 'images/sport/Anaerobic/Strength Training.png' },
            { name: 'Taekwondo', imageUrl: 'images/sport/Anaerobic/Taekwondo.jpg' },
            { name: 'Weight Lifting', imageUrl: 'images/sport/Anaerobic/Weight Lifting.jpg' },
            { name: 'Wrestling', imageUrl: 'images/sport/Anaerobic/Wrestling.png' },
            
        ],
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadItemsForCategory(button.id);
        });
    });

    function loadItemsForCategory(categoryId) {
        itemsDisplay.innerHTML = ''; // Clear previous items
        const items = categoryImages[categoryId];

        if (items) {
            items.forEach(item => {
                displayItem(item);
            });
        }
    }

    function displayItem(item) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.name;
        img.className = 'item-image';

        const weightButtonsDiv = document.createElement('div');
        weightButtonsDiv.className = 'weight-buttons';

        [30, 60].forEach(weight => {
            const weightButton = document.createElement('button');
            weightButton.className = 'weight-button';
            weightButton.textContent = `${weight}min`;
            weightButton.addEventListener('click', () => addSelectedItem(item.name, weight));
            weightButtonsDiv.appendChild(weightButton);
        });

        const customWeightInput = document.createElement('input');
        customWeightInput.className = 'custom-weight-input';
        customWeightInput.type = 'number';
        customWeightInput.placeholder = 'Time';
        const customWeightButton = document.createElement('button');
        customWeightButton.className = 'weight-button';
        customWeightButton.textContent = 'Confirm';
        customWeightButton.addEventListener('click', () => {
            const weight = customWeightInput.value;
            addSelectedItem(item.name, weight);
        });

        weightButtonsDiv.appendChild(customWeightInput);
        weightButtonsDiv.appendChild(customWeightButton);

        itemDiv.appendChild(img);
        itemDiv.appendChild(weightButtonsDiv);
        itemsDisplay.appendChild(itemDiv);
    }

    function addSelectedItem(itemName, weight) {
        const item = { sportName: itemName, sportTime: weight };
        selections.push(item);
        const selectedItemDiv = document.createElement('div');
        selectedItemDiv.className = 'selected-item';
        selectedItemDiv.textContent = `${itemName} - ${weight}min`;

        const removeButton = document.createElement('button');
        removeButton.textContent = '×';
        removeButton.addEventListener('click', function () {
            const index = selections.indexOf(item);
            if (index > -1) {
                selections.splice(index, 1);
            }
            selectedItemDiv.remove();
        });
        selectedItemDiv.appendChild(removeButton);
        selectedItemsContainer.appendChild(selectedItemDiv);
    }

    const finishButton = document.getElementById('finish-button');
    finishButton.addEventListener('click', () => {
        sendSelectionToBackend(selections);
        selections = [];

    });
    function sendSelectionToBackend(selections) {
        $.ajax({
            url: 'http://43.157.48.178:8081/api/Wave/sport',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(selections),
            success: function (response) {
                console.log('Success:', response);
            },
            error: function (xhr, status, error) {
                console.error('Failure:', xhr.responseText);
            }
        });
    }


        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://43.157.48.178:8081/api/Wave/sport/delete", true);
        xhr.setRequestHeader("Content-Type", "application/json");
      
        // 监听请求完成事件
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            // 请求成功
            console.log('Request successful:', xhr.responseText);
          } else {
            // 请求失败
            console.error('Request failed:', xhr.status);
          }
        };
      
        // 处理网络错误
        xhr.onerror = function () {
          console.error('Network error');
        };
      
        xhr.send();     
}

);

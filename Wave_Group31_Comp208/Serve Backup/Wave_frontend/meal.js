document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-button');
    const itemsDisplay = document.getElementById('items-display');
    const selectedItemsContainer = document.getElementById('selected-items');
    let selections = [];

    const categoryImages = {
        'main-food': [
            { name: 'White rice', imageUrl: 'images/meal/mainfood/White Rice.jpg' },
            { name: 'Bread', imageUrl: 'images/meal/mainfood/Bread.jpeg' },
            { name: 'Brown Rice', imageUrl: 'images/meal/mainfood/Brown Rice.jpg' },
            { name: 'Noodles', imageUrl: 'images/meal/mainfood/Noodles.jpg' },
            { name: "Oatmeal", imageUrl: 'images/meal/mainfood/Oatmeal.jpg' },
            { name: 'Corn Tortilla', imageUrl: 'images/meal/mainfood/Corn Tortilla.png' },
            { name: 'Pancake', imageUrl: 'images/meal/mainfood/Pancake.jpg' },
            { name: 'Pizza Slice', imageUrl: 'images/meal/mainfood/Pizza Slice.png' },
            { name: 'Rye Bread', imageUrl: 'images/meal/mainfood/Rye Bread.jpg' },
            { name: 'Pasta', imageUrl: 'images/meal/mainfood/Pasta.jpg' },
        ],
        'fruits': [
            { name: 'Apple', imageUrl: 'images/meal/fruits/Apple.jpg' },
            { name: 'Banana', imageUrl: 'images/meal/fruits/Banana.png' },
            { name: 'Blueberry', imageUrl: 'images/meal/fruits/Blueberry.png' },
            { name: 'Grape', imageUrl: 'images/meal/fruits/Grape.jpg' },
            { name: 'Orange', imageUrl: 'images/meal/fruits/Orange.png' },
            { name: 'Peach', imageUrl: 'images/meal/fruits/Peach.png' },
            { name: 'Pear', imageUrl: 'images/meal/fruits/Pear.jpg' },
            { name: 'Pineapple', imageUrl: 'images/meal/fruits/Pineapple.jpg' },
            { name: 'Strawberry', imageUrl: 'images/meal/fruits/Strawberry.jpg' },
            { name: 'Watermelon', imageUrl: 'images/meal/fruits/Watermelon.png' },
        ],
        'vegetables': [
            { name: 'Bell Pepper', imageUrl: 'images/meal/vegetables/Bell Pepper.jpg' },
            { name: 'Broccoli', imageUrl: 'images/meal/vegetables/Broccoli.jpg' },
            { name: 'Carrot', imageUrl: 'images/meal/vegetables/Carrot.webp' },
            { name: 'Garlic', imageUrl: 'images/meal/vegetables/Garlic.jpg' },
            { name: 'Lettuce', imageUrl: 'images/meal/vegetables/Lettuce.jpg' },
            { name: 'Onion', imageUrl: 'images/meal/vegetables/Onion.jpg' },
            { name: 'Cucumber', imageUrl: 'images/meal/vegetables/Cucumber.png' },
            { name: 'Potato', imageUrl: 'images/meal/vegetables/Potato.png' },
            { name: 'Spinach', imageUrl: 'images/meal/vegetables/Spinach.png' },
            { name: 'Tomato', imageUrl: 'images/meal/vegetables/Bell Pepper.jpg' },
        ],
        'meat':[
            {name: 'Bacon', imageUrl: 'images/meal/meat/Bacon.png'},
            {name: 'Beef Steak', imageUrl: 'images/meal/meat/Beef Steak.png'},
            {name: 'Chicken Breast', imageUrl: 'images/meal/meat/Chicken Breast.jpg'},
            {name: 'Crab', imageUrl: 'images/meal/meat/Crab.png'},
            {name: 'Duck', imageUrl: 'images/meal/meat/Duck.png'},
            {name: 'Fish', imageUrl: 'images/meal/meat/Fish.png'},
            {name: 'Lamb', imageUrl: 'images/meal/meat/Lamb.png'},
            {name: 'Lobster', imageUrl: 'images/meal/meat/Lobster.png'},
            {name: 'Pork', imageUrl: 'images/meal/meat/Pork.jpg'},
            {name: 'Shrimp', imageUrl: 'images/meal/meat/Shrimp.png'},
        ],
        'drinks':[
            {name:'Apple Juice',imageUrl: 'images/meal/drinks/Apple Juice.png'},
            {name:'Beer',imageUrl: 'images/meal/drinks/Beer.png'},
            {name:'Coffee (black)',imageUrl: 'images/meal/drinks/Coffee (black).png'},
            {name:'Cola',imageUrl: 'images/meal/drinks/Cola.png'},
            {name:'Green Tea',imageUrl: 'images/meal/drinks/Green Tea.png'},
            {name:'Milk',imageUrl: 'images/meal/drinks/Milk.jpg'},
            {name:'Mineral Water',imageUrl: 'images/meal/drinks/Mineral Water.jpg'},
            {name:'Orange Juice',imageUrl: 'images/meal/drinks/Orange Juice.png'},
            {name:'Red Wine',imageUrl: 'images/meal/drinks/Red Wine.png'},
            {name:'White Wine',imageUrl: 'images/meal/drinks/White Wine.png'},

        ],
        'dessert': [
            { name: 'Brownie', imageUrl: 'images/meal/dessert/Brownie.jpg' },
            { name: 'Cake', imageUrl: 'images/meal/dessert/Cake.png' },
            { name: 'Candy', imageUrl: 'images/meal/dessert/Candy.jpg' },
            { name: 'Chocolate', imageUrl: 'images/meal/dessert/Chocolate.jpg' },
            { name: 'Cookie', imageUrl: 'images/meal/dessert/Cookie.png' },
            { name: 'Cupcake', imageUrl: 'images/meal/dessert/Cupcake.png' },
            { name: 'Donut', imageUrl: 'images/meal/dessert/Donut.png' },
            { name: 'Ice Cream', imageUrl: 'images/meal/dessert/Ice Cream.jpg' },
            { name: 'Jam', imageUrl: 'images/meal/dessert/Jam.png' },
            { name: 'Macaron', imageUrl: 'images/meal/dessert/Macaron.jpg' },
        ]
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

        [100, 200].forEach(weight => {
            const weightButton = document.createElement('button');
            weightButton.className = 'weight-button';
            weightButton.textContent = `${weight}g`;
            weightButton.addEventListener('click', () => addSelectedItem(item.name, weight));
            weightButtonsDiv.appendChild(weightButton);
        });

        const customWeightInput = document.createElement('input');
        customWeightInput.className = 'custom-weight-input';
        customWeightInput.type = 'number';
        customWeightInput.placeholder = 'weight';
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
        const item = { foodName: itemName, weight: weight };
        selections.push(item);
        const selectedItemDiv = document.createElement('div');
        selectedItemDiv.className = 'selected-item';
        selectedItemDiv.textContent = `${itemName} - ${weight}g`;

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
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://43.157.48.178:8081/api/Wave/meals', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  
                if (xhr.status === 200) {  
            
                    const response = JSON.parse(xhr.responseText);
                    console.log('Success:', response);
                } else {
                    console.error('Failure:', xhr.responseText);
                }
            }
        };

        xhr.onerror = function () {
            console.error('There was an error making the request.');
        };

        var data = JSON.stringify(selections);
        xhr.send(data);
    }

}

);

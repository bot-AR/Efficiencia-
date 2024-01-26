const cont1 = document.querySelector(".container");
const toggle = document.getElementById("toggle");
const efficienciaButton = document.getElementById("efficienciaButton");
const efficienciaPercentage = document.getElementById("efficienciaPercentage");
const inputBx = document.querySelector('#inputBx');
const list = document.querySelector('#list');
const arrow2 = document.getElementById("arrow2");
const arrow1 = document.getElementById("arrow");
const effic = document.getElementById("effic");
const efficper = document.getElementById("efficper");

toggle.onclick = function () {
    toggle.classList.toggle('active');
    cont1.classList.toggle('active');
};

let time = document.getElementById("time");
setInterval(() => {
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000);

document.addEventListener('DOMContentLoaded', function () {
    const quoteContainer = document.querySelector('[data-quotes]');

    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            const advice = data.slip.advice;
            displayAdvice(advice);
        })
        .catch(error => console.error('Error fetching advice:', error));

    function displayAdvice(advice) {
        quoteContainer.textContent = advice;
    }
});

inputBx.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        addItem(this.value);
        this.value = "";
    }
});

function addItem(inputBxValue) {
    if (!inputBxValue.trim()) {
        alert("Please enter a valid input.");
        return;
    } else {
        let listItem = document.createElement("li");
        listItem.innerHTML = `${inputBxValue}<i></i>`;
        list.appendChild(listItem);
        addEventListenersToListItem(listItem);

        savedData();
        showTask();
    }
}

function addEventListenersToListItem(listItem) {
    listItem.addEventListener("click", function () {
        listItem.classList.toggle("done");
        savedData();
    });

    listItem.querySelector("i").addEventListener("click", function (e) {
        e.stopPropagation();
        listItem.remove();
        savedData();
        showTask();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const allInOneContainer = document.querySelector('.all-in-one');
    const loadingContainer = document.querySelector('.loading-container');
    const mainContainer = document.querySelector('.main-container');

    loadingContainer.classList.add('hidden');
    mainContainer.classList.add('hidden');
    arrow2.classList.add('hidden');
    arrow1.addEventListener('click', function () {
        allInOneContainer.classList.add('hidden');
        loadingContainer.classList.remove('hidden');
        arrow1.classList.add('hidden');
        efficienciaButton.classList.add('hidden');
        setTimeout(function () {
            loadingContainer.classList.add('hidden');
            //efficienciaButton.classList.remove('hidden');
            console.log("hi");
            mainContainer.classList.remove('hidden');
            arrow2.classList.remove('hidden');
        }, 2000);
    });
    arrow2.addEventListener('click', function () {
        allInOneContainer.classList.remove('hidden');
        loadingContainer.classList.add('hidden');
        efficienciaButton.classList.remove('hidden');
        mainContainer.classList.add('hidden');
        arrow2.classList.add('hidden');
        arrow1.classList.remove('hidden');
    });
});

function savedData() {
    localStorage.setItem("data", list.innerHTML);
}

function showTask() {
    list.innerHTML = localStorage.getItem("data") || '';
    list.querySelectorAll('li').forEach(addEventListenersToListItem);
}

showTask();

efficienciaButton.addEventListener("click", function () {
    const allItems = list.querySelectorAll('li').length;
    const checkedItems = list.querySelectorAll('li.done').length;

    if (allItems === 0) {
        alert("No tasks added yet.");
        return;
    }

    const percentage = (checkedItems / allItems) * 100;
    efficienciaPercentage.textContent = percentage.toFixed(2) + "%";
});

console.log("effic", effic);
console.log("efficper", efficper);

effic.addEventListener("click", function () {
    const allItems = list.querySelectorAll('li').length;
    const checkedItems = list.querySelectorAll('li.done').length;

    if (allItems === 0) {
        alert("No tasks added yet.");
        return;
    }

    const percentage = (checkedItems / allItems) * 100;
    console.log("Percentage:", percentage);

    if (efficper) {
        efficper.textContent = percentage.toFixed(2) + "%";
    } else {
        console.error("efficPer element not found.");
    }
});

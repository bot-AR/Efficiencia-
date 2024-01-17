const cont1 = document.querySelector(".container");
const toggle = document.getElementById("toggle");

toggle.onclick = function(){
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

let inputBx = document.querySelector('#inputBx');
let list = document.querySelector('#list');

inputBx.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        addItem(this.value);
        this.value = "";
    }
});

let addItem = (inputBxValue) => {
    if (!inputBxValue.trim()) {
        alert("Please enter a valid input.");
        return;
    } else {
        let listItem = document.createElement("li");

        listItem.innerHTML = `${inputBxValue}<i></i>`;

        list.appendChild(listItem);

        
        addEventListenersToListItem(listItem);

        savedData();
    }
};

function addEventListenersToListItem(listItem) {
    listItem.addEventListener("click", function() {
        listItem.classList.toggle("done");
        console.log("hi");
    });

    listItem.querySelector("i").addEventListener("click", function(e) {
        e.stopPropagation();
        listItem.remove();
        savedData();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const allInOneContainer = document.querySelector('.all-in-one');
    const loadingContainer = document.querySelector('.loading-container');
    const mainContainer = document.querySelector('.main-container');

    loadingContainer.classList.add('hidden');
    mainContainer.classList.add('hidden');

    document.getElementById('arrow').addEventListener('click', function () {
        allInOneContainer.classList.add('hidden');
        loadingContainer.classList.remove('hidden');

        setTimeout(function () {
            loadingContainer.classList.add('hidden');
            console.log("hi");
            mainContainer.classList.remove('hidden');
        }, 2000);
    });
});

function savedData() {
    localStorage.setItem("data", list.innerHTML);
}

function showTask() {
    list.innerHTML = localStorage.getItem("data") || '';
    
    list.querySelectorAll('li').forEach(addEventListenersToListItem);
}

document.addEventListener('DOMContentLoaded', function () {
    showTask();
});

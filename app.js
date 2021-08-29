const atk = Array.from(document.querySelectorAll('.atk'));
const rate = Array.from(document.querySelectorAll('.rate'));
const damage = Array.from(document.querySelectorAll('.damage'));
const addItem = Array.from(document.querySelectorAll('.add-item'));
const totalList = Array.from(document.querySelectorAll('.total ul span'));
const close = document.querySelector('.close');
const artifact = document.querySelector('.artifact');
const wrapper = document.querySelector('.wrapper');

// 資料庫

let totalAtk = [];
let totalRate = [];
let totalDamage = [];
let totalValue = [];


// 聖遺物開關 
artifact.addEventListener('click', function (e) {

  if (e.target.className === "close") {
    e.target.parentNode.style.display = "none"
  }
});

wrapper.addEventListener('click', function (e) {

  switch (e.target.alt) {
    case "1":
      artifact.children[0].style.display = "block";
      break;
    case "2":
      artifact.children[1].style.display = "block";
      break;
    case "3":
      artifact.children[2].style.display = "block";
      break;
    case "4":
      artifact.children[3].style.display = "block";
      break;
    case "5":
      artifact.children[4].style.display = "block";
      break;
   
  }
})

// 讀取5個聖遺物值，並傳入全域資料庫當中

addItem.forEach((item, i) => {
  item.addEventListener('submit', function(e) {
    e.preventDefault();
    let atkValue = parseFloat(atk[i].value);
    let rateValue = parseFloat(rate[i].value);
    let damageValue = parseFloat(damage[i].value);  

    totalAtk.splice(i, 1, atkValue);
    totalRate.splice(i, 1, rateValue);
    totalDamage.splice(i, 1, damageValue);

    storage();
    showData();
    
  })
})

// 儲存資料

function storage() {

  totalValue.splice(0, 1, totalAtk);
  totalValue.splice(1, 1, totalRate);
  totalValue.splice(2, 1, totalDamage);
  localStorage.setItem('item1', JSON.stringify(totalValue));

}

// 計算數值

function atkCount() {
  let temAtk = 0;

  totalAtk.forEach((item, i) => {
    temAtk = temAtk + item
  }) 

  totalList[0].innerText = temAtk.toFixed(1);

}

function rateCount() {
  let temRate = 0;

  totalRate.forEach((item, i) => {
    temRate = temRate + item
  }) 

  totalList[1].innerText = temRate.toFixed(1);
}

function damageCount() {
  let temDamage = 0;

  totalDamage.forEach((item, i) => {
    temDamage = temDamage + item
  }) 

  totalList[2].innerText = temDamage.toFixed(1);
}


function score() {
  totalList[3].innerText = (parseInt(totalList[0].innerText) + parseInt(totalList[1].innerText) + parseInt(totalList[2].innerText)) / 2;
}



// 撈出資料
function showData() {
  let temData = JSON.parse(localStorage.getItem('item1'));
  totalAtk = temData[0];
  totalRate = temData[1];
  totalDamage = temData[2];

  totalAtk.forEach((item, i) => {
    atk[i].value = item;
  });

  totalRate.forEach((item, i) => {
    rate[i].value = item;
  })

  totalDamage.forEach((item , i) => {
    damage[i].value = item;
  })
 
  atkCount();
  rateCount();
  damageCount();
  score();
}


showData();




import createElement from "./createElement.js";
import convert from "./convert.js";
import { getPost, createOptions } from "./helpers.js";
import mainTable from "./mainTable.js";

let currencyList = await getPost();

const containerHeader = document.querySelector('.header-container'),
    containerMain = document.querySelector('.main-container');

let currentCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-current'] }).getElement(),
    convertCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-convert'] }).getElement(),
    arrowsCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-arrows'] }).getElement();

// блок выбора валюты
createElement.new().assignProps({ tag: 'div', cls: ['currency'], child: [currentCurrency, arrowsCurrency, convertCurrency] }).appendTo(containerHeader);
const arrowsImg = createElement.new().assignProps({ tag: 'img', cls: ['currency-arrows__image'] }).appendTo(arrowsCurrency).getElement();

arrowsImg.src = 'images/arrows_1024.svg';

let headingCurrentCurrency = createElement
    .new()
    .assignProps({
        tag: 'h2',
        cls: ['currency__heading'],
        text: 'У меня имеется'
    })
    .appendTo(currentCurrency),
    headingConvertCurrency = createElement
        .new()
        .assignProps({ tag: 'h2', cls: ['currency__heading'], text: 'Хочу приобрести', })
        .appendTo(convertCurrency),
    selectCurrentCurrency = createElement
        .new()
        .assignProps({
            tag: 'select',
            cls: ['currency__heading']
        })
        .appendTo(currentCurrency)
        .getElement(),
    selectConvertCurrency = createElement
        .new()
        .assignProps({
            tag: 'select',
            cls: ['currency__heading']
        })
        .appendTo(convertCurrency)
        .getElement(),
    buttonReplaceCurrency = createElement
        .new()
        .assignProps({
            tag: 'button',
            cls: ['btn-reset', 'currency__btn-replace']
        })
        .appendTo(arrowsCurrency)
        .getElement();

// получение времени 
const currentDate = currencyList.Date.slice(0, 10).split('-').reverse().join('.');


let headingCurrentDate = createElement
    .new()
    .assignProps({ tag: 'h2', cls: ['heading', 'heading__currency-table'], text: `Курсы валют на ${currentDate}`, })
    .appendTo(containerMain);

mainTable(containerMain);

// пустой option
createElement.new().assignProps({ tag: 'option', text: 'Российский рубль RUR' }).appendTo(selectCurrentCurrency).getElement().value = 'RUB';
await createOptions(currencyList, createElement, selectCurrentCurrency, selectConvertCurrency);
createElement.new().assignProps({ tag: 'option', text: 'Российский рубль RUR' }).appendTo(selectConvertCurrency).getElement().value = 'RUB';
// первый селект
let selectCurrent = new Choices(selectCurrentCurrency, {
    itemSelectText: '',
    searchEnabled: false,
});

// второй селект
let selectConver = new Choices(selectConvertCurrency, {
    searchEnabled: false,
    itemSelectText: '',
});

const arrayOfSelectsOptions = [selectCurrent, selectConver];

// функция для изменения стилей choices
function changeOptionVie(arrayOfSelects) {

    arrayOfSelects.forEach(e => {
        let listSelect = e.choiceList.element.querySelectorAll('.choices__item');
        let btn = document.createElement('button');
        btn.classList.add('btn-reset', 'choices__list-btn');
        e.choiceList.element.append(btn);

        btn.onclick = () => {
            e.hideDropdown();
            console.log(123);
        }

        for (let element of listSelect) {
            let str = element.textContent;
            let name = str.substring(0, (str.length -3));
            let strong = document.createElement('strong');
            
            str = str.slice(-3);
                
            strong.textContent = str;  
            element.textContent = name;
            
            element.append(strong);

            element.classList.add('flex', 'justify-bettwen');
        }
    })
}

changeOptionVie(arrayOfSelectsOptions);

// отлавливаем смену валют сторонами
arrowsCurrency.onclick = function () {
    const firstOption = selectConvertCurrency.value;
    const secondOption = selectCurrentCurrency.value;

    selectCurrent.setChoiceByValue(firstOption);
    selectConver.setChoiceByValue(secondOption);

    convert(elementsArray);
    resizeSelect();
}

let currentBlockDisplay = createElement.new()
    .assignProps({
        tag: 'input',
        cls: ['currency-current__display'],
    })
    .appendTo(currentCurrency)
    .getElement();

let convertBlockDisplay = createElement.new()
    .assignProps({
        tag: 'div',
        cls: ['currency-convert__display']
    })
    .appendTo(convertCurrency)
    .getElement();

currentBlockDisplay.setAttribute("type", 'number');

const elementsArray = [selectCurrentCurrency, selectConvertCurrency, currencyList, currentBlockDisplay, convertBlockDisplay];

selectCurrentCurrency.onchange = () => {convert(elementsArray); resizeSelect()};
selectConvertCurrency.onchange = () => {convert(elementsArray); resizeSelect()};
currentBlockDisplay.oninput = () => convert(elementsArray);

let text = [];

function resizeSelect() {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    let selectText = document.querySelectorAll('.choices__list--single .choices__item--selectable');
    
    if (windowWidth <= 520) {
        selectText.forEach((e, key) => {
            if (text.length != 2) text[key] = selectText[key].textContent;
            if (text[key].slice(-3) != selectText[key].textContent.slice(-3)) text[key] = selectText[key].textContent; 
            selectText[key].textContent = selectText[key].textContent.slice(-3);
        })
    } else {    
        if (text.length) {
            selectText.forEach((e, key) => {
                selectText[key].textContent = text[key];
                if (text.length == (key+1)) text = [];
            })
        }   
    }
    changeOptionVie(arrayOfSelectsOptions);
}

resizeSelect(text);

// изменяем вид селектов при уменьшении ширины экрана
window.onresize = () => {
    resizeSelect()
}
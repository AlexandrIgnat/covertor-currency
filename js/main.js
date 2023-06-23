import createElement from "./createElement.js";
import convert from "./convert.js";
import {getPost, createOptions} from "./helpers.js";
import mainTable from "./mainTable.js";

let currencyList = await getPost();

const containerHeader = document.querySelector('.header-container'),
    containerMain = document.querySelector('.main-container');

var currentCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-current'] }).getElement(),
    convertCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-convert'] }).getElement(),
    arrowsCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-arrows'] }).getElement();

// блок выбора валюты
createElement.new().assignProps({ tag: 'div', cls: ['currency'], child: [currentCurrency, arrowsCurrency, convertCurrency] }).appendTo(containerHeader);

var headingCurrentCurrency = createElement
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


var headingCurrentDate = createElement
.new()
.assignProps({ tag: 'h2', cls: ['heading'], text: `Курсы валют на ${currentDate}`, })
.appendTo(containerMain);

mainTable(containerMain);

// пустой option
createElement.new().assignProps({ tag: 'option', text: 'Российский рубль RUR' }).appendTo(selectCurrentCurrency).getElement().value = 'RUB';
await createOptions(currencyList, createElement, selectCurrentCurrency, selectConvertCurrency);
createElement.new().assignProps({ tag: 'option', text: 'Российский рубль RUR' }).appendTo(selectConvertCurrency).getElement().value = 'RUB';
// первый селект
var selectCurrent = new Choices(selectCurrentCurrency, {
    itemSelectText: '',
    searchEnabled: false,
});

// второй селект
var selectConver = new Choices(selectConvertCurrency, {
    searchEnabled: false,
    itemSelectText: '',
});

buttonReplaceCurrency.onclick = function () {
    const firstOption = selectConvertCurrency.value;
    const secondOption = selectCurrentCurrency.value;

    selectCurrent.setChoiceByValue(firstOption);
    selectConver.setChoiceByValue(secondOption);

    convert(elementsArray);    
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

selectCurrentCurrency.onchange = () => convert(elementsArray);
selectConvertCurrency.onchange = () => convert(elementsArray);
currentBlockDisplay.oninput = () => convert(elementsArray);

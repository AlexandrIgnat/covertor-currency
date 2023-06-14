import createElement from "./createElement.js";

async function createOptions() {
    let currencyList = await getPost();

    for (let cur in currencyList.Valute) {
        createElement.new().assignProps({ tag: 'option', text: currencyList.Valute[cur].Name + ' ' + currencyList.Valute[cur].CharCode }).appendTo(selectCurrentCurrency).getElement().value = currencyList.Valute[cur].Name + ' ' + currencyList.Valute[cur].CharCode;
        createElement.new().assignProps({ tag: 'option', text: currencyList.Valute[cur].Name + ' ' + currencyList.Valute[cur].CharCode }).appendTo(selectConvertCurrency).getElement().value = currencyList.Valute[cur].Name + ' ' + currencyList.Valute[cur].CharCode;
    }
}

async function getPost() {
    const res = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`)
    return await res.json();
}

var container = document.querySelector('.header-container'),
    currentCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-current'] }).getElement(),
    convertCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-convert'] }).getElement(),
    arrowsCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-arrows'] }).getElement();

// блок выбора валюты
createElement.new().assignProps({ tag: 'div', cls: ['currency'], child: [currentCurrency, arrowsCurrency, convertCurrency] }).appendTo(container);

var headingCurrentCurrency = createElement
    .new()
    .assignProps({ tag: 'h2', cls: ['currency__heading'], text: 'У меня имеется', })
    .appendTo(currentCurrency),
    headingConvertCurrency = createElement
        .new()
        .assignProps({ tag: 'h2', cls: ['currency__heading'], text: 'Хочу приобрести', })
        .appendTo(convertCurrency),
    selectCurrentCurrency = createElement
        .new()
        .assignProps({ tag: 'select', cls: ['currency__heading'], })
        .appendTo(currentCurrency)
        .getElement(),
    selectConvertCurrency = createElement
        .new()
        .assignProps({ tag: 'select', cls: ['currency__heading'], })
        .appendTo(convertCurrency)
        .getElement(),
    buttonReplaceCurrency = createElement
        .new()
        .assignProps({ tag: 'button', cls: ['btn-reset', 'currency__btn-replace'] })
        .appendTo(arrowsCurrency);

// пустой option
createElement.new().assignProps({ tag: 'option', text: 'Выбрать валюту' }).appendTo(selectCurrentCurrency).getElement().value = '';
createElement.new().assignProps({ tag: 'option', text: 'Выбрать валюту' }).appendTo(selectConvertCurrency).getElement().value = '';
await createOptions();

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

let input = document.getElementById('current-currency');

createElement.new().assignProps({ tag: 'div', cls: ['currency-current__display'], }).appendTo(currentCurrency);

// countValue.then( function() {
//     let currentBlockDisplay = document.querySelector('.currency-current__display');
//     console.log(currentBlockDisplay);
// })

let currentBlockDisplay = document.querySelector('.currency-current__display');
console.log(currentBlockDisplay);

currentBlockDisplay.addEventListener('click', () => {
    input.focus();
})

input.addEventListener('input', function (e) {
    currentBlockDisplay.textContent = input.value;
})

createElement.new().assignProps({ tag: 'div', cls: ['test'], data:{name: 'vvv', value: 123}}).appendTo(currentCurrency);

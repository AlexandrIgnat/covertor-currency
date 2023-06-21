async function getPost() {
    const res = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`)
    return await res.json();
}

async function createOptions(currencyList, createElement, selectCurrentCurrency, selectConvertCurrency) {
    for (let cur in currencyList.Valute) {
        createElement
            .new()
            .assignProps({
                tag: 'option',
                text: currencyList.Valute[cur].Name + ' ' + currencyList.Valute[cur].CharCode,
                data: { name: 'nominal', value: currencyList.Valute[cur].CharCode }
            })
            .appendTo(selectCurrentCurrency)
            .getElement().value = currencyList.Valute[cur].CharCode;
        createElement
            .new()
            .assignProps({
                tag: 'option',
                text: currencyList.Valute[cur].Name + ' ' + currencyList.Valute[cur].CharCode,
                data: { name: 'nominal', value: currencyList.Valute[cur].CharCode }
            })
            .appendTo(selectConvertCurrency)
            .getElement().value = currencyList.Valute[cur].CharCode;
    }
}

export {getPost, createOptions}
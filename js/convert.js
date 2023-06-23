export default function (data) {
    let [currencyFrom, currencyTo, currencyList, inputCur, displayBlockValue] = data;
    let value = inputCur.value;

    if (value == '') {
        displayBlockValue.textContent =  '';
        return;
    }

    if (currencyFrom.value == 'RUB') {
        displayBlockValue.textContent = (value * 1 / (currencyList.Valute[currencyTo.value].Value / currencyList.Valute[currencyTo.value].Nominal
        )).toFixed(4);
    } else {

        if (currencyTo.value == 'RUB') {
            const haveCourse = currencyList.Valute[currencyFrom.value].Value / currencyList.Valute[currencyFrom.value].Nominal;
            displayBlockValue.textContent = (value * haveCourse).toFixed(4);

            return;                
        }
        const haveCourse = currencyList.Valute[currencyFrom.value].Value / currencyList.Valute[currencyFrom.value].Nominal;
        displayBlockValue.textContent = (value * haveCourse / (currencyList.Valute[currencyTo.value].Value / currencyList.Valute[currencyTo.value].Nominal)).toFixed(4);
    }
}
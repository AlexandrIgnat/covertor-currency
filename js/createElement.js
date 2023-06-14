export default {
    element: null,
    parent: null,
    getElement() {
        return this.element;
    },
    setClass(classes) {
        this.element.classList.add(...classes);
    },
    assignProps(object) {
        for (let key in object) {
            switch (key) {
                case 'tag':
                    this.element = document.createElement(object[key]);
                    break;
                case 'parent':
                    this.parent = object[key];
                    break;
                case 'cls':
                    this.setClass(object[key]);
                    break;
                case 'text':
                    this.element.textContent = object[key];
                    break;
                case 'data':
                    let name = object[key].name;
                    this.element.dataset[`${name}`] = object[key].value;
                    break;      
                case 'child':
                    object[key].forEach(element => {
                        this.element.append(element);
                    });
                    break;    
                default:
                    break;
            }
        }

        return this;
    },
    appendTo(parent) {
        parent.append(this.element);
        return this;
    },
    appendToParent() {
        this.parent.append(this.element);
        return this;
    },
    new() {
        return {...this};
    }
}

// пример как использовать в другом js файле 

/*
import createElement from "./createElement.js";

var currentCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-current'] }).getElement(),
    convertCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-convert'] }).getElement(),
    arrowsCurrency = createElement.new().assignProps({ tag: 'div', cls: ['currency-arrows'] }).getElement();

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
*/
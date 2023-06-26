import createElement from "./createElement.js";
import {getPost} from "./helpers.js";

let currencyList = await getPost();

export default (parent) => {
    const list = createElement.new()
        .assignProps({
            tag: 'ul',
            cls: ['main__list'],
            parent,
        })
        .appendToParent()
        .getElement();

        const headTable = createElement.new().assignProps({tag: 'li', cls: ['main__item']}).appendTo(list).getElement();
        createElement.new().assignProps({tag: 'span', cls: ['main__item-code'], text: `Код`}).appendTo(headTable);
        createElement.new().assignProps({tag: 'span', cls: ['main__item-nominal'], text: `Единица`}).appendTo(headTable);
        createElement.new().assignProps({tag: 'span', cls: ['main__item-name'], text: `Валюта`}).appendTo(headTable);
        createElement.new().assignProps({tag: 'span', cls: ['main__item-vulue'], text: `Курс базовой валюты`}).appendTo(headTable);
        headTable.style.cssText = 'background-color: #F2F5F5; font-weight: 700';
   
    for (let [item, i] of Object.entries(currencyList.Valute)) {
        const li = createElement.new().assignProps({tag: 'li', cls: ['main__item']}).appendTo(list).getElement();
        let flagsAndChar = createElement.new().assignProps({tag: 'div', cls: ['main__item-code']}).appendTo(li).getElement();
        createElement.new().assignProps({tag: 'img', cls: ['flags',`${i.CharCode}`], src: `/images/flags/${i.CharCode}.jpg`}).appendTo(flagsAndChar);
        createElement.new().assignProps({tag: 'span', text: `${i.CharCode}`}).appendTo(flagsAndChar);
        createElement.new().assignProps({tag: 'span', cls: ['main__item-nominal', 'gray'], text: `${i.Nominal}`}).appendTo(li);
        createElement.new().assignProps({tag: 'span', cls: ['main__item-name', 'gray'], text: `${i.Name}`}).appendTo(li);
        createElement.new().assignProps({tag: 'span', cls: ['main__item-vulue'], text: `${i.Value}`}).appendTo(li);
    }

    const secondList = createElement.new()
        .assignProps({
            tag: 'ul',
            cls: ['second-main__list'],
            parent,
        })
        .appendToParent()
        .getElement();

    for (let [item, i] of Object.entries(currencyList.Valute)) {
        const li = createElement.new().assignProps({tag: 'li', cls: ['second-main__item']}).appendTo(secondList).getElement();

        // let leftMainItem = createElement.new().assignProps({tag: 'div', cls: ['second-main__item-left']}).appendTo(li).getElement();

        // let rightMainItem = createElement.new().assignProps({tag: 'div', cls: ['second-main__item-right']}).appendTo(li).getElement();

        // let code = createElement.new().assignProps({tag: 'div', cls: ['code']}).appendTo(li).getElement();

        // let nominal = createElement.new().assignProps({tag: 'div', cls: ['nominal']}).appendTo(li).getElement();        

        // let name = createElement.new().assignProps({tag: 'div', cls: ['name']}).appendTo(li).getElement();        

        // let value = createElement.new().assignProps({tag: 'div', cls: ['name']}).appendTo(li).getElement();    
        
        let divs = [];

        for (let i = 0; i <= 3; i++) {
           divs[i] = createElement.new().assignProps({tag: 'div', cls: ['second-main__item-row', '--pct']}).appendTo(li).getElement();
        }

        createElement.new().assignProps({tag: 'span', cls: ['main__item-code'], text: `Код`}).appendTo(divs[0]);

        createElement.new().assignProps({tag: 'span', cls: ['main__item-nominal'], text: `Единица`}).appendTo(divs[1]);

        createElement.new().assignProps({tag: 'span', cls: ['main__item-name'], text: `Валюта`}).appendTo(divs[2]);

        createElement.new().assignProps({tag: 'span', cls: [], text: `Курс базовой валюты`}).appendTo(divs[3]);


        let flagsAndChar = createElement.new().assignProps({tag: 'div', cls: ['main__item-code']}).appendTo(divs[0]).getElement();

        createElement.new().assignProps({tag: 'img', cls: ['flags',`${i.CharCode}`], src: `/images/flags/${i.CharCode}.jpg`}).appendTo(flagsAndChar);
        
        createElement.new().assignProps({tag: 'span', text: `${i.CharCode}`}).appendTo(flagsAndChar);
        
        createElement.new().assignProps({tag: 'span', cls: ['main__item-nominal', 'gray'], text: `${i.Nominal}`}).appendTo(divs[1]);
        
        createElement.new().assignProps({tag: 'span', cls: ['main__item-name', 'gray'], text: `${i.Name}`}).appendTo(divs[2]);
        
        createElement.new().assignProps({tag: 'span', cls: ['main__item-vulue'], text: `${i.Value}`}).appendTo(divs[3]);
    }

}
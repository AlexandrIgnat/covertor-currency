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
        createElement.new().assignProps({tag: 'span', cls: ['main__item-nominal'], text: `${i.Nominal}`}).appendTo(li);
        createElement.new().assignProps({tag: 'span', cls: ['main__item-name'], text: `${i.Name}`}).appendTo(li);
        createElement.new().assignProps({tag: 'span', cls: ['main__item-vulue'], text: `${i.Value}`}).appendTo(li);
    }
}
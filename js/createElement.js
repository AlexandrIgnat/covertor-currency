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
                case 'src':
                    this.element.src = object[key];
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

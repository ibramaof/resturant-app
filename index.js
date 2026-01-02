import { menuArray } from "./data.js";
const menuItems = document.getElementById('default-state')





function getItems() {
    return menuArray.map(({ name, ingredients, price, id, emoji }) => {

        return `
    <div class="item">
                <p class="item-emoji">${emoji}</p>
                <div class="item-info">
                    <p class="item-name">${name}</p>
                    <P class="item-ingredients">${ingredients}</P>
                    <p class="item-price">${price}$</p>
                </div>
                <button class="add-btn"><span>+</span></button>
            </div>
    `
    }).join('')
}


function render() {
    menuItems.innerHTML = getItems()
}
render()


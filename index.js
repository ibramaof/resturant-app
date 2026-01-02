import { menuArray } from "./data.js";
const menuItems = document.getElementById('default-state')


document.addEventListener('click', e => {
    if (e.target.id) {
        console.log(e.target.id)
    }
})




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
                <button id="${id}" class="add-btn">+</button>
            </div>
    `
    }).join('')
}


function render() {
    menuItems.innerHTML = getItems()
}
render()


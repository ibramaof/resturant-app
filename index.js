import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const menuItems = document.getElementById('default-state')
const preCheck = document.getElementById('pre-checkout-state')
const payments = document.getElementById('checkout-state')




document.addEventListener('click', e => {
    if (e.target.classList.contains('add-btn')) {
        getItem(e.target.id)
    } else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    } else if (e.target.id === 'purchase-btn') {
        showPaymentForm()
    }
})



function getItem(itemId) {
    const itemObj = menuArray.filter(item => {
        return itemId === item.id.toString()
    })[0]
    additem(itemObj)
}


let items = []
let totalprice = 0
function additem(itemObj) {
    totalprice += itemObj.price
    const newItem = {
        ...itemObj,
        uuid: uuidv4()
    }
    items.push(newItem)
    additems(items)
}

function removeItem(itemId) {
    console.log(itemId)
    items = items.filter(item => item.uuid !== itemId)
    additems(items)
}

function additems(items) {
    let html = items.map(item => {
        return `
                <div class="order-info">
                        <p class="order-item-name">${item.name}</p>
                        <button class="remove-btn" data-remove="${item.uuid}">remove</button>
                        <p class="order-item-price">$${item.price}</p>
                </div>
        `
    })

    totalprice = items.reduce((total, curent) => total + curent.price, 0)
    if (totalprice === 0) {
        preCheck.style.display = 'none'
    } else {
        preCheck.style.display = 'block'
    }

    preCheck.innerHTML = `
    <p class="order-title">Your order</p>
                <div class="all-items" id="all-items">
                ${html.join('')}
                </div>
                <div class="divider"></div>
                <div class="total">
                    <p class="total-order">Total price:</p>
                    <p class="total-price">$${totalprice}</p>
                </div>
                <button class="purchase-btn" id="purchase-btn">Complete order</button>
    `

}

function showPaymentForm() {
    payments.innerHTML = `
        <p class="payment-title">Enter card details</p>
            <form id="form">
                <input 
                type="text" 
                name="name"
                id="name" 
                required 
                placeholder="Enter your name" 
                pattern="[a-zA-Z]+"
                class="pay-div">

                <input 
                type="tel" 
                name="cardNumb" 
                id="cardNumb" 
                required 
                placeholder="Enter card number"
                maxlength="16"
                pattern="[0-9]{15,16}"
                class="pay-div">

                <input 
                type="tel" 
                name="cvv" 
                id="cvv" 
                required 
                placeholder="Enter CVV"
                maxlength="4"
                pattern="[0-9]{3,4}" 
                class="pay-div">
                <button type="submit" class="pay-btn" id="pay-btn">Pay</button>
            </form>
        `
    payments.style.display = 'block'



    const form = document.getElementById('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        document.querySelector('.order-complete-state').style.display = 'flex'
        payments.style.display = 'none'
        preCheck.style.display = 'none'

    });

}

function getItems() {
    return menuArray.map(({ name, ingredients, price, id, emoji }) => {

        return `
    <div class="item">
                <p class="item-emoji">${emoji}</p>
                <div class="item-info">
                    <p class="item-name">${name}</p>
                    <P class="item-ingredients">${ingredients}</P>
                    <p class="item-price">$${price}</p>
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


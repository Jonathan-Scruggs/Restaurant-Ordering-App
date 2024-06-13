import { menuArray as menuItems} from "./data.js"
const menu = document.getElementsByClassName("menu-items")[0]
const customerOrder = document.getElementsByClassName("customer-order")[0]
const order = document.getElementsByClassName("customer-items")[0]
const orderTotalPrice = document.getElementsByClassName("order-item-price")[0]
const paymentModal = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")
const overlay = document.getElementById("overlay")

let userOrder = new Map()
paymentForm.addEventListener("submit",function(event){
    /*Function that handles paymentForm submit */
    event.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    let customerName = paymentFormData.get("name")
    userOrder.clear()
    
    clearPaymentForm()
    paymentModal.classList.toggle("hide-modal")
    overlay.classList.toggle("hide-overlay")
    renderCompleteOrderMethod(customerName)
})

document.addEventListener('click',function(event){
     /*Event Listener that monitors entire document for clicks*/
    if(event.target.dataset.increment){
        handleIncrement(event.target.dataset.increment)
    }
    else if(event.target.dataset.decrement){
        handleDecrement(event.target.dataset.decrement)
    }
    else if (event.target.id === "complete-order-btn"){
        renderPayMenu()
    }
    else if (event.target.id === "payment-form-exit-button"){
        event.preventDefault() // To prevent validation
        clearPaymentForm()
        closePaymentForm()
    }
    else if (event.target.dataset.remove){
        userOrder.delete(event.target.dataset.remove)
        renderUserOrder()
        renderUserTotal()

    }

})
function renderCompleteOrderMethod(customerName){
    /*Function to render when the message to the customer when they have completed their order */
    document.getElementsByClassName("customer-order")[0].style.padding = "45px 0px"
    document.getElementsByClassName("customer-order")[0].innerHTML = `<div class="order-complete-message">Thanks, ${customerName}! Your order is on its way!</div>`
}

function closePaymentForm(){
    /*Closes the payment form */
    paymentModal.classList.toggle("hide-modal")
    overlay.classList.toggle("hide-overlay")
    renderUserOrder()
    clearPaymentForm()
}


function clearPaymentForm(){
    /*Clears input field of form */
    paymentForm.reset()
}


function renderPayMenu(){
    paymentModal.classList.toggle("hide-modal")
    overlay.classList.toggle("hide-overlay")
}


function renderUserTotal(){
    let total = 0
    for (let [itemUUID,amount] of userOrder.entries()){
        total += amount * menuItems.filter(function(menuItem){
            return menuItem.UUID === itemUUID
        })[0].price
    }
    orderTotalPrice.textContent = `$${total}`
}


function renderUserOrder(){
    if (userOrder.size >= 1){
        let orderItemsToRender = []
        for (let [itemUUID,amount] of userOrder.entries()){
            let item = menuItems.filter(function(menuItem){
                return menuItem.UUID === itemUUID
            })[0]
            
            const {name,ingredients,UUID,price,image} = item
            let htmlString = `
            <div class="order-item">
                <span class="order-item-name">${name}</span>
                <span class="order-item-name">x ${amount}</span>
                <button class="order-item-remove-btn" data-remove="${UUID}">remove</button>
                <span class="order-item-price">$${Number(price) * amount}</span>
            </div>
            `
            orderItemsToRender.push(htmlString)     
        }
        order.innerHTML = orderItemsToRender.join("")
        customerOrder.classList.remove("show-order")    
    }

    else {
        customerOrder.classList.add("show-order") 
    }
    

}


function handleIncrement(UUID){
    if (userOrder.has(UUID)){
        // Increment the count
        let currentAmount = userOrder.get(UUID)
        userOrder.set(UUID, currentAmount + 1)
    }
    else {
        userOrder.set(UUID, 1)
    }
    renderUserOrder()
    renderUserTotal()
}
function handleDecrement(UUID){
    if (userOrder.has(UUID) && userOrder.get(UUID) != 1){
        let currentAmount = userOrder.get(UUID)
        userOrder.set(UUID, currentAmount - 1)
    }
    else if (userOrder.get(UUID) && userOrder.get(UUID) === 1){
        userOrder.delete(UUID)
    }
    renderUserOrder()
    renderUserTotal()
}


function renderMenu(){
    /*Renders the menu items */
    let itemsToAddToMenu = []

    for(let menuItem of menuItems){
        let menuItemHTML = `
        <div class="menu-item">
            <img src="${menuItem.image}" class="menu-item-image">
            <div class="menu-item-text">
                <span class="menu-item-title">${menuItem.name}</span>
                <span class="menu-item-description">${(menuItem.ingredients.join(", "))}</span>
                <span class="menu-item-price">$${menuItem.price}</span>
            </div>
            <div class="menu-buttons">
                <button class="menu-button decrement-btn" data-decrement="${menuItem.UUID}">-</button>
                <button class="menu-button increment-btn" data-increment="${menuItem.UUID}">+</button>
            </div>

        </div>`
        itemsToAddToMenu.push(menuItemHTML)
    }
    menu.innerHTML = itemsToAddToMenu.join("")

}
renderMenu()
let removeCartItemButtons = document.getElementsByClassName('btn-danger')
// console.log(deleteCartBtn)
for (let i=0; i < removeCartItemButtons.length; i++){
    let button = removeCartItemButtons[i]
    button.addEventListener('click',(event)=>{
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
    })
}

function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName('menus')[0]
    let cartItem = cartItemContainer.getAttributeNames('menu_list')
    for (let i=0; i < cartItem.length; i++){
        let cartItem = cartItem[i];
        let menuPrice = cartItem.getElementsByClassName('menu-price')[0]
        let quantity = cartItem.getElementsByClassName('quantity')[0]
        let price = parseFloat(menuPrice.innerText.replace('$',''))
    }
}
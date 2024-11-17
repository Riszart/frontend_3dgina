class CreateItem{
  constructor({name,id,price,count,image,oldPrice,unit}){
    this.unit=unit
    this.name=name
    this.id=id
    this.price=price
    this.oldPrice=oldPrice || '0.00'
    this.image=image
    this.count=count
  }
  generateTable(){
    const contend = document.querySelector('.contend-items__center')
    const article = document.createElement('article')
    article.classList.add('cart__item')
    article.innerHTML = `
      <img class="imagen-item" src="${this.image}" alt="">
      <div>
        <div>
          <div class="contend-name__unit">
            <span class="unit">${this.unit}</span>
            <p class="name">${this.name}</p>
          </div>
          <div class="id-product">id:${this.id.split('-').join('')}</div>
        </div>
        <div class="price">
          <div class="contend-old">
            <span>S/.</span>
            <p class="old">${this.oldPrice}</p>
          </div>
          <div class="contend-new">
            <span>S/.</span>
            <p class="new">${this.price}</p>
          </div>
        </div>
      </div>
      <input class="count" type="number" value="${this.count}" placeholder="0">
      <div class="price-total__product">
        <span>S/.</span><p class="price-product">${Number(this.price*this.count).toFixed(2)}</p>
      </div>
      <div class="close">
        <img src="../img/svg/delete.svg" alt="">
      </div>
    `
    const deleteProduct = article.querySelector('.close')
    deleteProduct.addEventListener('click',()=>{
      this.deleteProduct(article)
      validateData()
    })

    const input = article.querySelector('input')
    const priceProduct = article.querySelector('.price-product')
    input.addEventListener('input',()=>{
      priceProduct.textContent =`${Number(this.price*input.value).toFixed(2)}`
      priceTotal()
    })
    contend.appendChild(article)
  }
  deleteProduct(article){
    const product = document.querySelector('.product-count')

    let objData = JSON.parse(localStorage.getItem('z3dgina'))
    delete objData[this.id]
    localStorage.setItem('z3dgina',JSON.stringify(objData))

    article.remove()
    priceTotal()
  }
}

const btn = document.getElementById("sendOrder")
const nameUser = document.getElementById("nameUser")
const contendShoppingCart = document.querySelector('.contend-items__center')
nameUser.addEventListener("input",validateData)
btn.addEventListener("click",()=>sendOrder(validateData()))

async function getData(url){
  const response = await fetch(url)
  const data = await response.json(url)
  return data
}

async function createTicket(){
  let objDataLocal = JSON.parse(localStorage.getItem('z3dgina'))
  
  for(let i = 0; i<Object.keys(objDataLocal).length ; i++){
    let key = Object.keys(objDataLocal)[i]
    let value = Object.values(objDataLocal)[i]
    let idMain = key.split('-')
    let idNext
    if(key.length > 11)idNext = idMain.pop()
    let id = idMain.join('')

    let category = key.split('-')[0]
    let store = `${category}${key.split('-')[1]}`
    const data = await getData(`https://raw.githubusercontent.com/Riszart/backend_3dgina/main/json/${category}/${store}.json`)
    const found = data.find(element=>{
      return element.idProduct === id
    })
    let und = `${found.unit}${found.extent}`

    const objProduct = {
      unit:und,
      name:found.name,
      id:key,
      price:found.newPrice,
      oldPrice:found.price,
      image:found.image.url_01,
      count:value
    }
    if(found.more){
      let product = found.more.find(item=>{return item.id === key})
      objProduct.name = product.name
      objProduct.image = product.image
    }

    const item = new CreateItem(objProduct)
  item.generateTable()
  } 
  priceTotal()
}
createTicket()

function priceTotal(){
  const priceCartTotal = document.querySelector('.price-cart__total')
  const priceCartDesc = document.querySelector('.price-cart__desc')
  const totalCart = document.querySelector('.total__cart div')
  const totalProducts = document.querySelector('.product-count')
  let price = 0
  let desc = 0
  let oldPrice
  let productsAll = 0
  const products = document.querySelectorAll('.cart__item')
  products.forEach(product => {
    const cants = Number(product.querySelector('input').value)
    const newPrice = Number(product.querySelector('.new').textContent)
    const itemDesc = Number(product.querySelector('.old').textContent-newPrice)
    if(itemDesc<0)oldPrice = 0
    else oldPrice = itemDesc
    productsAll += cants
    price += newPrice*cants
    desc += oldPrice*cants
  });
  totalProducts.textContent = productsAll
  priceCartTotal.textContent = price.toFixed(2)
  priceCartDesc.textContent = desc.toFixed(2)
  totalCart.textContent = `S/. ${price.toFixed(2)}`
  return price.toFixed(2)
}


function validateData(){

  if(nameUser.value !== "")nameUser.style.borderColor = 'green'
  else nameUser.style.borderColor = 'red'
  
  if(contendShoppingCart.children.length>0 & nameUser.value !== ""){
    btn.disabled = false
    btn.style.opacity = ''
    return generateOrder(contendShoppingCart)
  }else{
    btn.disabled = true
    btn.style.opacity = '.5'
  }
}
validateData()

function generateOrder(){
  let countTotal = priceTotal()
  let msm = ""
  for(let i = 0; i<contendShoppingCart.children.length;i++){
    let id = contendShoppingCart.children[i].querySelector('.id-product').textContent.split('id:')[1]
    let cant = contendShoppingCart.children[i].querySelector('.count').value
    let name = contendShoppingCart.children[i].querySelector('.name').textContent
    let unit = contendShoppingCart.children[i].querySelector('.unit').textContent
    msm += `${id}[${cant}]:${unit}-${name}\n`
    if(i==contendShoppingCart.children.length-1){
      msm += `\ntotal a pagar: ${countTotal}S/.`
    }
  }
  return msm
}


function sendOrder(order){
  document.getElementById('nameUser')
  const customerName = `${nameUser.value}`
  const orderDetails = order
  const phoneNumber = "51936809672"
  const orderMessage = `Hola, soy ${customerName}. Quisiera hacer el siguiente pedido:\n\n${orderDetails}`
  const encodedMessage = encodeURIComponent(orderMessage)
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
  window.open(whatsappURL, '_blank')

  localStorage.clear()
  contendShoppingCart.innerHTML = ""
  priceTotal()
}

// testing

let a = document.querySelector('.deleteCartShop')
a.addEventListener('click',()=>{
  localStorage.clear()
  location.reload()
})
function float(product){
  const floatCart = document.querySelector('.cart-float')
  const floatCartImg = document.querySelector('.cart-float img')
  const unit = document.querySelector('.unit')
  const titleProduct = document.querySelector('.cart-bottom p')
  unit.textContent = `1-${product.unit}${product.extent}`
  floatCartImg.src = product.image.url_01
  floatCart.style.display = "block"
  titleProduct.textContent = product.name
  setTimeout(()=>{
  floatCart.style.display = "none"
  },5000)
}
function addProducts(){
  const countItems = document.querySelector('.product-count')

  let suma = 0
  Object.values(localStorage).forEach(element=>{
    suma += parseInt(element)
  })
  countItems.textContent = suma
}

addProducts()


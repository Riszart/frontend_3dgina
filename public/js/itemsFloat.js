function float(product){
  const floatCart = document.querySelector('.cart-float')
  const floatCartImg = document.querySelector('.cart-float img')
  const unit = document.querySelector('.unit')
  const titleProduct = document.querySelector('.cart-bottom p')
  unit.textContent = `1-${product.unit}${product.extent}`
  if(!product.image.url_01)floatCartImg.src = product.image
  else floatCartImg.src = product.image.url_01

  floatCart.style.display = "block"
  titleProduct.textContent = product.name
  setTimeout(()=>{
  floatCart.style.display = "none"
  },5000)
}
function addProducts(){
  if(!localStorage.getItem(`z3dgina`)) localStorage.setItem(`z3dgina`,JSON.stringify({}))
  const countItems = document.querySelector('.product-count')

  let suma = 0
  let dataObj = JSON.parse(localStorage.getItem('z3dgina'))
  Object.values(dataObj).forEach(element=>{
    suma += parseInt(element)
  })
  countItems.textContent = suma
}

addProducts()


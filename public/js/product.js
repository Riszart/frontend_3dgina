const URL_DATA = 'https://raw.githubusercontent.com/Riszart/backend_3dgina/main/data.json'
class Product{
  constructor(url){
    this.url = url
  }
  async operate(){
    let hash = window.location.hash.split("/")
    let idProduct = hash[1]
    let idCategory = idProduct.substring(0,3)
    let json = idProduct.substring(0,5)
    let data = await this.callFetch(`https://raw.githubusercontent.com/Riszart/backend_3dgina/main/json/${idCategory}/${json}.json`)
    const product = this.searchProduct(data,idProduct)
    this.showProduct(product)

    this.showSubProduct(data)

  }
  searchProduct(data,idProduct){
    for (const product in data) {
      if(data[product].idProduct === idProduct)return data[product]
    }
  }
  async callFetch(url){
    try {
      const reponse = await fetch(url)
      const data = await reponse.json()
      return data
    } catch (error) {
      console.error("error:",error)
    }
  }
  showProduct(product){
    const contend = document.querySelector('.content-product')
    const section = document.createElement('section')
    section.classList.add('product')
    section.setAttribute('id',product.idProduct)
    section.innerHTML= `
    <section class="flex-space-between__center title-name">
      <p class="product-name">${product.name}</p>
      <p class="weight">${product.unit}-${product.extent}</p>
    </section>
    <section class="product-image">
      <img  src="${product.image.url_01}">
    </section>
    <section class="flex-space-between__row rate-brand">
      <p class="rate"> &starf;&starf;&starf;&starf;&star;</p>
      <p class="brand">${product.brand}</p>
    </section>
    <section class="flex-space-between__row">
      <p class="prise">s/.
        <span class="number-prise">${product.newPrice}</span>
      </p>
    </section>
    <section class="send">
      <p>envio no disponible</p>
      <p>recojo en el local de venta</p>
    </section>
    <section calss="content-btn_car">
      <div class="add_car">
        <p>agregar</p>
      </div>
    </section>
    `
    section.addEventListener('click',()=>{
      let element
      if(product.more){
        element = product.more.find((item)=>item.id == section.id)
        if(!element){element = product.more[0]}
      }else{
        element = product
      }
      if(!localStorage.getItem(`z3dgina`)) localStorage.setItem(`z3dgina`,JSON.stringify({}))
        let localStorageData = localStorage.getItem(`z3dgina`)
        let dataObj = JSON.parse(localStorageData)
  
        if(!dataObj[element.id]) dataObj[element.id] = 1
        else dataObj[element.id] = dataObj[element.id]+1
        localStorage.setItem('z3dgina',JSON.stringify(dataObj))
        addProducts()
        float(element,element.image)
    })

    
    contend.appendChild(section)

    if(product.more){
      const sudProduct = document.createElement('section')
      sudProduct.classList.add('contend-sub_product')
      product.more.forEach(element => {
        const div = document.createElement('div')
        div.classList.add('sub-product_item')
        div.setAttribute('id',element.idProduct)
        div.innerHTML = `
          <img src="${element.image}">
          <p>${element.name}</p>
        `
        sudProduct.appendChild(div)
        div.addEventListener('click',()=>{
          section
          const allsectionProduct = document.querySelectorAll('.sub-product_item')
          allsectionProduct.forEach(element=>{
            element.style.outline = 'none'
            console.log(element)
          })
          console.log()
          div.style.outline = "#d4af37 solid 3px"
          section.setAttribute('id',element.id)
          section.querySelector('.product-image img').src = element.image
          section.querySelector('.product-name').textContent = element.name
        })
      });
      contend.appendChild(sudProduct)
    }
  }
  async showSubProduct(dataObj){
    let numberMax = Object.keys(dataObj).length
    const containerProductSub = document.querySelector('.container-product__sub')
    for(let i=0; i < 5; i++){
      let number = getIndexRandom(numberMax)
      const product = dataObj[number]
      const article = document.createElement('arcicle')
      article.classList.add('sub-product__item')
      article.innerHTML = `
      <div class="content-product__name">${product.name} : ${product.unit}${product.extent}</div>
      <div class="content-product__img">
        <img src="${product.image.url_01}">
      </div>
      <div class="content-product__price">
        <p>S/. ${product.newPrice}</p>
        <a class="">ver producto</a>
      </div>
      `
      containerProductSub.appendChild(article)
    }

  }
  addProduct(){}
  deleteProduct(){}
}
const product = new Product(URL_DATA).operate()

function getIndexRandom(maxNumber){
  let number = Math.trunc(Math.random()*maxNumber)
  return number
}
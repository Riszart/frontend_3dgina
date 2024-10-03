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
    <section calss="content-btn_car">
      <div class="add_car">
        <p>agregar</p>
      </div>
    </section>
    <section>
      <h4 class="title-info">description</h4>
      <p class="info">asdf sdafasd sdf s sdfs dsd sdf sdfsd zfds gzfd gs fsd fsdfsdfafed</p>
    </section>
    `
    contend.appendChild(section)
  }
  async showSubProduct(dataObj){
    let numberMax = Object.keys(dataObj).length
    const containerProductSub = document.querySelector('.container-product__sub')
    for(let i=0; i < 5; i++){
      let number = getIndexRandom(numberMax)
      const product = dataObj[number]
      console.log(dataObj[number])
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
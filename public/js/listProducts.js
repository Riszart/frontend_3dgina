const URL_DATA = 'https://raw.githubusercontent.com/Riszart/backend_3dgina/main/data.json'

class Products{
  constructor(url){
    this.url = url
  }
  async operate(){
    let hash = window.location.hash.substring(1)
    let nameCategory = hash.split('/')[2]
    let data = await this.callFetch(URL_DATA)
    this.extract(data[0][`category-${nameCategory}`])
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
  async extract(products){
    const loadedProducts = {}
    let title = document.querySelector('.title-name__section')
    title.innerHTML = products.name
    if(products.id == 135){
      addClass('.arrow_top','more_18')
      addClass('.go_init','more_18')
      addClass('.title-name__section','more_18')
      addClass('.main-list__product','more_18')
      let only_liquor = document.querySelector('.only-liquor_store')
      let p = document.createElement('p')
      p.innerHTML = " tomar bebidas alcolicas en exeso es dañino"
      only_liquor.appendChild(p)
    }

    const tagName = document.querySelector('.tag-product')
    Object.keys(products.urls).forEach((nameTag)=>{
      const div = document.createElement('div')
      div.innerHTML= `<p>${nameTag} </p>`
      tagName.appendChild(div)
      div.addEventListener('click',()=>{
        const products__ietms = document.querySelector('.content-products__items')
        products__ietms.innerHTML = ``
        this.showCategory(loadedProducts[nameTag])
      })
    })

    for(let i in products.urls){
      let items = await this.callFetch(products.urls[i])
      loadedProducts[i] = items
      this.showCategory(items)
    }
  }

  showCategory(products){
    const products__items = document.querySelector('.content-products__items')
    // console.log(products)
    products.forEach(element => {
      if(element.stock == true){
        const a = document.createElement('article')
        const offerArticle = document.createElement('article')
        offerArticle.classList.add('offer-product')
        a.classList.add("content-article")
        a.innerHTML = `
          <div class="content-title__product">
            <p class="product-name">${element.name}</p>
            <p class="product-name">${element.unit}${element.extent}</p>
          </div>
          <a href="product.html#product/${element.id.split('-').join('')}/${element.name.split(' ').join('')}" class="content-image">
            <div class="product-img_left">
              <img src="${element.image.url_01}" class="product-image">
            </div>
            <div class="product-img_right">
              <div class="product-img__right-top" style="background-color:${verifyData('color_back_top',element)};color:${verifyData('color_text',element)}"><p>${verifyData('name',element)}</p></div>
              <div class="product-img__right-bottom" style="background-color:${verifyData('color_back_bottom',element)};color:${verifyData('color_text',element)}">
                <p class="size" >${element.unit}</p>
                <p class="size" >${element.extent}</p>
              </div>
            </div>
          </a>
          <div class="content_price__rate">
            <div class="product-price">
              <p class="product-new_price">
                s/. <span>${element.newPrice}</span>
              </p>
              <p class="product-old_price">
                ${validatePrice(element,offerArticle)}
              </p>
            </div>
            <div class="add-product_cart">
              <p>agregar</p>
            </div>
          </div>
        `
        a.appendChild(offerArticle)
        products__items.appendChild(a)
        const item = a.querySelector('.add-product_cart')
        
        item.addEventListener('click',()=>{
          if(element.more){
            let float = document.querySelector('.foat-product_select')
            float.innerHTML = ""
            element.more.forEach((item)=>{
              if(item.stock == false)return
              const article = document.createElement('article')
              article.classList.add('contend-product')
              article.innerHTML= `
                <img class="product-section_img" src="${item.image}">
                <div class="product-section_text">
                  <h4>${item.name}</h4>
                    <div class="content_price__rate">
                      <p class="product-price">
                        s/. <span>${element.newPrice}</span>
                      </p>
                      <div class="add-product_cart-section">
                        <p>add product</p><img src="../img/svg/add-white.svg">
                      </div>
                    </div>
                </div>
              ` 
              float.appendChild(article)
              const producSelect = article.querySelector('.add-product_cart-section')
              producSelect.addEventListener('click',()=>{
                console.log(element)
                element.name = item.name
                // element.newPrise = item.newPrice
                element.id = item.id
                element.idProduct = item.idProduct
                element.image.url_01 = item.image

                this.getDataProductType(element)
                document.querySelector('.contend-float_product').style.display = "none"
                document.querySelector('.background-item').style.display = "none"
              })
            })
            document.querySelector('.contend-float_product').style.display = "block"
            document.querySelector('.background-item').style.display = "block"
          }else{
            this.getDataProductType(element)
          }
        })
      }
    });
  }
  getDataProductType(element){
    if(!localStorage.getItem(`z3dgina`)) localStorage.setItem(`z3dgina`,JSON.stringify({}))

      let localStorageData = localStorage.getItem(`z3dgina`)
      let dataObj = JSON.parse(localStorageData)

      if(!dataObj[element.id]) dataObj[element.id] = 1
      else dataObj[element.id] = dataObj[element.id]+1
      localStorage.setItem('z3dgina',JSON.stringify(dataObj))
      addProducts()
      float(element)
  }
  showProduct(){
  }
}
function validatePrice(element,offerElement){
  if(element.price == "")return ""
  let offer = (100*(element.price-element.newPrice))/element.newPrice
  offerElement.innerHTML = `
  <div class= "offer-name">off</div>
  <div class= "offer-contend_data">
    <p class = "offer_value">${offer.toFixed(2)}</p>
    <span class="icon_offer">%</span>
  </div>
  `
  offerElement.style.display = "flex"
  return `s/. <span>${element.price}</span>`
} 
const sectionClose = document.querySelector('.close-section')
sectionClose.addEventListener('click',()=>{
  document.querySelector('.contend-float_product').style.display = "none"
  document.querySelector('.background-item').style.display = "none"
})

function addClass(element,className){
  document.querySelector(element).classList.add(className)
}
window.addEventListener('scroll',showBtn)
const topHeader = document.querySelector('.header')
const btnArrow = document.querySelector('.arrow_top')

const btnFloat = document.querySelector('.go_init')

const footer = document.querySelector('footer')

btnFloat.addEventListener('click',()=>{
  topHeader.scrollIntoView({
    behavior:'smooth',
    block:'start'
  })
})

function verifyData(data,element){
  if(element.styleTag == undefined)return
  return element.styleTag[data]
}


function showBtn(){
  const footerTop = footer.getBoundingClientRect().top // veo si el footer aparese en el viewport
  const viewportHeight = window.innerHeight    // height del viewport
  let a = topHeader.getBoundingClientRect()

  if(footerTop < viewportHeight){
    btnFloat.style.bottom = `${viewportHeight - footerTop + 10}px`
  }else btnFloat.style.bottom = `10px`

  if(a.top > -130 || a.top == 0 )btnFloat.style.display = 'none'
  else btnFloat.style.display = 'flex'
}

const category = new Products(URL_DATA).operate()
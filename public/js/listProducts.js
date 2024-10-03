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
    console.log(products)
    products.forEach(element => {
      if(element.stock == true){
        const a = document.createElement('article')
        a.classList.add("content-article")
        // a.href = `#product/${element.id.split('-').join('')}/${element.name.split(' ').join('')}`
        a.innerHTML = `
          <div class="content-title__product">
            <p class="product-name">${element.name}</p>
            <p class="product-name">${element.unit}${element.extent}</p>
          </div>
          <a href="#product/${element.id.split('-').join('')}/${element.name.split(' ').join('')}" class="content-image">
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
            <p class="product-price">
              s/. <span>${element.newPrice}</span>
            </p>
            <div class="add-product_cart">
              <img src="../img/svg/add.svg">
            </div>
          </div>
        `
        products__items.appendChild(a)
        const item = a.querySelector('.add-product_cart')
        item.addEventListener('click',()=>{
          const data = +localStorage.getItem(`${element.id}`)
          if(!data){
            localStorage.setItem(`${element.id}`,'1')
          }else{
            localStorage.removeItem(`${element.id}`)
            localStorage.setItem(`${element.id}`,`${data+1}`)
          }
          addProducts()
          float(element)
        })
      }
    });
  }
  showProduct(){
  }
}

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
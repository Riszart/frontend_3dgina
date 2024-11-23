async function getProductToIndex(){
  // const number = getIndexRandom(5)
  const data = await getData("https://raw.githubusercontent.com/Riszart/backend_3dgina/main/data.json")
  
  Object.values(data[0]).forEach(async (element)=>{
    let data = Object.values(element.urls)
    let url = data[getIndexRandom(data.length)]
    if(url){
      const select = await getData(url)
      let product = select[getIndexRandom(select.length)]
      await generateCode([product])
    }
  })
}
async function getData(url){
  const response = await fetch(url)
  const data = await response.json()
  return data
}

getProductToIndex()

function getIndexRandom(maxNumber){
  let number = Math.trunc(Math.random()*maxNumber)
  return number
}
async function generateCode(data){
  function verifyData(data,element){
    if(element.styleTag == undefined)return
      return element.styleTag[data]
    }
  
  const contend = document.querySelector(".contentd-articles__items")
  data.forEach(element => {
    if(element.stock == true){
      const offerArticle = document.createElement('article')
      offerArticle.classList.add('offer-product')

      // console.log(element.stock)
      const article = document.createElement('article')
      article.classList.add('item-product')
      article.innerHTML = `
      <div class="contend-title">
        <p class="title-product">${element.name}</p>
        <p class="unit">${element.unit}${element.extent}</p>
      </div>
      <a href="#product/${element.idProduct}/${element.name.split(' ').join('')}">
        <div class="contend-img">
          <div class="left">
            <img src="${element.image.url_01}">
          </div>
          <div class="right">
            <div class="right-top" style="background-color:${verifyData('color_back_top',element)};color:${verifyData('color_text',element)}"><p>${verifyData('name',element)}</p></div>
              <div class="right-bottom" style="background-color:${verifyData('color_back_bottom',element)};color:${verifyData('color_text',element)}">
                <p class="size" >${element.unit}</p>
                <p class="size" >${element.extent}</p>
              </div>
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
      article.appendChild(offerArticle)
      contend.appendChild(article)

      const item = article.querySelector('.add-product_cart')
        
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

              getDataProductType(element)
              document.querySelector('.contend-float_product').style.display = "none"
              document.querySelector('.background-item').style.display = "none"
            })
          })
          document.querySelector('.contend-float_product').style.display = "block"
          document.querySelector('.background-item').style.display = "block"
        }else{
          getDataProductType(element)
        }
      })
    }
  });
}
const sectionClose = document.querySelector('.close-section')
sectionClose.addEventListener('click',()=>{
  document.querySelector('.contend-float_product').style.display = "none"
  document.querySelector('.background-item').style.display = "none"
})
function getDataProductType(element){
  if(!localStorage.getItem(`z3dgina`)) localStorage.setItem(`z3dgina`,JSON.stringify({}))

    let localStorageData = localStorage.getItem(`z3dgina`)
    let dataObj = JSON.parse(localStorageData)

    if(!dataObj[element.id]) dataObj[element.id] = 1
    else dataObj[element.id] = dataObj[element.id]+1
    localStorage.setItem('z3dgina',JSON.stringify(dataObj))
    addProducts()
    float(element)
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
  console.log(offer,offerElement)
  return `s/. <span>${element.price}</span>`
} 
async function getBrand(){
  const data = await getData('https://raw.githubusercontent.com/Riszart/backend_3dgina/main/dataBrand.json')
  await generateBrand(data)
}

async function generateBrand(data){
  const contendBrand = document.querySelector(".contentd-brand__items")
  data.forEach(element => {
    const article = document.createElement('article')
    article.classList.add('item-brand')
    article.innerHTML = `
    <img src="${element.imgBrand}">
    `
    contendBrand.appendChild(article)
  });
}

getBrand()

async function getCategory(){
  const data = await getData('https://raw.githubusercontent.com/Riszart/backend_3dgina/main/dataCategory.json')
  await generateCategory(data)
}

// #category/110/market

async function generateCategory(data){
  const contendBrand = document.querySelector(".contentd-category__items")
  data.forEach(element => {
    let image = Object.values(element)[0].imgCategory
    let name = Object.values(element)[0].name
    let nameE = Object.values(element)[0].nameE
    let id = Object.values(element)[0].id
    const a = document.createElement('a')
    a.classList.add('item-category')
    a.href = `#category/${id}/${nameE.split('/')[1]}`
    a.innerHTML = `
    <p>${name}</p>
    <img src="${image}">
    `
    contendBrand.appendChild(a)
  });
}

getCategory()

async function showAds(){
  const bannerMain = document.querySelector('.banner-main')
  const content_ads = document.querySelector('.ad')
  const ads = await getData('https://raw.githubusercontent.com/Riszart/backend_3dgina/main/ads.json')
  const imageShort = Object.values(ads[0])
  const imagelarge = Object.values(ads[1])
  const dataClone = []
  for(i=0; i<8; i++){
    const number = getIndexRandom(imageShort.length-1)
    dataClone.push(imageShort.splice(number,1))
  }
  for(i=0; i<8; i++){
    const article = document.createElement('article')
    const img = document.createElement('img')
    img.src = dataClone[i]
    img.addEventListener('click',()=>showImg(img.src))
    article.appendChild(img)
    content_ads.appendChild(article)
  }
  for(i=0; i<imagelarge.length; i++){
    const img = document.createElement('img')
    img.src = imagelarge[i]
    bannerMain.appendChild(img)
  }
showAdsLAger()
}
showAds()
function showImg(image){
  const close = document.querySelector('.closeDivAd')
  close.addEventListener('click',()=>{
    contendMain.style.display = 'none'
    body.style.overflow = 'visible'
  })
  const contendMain = document.querySelector('.contentShowImage')
  const body = document.querySelector('body')
  const contend = document.querySelector('.showImage')
  contend.src = image
  
  contendMain.style.display = 'block'
  body.style.overflow = 'hidden'

}

function showAdsLAger(){
  const caroursel = document.querySelector('.banner-main')
  let currentIndex = 0
  const images = document.querySelectorAll('.banner-main img')
  const totalImages = images.length

  function scrollRight(){
    currentIndex = (currentIndex + 1)%totalImages
    caroursel.style.transform = `translateX(-${currentIndex * window.innerWidth}px)`
  }
  setInterval(scrollRight, 3000)
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
// //  https://docs.google.com/spreadsheets/d/e/2PACX-1vRg0Kxq0hL-1HohmCajBmAYTrKor35swGHXoP-eYnr3-qjOTSLp6gJesRO61ivlBCdKjM0GXqSiu-5a/pub?gid=123456789&output=csv
// fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRg0Kxq0hL-1HohmCajBmAYTrKor35swGHXoP-eYnr3-qjOTSLp6gJesRO61ivlBCdKjM0GXqSiu-5a/pub?gid=1367228316&output=csv")
//     .then(response => response.text())
//     .then(data => {

//         // Convierte el CSV en un array de arrays
//         const rows = data.split('\n').map(row => row.split(','));

//         // Acceder a una fila específica (Ejemplo: segunda fila)
//         const specificRow = rows[1]; // Las filas comienzan desde el índice 0
//         console.log("Fila específica:", specificRow);

//         // Acceder a una columna específica (Ejemplo: segunda columna de cada fila)
//         const specificColumn = rows.map(row => row[1]); // Segunda columna en todas las filas
//         console.log("Columna específica:", specificColumn);

//         // Acceder a una celda específica (Ejemplo: tercera fila, segunda columna)
//         const specificCell = rows[2][1]; // Tercera fila (índice 2), segunda columna (índice 1)
//         console.log("Celda específica:", specificCell);

//         // const rows = data.split('\n').map(row => row.split(',')); // Convertir CSV a array de arrays
//         // console.log(rows); // Aquí tienes los datos como un array de filas y columnas
        
//         // // Ejemplo: Manipular cada fila
//         // rows.forEach(row => {
//         //     console.log(row); // Cada fila es un array de valores
//         // });
//     })
//     .catch(error => console.error('Error:', error));

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
      console.log(element.stock)
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
      <div class="sub-description">
        <div>
          <p class="price">S/. ${element.newPrice}</p>
        </div>
        <div class="add-product"></div>
      </div>
      `
      contend.appendChild(article)
    }
  });
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
  const countItems = document.querySelector('.product-count')

  let suma = 0
  Object.values(localStorage).forEach(element=>{
    suma += parseInt(element)
  })
  countItems.textContent = suma
}

addProducts()


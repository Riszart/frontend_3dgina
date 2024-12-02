
window.addEventListener('hashchange',products)

function products(){
  let hash = window.location.hash.substring(1)
  let hashName = hash.split('/')[0]
  if(hashName.split('-')[0] == 'product')goIdProduct(hash)
  else if(hashName.split('-')[0] == 'category')goCategory(hash)
  // else if(hashName.split('-')[0] == 'brand')goCategory(hash)
}

function goCategory(hash){
  windowOpen('products-list',hash)
  if(location.pathname.split('/').reverse()[0] === 'products-list.html'){
    window.location.reload()
  }
}

function goIdProduct(hash){
  window.location.href = `${operateUrl()}/product.html#${hash}`
}

function windowOpen(file,hash){
  window.location.href = `${operateUrl()}/${file}.html#${hash}`
}
function operateUrl(){
  let url = location.href.split('#')[0].split('/')
  url.pop()
  return url.join('/')
}

//-----------------------------------

async function returnPage(value){
  window.addEventListener('hashchange',()=>{

  })
  const response = await fetch("https://raw.githubusercontent.com/Riszart/backend_3dgina/main/data.json")
  const data = await response.json()
  let a = Object.values(data[0]).find((element)=>{
    return element.id == value
  })
  window.location.hash = `#${a.nameE.split('/')[0]}/${value}/${a.nameE.split('/')[1]}`
}

if(window.location.pathname == '/public/html/products-list.html'){
  let data1 = [window.location.hash.split('/')[1].split('')[0],window.location.hash.split('/')[1].split('')[1],window.location.hash.split('/')[1].split('')[2]]
  returnPage(data1.join(''))
}
console.log('init',window.location)
// document.querySelector('main').style.background = '#0f5'

window.addEventListener('DOMContentLoaded',()=>{
  // document.querySelector('main').style.background = '#ff5'
  if(window.location.pathname == '/public/html/index.html'){
    console.log('location')
    // document.querySelector('main').style.background = '#000'
    // history.back()
    // if(window.location.hash.split('/')[0] == "#category"){
    //   console.log(window.location,'ss')
      
  
    //   // window.location = 'http://127.0.0.1:5501/public/html/index.html'
    // }
  }
})

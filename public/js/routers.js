
window.addEventListener('hashchange',products)

function products(){
  let hash = window.location.hash.substring(1)
  let hashName = hash.split('/')[0]
  console.log(hashName)
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
console.log(location)



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
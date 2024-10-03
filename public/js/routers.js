
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
function goIdProduct(hash){
  window.location.href = `${location.origin}/public/html/product.html#${hash}`
}

function windowOpen(file,hash){
  window.location.href = `${location.origin}/public/html/${file}.html#${hash}`
}
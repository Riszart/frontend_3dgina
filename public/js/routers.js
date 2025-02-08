
window.addEventListener('hashchange',products)

function products(){
  let hash = window.location.hash.substring(1)
  let hashName = hash.split('/')[0]
  if(hashName.split('-')[0] == 'product')goIdProduct(hash)
  else if(hashName.split('-')[0] == 'category')goCategory(hash)
  // else if(hashName.split('-')[0] == 'brand')goCategory(hash)
}

function goCategory(hash){
  history.pushState(null,"","index.html")
  windowOpen('products-list',hash)
}

function goIdProduct(hash){
  // history.replaceState(null,"",`products-list.html${location.hash}`)
  // window.location.href = `${operateUrl()}/product.html#${hash}`
}

function windowOpen(file,hash){
  window.location.href = `${operateUrl()}/${file}.html#${hash}`
}
function operateUrl(){
  let url = location.href.split('#')[0].split('/')
  url.pop()
  return url.join('/')
}


const openBar = document.querySelector('.burger-nav')
const navOptions = document.querySelector('.navBar-options')

const closeBar = document.querySelector('.close')
closeBar.addEventListener('click',deployNavBar)

const mainStyle = document.querySelector('main')
openBar.addEventListener('click',deployNavBar)

function deployNavBar(){
  let inactive = navOptions.classList.toggle('inactive')
  if(!inactive)mainStyle.style.maxHeight = 'calc(100vh - 72px)'
  else mainStyle.style.maxHeight = '100%'
}


async function getData(url){
  const response = await fetch(url)
  const data = await response.json()
  return data
}

async function showData_nav(url){
  const dataCategories = document.querySelector('.content__list-nav')
  const dataBrands = document.querySelector('.contend-list__brand')
  let data = await getData(url)
  let categories = data[0]
  let brands = data[2]

  createItem(categories,dataCategories)
  // createBrand(brands,dataBrands)
}

function createItem(obj,content){
  Object.values(obj).forEach(element => {
    const li = document.createElement('li')

    const sectionArrow = document.createElement('section')
    sectionArrow.classList.add('contend-a_arrow')

    const a = document.createElement('a')
    a.href = `#category/${element.id}/${element.nameE.split('/')[1]}`
    a.textContent = `${element.name}`

    const divArrow = document.createElement('div')
    divArrow.classList.add('arrow__right')

    const arrow = document.createElement('div')
    arrow.classList.add('arrow')
    arrow.addEventListener('click',()=>{
      section.classList.toggle('inactiveHeight')
    })

    const section = document.createElement('section')
    section.classList.add('filter-name_category','inactiveHeight')

    Object.keys(element.urls).forEach((item)=>{
      const a = document.createElement('a')
      a.textContent = item
      a.href = `#category/${element.id}/${element.nameE.split('/')[1]}` // mejorar
      section.appendChild(a)
    })

    divArrow.appendChild(arrow)
    sectionArrow.append(a,divArrow)
    li.append(sectionArrow,section)
    content.appendChild(li)

  });
}

// function createBrand(obj,content){
//   Object.values(obj).forEach(element => {
//     let li = `<li>
//       <a href="#${element.nameE}/${element.id}">${element.name}</a>
//     </li>`
//     content.innerHTML += li
//   });
// }


showData_nav("https://raw.githubusercontent.com/Riszart/backend_3dgina/main/data.json")
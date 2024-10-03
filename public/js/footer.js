const arrowSuppliers = document.querySelector('.arrow-suppliers')
const listSuppliers = document.querySelector('.list-suppliers')

const arrowCustomer = document.querySelector('.arrow-customer')
const listCustomer = document.querySelector('.list-customer')

const arrowTandC = document.querySelector('.arrow-TandC')
const listTandC = document.querySelector('.list-TandC')

arrowSuppliers.addEventListener('click',()=>{action(listSuppliers)})
arrowCustomer.addEventListener('click',()=>{action(listCustomer)})
arrowTandC.addEventListener('click',()=>{action(listTandC)})

function action(value){
  value.classList.toggle('inactive-footer')
}

const dataSuppliers = ['backus','age','msi','linley','alicorp','costa','vega','Procter and Gamble','molitalia','nestle']

dataSuppliers.forEach(element => {
  listSuppliers.innerHTML += `<li>${element}</li>`
});
function handleButton(e) {
  const search = document.getElementById('search');
  if(search.value.length>3){
    axios.get(`/api/products?name=${search.value}`)
    .then((response) => {
      let { data } = response;
      let a = '';
        data = data.map((product)=>
        a += `<div><a id="view-product" href="/products/${product.id}"><p>${product.name}</p> <p>${product.price}</p></a> <p><a href="/products/edit/${product.id}"><button><i class="fas fa-pen"></i></button></a><button id="${product.name}" class="addToBuyList"><i class="fas fa-cart-plus"></i></button> <button id="${product.id}" class="delete"><i class="fas fa-times"></i></button></p></div>`);
        document.getElementById('ul').innerHTML = a;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
window.addEventListener('load', () => {
  const search = document.getElementById('search');
  search.addEventListener('keyup', handleButton);
});

const deletes = document.getElementsByClassName('delete'); 
for(let button of deletes){
  button.addEventListener('click', async() => {
    let id = button.id;
    await axios.post(`/products/delete/${id}`)
    .then((response) => {
      if(response.status === 200){
        button.parentNode.parentNode.remove();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  })
}

const toBuy = document.getElementsByClassName('addToBuyList');
var products = [];
for(let button of toBuy){
  button.addEventListener('click', async() => {
    const id = button.id;
    if(products.some(product => product.name === id)){
      const index = products.findIndex(item => item.name === id);
      products[index].quantity += 1; 
    } else {
      const obj = { name: id , quantity: 1};
      console.log(obj);
      products.push(obj);
    }
    console.log(products);
  })
}
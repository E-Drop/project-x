function handleButton(e) {
    const search = document.getElementById('search');
    if(search.value.length>3){
      axios.get(`/api/products?name=${search.value}`)
      .then((response) => {
        let { data } = response;
        let a = '';
          data = data.map((product)=>
          a += `<div class="box">
  <a id="view-product" href="/products/${product._id}"><p>${product.name}</p></a>
  <div class="second-row"><p>${product.price}€</p></div> 
  <div class="store third-row">
  <button id="${product.name}" class="leaveToBuyList"><i class="fas fa-cart-arrow-down"></i></button>
  <div class="stock">0</div>
  <button id="${product.name}" class="addToBuyList"><i class="fas fa-cart-plus"></i></button>
  </div>
  </div>`);
          document.getElementById('ul').innerHTML = a;
          add();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      axios.get('/api/allProducts')
      .then((response) => {
        let { data } = response;
        let a = '';
          data = data.map((product)=>
          a += `<div class="box">
  <a id="view-product" href="/products/${product._id}"><p>${product.name}</p></a>
  <div class="second-row"><p>${product.price}€</p></div> 
  <div class="store third-row">
  <button id="${product.name}" class="leaveToBuyList"><i class="fas fa-cart-arrow-down"></i></button>
  <div class="stock">0</div>
  <button id="${product.name}" class="addToBuyList"><i class="fas fa-cart-plus"></i></button>
  </div>
  </div>`);
          document.getElementById('ul').innerHTML = a;
          add();
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
  
  
  const toBuy = document.getElementsByClassName('addToBuyList');
  const toLeave = document.getElementsByClassName('leaveToBuyList');
  var products = [];
  add();
  function add(){
    for(let button of toBuy){
      button.addEventListener('click', () => {
        const id = button.id;
        if(products.some(product => product.name === id)){
          const index = products.findIndex(item => item.name === id);
          products[index].quantity += 1;
          button.parentNode.childNodes[3].innerHTML = products[index].quantity;
        } else {
          const obj = { name: id , quantity: 1};
          products.push(obj);
          button.parentNode.childNodes[3].innerHTML = 1;
        }
        return products;
      })
    }
    for(let button of toLeave){
      button.addEventListener('click', () => {
        const id = button.id;
        if(products.some(product => product.name === id)){
          const index = products.findIndex(item => item.name === id);
          if(products[index].quantity === 0){
            const alertE = '<div class="alert alert-danger">Add at least one first</div>';
          const not = document.getElementById('notification');
          not.innerHTML = alertE;
          }else{
          products[index].quantity -= 1;
          button.parentNode.childNodes[3].innerHTML = products[index].quantity;
        }
        } else {
          const alertE = '<div class="alert alert-danger">Add at least one first</div>';
          const not = document.getElementById('notification');
          not.innerHTML = alertE;
        }
        return products;
      })
    }
  }
  
  const buy = document.getElementById('buy');
  
    buy.addEventListener('click', async() => {
      const alertD = '<div class="alert alert-danger">Select some product before order</div>';
      const alertE = '<div class="alert alert-danger">Server have a trouble try again</div>';
      const alertS = '<div class="alert alert-order">Order successfully created</div>';
      const not = document.getElementById('notification');
      if(products.length === 0){
        not.innerHTML = alertD;
      } else {
        await axios.post('/orders', { products })
        .then((response) => {
          if(response.status === 200){
            not.innerHTML = alertS;
          }
        })
        .catch((error) => {
          not.innerHTML = alertE;
        });
      }
    })
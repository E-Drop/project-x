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
  <div class="second-row"><p>${product.price}</p></div> 
  <div class="admin third-row"><p><button id="${product.name}" class="addToBuyList"><i class="fas fa-cart-plus"></i></button></p></div>
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
  <div class="second-row"><p>${product.price}</p></div> 
  <div class="admin third-row"><p><button id="${product.name}" class="addToBuyList"><i class="fas fa-cart-plus"></i></button></p></div>
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
  var products = [];
  add();
  function add(){
    for(let button of toBuy){
      button.addEventListener('click', () => {
        const id = button.id;
        if(products.some(product => product.name === id)){
          const index = products.findIndex(item => item.name === id);
          products[index].quantity += 1;
        } else {
          const obj = { name: id , quantity: 1};
          products.push(obj);
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
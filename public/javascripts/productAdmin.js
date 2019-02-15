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
<div class="store third-row"><a href="/products/edit/${ product._id }"><button><i class="fas fa-pen"></i></button></a><button id="${ product._id }" class="delete"><i class="fas fa-times"></i></button></div>
</div>`);
        document.getElementById('ul').innerHTML = a;
        add();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else {
    axios.get(`/api/allProducts`)
    .then((response) => {
      let { data } = response;
      let a = '';
        data = data.map((product)=>
        a += `<div class="box">
<a id="view-product" href="/products/${product._id}"><p>${product.name}</p></a>
<div class="second-row"><p>${product.price}</p></div> 
<div class="store third-row"><a href="/products/edit/${ product._id }"><button><i class="fas fa-pen"></i></button></a><button id="${ product._id }" class="delete"><i class="fas fa-times"></i></button></div>
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

const deletes = document.getElementsByClassName('delete'); 
add();
function add(){
  for(let button of deletes){
    button.addEventListener('click', async() => {
      let id = button.id;
      await axios.post(`/products/delete/${id}`)
      .then((response) => {
        if(response.status === 200){
          button.parentNode.parentNode.remove();
          const alertS = '<div class="alert alert-success">Product successfully removed</div>';
          const not = document.getElementById('notification');
          not.innerHTML = alertS;
          setTimeout(async() => {
            not.innerHTML = '';
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    })
  }
}

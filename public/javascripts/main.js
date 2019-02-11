function handleButton(e) {
  const search = document.getElementById('search');
  if(search.value.length>1){
    axios.get(`/api/products?name=${search.value}`)
    .then((response) => {
      let { data } = response;
      let a = '';
        data = data.map((product)=>
        a += `<li>${product.name} ${product.price} <a href="/products/${product.id}">Details</a> <a href="/products/edit/${product.id}">Edit</a> <form action="/products/delete/${product.id}" method="post"><button type="submit">Delete</button></form>`);
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

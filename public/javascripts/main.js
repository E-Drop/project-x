function handleButton(e) {
  const search = document.getElementById('search');
  if(search.value.length>3){
    axios.get(`/api/products?name=${search.value}`)
      .then((response) => {
        const { data } = response;
        console.log(data);
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

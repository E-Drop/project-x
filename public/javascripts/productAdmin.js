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
  
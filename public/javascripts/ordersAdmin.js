const checkboxes = document.getElementsByClassName('checkbox'); 
  for(let button of checkboxes){
      console.log('sisi');
    button.addEventListener('click', async() => {
      let id = button.id;
      await axios.post(`/api/orders/confirm/${id}`)
      .then((response) => {
        if(response.status === 200){
            
          const order = button.parentNode.parentNode.parentNode.parentNode;
          document.getElementById('delivered').appendChild(order);
          let p = button.parentNode.parentNode.childNodes;
          p[1].innerHTML = "Status: delivered";
          button.parentNode.parentNode.classList.remove('status-box');
          button.parentNode.remove();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    })
  }
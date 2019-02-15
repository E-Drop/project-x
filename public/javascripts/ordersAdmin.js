const checkboxes = document.getElementsByClassName('checkbox'); 
  for(let button of checkboxes){
      console.log('sisi');
    button.addEventListener('click', async() => {
      const order = button.parentNode.parentNode.parentNode.parentNode;
      let p = button.parentNode.parentNode.childNodes;
          p[1].innerHTML = "Status: delivered";
          button.parentNode.parentNode.classList.remove('status-box');
      setTimeout(async() => {
      let id = button.id;
      await axios.post(`/api/orders/confirm/${id}`)
      .then((response) => {
        if(response.status === 200){
          document.getElementById('delivered').appendChild(order);
          button.parentNode.remove();
          const alertS = '<div class="alert alert-success">Order state successfully changed</div>';
          const not = document.getElementById('notification');
          not.innerHTML = alertS
          setTimeout(async() => {
            not.innerHTML = '';
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }, 1000);
    })
  }
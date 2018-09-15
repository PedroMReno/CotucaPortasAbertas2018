
   var i = false;

   function iniciaModal(modalID) {
        const modal = document.getElementById(modalID);
        if(modal) {
          modal.classList.add('mostrar');
          modal.addEventListener('click', (e) => {
            if(e.target.id == modalID || e.target.className == 'fechar') {
              modal.classList.remove('mostrar');
            }
          });
        }
      }

    // const btn = document.getElementById('btn');
    // btn.addEventListener('click', () => iniciaModal('modal-promocao'));

    document.addEventListener('scroll', () => {
      if(window.pageYOffset > 1 && i == false) {
        iniciaModal('modal-promocao')
        i = true;
      }
    })
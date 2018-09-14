
    function iniciaModal(modalID) {
      if(localStorage.fechaModal !== modalID) {
        const modal = document.getElementById(modalID);
        if(modal) {
          modal.classList.add('mostrar');
          modal.addEventListener('click', (e) => {
            if(e.target.className == 'fechar') {
              modal.classList.remove('mostrar');
              localStorage.fechaModal = modalID;
            }
          });
        }
      }
    }

    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => iniciaModal('modal-promocao'));

    document.addEventListener('scroll', () => {
      if(window.pageYOffset > 0) {
        iniciaModal('modal-promocao')
      }
    })
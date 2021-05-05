function relogio() {
  function criaHoraDosSegundos(segundos) {
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
      hour12: false,
      timeZone: 'UTC'
    });
  }

  const relogio = document.querySelector('.relogio');
  let segundos =  1490;
  let timer;
  let smCycle = 1  
  
  let som = document.getElementById('som')
  

  function iniciaRelogio() {
    timer = setInterval(function() {
      segundos++
      relogio.innerHTML = criaHoraDosSegundos(segundos);
      if(segundos == 1500) {
        clearInterval(timer);
        segundos = 1790
        setTimeout(function () {
          $("#diag1").modal({ backdrop: 'static', keyboard: false })
          $("#diag1").modal('show')
          som.play()
        }, 100)
        $('#enviar1').mousedown(function () {
          $('#enviar1').attr('data-dismiss', 'modal')
          setTimeout(function () { $('.iniciar').trigger('click') }, 200)
        })      
      }
    
      if(segundos == 1800) {
        clearInterval(timer);
        relogio.innerHTML = '00:00:00';
        segundos = 1490
        setTimeout(function () {
          $("#diag2").modal({ backdrop: 'static', keyboard: false })
          $("#diag2").modal('show')
          som.play()
        }, 100)
        $('#enviar2').mousedown(function () {
          $('#enviar2').attr('data-dismiss', 'modal')
          setTimeout(function () { $('.iniciar').trigger('click') }, 200)
        })
        if (smCycle > 4) {
      } else {
        document.getElementById('c' + smCycle).src = "./assets/media/tomate-cheio.png"
        smCycle++
       }
      }
    }, 1000);
  }

  document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('zerar')) {
      clearInterval(timer);
      relogio.innerHTML = '00:00:00';
      relogio.classList.remove('pausado');
      segundos = 0;
    }

    if (el.classList.contains('iniciar')) {
      relogio.classList.remove('pausado');
      clearInterval(timer);
      iniciaRelogio();
    }

    if (el.classList.contains('pausar')) {
      clearInterval(timer);
      relogio.classList.add('pausado');
    }
  });

  
}
relogio();

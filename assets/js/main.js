//////////////////////////////////////////////////////////////////////////////////// MAIN JavaScript ///////////////////////////////////////////////////////////////////////////////////////////

// IIFS
(function() {

  ///////////////////////////////////////////////////////////////////////////// INÍCIO DA LÓGICA POMODORO /////////////////////////////////////////////////////////////////////////////////////
  function pomodoro() {
    
    // Constantes e Variáveis
    const relogio = document.querySelector('.relogio');

    let input1 = sessionStorage.getItem('foco')
    let input2 = sessionStorage.getItem('pausa')
    let input3 = sessionStorage.getItem('descanso')
    const btnEnviar = $('#enviarTempos')
    const btnRedefinir = $('#redefinir')
    let input1Padrao = 1500
    let input2Padrao = 300
    let input3Padrao = 900
    
    let barra = 0
    let timerBarra
    let segundosBarra = 0
    let contaBarra = ((input1 * 4) + (input2 * 3) + (input3 * 1))

    let segundos = input1
    let timer
    let cycle = 0  

    let tempoFoco = 0
    let tempoPausa = 0
    let tempoDescanso = 0

    let cicloFoco = 0
    let cicloPausa = 0
    let cicloDescanso = 0
    
    const som = document.getElementById('som')


    // Funções

    // Função que verifica se já existem dados de tempo no storage do navegador no carregamento da página
    $(document).ready(function() {
      setTimeout(function() { 
        if(input1 !== null && input2 !== null && input3 !== null) {
          $('#foco').attr('placeholder', (input1/ 60))
          $('#foco').attr('disabled', '')
          $('#pausa').attr('placeholder', (input2 / 60))
          $('#pausa').attr('disabled', '')
          $('#descanso').attr('placeholder', (input3 / 60))
          $('#descanso').attr('disabled', '')
          btnRedefinir.removeAttr('disabled')
          btnRedefinir.removeAttr('class', 'btn btn-secondary btn-md float-right')
          btnRedefinir.attr('class', 'btn btn-dark btn-md float-right')
          btnEnviar.removeAttr('class', 'btn btn-dark btn-md')
          btnEnviar.attr('class', 'btn btn-secondary btn-md')
          btnEnviar.attr('disabled', '')
        }
      }, 100)
    })

    // Função de criação do cronometro
    function criaHoraDosSegundos(segundos) {
      const data = new Date(segundos * 1000)
      return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
      });
    }

    // Função de Captura do evento de cliqui do botão enviar
    btnEnviar.mousedown(function () {
      input1 = ($('#foco').val()) * 60
      if(!input1) {
        input1 = input1Padrao
      }
      sessionStorage.setItem('foco', input1)
      
      input2 = ($('#pausa').val()) * 60
      if(!input2) {
        input2 = input2Padrao 
      }
      sessionStorage.setItem('pausa', input2)

      input3 = ($('#descanso').val()) * 60
      if(!input3) {
        input3 = input3Padrao 
      } 
      sessionStorage.setItem('descanso', input3)
    })
    
    // Função de Captura do evento de cliqui do botão redefinir
    btnRedefinir.mousedown(function() {
      sessionStorage.clear()
      setTimeout(function() {
        clearInterval(timer)
        clearInterval(timerBarra)
        relogio.innerHTML = '00:00:00'
        relogio.classList.remove('pausado')
        segundos = input1;
        cycle = 0
        cicloFoco = 0
        cicloPausa = 0 
        cicloDescanso = 0 
        barra = 0
        segundosBarra = 0
        $('#barra').attr('style', `width: ${barra}%`)
        $('#barra').html(`${barra}%`)
        $('#foco').attr('placeholder', 'Tempo em minutos')
        $('#foco').removeAttr('disabled', '')
        $('#pausa').attr('placeholder', 'Tempo em minutos')
        $('#pausa').removeAttr('disabled', '')
        $('#descanso').attr('placeholder', 'Tempo em minutos')
        $('#descanso').removeAttr('disabled', '')
        btnEnviar.removeAttr('disabled')
        btnEnviar.removeAttr('class', 'btn btn-secondary btn-md')
        btnEnviar.attr('class', 'btn btn-dark btn-md')
        btnRedefinir.removeAttr('class', 'btn btn-dark btn-md float-right')
        btnRedefinir.attr('class', 'btn btn-secondary btn-md float-right')
        btnRedefinir.attr('disabled', '')
      }, 100) 
    })

    // Função para armazenar tempos dos ciclos no storage do navegador
    function salvarTempos() {
      input1 = ($('#foco').val()) * 60
      if(!input1) {
        input1 = input1Padrao
      }
      sessionStorage.setItem('foco', input1)
      
      input2 = ($('#pausa').val()) * 60
      if(!input2) {
        input2 = input2Padrao 
      }
      sessionStorage.setItem('pausa', input2)

      input3 = ($('#descanso').val()) * 60
      if(!input3) {
        input3 = input3Padrao 
      } 
      sessionStorage.setItem('descanso', input3)
    }

    // Funções de captura do pressionar na tecla enter nos inputs
    $('#foco').keydown(function(e) {
      if(e.keyCode == 13) {
        salvarTempos()
      }
    })

    $('#pausa').keydown(function(e) {
      if(e.keyCode == 13) {
        salvarTempos()
      }
    })

    $('#descanso').keydown(function(e) {
      if(e.keyCode == 13) {
        salvarTempos()
      }
    })

    // Função para determinar a lógica do ciclo de foco
    function foco() {
      setTimeout(function() {
        if(segundos == tempoFoco) {
          clearInterval(timer)
          setTimeout(function() { clearInterval(timerBarra) }, 500)
          cicloFoco++
          $('em').html(`Focus Cycle Complete`)
          console.log(`${cicloFoco} Ciclo de Foco completo`) 
          if(cicloFoco < 4) {
            segundos = input2 
            setTimeout(function () {
              $("#diag1").modal({ backdrop: 'static', keyboard: false })
              $("#diag1").modal('show')
              som.play()
            }, 500)
            $('#enviar1').mousedown(function () {
              $('#enviar1').attr('data-dismiss', 'modal')
              setTimeout(function () { $('.iniciar').trigger('click') }, 500)
            }) 
          } else {
              cycle++
              segundos = input3
              setTimeout(function () {
                document.getElementById('c' + cicloFoco).src = "./assets/media/tomate-cheio.png"
                $("#diag3").modal({ backdrop: 'static', keyboard: false })
                $("#diag3").modal('show')
                som.play()
              }, 500)
              $('#enviar3').mousedown(function () {
                $('#enviar3').attr('data-dismiss', 'modal')
                setTimeout(function () {
                  $('#tomates').attr('class', 'd-flex') 
                  $('#tomates').html(`<img style=" width: 215px; height: 215px; margin-left: auto; margin-right: auto; 
                  margin-bottom: 5px;" id="c1" src="./assets/media/timer.gif" title="Large Cycle">`)
                }, 500)
                setTimeout(function () { $('.iniciar').trigger('click') }, 500)
              })
            } 
          cycle++
        }
      }, 200)
    }

    // Função para determinar a lógica do ciclo de pausa
    function pausa() {
      setTimeout(function() {
        if(segundos == tempoPausa) {
          clearInterval(timer);
          setTimeout(function() { clearInterval(timerBarra) }, 500)
          cicloPausa++
          $('em').html(`Pause Cycle Complete.`)
          console.log(`${cicloPausa} Ciclo de Pausa completo`)
          relogio.innerHTML = '00:00:00'
          segundos = input1
          setTimeout(function () {
            document.getElementById('c' + cicloPausa).src = "./assets/media/tomate-cheio.png"
            $("#diag2").modal({ backdrop: 'static', keyboard: false })
            $("#diag2").modal('show')
            som.play()
          }, 500)
          $('#enviar2').mousedown(function () {
            $('#enviar2').attr('data-dismiss', 'modal')
            setTimeout(function () { $('.iniciar').trigger('click') }, 500)
          })
          cycle--
        }  
      }, 200)
    }

    // Função para determinar a lógica do ciclo de descanso
    function descanso() {
      setTimeout(function() {
        if(segundos == tempoDescanso) {
          clearInterval(timer)
          setTimeout(function () { clearInterval(timerBarra) }, 500)
          cicloDescanso++
          $('#som').attr('src', './assets/media/pomodoro-finish.mp3')
          $('em').html(`Cycle Finished.`)
          console.log(`${cicloDescanso} Ciclo de Descanso completo`)
          relogio.innerHTML = '00:00:00';
          segundos = input1
          setTimeout(function () {
            $("#diag4").modal({ backdrop: 'static', keyboard: false })
            $("#diag4").modal('show')
            som.play()
          }, 500)
          $('#enviar4').mousedown(function () {
            $('#enviar4').attr('data-dismiss', 'modal')
            setTimeout(function () {
              $('#tomates').attr('class', '')
              $('#tomates').html(`<ul class="d-flex">
              <img style="margin-left: auto; margin-right: auto;" id="c1" src="./assets/media/tomate-vazio.png" title="Small Cycle 1">
              <img style="margin-left: auto; margin-right: auto;" id="c2" src="./assets/media/tomate-vazio.png" title="Small Cycle 2"> 
              </ul>
              <ul class="d-flex mb-0">
              <img style="margin-left: auto; margin-right: auto;" id="c4" src="./assets/media/tomate-vazio.png" title="Small Cycle 4">
              <img style="margin-left: auto; margin-right: auto;" id="c3" src="./assets/media/tomate-vazio.png" title="Small Cycle 3"> 
              </ul>`)
            }, 500)
            setTimeout(function () { $('.zerar').trigger('click') }, 100)
          })
          cycle = 0
          cicloFoco = 0
          cicloPausa = 0 
          cicloDescanso = 0 
          segundosBarra = 0
        }
      }, 200)
    }

    // Função para criação e exibição da barra de progresso
    function progressBar() {
      timerBarra = setInterval(function() {
        segundosBarra++
        barra = Math.ceil((segundosBarra / contaBarra) * 100)
        setTimeout(function () {
          $('#barra').attr('style', `width: ${barra}%`)
          $('#barra').html(`${barra}%`), 100})
      }, 1000)
    }

    // Função que dá o start no cronometro
    function iniciaRelogio() {
      timer = setInterval(function() {
        segundos--
        relogio.innerHTML = criaHoraDosSegundos(segundos)
        passaEstado()
      }, 1000)
    }
    
    // Função que determina qual estado(smCycles) vai rodar
    function passaEstado() {
      switch(cycle) {
        case 0:
          console.log(`Ciclo ${cycle}. Rodando Foco`)
          $('em').html(`Focus Cycle Running...`)
          foco()
          break

        case 1:
          console.log(`ciclo ${cycle}. Rodando Pausa`)
          $('em').html(`Pause Cycle Running...`)
          pausa()
          break

        case 2:
          console.log(`ciclo ${cycle}. Rodando Descanso`)
          $('em').html(`Resting...`)
          descanso()
          break
      }
    }

    // Eventos

    // Captura de cliques do cronometro
    $('.iniciar').click(function(e) {
      e.preventDefault()
      iniciar.classList.add('loadFrames')
      iniciado.classList.remove('play')
      iniciado.classList.add('playGreen')
      pausado.classList.remove('pauseRed')
      pausado.classList.add('pause')
      relogio.classList.remove('pausado')
        clearInterval(timer)
        clearInterval(timerBarra)
        iniciaRelogio()
        progressBar()
        setTimeout(function(){
          iniciar.classList.remove('loadFrames')
        }, 1100)
    })
    
    $('.pausar').click(function(e) {
      e.preventDefault()
      pausar.classList.add('loadFrames')
      pausado.classList.remove('pause')
      pausado.classList.add('pauseRed')
      iniciado.classList.remove('playGreen')
      iniciado.classList.add('play')
      clearInterval(timer)
      clearInterval(timerBarra)
      relogio.classList.add('pausado')
      setTimeout(function(){
        pausar.classList.remove('loadFrames')
      }, 1100)
    })

    $('.zerar').click(function(e) {
      e.preventDefault()
      zerar.classList.add('load')
      zerado.classList.remove('redo')
      zerado.classList.add('redoBlue')
      pausado.classList.add('pause')
      pausado.classList.remove('pauseRed')
      iniciado.classList.remove('playGreen')
      iniciado.classList.add('play')
      clearInterval(timer)
      clearInterval(timerBarra)
      relogio.innerHTML = '00:00:00';
      relogio.classList.remove('pausado');
      segundos = input1
      $('em').html(`Large Cycle`)
      $('#tomates').html(`<ul class="d-flex">
      <img style="margin-left: auto; margin-right: auto;" id="c1" src="./assets/media/tomate-vazio.png" title="Small Cycle 1">
      <img style="margin-left: auto; margin-right: auto;" id="c2" src="./assets/media/tomate-vazio.png" title="Small Cycle 2"> 
      </ul>
      <ul class="d-flex mb-0">
      <img style="margin-left: auto; margin-right: auto;" id="c4" src="./assets/media/tomate-vazio.png" title="Small Cycle 4">
      <img style="margin-left: auto; margin-right: auto;" id="c3" src="./assets/media/tomate-vazio.png" title="Small Cycle 3"> 
      </ul>`)
      cycle = 0
      cicloFoco = 0
      cicloPausa = 0 
      cicloDescanso = 0 
      barra = 0
      segundosBarra = 0
      $('#barra').attr('style', `width: ${barra}%`)
      $('#barra').html(`${barra}%`)
      setTimeout(function(){
        zerar.classList.remove('load')
        zerado.classList.remove('redoBlue')
        zerado.classList.add('redo')
      }, 1100) 
    })
  }
  pomodoro()


  ////////////////////////////////////////////////////////////////////////////// INÍCIO DA LÓGICA TAREFAS //////////////////////////////////////////////////////////////////////////////////////
  function listaTarefas() {

    // Constantes
    const inputTarefa = document.querySelector('.input-tarefa')
    const iconPlus = document.querySelector('.iconPlus')
    const tarefasFazer = document.querySelector('.tarefas-fazer')
    const tarefasFeitas = document.querySelector('.tarefas-feitas')

    // Função de captura do clique no ícone adicionar(Plus)
    $('.iconPlus').click(function(e) {
      e.preventDefault()
      if (!inputTarefa.value) return
      plus.classList.add('load')
      criaTarefa(inputTarefa.value)
      setTimeout(function(){
        plus.classList.remove('load')
      }, 1100) 
    })

    // Função de captura do pressionar na tecla enter no input
    inputTarefa.addEventListener('keypress', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault()
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
      }
    })

    // Função de verificação de conteúdo no input de tarefa
    function limpaInput() {
      inputTarefa.value = ''
      inputTarefa.focus()
    }

    // Função de criação do item de lista de tarefas à fazer
    function criaLi() {
      const li = document.createElement('li')
      setTimeout(function() {
        li.setAttribute('class', `fazer list-group-item  d-block`)
      }, 100) 
      return li
    }

    // Função de criação das tarefas à fazer
    function criaTarefa(textoInput) {
      const li = criaLi()
      li.innerHTML = (`<span class="titulo-tarefa">${textoInput}</span>`)
      tarefasFazer.appendChild(li)
      limpaInput()
      criaBotaoCheck(li)
      criaBotaoApagar(li)
      salvarTarefas()
    }

    // Função de salvamento e conversão do array de tarefas à fazer no storage do navegador
    function salvarTarefas() {
      const liTarefas = tarefasFazer.querySelectorAll('li')
      const listaDeTarefas = []

      for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
      }

      const tarefasJSON = JSON.stringify(listaDeTarefas);
      localStorage.setItem('tarefas', tarefasJSON);
    }

    // Função de resgate e re-conversão do array de tarefas à fazer do storage do navegador
    function adicionaTarefasSalvas() {
      const tarefas = localStorage.getItem('tarefas')
      const listaDeTarefas = JSON.parse(tarefas)

      for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
      }
    }
    adicionaTarefasSalvas();

    // Função de criação do botão apagar de cada tarefa 
    function criaBotaoApagar(li) {
      const botaoApagar = document.createElement('a')
      botaoApagar.setAttribute('class', 'apagar ml-2 mt-2 d-flex float-right');
      setTimeout(function(){ 
        $('.apagar').html(`<i id="fechado" class="close fas fa-times-circle fa-sm mx-2 d-flex float-right"></i>`)
      }, 100) 
      li.appendChild(botaoApagar)
      $('.apagar').click(function(e) {
        e.preventDefault()
        $(this).parent().remove()
        salvarTarefas()
      })
    }

    // Função de criação do botão check de cada tarefa à fazer
    function criaBotaoCheck(li) {
      const botaoCheck = document.createElement('a')
      botaoCheck.setAttribute('class', 'check ml-2 mt-2')
      setTimeout(function(){ 
        $('.check').html(`<i class="done1 far fa-check-square fa-sm mt-1 pt-1 mx-3 float-right"></i>`)
      }, 100) 
      li.appendChild(botaoCheck)
      $('.check').mousedown(function(e) {
        e.preventDefault()
        const tarefa = e.target
        const tarefaParent = $(this).prev().eq(0).first(0)
        const titulo = tarefaParent.html()
        setTimeout(function(){ 
          $(tarefaParent).parent().remove()
        }, 2100)
        console.log(titulo)
        
        criaTarefaFeita(titulo)
      })
    } 

    // Função de criação do item de lista de tarefas concluídas
    function criaLiFeita() {
      const li = document.createElement('li')
      setTimeout(function() {
        li.setAttribute('class', `feita list-group-item  d-block`)
      }, 100) 
      return li
    }

    // Função de criação das tarefas concluídas
    function criaTarefaFeita(textoInput) {
      const li = criaLiFeita()
      li.innerHTML = (`<span class="titulo-tarefa float-left mr-3x">${textoInput}</span>`)
      $(tarefasFeitas).append(li)
      criaBotaoCheckFeitas(li)
      criaBotaoApagar(li)
    }

    // Função de criação do botão para apagas todas as tarefas concluídas
    $('#erase-concluded').click(function(){
    	$('.tarefas-feitas').html(function(){
      	$(this).children().remove()
        salvarTarefas()
        //localStorage.clear()
    	})
 	 })

    // Função de criação do botão check das tarefas concluídas
    function criaBotaoCheckFeitas(li) {
      const botaoCheck = document.createElement('a');
      botaoCheck.setAttribute('class', 'check-feitas ml-2 mt-2');
      setTimeout(function() { 
        $('.check-feitas').html(`<i class="done2 fas fa-check-square fa-sm mt-1 pt-1 mx-3 float-right"></i>`)
      }, 100) 
      li.appendChild(botaoCheck)
      $('.check-feitas').click(function(e) {
        e.preventDefault()
      })
    }
  }
  listaTarefas()

}());

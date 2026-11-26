/* L.LIMA: scripts do site (menu, animação ao rolar e formulário de contato) */
(function () {
  'use strict';

  /* ---------- Menu principal (celular) ---------- */
  var menuBotao = document.querySelector('.menu-botao');
  var menu = document.getElementById('menu-principal');
  function fecharMenu(devolverFoco) {
    if (!menu || !menuBotao) return;
    menu.classList.remove('aberto');
    menuBotao.setAttribute('aria-expanded', 'false');
    if (devolverFoco) menuBotao.focus();
  }
  if (menuBotao && menu) {
    menuBotao.addEventListener('click', function () {
      var aberto = menuBotao.getAttribute('aria-expanded') === 'true';
      menu.classList.toggle('aberto', !aberto);
      menuBotao.setAttribute('aria-expanded', String(!aberto));
    });
  }

  /* ---------- Submenu de Serviços ---------- */
  var subBotao = document.querySelector('.submenu-botao');
  var submenu = document.getElementById('submenu-servicos');
  function fecharSubmenu() {
    if (!subBotao || !submenu) return;
    submenu.classList.remove('aberto');
    subBotao.setAttribute('aria-expanded', 'false');
  }
  if (subBotao && submenu) {
    subBotao.addEventListener('click', function (e) {
      e.stopPropagation();
      var aberto = subBotao.getAttribute('aria-expanded') === 'true';
      submenu.classList.toggle('aberto', !aberto);
      subBotao.setAttribute('aria-expanded', String(!aberto));
    });
    document.addEventListener('click', function (e) {
      if (window.matchMedia('(min-width: 1080px)').matches && !e.target.closest('.menu__sub')) fecharSubmenu();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (submenu && submenu.classList.contains('aberto')) { fecharSubmenu(); subBotao.focus(); return; }
    if (menu && menu.classList.contains('aberto')) fecharMenu(true);
  });

  /* ---------- Animação sutil ao rolar ---------- */
  var itens = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visivel'); obs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
    itens.forEach(function (el) { obs.observe(el); });
  } else {
    itens.forEach(function (el) { el.classList.add('visivel'); });
  }

  /* ---------- Formulário de contato ---------- */
  var form = document.getElementById('form-contato');
  if (!form) return;

  var status = document.getElementById('form-status');
  var botaoEmail = document.getElementById('enviar-email');
  var destino = form.getAttribute('data-email');
  var endpoint = form.getAttribute('action') || '';
  var formspreeConfigurado = endpoint.indexOf('SEU_ID') === -1;

  // Pré-seleciona o serviço quando o visitante vem de uma página de serviço (?servico=...)
  var param = new URLSearchParams(window.location.search).get('servico');
  var select = form.querySelector('#servico');
  if (param && select) {
    Array.prototype.forEach.call(select.options, function (o) { if (o.value === param) select.value = param; });
  }

  function mostrar(msg, tipo) {
    status.textContent = msg;
    status.className = 'form__status form__status--' + tipo;
    status.hidden = false;
    status.focus();
  }

  function valor(nome) {
    var el = form.elements[nome];
    return el && el.value ? el.value.trim() : '';
  }

  function abrirEmail() {
    var servico = valor('servico');
    var assunto = 'Solicitação de orçamento' + (servico ? ' - ' + servico : '');
    var corpo = [
      'Nome: ' + valor('nome'),
      'Empresa: ' + valor('empresa'),
      'E-mail: ' + valor('email'),
      'Telefone: ' + valor('telefone'),
      'Serviço de interesse: ' + servico,
      '',
      valor('mensagem')
    ].join('\n');
    var arquivo = form.elements.anexo && form.elements.anexo.files && form.elements.anexo.files.length;
    window.location.href = 'mailto:' + destino + '?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpo);
    mostrar('Abrimos o seu programa de e-mail com a mensagem preenchida. É só conferir e enviar.' +
      (arquivo ? ' Lembre-se de anexar o arquivo no e-mail.' : ''), 'ok');
  }

  if (botaoEmail) {
    botaoEmail.addEventListener('click', function () {
      if (!form.reportValidity()) return;
      abrirEmail();
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    if (!formspreeConfigurado) { abrirEmail(); return; }

    var botao = form.querySelector('[type="submit"]');
    botao.disabled = true;
    botao.textContent = 'Enviando...';
    fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('falha');
        form.reset();
        mostrar('Mensagem enviada. Obrigado! Um engenheiro vai responder pessoalmente em até 1 dia útil.', 'ok');
      })
      .catch(function () {
        mostrar('Não foi possível enviar agora. Use o botão "Enviar por e-mail" ou fale pelo WhatsApp (11) 95136-0265.', 'erro');
      })
      .then(function () {
        botao.disabled = false;
        botao.textContent = 'Enviar mensagem';
      });
  });
})();

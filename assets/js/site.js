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

  /* ---------- Contato: acrescenta o serviço à mensagem do WhatsApp (?servico=...) ---------- */
  var servico = new URLSearchParams(window.location.search).get('servico');
  if (servico && servico.length < 80) {
    var texto = 'Olá, Leonardo! Vim pelo site da L.LIMA e gostaria de solicitar um orçamento de ' + servico + '.';
    document.querySelectorAll('[data-whats-orcamento]').forEach(function (a) {
      a.href = 'https://wa.me/5511951360265?text=' + encodeURIComponent(texto);
    });
  }
})();

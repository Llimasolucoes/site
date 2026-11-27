# Como atualizar o site da L.LIMA

O site usa **Jekyll**, que o GitHub Pages compila sozinho. Você **não precisa instalar nada**:
edite o arquivo pelo próprio github.com (botão ✏️ "Edit this file"), clique em **Commit changes**
e o site é atualizado em 1 a 2 minutos em https://llimasolucoes.com.br.

> Regra de ouro: altere só o **texto entre aspas** (ou entre as tags HTML). Não apague
> os traços `---`, os dois-pontos `:` nem os recuos (espaços no começo da linha).

## Onde está cada texto

| O que mudar | Arquivo |
|---|---|
| Nome, endereço, telefone, e-mail, CNPJ, CREA, cidades atendidas, LinkedIn | `_data/empresa.yml` |
| Etapas de "Como trabalhamos" (Início e Serviços) | `_data/processo.yml` |
| Página Início | `index.html` |
| Página de cada serviço (todos os textos, cards, etapas e FAQ) | `servicos/<nome-do-serviço>/index.md` |
| Página-índice de Serviços | `servicos/index.html` |
| Sobre | `sobre/index.html` |
| Contato | `contato/index.html` |
| Projetos e Conteúdos (em construção) | `projetos/index.html` e `conteudos/index.html` |
| Menu e rodapé | `_includes/cabecalho.html` e `_includes/rodape.html` |
| Cores, fontes e espaçamentos | `assets/css/site.css` (variáveis no topo) |

### Páginas de serviço
Todo o conteúdo fica no topo do arquivo `index.md`, em blocos como:

```yaml
faq:
  - pergunta: "Vocês emitem ART?"
    resposta: "Sim. ..."
```

Para acrescentar uma pergunta, copie as duas linhas (`- pergunta` e `resposta`) com o mesmo
recuo e troque o texto. O mesmo vale para `entregas`, `aplicacoes` e `etapas`.
As perguntas também alimentam automaticamente os dados estruturados do Google (FAQPage).

Os campos `title` e `description` são o título e a descrição que aparecem no Google.
Mantenha o `title` com até ~65 caracteres e a `description` com até ~160.

Ícones disponíveis (campo `icone`): engenharia, robo, gestao, seguranca, usinagem, bomba,
solda, ponto, laser, paletizacao, maquina, gabarito, fabricacao, eletrico, documento, ouvir,
simulacao, montagem, usuario, alvo, relogio, regua, engrenagem.

## Tarefas comuns

### Ativar o formulário (Formspree)
1. Crie uma conta em https://formspree.io com leonardo@llimasolucoes.com.br e crie um formulário.
2. Copie o endereço que ele mostrar (ex.: `https://formspree.io/f/xabcdwxy`).
3. Em `_config.yml`, troque `https://formspree.io/f/SEU_ID` por esse endereço
   (a linha está marcada com "TROCAR PELO ID DO FORMSPREE").

Enquanto isso não for feito, o botão "Enviar mensagem" abre o programa de e-mail do visitante
com a mensagem já preenchida. O envio de **anexos** pelo Formspree exige um plano pago;
no plano gratuito o anexo não é enviado (o restante da mensagem chega normalmente).

### Fotos do site
As fotos ficam em `assets/img/fotos/`, cada uma em duas larguras (`nome-1600.webp` e `nome-800.webp`),
e o texto alternativo de cada uma está em `_data/fotos.yml`.
Hoje são **fotos ilustrativas do Unsplash** (uso comercial gratuito, sem crédito obrigatório; a origem de
cada uma está em `assets/img/fotos/CREDITOS.txt`). O ideal é trocá-las aos poucos por fotos reais da L.LIMA.

- **Trocar uma foto mantendo o nome:** suba os dois arquivos novos (`-1600.webp` com 1600×1067 px e
  `-800.webp` com 800×533 px, proporção 3:2) com o mesmo nome e ajuste o `alt` em `_data/fotos.yml`.
- **Foto do topo de um serviço:** campo `hero_img` no topo de `servicos/<serviço>/index.md`
  (também é a foto do card do serviço). Fotos extras abaixo dos cards: campo `galeria`.
- **Cor de cada serviço:** campos `cor` (cor do destaque) e `cor_icone` (cor do ícone sobre ela).

### Publicar Projetos ou Conteúdos
Hoje essas páginas estão como "Em construção" e fora do Google (`robots: "noindex, follow"`
e `sitemap: false`). Quando houver conteúdo, apague essas duas linhas no topo do arquivo.

### Incluir o LinkedIn
Preencha `linkedin:` em `_data/empresa.yml` com o endereço da página da empresa.

## Testar no computador (opcional)
```
gem install jekyll -v 3.10.0 kramdown-parser-gfm webrick
jekyll serve
```
e abra http://localhost:4000.

## Não mexer
- `CNAME` (domínio do site).
- `logo.png` e `favicon.png` (usados pelo site e pelos dados do Google).

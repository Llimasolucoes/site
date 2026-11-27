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

### Contato e orçamento
O site não tem formulário: o orçamento é feito pelo **WhatsApp**. Os botões da página Contato abrem
a conversa com a mensagem "Olá, Leonardo! Vim pelo site da L.LIMA e gostaria de solicitar um orçamento."
(quando o visitante vem de uma página de serviço, o nome do serviço é acrescentado).
O número e o link ficam em `_data/empresa.yml` (`whatsapp_link` e `whatsapp_orcamento_link`).

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

### Estatísticas de visitas (Umami)
Painel em https://cloud.umami.is (região União Europeia, sem cookies). O ID do site fica em `_config.yml`
(`umami_website_id`). Os botões de WhatsApp e de "Solicitar orçamento" têm o atributo `data-umami-event`,
que registra os cliques como eventos com nomes como "WhatsApp - botão flutuante" (aba **Events** do painel).
O contador só é incluído no site publicado, não nos testes locais.

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

## Segurança
O site é **estático**: não tem banco de dados, login nem servidor próprio. Ninguém consegue alterar
os textos "pelo site". A única forma de mudar o conteúdo é **publicar no repositório GitHub**
(branch `main`). Proteger o site é, portanto, proteger a conta do GitHub e o domínio.

Já aplicado no código:
- Política de segurança de conteúdo (CSP) em todas as páginas (`_layouts/base.html`): o navegador só
  executa os scripts do próprio site e só carrega fontes do Google Fonts. Se alterar o pequeno script
  inline do `<head>`, atualize o hash `sha256-...` da CSP (o comentário ao lado explica).
- Nenhum script de terceiros, nenhuma senha ou chave no código, links externos com `rel="noopener"`.

Para garantir que só o dono altere o site (feito por você, nas configurações do GitHub):
1. Conta GitHub `Llimasolucoes`: senha forte e única e **autenticação em dois fatores** (Settings → Password and authentication).
   Proteja também o e-mail da conta, porque é por ele que se recupera a senha.
2. Regra para a `main` (repositório → Settings → Rules → Rulesets → New branch ruleset):
   alvo `main`; marcar *Restrict deletions*, *Block force pushes* e *Require a pull request before merging*;
   em *Bypass list*, adicionar só *Repository admin* (você).
3. Aplicativos com acesso (Settings → Applications → Installed GitHub Apps): manter só o necessário
   e remover o acesso do Claude quando o trabalho terminar.
4. Domínio: verificar `llimasolucoes.com.br` no GitHub (Settings da conta → Pages → Add a domain),
   marcar *Enforce HTTPS* no Pages do repositório e ativar dois fatores no Registro.br.
5. WhatsApp: ative a confirmação em duas etapas (WhatsApp → Configurações → Conta).

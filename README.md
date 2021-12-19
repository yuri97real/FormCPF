# FormCPF

## Descrição

Esta é uma máscara para inputs, desenvolvida com JavaScript.

## O que é uma máscara?

No contexto de desenvolvimento web,
uma máscara é um forma de limitar, "forçar" a inserção de caracteres num determinado formato.
Ela geralmente deve ser utilizada para auxiliar o usuário no preenchimento de formulários.

Exemplo:

- Um cpf tem este formato -> ###.###.###-##
- Um número de celular tem este formato -> (##) # ####-####

![Recursos da máscara](assets/features.gif)

## Como usar?

Há duas versões da máscara. Recomendo utilizar a versão 2 "formMask_V2.js", pois ela pode ser aplicada em multiplos inputs.
Partindo deste princípio:

1. Importe o arquivo "formMask_V2.js" no seu HTML.

2. Instancie o objeto FormMask enviando os 4 parâmetros listados abaixo:

    * Elemento: elemento html.
        - Exemplo:. document.querySelector("seu_input")
    * Máscara: formato da sua máscara.
        - Exemplo:. "###.###.###-##"
    * Caractere de Substituição: caractere que será substituído pelo input do usuário.
        - Exemplo:. "#"
    * Ignorar Caracteres: caracteres que serão estáticos na máscara.
        - Exemplo:. [".", "-"]

### Resumo:

No arquivo HTML

    <script src="formMask_V2.js"></script>

No arquivo JS

    const input = document.querySelector("seu_input")
    new FormMask(input, "###.###.###-##", "#", [".", "-"])

Veja outro exemplo no arquivo "index.html"

## Versões Disponíveis

### Primeira Versão

A "formMask.js" é mais simples. Ela foi desenvolvida para inputs de CPF somente. Mas funciona com outras entradas.
O desenvolvimento desta primeira versão está disponível no <a href="https://youtu.be/28x5J_PFRX0">YouTube</a>.

### Segunda Versão

A "formMask_V2.js" é uma versão mais completa. Ela foi desenvolvida para ser compatível com mais máscaras e multiplos inputs.
Ela também tem suporte ao "colar", evento "paste" no formato da máscara. Desta forma, o usuário pode copiar dados assim <strong>"12345678900"</strong> e colar no input, ficando assim <strong>"123.456.789-00"</strong>.

## Features

- [x] Múltiplos caracteres imutáveis
- [x] Suporte ao copiar/colar
- [x] Integridade na seleção de texto
- [x] Limpar conteúdo ao perder foco
- [ ] Destruir máscara

Dá uma conferida também no <a href="https://github.com/yuri97real/ValidateCpf">validador de CPF's</a>

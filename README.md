# Countries APP

Este é um aplicativo para visualização de informações sobre países.

## Como rodar

### Pré-requisitos

- Instalar o node caso não possua, acessando o site: https://nodejs.org

- Instalar o yarn caso não possua, via npm:

```bash
  npm install --global yarn
```

### Instalação

- Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/vitoraugustto/countries-app.git
```

- Acesse o diretório do projeto:

```bash
cd countries-app
```

- Instale as depêndencias do projeto:

```bash
yarn install
```

### Variáveis de Ambiente:

- Antes de rodar o projeto, é necessário configurar as seguintes variáveis de ambiente no arquivo`.env`:

```bash
VITE_REST_COUNTRIES_BASE_URL=

VITE_OPENAI_API_KEY=
VITE_OPENAI_REPLACE_KEY=
VITE_OPENAI_CONTEXT=
```

### Rodar o servidor de desenvolvimento:

- Para rodar o servidor, rode o seguinte comando:

```bash
yarn dev
```

Isso iniciará o servidor de desenvolvimento e você poderá acessar o aplicativo em http://localhost:5173 no seu navegador.

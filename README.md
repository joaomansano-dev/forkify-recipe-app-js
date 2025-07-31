# Forkify Recipe App 🍴

O projeto final do curso "The Complete JavaScript Course 2025: From Zero to Expert!"

## Sobre o projeto

Forkify é uma aplicação web moderna que permite aos seus usuários pesquisar e interagir com uma vasta base de dados de receitas. O projeto foi construído com foco em funcionalidades modernas de JavaScript e segue a arquitetura Model-View-Controller (MVC) para manter o código organizado e de fácil manutenção.

Este projeto explora funcionalidades como JavaScript assíncrono, interações com APIs e manipulação do armazenamento local do navegador (Local Storage).

### Construído Com

- **JavaScript (ES6+)**: Principal linguagem para a lógica da aplicação.
- **[Parcel](https://parceljs.org/)**: Utilizado para empacotamento de módulos, otimização de ativos e configurações de build.
- **Sass/SCSS**: Utilizado para uma estilização mais avançada e organizada.
- **[Forkify API](https://forkify-api.herokuapp.com/v2)**: A API utilizada para a manipulação e busca dos dados das receitas.

---

## Funcionalidades

- **Pesquisa de Receitas**: Pesquise entre mais de 1 milhão de receitas. É importante ressaltar que a pesquisa deve ser feita em inglês (ex: abacate = avocado).
- **Visualização de Detalhes**: Veja os ingredientes, tempo de cozimento e modo de preparo das receitas.
- **Ajuste de Porções**: Altere dinamicamente a quantidade de porções e veja a lista de ingredientes ser atualizada automaticamente.
- **Receitas Favoritas**: Salve suas receitas preferidas. Os favoritos ficam armazenados no seu navegador.
- **Upload de Receitas**: Adicione suas próprias receitas, que ficarão salvas e disponíveis para você na seção de favoritos.
- **Paginação**: Navegue facilmente entre os resultados da busca.

---

## Como Começar

Para obter uma cópia local e executar o projeto, siga os passos abaixo. Se preferir, você pode acessar a versão online aqui: **[Forkify Live Demo](https://forkify-mansanodev.netlify.app/)**

### Pré-requisitos

Garanta que você tenha o Node.js e o npm instalados no seu computador.

- [Node.js](https://nodejs.org/) (que já inclui o npm)

### Instalação

1.  **Clone o repositório**
    ```sh
    git clone https://github.com/joaomansano-dev/forkify-recipe-app-js.git
    ```
2.  **Navegue para o diretório do projeto**
    ```sh
    cd forkify-recipe-app-js
    ```
3.  **Instale os pacotes NPM**
    ```sh
    npm install
    ```
4.  **Inicie o servidor de desenvolvimento**
    ```sh
    npm start
    ```
    Isso irá abrir o projeto em seu navegador padrão, no endereço `http://localhost:1234`. O aplicativo recarregará automaticamente sempre que você salvar uma alteração nos arquivos.

---

## Estrutura do Projeto

Este projeto segue a arquitetura **MVC (Model-View-Controller)** para separar as responsabilidades e organizar a lógica do código.

```
src/
├── js/
│   ├── model.js        # Gerencia o estado e a lógica de negócio (chamadas à API, dados)
│   ├── controller.js   # Conecta o Model e a View (gerencia eventos)
│   ├── view/           # Gerencia a DOM (renderiza a UI e captura inputs do usuário)
│   │   ├── recipeView.js
│   │   ├── searchView.js
│   │   └── ...
│   ├── config.js       # Constantes e variáveis de configuração
│   └── helpers.js      # Funções auxiliares utilizadas na aplicação
│
└── sass/
    └── main.scss       # Arquivo Sass principal que importa todos os outros
```

---

## Contato

João Mansano - [LinkedIn](www.linkedin.com/in/joão-victor-mansano) - j.victor.mansano.trab@gmail.com

---

## English Version

# Forkify Recipe App 🍴

The final project of the course "The Complete JavaScript Course 2025: From Zero to Expert!"

## About the project

Forkify is a modern web application that allows its users to search and interact with a vast database of recipes. The project was built with a focus on modern JavaScript features and follows the Model-View-Controller (MVC) architecture to keep the code organized and easy to maintain.

This project explores features like asynchronous JavaScript, API interactions, and manipulation of the browser's local storage.

### Built With

- **JavaScript (ES6+)**: Main language for the application's logic.
- **[Parcel](https://parceljs.org/)**: Used for module bundling, asset optimization, and build configurations.
- **Sass/SCSS**: Used for more advanced and organized styling.
- **[Forkify API](https://forkify-api.herokuapp.com/v2)**: The API used for manipulating and searching recipe data.

---

## Features

- **Recipe Search**: Search through over 1 million recipes. It is important to note that the search must be done in English (e.g., abacate = avocado).
- **View Details**: See the ingredients, cooking time, and preparation method of the recipes.
- **Adjust Servings**: Dynamically change the number of servings and see the list of ingredients update automatically.
- **Favorite Recipes**: Save your favorite recipes. The favorites are stored in your browser.
- **Upload Recipes**: Add your own recipes, which will be saved and available to you in the favorites section.
- **Pagination**: Easily navigate through the search results.

---

## Getting Started

To get a local copy and run the project, follow the steps below. If you prefer, you can access the online version here: **[Forkify Live Demo](https://forkify-mansanodev.netlify.app/)**

### Prerequisites

Ensure you have Node.js and npm installed on your computer.

- [Node.js](https://nodejs.org/) (which includes npm)

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/joaomansano-dev/forkify-recipe-app-js.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd forkify-recipe-app-js
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Start the development server**
    ```sh
    npm start
    ```
    This will open the project in your default browser at `http://localhost:1234`. The application will automatically reload whenever you save a change to the files.

---

## Project Structure

This project follows the **MVC (Model-View-Controller)** architecture to separate responsibilities and organize the code's logic.

```
src/
├── js/
│   ├── model.js        # Manages state and business logic (API calls, data)
│   ├── controller.js   # Connects the Model and the View (event handlers)
│   ├── view/           # Manages the DOM (renders the UI and captures user input)
│   │   ├── recipeView.js
│   │   ├── searchView.js
│   │   └── ...
│   ├── config.js       # Constants and configuration variables
│   └── helpers.js      # Helper functions used in the application
│
└── sass/
    └── main.scss       # Main Sass file that imports all others
```

---

## Contact

João Mansano - [LinkedIn](www.linkedin.com/in/joão-victor-mansano) - j.victor.mansano.trab@gmail.com

# Aplicativo de Gerenciamento de Tarefas

link Github: https://github.com/ArtFiorindo/AulaMobile

---

## Equipe

> Artur Lopes Fiorindo » 53481


> Eduardo Felipe Nunes Função » 553362 


> Jhoe Yoshio Kochi Hashimoto 553831

---

Bem-vindo ao **Aplicativo de Gerenciamento de Tarefas**, um aplicativo de React Native que permite aos usuários gerenciar suas tarefas diárias de forma eficiente. Com autenticação segura, adição de tarefas e uma interface intuitiva, este aplicativo foi projetado para ajudar você a organizar suas atividades com simplicidade e elegância.

## Índice

- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

## Funcionalidades

- **Autenticação de Usuário**: Login seguro com nome de usuário e senha, usando JWT para controle de sessão.
- **Gerenciamento de Tarefas**: Adição, atualização e exclusão de tarefas.
- **Listagem de Tarefas**: Exibe todas as tarefas em uma lista simples e organizada.
- **Design Responsivo**: Interface moderna, com cores personalizadas e layout adaptado para diferentes dispositivos.
- **Armazenamento Local**: Utilização de AsyncStorage para armazenar o token de autenticação localmente.

---

## Instalação

Para rodar este projeto localmente, siga os passos abaixo:

1. Clone este repositório:
    ```bash
    git clone https://github.com/ArtFiorindo/AulaMobile
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd AulaMobile
    
    cd listaScript # para acessar o arquivo do front
    cd backEnd # para acessar o arquivo do back
    ```

3. Instale as dependências do projeto:
    ```bash
    npm install # front
    
    npm install # back
    ```

4. Execute o projeto:
    ```bash
    # front
    npm start # após esse passo escolha em qual plataforma rodar
    npm run web # indicado para rodar esse projeto

    #back
    node server.js
    ```

> Certifique-se de que o ambiente de desenvolvimento React Native esteja configurado corretamente.

---

## Uso

### 1. Login

A tela de login permite que os usuários entrem no sistema de forma segura. Insira seu nome de usuário e senha para se autenticar.

### 2. Adicionar Tarefa

Após o login, você poderá adicionar novas tarefas usando o campo de input. Digite a tarefa desejada e clique no ícone de adicionar.

### 3. Gerenciar Tarefas

Você pode:
- **Editar uma tarefa**: Clique no ícone de edição ao lado da tarefa para alterá-la.
- **Excluir uma tarefa**: Clique no ícone de lixeira para removê-la.

Todas as operações (inserir, editar, excluir) se comunicam com a API, garantindo que as mudanças sejam persistentes.

---

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile multiplataforma.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **Native Base**: Biblioteca de componentes UI para React Native, utilizada para estilização.
- **AsyncStorage**: Para armazenamento local de dados no dispositivo (ex. token de autenticação).
- **Expo Icons**: Pacote de ícones utilizado para ícones de interação.
- **API REST**: O aplicativo se comunica com uma API REST para gerenciamento de tarefas.

---

## Estrutura do Projeto

```bash
.
├── App/
│   └── index.tsx   
├── assets/                 # Imagens e recursos estáticos
├── components/             # Componentes reutilizáveis
│   ├── AdicionarTarefa.tsx    # Componente para adicionar nova tarefa
│   ├── ListaTarefas.tsx       # Componente que exibe lista de tarefas
│   └── TarefaItem.tsx         # Componente que representa uma tarefa individual
├── hooks/                 # Hooks personalizados
│   └── EstadoGlobal.tsx      # Hook que gerencia o estado global das tarefas
├── navigation/            # Configuração de navegação
    ├── AppNavigation.tsx
    └── types.ts 
├── screens/                # Telas da aplicação
│   ├── LoginScreen.tsx        # Tela de login
│   └── TarefasScreen.tsx      # Tela que exibe as tarefas
└── ...

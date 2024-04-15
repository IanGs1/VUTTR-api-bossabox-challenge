# ⚒️ VUTTR (Very Useful Tools to Remember)

## About the project
The VUUTR API is an application for you to manage your tools! First of all, you need to create an user, and then, you can create how many tools you want!

## 📋 Index

- 📦 [Need to Have](##-need-to-have)
- 🛠️ [Installation](##-installation)
- 💻 [Used Technologies](#-used-technologies)
- 🤝 [Contributions](#-contributions)

## 📦 Need to have

Above, there is a list of what you need to have installed so you can run the project:

- [Node.js](https://nodejs.org/) - v18.0 or higher.
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/pt/) v8.0 or higher.

## 🛠️ Installation

Follow the instructions above so that you can install and configure the application in a local environment:

1. 📥 **Clone the repository:**

    ```bash
    git clone https://github.com/IanGs1/VUTTR-api-bossabox-challenge
    ```

2. 📂 **Go to the project folder:**

    ```bash
    cd ./VUTTR-api-bossabox-challenge
    ```

3. 📦 **Install the dependencies:**

    ```bash
    npm install
     ou
    npm i
    ```

4.  **⚙️ Set the environment variables:**
Crie um arquivo com o nome `.env` e defina suas váriaveis de ambiente com as chaves listadas abaixo:
Create a file with the name `.env` and define your environment variables with the following keys:

```dotenv 
  NODE_ENV=""
  DATABASE_URL=""
  PORT=""
  JWT_SECRET=""
```

5. ▶️ **Start your server**
    ```bash
    npm prisma migrate dev

    npm run dev
    ```

With all that, your application is ready for be used!

## 💻 Used Technologies
Above, there is a list with the main technologies used during the API development:
- [**Fastify**](https://fastify.io)
- [**Fastify JWT**](https://github.com/fastify/fastify-jwt)
- [**Prisma**](https://www.prisma.io/docs)
- [**bcryptjs**](https://www.npmjs.com/package/bcrypt/)

## 🤝 Contributions

Thank you for considering contributing to the Daily Diet API! Contributions are important for evolving and improving the API! Here are some ways that you can contribute:"

### 1. Open an Issue

If you find any problems, bugs, or have suggestions, feel free to open an issue. Make sure to add enough details so that we can understand your problem or suggestion.

### 2. Send Pull Requests (PRs)

If you want to make code changes, you can create a fork of this repository and make your changes there. Then, as soon as possible, send a pull request. Make sure to describe the changes you've made and how they could improve this project."

### 3. Make the documentation better

Documentation is fundamental to keep the API accessible and make it easier to understand. If you see parts of the code that need additional documentation, you can contribute by adding clear comments or updating the README.

### How to contribute

1. Make a fork of this repository
2. Create a new branch for your updates: `git checkout -b feature/feature-name`.
3. Make changes and commit them: `git commit -m "New function!"`.
4. Send you changes to github: `git push origin feature/feature-name`.
5. Open a Pull Request for this Repository.

🤝 Thanks for contributing!

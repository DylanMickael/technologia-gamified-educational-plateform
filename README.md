https://github.com/devhunt2025/project_repo.git

# 🖥️ Backend Node.js avec Express, Sequelize et MySQL

## 🚀 Lancer l'application

### 1. Cloner le projet

```bash
https://github.com/devhunt2025/project_repo.git
cd project_repo

### 2. Dependances:
npm install

### 3. Configuration .env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ecocity
DB_USER=root
DB_PASSWORD=
PORT=3000

### 4. Creation bd
Crée une base MySQL vide appelée ecocity

### 5. Migration bd
npx sequelize-cli db:migrate

### 6. Run
npm run dev


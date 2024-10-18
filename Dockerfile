# Use a imagem oficial do Node.js como base
FROM node:14

# Define o diretório de trabalho na imagem
WORKDIR /app

# Copia o arquivo package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a aplicação usará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "app.js"]

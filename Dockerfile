# Estágio de build
FROM node:20-alpine as build

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de configuração primeiro
# Isso ajuda a otimizar o cache das camadas Docker
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências específicas
RUN npm install --production=false \
    loader-utils@3.2.1 \
    react@18.2.0 \
    react-dom@18.2.0 \
    react-scripts@5.0.1 \
    react-hook-form@7.53.0 \
    axios@1.7.7 \
    react-router-dom@6.26.2 \
    && npm install --save-dev \
    @types/react@18.2.38 \
    @types/react-dom@18.2.15 \
    typescript@4.4.4

# Copia o restante do código fonte
COPY public/ public/
COPY src/ src/

# Gera o build de produção
RUN npm run build

# Estágio de produção usando Nginx
FROM nginx:1.25-alpine

# Copia a configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia apenas os arquivos de build necessários
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Define variáveis de ambiente para produção
ENV NODE_ENV=production

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
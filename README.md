# Instruções para Clonar o Repositório e Rodar o Docker

Este documento contém os comandos básicos para clonar este repositório, construir o contêiner Docker e rodá-lo.

## Passos

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

### 2. Iniciar o container
```bash
docker build -t front .
docker run -d -p 80:80 --name front-container front
``` 

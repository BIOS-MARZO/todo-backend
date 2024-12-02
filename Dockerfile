# Use la imagen que vamos a declarar
FROM node:18

# Establecer el directorio de trabajo intero del contendor
WORKDIR /app

# Copieme los archivos de configuracion de node
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el codigo de la aplicacion
COPY . .

# Exponer el puerto de la aplicacion

EXPOSE 3000

# Comando para iniciar la aplicacion
CMD ["npm", "start"]
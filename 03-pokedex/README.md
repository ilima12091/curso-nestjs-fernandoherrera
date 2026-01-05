<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Desarrollo

1. Clonar el repositorio
2. Ejecutar

```
yarn install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la BD

```
docker-compose up -d
```

5. Clonar el archivo `.env.template` a `.env` y configurar las variables de entorno

6. Ejecutar la aplicación en modo desarrollo con

```
yarn start:dev
```

7. Reconstruir la BD con el seeder

```
http://localhost:3000/api/seed
```

## Stack

- NestJS
- MongoDB

# Build de producción

1. Crear el archivo `.env.prod` basado en el `.env.template` y configurar las variables de entorno de producción
2. Crear la nueva imagen del proyecto con

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

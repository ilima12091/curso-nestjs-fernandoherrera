<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Teslo API

1. Instalar las dependencias

```
yarn install
```

2. Clonar el archivo `.env.template` y renombrarlo a `.env` configurando las variables de entorno.
3. Levantar la base de datos

```
docker-compose up -d
```

4. Ejecutar la aplicación en modo desarrollo

```
yarn start:dev
```

5. Ejectar el seed para popular la base de datos con información de prueba utilizando el siguiente endpoint

```
GET http://localhost:3000/api/seed
```

# Challenge Code by Meegu

### To do:
- [x] Iniciar aplicação NestJS
- [x] Instalar dependencias
- [x] Configurar Prisma no Nest
- [x] Configurar Docker
- [x] Criar docker compose com serviços da API e MySQL
- [x] Configurar o Banco MySQL no Nest
- [x] Criar model de User
- Implementar endpoints para User
  - [x] Criar
  - [x] Atualizar
  - [x] Deletar
  - [x] Buscar todos usuários
  - [x] Buscar um único usuário pelo ID dele.

- [x] Adicionar proteção na rota de DELETE com a regra estabelecida na descrição.

## Environment Variables
<p>Crie um arquivo .env e adicione as variáveis</p>
```js
DATABASE_URL = mysql://root:meegu@localhost:3306/meegu-db

MYSQL_DATABASE = meegu-db
MYSQL_PASSWORD = meegu
```

## DEV Server - Docker compose

```bash
# start
docker-compose up

# start in detached mode
docker-compose up -d

# stop and remove containers
docker-compose down

# start and build
docker-compose up --build
```

## Server Info
API URL: http://localhost:8080/api/v1

[Swagger Docs](http://localhost:8080/api/v1/docs)

[Postman Docs](https://documenter.getpostman.com/view/9453608/VUxPt6cR)

[Postman Collection](https://www.getpostman.com/collections/c14fa89d09a5344a7331)

## Model de usuário
<p>Quando armazenar dados de usuário, utilize o seguinte modelo:</p>
```ts
interface IUser {
  id: number;
  name: string;
  birthdate: Date;
  document: string;
  acceptedTerms: boolean;
  zipcode: number;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt: Date; // (valor default deve ser a data de criação)
  updatedAt: Date | null; // (null por default)
}
```

## Funções Obrigatórias

- Endpoints para:
  - Criar
  - Atualizar
  - Deletar
  - Buscar todos usuários
  - Buscar um único usuário pelo ID dele.

- Adicionar um Guard na request de método DELETE para não permitir deletar
usuário caso não seja fornecido no header o parâmetro: “access-token” cujo valor é
igual a “meegu”.

- No método POST, crie validações para os parâmetros de entrada do body:
  - name: tipo string obrigatória com no mínimo 2 caracteres e no máximo 100.
  - birthdate: tipo date obrigatório.
  - zipcode: tipo string obrigatório.
  - acceptedTerms: tipo boolean.

- Antes de armazenar dados do usuário você deve buscar informações sobre o
logradouro, bairro, cidade e estado dele para poder salvar junto. Para isso, você pode realizar uma request em uma API pública de busca de CEP utilizando o ZIPCODE enviado no body.
(Exemplo de API pública consultando pelo CEP 01001000: https://viacep.com.br/ws/01001000/json/)

- No método de ATUALIZAÇÃO do usuário você deve inserir a data do momento da
atualização no campo **updatedAt**

## Considerações

- Suba o código no github e mantenha-o versionado.
- Você precisa utilizar Nest.js com Typescript.
- Você deve armazenar informações de usuários criados (em memória ou em uma base de dados relacional) gerando um id numérico aleatório para cada um deles.

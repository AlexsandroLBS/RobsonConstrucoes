# Robson Construções

This project is a full stack application made with [FastAPI](https://fastapi.tiangolo.com/) and [Angular](https://angular.io).  All application is running in a [Docker](https://www.docker.com) container.

## Running

To execute the application, you need to have Docker installed and running, in project root path run:

```
docker-compose up
```

After running, user interface will be available at:
 - http://localhost:4200 

And API will be at: 
 - http://localhost:8000/docs
## API Docs

### Roles
#### To get all roles

```http
  GET /roles/getRoles
```
#### Return
```json
{
  "status": "ok",
  "data": [
    {
      "id": 1,
      "salario": 1200
    },
    {
      "id": 2,
      "salario": 1500.15
    }
  ]
}

```

#### To create a new role


```http
  POST /roles/new
```


| Parameter   | Type       | Description                         | Example   |
| :---------- | :--------- | :-----------------------------------| :---------| 
| `salario` | `number`   | **Required**. The salary value      |1200          | 


#### Return
```json
{
  "status": "Novo cargo adicionado"
}
```

-----------

### Employee

#### To get all employee

```http
  GET /employee/getAll
```
#### Return
```json
{
  "status": "ok",
  "data": [
    {
      "codigo": 1234,
      "nome": "novo funcionario",
      "cargo": 1,
      "salario": 1200
    },
    {
      "codigo": 4123,
      "nome": "novo empregado",
      "cargo": 1,
      "salario": 1200
    }
  ]
}

```

-----
#### To create a new employee


```http
  POST /employee/new
```


| Parameter   | Type       | Description                         | Example   |
| :---------- | :--------- | :-----------------------------------| :---------| 
| `codigo` | `number`   | **Required**. Employee id      |1200          | 
| `nome` | `string`   | **Required**. Employee name      |1200          | 
| `codigo_cargo` | `number`   | **Required**. Role id      |1200          | 
 


#### Return
```json
{
  "status": "Novo funcionario adicionado"
}
```

#### To delete an employee
```http
  DELETE /employee/delete?employee_id=1234
```
#### Return
```json
{
  "status": "Funcionário deletado com sucesso"
}

```

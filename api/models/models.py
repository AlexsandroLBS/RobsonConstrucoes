from pydantic import BaseModel

class Role(BaseModel):
    salario: float

class Employee(BaseModel):
    codigo: float
    nome: str
    codigo_cargo: int
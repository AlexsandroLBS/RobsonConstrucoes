from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.db import Database
from models.models import Role, Employee


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Robson":"Construções"}


@app.get("/roles/getRoles")
def new_role():
    db = Database()
    roles = db.getRoles()
    return roles

@app.post("/roles/new")
def new_role(role: Role):
    db = Database()
    new_role_status = db.createRole(role.salario)
    return new_role_status



@app.get("/employee/exists")
def employeeExists(codigo: int):
    db = Database()
    exists = db.verifyEmployeeExists(codigo)
    return exists

@app.get("/employee/getAll")
def getAllEmployees():
    db = Database()
    employees = db.getEmployees()
    return employees

@app.post("/employee/new")
def new_role(employee: Employee):
    db = Database()
    new_role_status = db.createEmployee(employee)
    return new_role_status

@app.delete("/employee/delete")
def new_role(employee_id: int):
    db = Database()
    del_emp = db.deleteEmployee(employee_id)
    return del_emp
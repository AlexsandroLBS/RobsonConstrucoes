import os
from dotenv import load_dotenv
import psycopg2

from models.models import Employee



load_dotenv()

db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")

class Database():

    def __init__(self):
            self.conn = psycopg2.connect(
                dbname=db_name,
                user=db_user,
                password=db_password,
                host=db_host,
                port=db_port
            )
            self.cur = self.conn.cursor()


    def getRoles(self):
        try:
            self.cur.execute("SELECT * FROM cargos;")
            roles = self.cur.fetchall()
            
            role_list = []
            for role in roles:
                role_dict = {
                    "id": role[0],
                    "salario": role[1]
                }
                role_list.append(role_dict)

            self.cur.close()
            self.conn.close()
            
            return {"status":"ok", "data": role_list}
        except:
            return {"status": "Erro ao obter cargos"}
    
    def getEmployees(self):
        try:
            self.cur.execute("""
                SELECT * FROM funcionarios 
                JOIN cargos ON funcionarios.codigo_do_cargo = cargos.id;
            """)
            employees = self.cur.fetchall()
            
            employees_list = []
            for emp in employees:

                role_dict = {
                    "codigo": emp[1],
                    "nome": emp[2],
                    "cargo": emp[3],
                    "salario": emp[5]
                }
                employees_list.append(role_dict)

            self.cur.close()
            self.conn.close()
            
            return {"status":"ok", "data": employees_list}
        except:
            return {"status": "Erro ao obter cargos"}
    

    def verifyEmployeeExists(self, codigo):
        try:
            self.cur.execute(f"SELECT COUNT(*) FROM public.funcionarios WHERE codigo = {codigo};")
            existing_count = self.cur.fetchone()[0]
        
            self.cur.close()
            self.conn.close()
            if existing_count > 0:
                return { True }
            else:
                return { False }
        except:
            self.cur.close()
            self.conn.close()
            return { False }

    def createRole(self, salario: float):
        try:
            self.cur.execute(f"""
                INSERT INTO public.cargos (salario) VALUES ({salario})
            """)
            self.conn.commit()
            self.cur.close()
            self.conn.close()
            return {"status":"Novo cargo adicionado"}
        except:
            return {"status":"Falha ao criar novo cargo"}
    
    def createEmployee(self, employee: Employee):
        try:
            self.cur.execute(f"SELECT COUNT(*) FROM public.funcionarios WHERE codigo = {employee.codigo};")
            existing_count = self.cur.fetchone()[0]
        
            if existing_count > 0:
                return {"status": "Código de funcionário já existe"}
            
            self.cur.execute(f"""
               INSERT INTO public.funcionarios (codigo, nome, codigo_do_cargo)
               VALUES ({employee.codigo}, '{employee.nome}', {employee.codigo_cargo});
            """)
            self.conn.commit()
            self.cur.close()
            self.conn.close()
            return {"status":"Novo funcionario adicionado"}
        except:
            return {"status":"Falha ao criar novo funcionario"}
    
    
    def deleteEmployee(self, employee_id):
        try:
            self.cur.execute(f"DELETE FROM public.funcionarios WHERE codigo = {employee_id};")
            self.conn.commit()
            self.cur.close()
            self.conn.close()
            return {"status": "Funcionário deletado com sucesso"}
        except:
            return {"status": "Erro ao deletar funcionário"}
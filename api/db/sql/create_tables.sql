-- Creating users table
CREATE TABLE if not exists cargos (
                    id BIGSERIAL NOT NULL PRIMARY KEY,
                    salario REAL NOT NULL
                    );

-- Creating status table
CREATE TABLE if not exists funcionarios (
                    id BIGSERIAL NOT NULL PRIMARY KEY,
                    codigo INT NOT NULL,
                    nome TEXT NOT NULL,
                    codigo_do_cargo INT NOT NULL,
                    FOREIGN KEY (codigo_do_cargo) REFERENCES cargos (id)
                    );


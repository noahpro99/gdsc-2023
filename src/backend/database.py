#!/usr/bin/env python3

from dataclasses import dataclass
import dotenv
dotenv.load_dotenv()

import os
import pandas as pd
import sqlalchemy as sql


# create employee table if not exists
@dataclass
class Employee:
    id: int
    name: str
    salary: int
    department: str
    position: str
    
print("Connecting to database...")

engine = sql.create_engine(
    f'mysql+mysqldb://{os.getenv("USERNAME")}:{os.getenv("PASSWORD")}@{os.getenv("HOST")}/{os.getenv("DATABASE")}',
    connect_args={'ssl': {'ca': '/etc/ssl/certs/ca-certificates.crt'}},
)


# mysql query to create table
# with engine.connect() as conn:
#     conn.execute(sql.text("CREATE TABLE IF NOT EXISTS employee (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), salary INT, department VARCHAR(255), position VARCHAR(255), PRIMARY KEY (id))"))
#     # add employee to database
#     employee = Employee(None, "Noah Doe", 5000, "IT", "Software Engineer")
#     conn.execute(
#         sql.text("INSERT INTO employee (name, salary, department, position) VALUES (:name, :salary, :department, :position)"),
#         {
#             "name": employee.name,
#             "salary": employee.salary,
#             "department": employee.department,
#             "position": employee.position
#         }
#     )
#     conn.commit()
#     # read employee table to pandas dataframe
#     df = pd.read_sql(sql.text("SELECT * FROM employee"), conn)
#     print(df)

with engine.connect() as conn:
    # create table of employee
    # conn.execute(sql.text("CREATE TABLE IF NOT EXISTS employee (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), salary INT, department VARCHAR(255), position VARCHAR(255), PRIMARY KEY (id))"))
    # create table of projects
    # conn.execute(sql.text("CREATE TABLE IF NOT EXISTS project (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), description VARCHAR(255), PRIMARY KEY (id))"))
    
    # many to many relationship between employee and project
    # conn.execute(
    #     sql.text(
    #         """
    #         CREATE TABLE IF NOT EXISTS employee_project (
    #             employee_id INT NOT NULL REFERENCES employee(id),
    #             project_id INT NOT NULL REFERENCES project(id),
    #             PRIMARY KEY (employee_id, project_id)
    #         )
    #         """))
    
    
    # add 3 employees to database
    # employees = [
    #     Employee(None, "Noah Doe", 5000, "IT", "Software Engineer"),
    #     Employee(None, "John Doe", 4000, "IT", "Software Engineer"),
    #     Employee(None, "Jane Doe", 3000, "IT", "Software Engineer")
    # ]
    # for employee in employees:
    #     conn.execute(
    #         sql.text("INSERT INTO employee (name, salary, department, position) VALUES (:name, :salary, :department, :position)"),
    #         {
    #             "name": employee.name,
    #             "salary": employee.salary,
    #             "department": employee.department,
    #             "position": employee.position
    #         }
    #     )
    # projects = [
    #     ("Project A", "Project A Description"),
    #     ("Project B", "Project B Description"),
    #     ("Project C", "Project C Description")
    # ]
    # for project in projects:
    #     conn.execute(
    #         sql.text("INSERT INTO project (name, description) VALUES (:name, :description)"),
    #         {
    #             "name": project[0],
    #             "description": project[1]
    #         }
    #     )
    
    # # add some employees to projects
    # conn.execute(
    #     sql.text(
    #         """
    #         INSERT INTO employee_project (employee_id, project_id)
    #         VALUES
    #             (9, 1),
    #             (9, 2),
    #             (11, 1)
    #         """
    #     )
    # )
    # conn.commit()
    
    # read all tables to pandas dataframe
    # df_employee = pd.read_sql(sql.text("SELECT * FROM employee"), conn)
    # df_project = pd.read_sql(sql.text("SELECT * FROM project"), conn)
    # df_employee_project = pd.read_sql(sql.text("SELECT * FROM employee_project"), conn)
    
    # get all employees in project A
    df_employee_project_a = pd.read_sql(
        sql.text(
            """
            SELECT * FROM employee
            WHERE id IN (
                SELECT employee_id FROM employee_project
                WHERE project_id = 1
            )
            """
        ),
        conn
    )
    print("Employees in Project A:")
    print(df_employee_project_a)
    
    
    # DELETE all rows from employee_project
    # conn.execute(sql.text("DELETE FROM employee_project"))
    # conn.commit()
            
    
    
    
print("Done.")
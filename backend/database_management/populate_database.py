from csv import DictReader
from os.path import exists
from postgre_context_manager import OpenPostgre
from decouple import config


class DatabasePopulation:
    sql_file = r'.\database_management\populate_database.sql'
    csv_file = r'.\database_management\banks.csv'
    headers = ('Código de compensação', 'Nome Instituição')

    @classmethod
    def check_sql_file(cls):
        if not exists(cls.sql_file):
            with open(cls.sql_file, mode='w', encoding='utf-8'):
                pass
    
    @classmethod
    def create_script(cls):
        cls.check_sql_file()
        with open(cls.csv_file, mode='r', encoding='utf-8') as csv_file:
            with open(cls.sql_file, mode='w', encoding='utf-8') as sql_file:
                reader = DictReader(fieldnames=cls.headers, f=csv_file)
                sql_file.write('BEGIN TRANSACTION;\n')
                next(reader)
                for row in reader:
                    query = f"""INSERT INTO "BANKS" (created_at, updated_at, compensation_code, institution_name) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, {row.get(cls.headers[0])}, '{row.get(cls.headers[1])}');\n"""
                    sql_file.write(query)
                sql_file.write('COMMIT;\n')
    
    @classmethod
    def populate_database(cls):
        access_data = {
            'host': config('HOST'),
            'dbname': config('NAME'),
            'user': config('USER'),
            'password': config('PASSWORD')
        }
        with OpenPostgre(**access_data) as cursor:
            with open(file=cls.sql_file, mode='r', encoding='utf-8') as arch:
                data = arch.read()
                try:
                    cursor.execute("""TRUNCATE TABLE "BANKS";""")
                    cursor.execute("""ALTER SEQUENCE "BANKS_id_seq" RESTART WITH 1;""")
                    cursor.execute(data)
                except Exception as error:
                    print(f"An error occurred while trying to insert the data into the database. More details:\n{error}")
                else:
                    print('Data inserted successfully!')
    
    @classmethod
    def execute(cls):
        cls.check_sql_file()
        cls.create_script()
        cls.populate_database()


if __name__ == '__main__':
    DatabasePopulation.execute()

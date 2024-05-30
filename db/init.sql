SELECT 'CREATE DATABASE db_tasks'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_tasks')\gexec
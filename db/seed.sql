use employees_db;
INSERT INTO
  departments (department_name)
VALUES
  ('R&D'),
  ('Organ Harvesting'),
  ('KGB');
INSERT INTO
  roles (role_title, salary, department_id)
VALUES
  ('Head Kidney Remover', '100.00', 2),
  ('Senior Kidney Remover', '79.99', 2),
  ('Junior Kidney Remover', '9.99', 2),
  ('Head KGB Agent', '100.00', 3),
  ('Senior KGB Agent', '79.99', 3),
  ('Junior KGB Agent', '9.99', 3),
  ('Head R&D Engineer', '100.00', 1),
  ('Senior R&D Engineerr', '79.99', 1),
  ('Junior R&D Engineer', '9.99', 1);
INSERT INTO
  employees (first_name, last_name, roles_id)
VALUES
  ('Rick', 'Moranis', 1),
  ('Nicholas', 'Cage', 2),
  ('Ron', 'Perlman', 3),
  ('Frank', 'Sinatra', 4),
  ('Fats', 'Waller', 5),
  ('John', 'Coltrane', 6),
  ('George', 'H W Bush', 7),
  ('Barak', 'Obama', 8),
  ('Bill', 'Clinton', 9);
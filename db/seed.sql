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
  employees (first_name, last_name, roles_id, manager_id)
VALUES
  ('Rick', 'Moranis', 1, null),
  ('Nicholas', 'Cage', 2, 1),
  ('Ron', 'Perlman', 3, 1),
  ('Frank', 'Sinatra', 4, null),
  ('Fats', 'Waller', 5, 4),
  ('John', 'Coltrane', 6, 4),
  ('George', 'H W Bush', 7, null),
  ('Barak', 'Obama', 8, 7),
  ('Bill', 'Clinton', 9, 7);
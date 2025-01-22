-- Inserção dos perfis
INSERT INTO public.profiles (id , description , permissions)
VALUES
  ('08384e76-bcae-4282-927e-3723060761c8', 'user_admin', '{"permissions": ["all"]}'),
  ('a9d2fbdc-64b9-4c8d-9b73-8a3c9fabcdd6', 'user_basic', '{"permissions": ["read"]}');

-- Inserção dos usuários
INSERT INTO public.users (id, "name", email, phone, cpf, avatar, "password", id_profile)
VALUES
  ('2d7f53f8-1a8c-4b29-bd7e-3ed5f21abcdf', 'admin', 'admin@template.com.br', NULL, '66666666666', NULL, '$2a$08$HKmrpODFsmRwWAeLoB/k6OIUcItOLkhuiyEs9YwNjNtEWao50m7m2', '08384e76-bcae-4282-927e-3723060761c8'),
  ('25ed291f-b76f-46df-85a2-5e7f071dde42', 'user', 'user@template.com.br', NULL, '99999999988', NULL, '$2a$08$HKmrpODFsmRwWAeLoB/k6OIUcItOLkhuiyEs9YwNjNtEWao50m7m2', 'a9d2fbdc-64b9-4c8d-9b73-8a3c9fabcdd6');



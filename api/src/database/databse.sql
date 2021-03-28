-- create database prueba
CREATE DATABASE prueba
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- create table roles
CREATE TABLE public.roles
(
    id_rol integer NOT NULL,
    nombre_rol text COLLATE pg_catalog."default",
    CONSTRAINT roles_pkey PRIMARY KEY (id_rol)
)

TABLESPACE pg_default;

ALTER TABLE public.roles
    OWNER to postgres;


-- create table tipos_identificacion
CREATE TABLE public.tipos_identificacion
(
    id_tipo integer NOT NULL,
    nombre_tipo text COLLATE pg_catalog."default",
    CONSTRAINT tipo_identificacion_pkey PRIMARY KEY (id_tipo)
)

TABLESPACE pg_default;

ALTER TABLE public.tipos_identificacion
    OWNER to postgres;

-- create table users
CREATE TABLE public.users
(
    id text COLLATE pg_catalog."default" NOT NULL,
    tipo_id integer,
    nombres text COLLATE pg_catalog."default",
    apellidos text COLLATE pg_catalog."default",
    rol integer,
    celular text COLLATE pg_catalog."default",
    contrasenia text COLLATE pg_catalog."default",
    correo text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT fk_role FOREIGN KEY (rol)
        REFERENCES public.roles (id_rol) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_tipo_id FOREIGN KEY (tipo_id)
        REFERENCES public.tipos_identificacion (id_tipo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

-- Inserts roles
INSERT INTO public.roles(
	id_rol, nombre_rol)
	VALUES (1, 'administracion');

INSERT INTO public.roles(
	id_rol, nombre_rol)
	VALUES (2, 'usuario');

INSERT INTO public.roles(
	id_rol, nombre_rol)
	VALUES (3, 'cliente');

-- Isert tipos_identificacion
INSERT INTO public.tipos_identificacion(
	id_tipo, nombre_tipo)
	VALUES (1, 'cedula');

INSERT INTO public.tipos_identificacion(
	id_tipo, nombre_tipo)
	VALUES (2, 'tarjeta de identidad');

INSERT INTO public.tipos_identificacion(
	id_tipo, nombre_tipo)
	VALUES (3, 'pasaporte');
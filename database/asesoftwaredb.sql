create database asesoftwaredb
use asesoftwaredb
create table
    comercios (
        id_comercio int NOT NULL IDENTITY(1, 1),
        nom_comercio varchar(50) NOT NULL,
        aforo_maximo int NOT NULL,
        PRIMARY KEY (id_comercio)
    )
create table
    servicios (
        id_servicios int NOT NULL IDENTITY(1, 1),
        id_comercio int,
        nom_servicio varchar(50) not null,
        hora_apertura time(0) not null,
        hora_cierre time(0) not null,
        duracion int not null PRIMARY KEY (id_servicios),
        FOREIGN KEY (id_comercio) REFERENCES comercios(id_comercio)
    )
create table
    turnos (
        id_turno int NOT NULL IDENTITY(1, 1),
        id_servicio INT,
        fecha_turno DATE NOT NULL,
        hora_inicio TIME (0) NOT NULL,
        hora_fin TIME (0) NOT NULL,
        estado bit not null,
        PRIMARY KEY (id_turno),
        FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicios)
    )
INSERT INTO
    comercios (nom_comercio, aforo_maximo)
VALUES ('Comercio 1', 5), ('Comercio 2', 10), ('Comercio 3', 15), ('Comercio 4', 20), ('Comercio 5', 25);

INSERT INTO
    servicios (
        id_comercio,
        nom_servicio,
        hora_apertura,
        hora_cierre,
        duracion
    )
VALUES (
        1,
        'Servicio 1',
        '09:00',
        '11:00',
        30
    ), (
        2,
        'Servicio 2',
        '10:00',
        '11:00',
        45
    ), (
        3,
        'Servicio 3',
        '08:30',
        '10:30',
        60
    ), (
        4,
        'Servicio 4',
        '09:30',
        '13:30',
        30
    ), (
        5,
        'Servicio 5',
        '09:30',
        '10:30',
        30
    );

INSERT INTO
    turnos (
        id_servicio,
        fecha_turno,
        hora_inicio,
        hora_fin,
        estado
    )
VALUES (
        1,
        '01/06/2023',
        '09:00',
        '09:30',
        0
    ), (
        1,
        '01/06/2023',
        '09:30',
        '10:00',
        0
    ), (
        1,
        '01/06/2023',
        '10:00',
        '10:30',
        0
    ), (
        1,
        '01/06/2023',
        '10:30',
        '11:00',
        0
    ), (
        2,
        '01/06/2023',
        '10:00',
        '10:45',
        0
    ), (
        3,
        '01/06/2023',
        '08:30',
        '09:30',
        0
    ), (
        3,
        '01/06/2023',
        '09:30',
        '10:30',
        0
    ), (
        4,
        '01/06/2023',
        '09:30',
        '10:00',
        0
    ), (
        5,
        '01/06/2023',
        '09:30',
        '10:00',
        0
    );

SELECT * FROM comercios SELECT * FROM servicios sELECT * FROM turnos 
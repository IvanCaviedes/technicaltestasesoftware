create database asesoftwaredb;

use asesoftwaredb;

create table Comercios (
    id_comercio int NOT NULL IDENTITY(1, 1),
    nom_comercio varchar(50) NOT NULL,
    aforo_maximo int NOT NULL,
    PRIMARY KEY (id_comercio)
);

create table Servicios (
    id_servicio int NOT NULL IDENTITY(1, 1),
    id_comercio int,
    nom_servicio varchar(50) not null,
    hora_apertura time(0) not null,
    hora_cierre time(0) not null,
    duracion int not null PRIMARY KEY (id_servicio),
    FOREIGN KEY (id_comercio) REFERENCES Comercios(id_comercio)
);

create table Turnos (
    id_turno int NOT NULL IDENTITY(1, 1),
    id_servicio INT,
    fecha_turno DATE NOT NULL,
    hora_inicio TIME (0) NOT NULL,
    hora_fin TIME (0) NOT NULL,
    estado bit not null,
    PRIMARY KEY (id_turno),
    FOREIGN KEY (id_servicio) REFERENCES Servicios(id_servicio)
);

INSERT INTO
    Comercios (nom_comercio, aforo_maximo)
VALUES
    ('Comercio 1', 5),
    ('Comercio 2', 10);

INSERT INTO
    Servicios (
        id_comercio,
        nom_servicio,
        hora_apertura,
        hora_cierre,
        duracion
    )
VALUES
    (
        1,
        'Servicio 1',
        '09:00',
        '11:00',
        30
    ),
    (
        2,
        'Servicio 2',
        '10:00',
        '11:00',
        60
    );

INSERT INTO
    Turnos (
        id_servicio,
        fecha_turno,
        hora_inicio,
        hora_fin,
        estado
    )
VALUES
    (
        1,
        '01/06/2023',
        '09:00',
        '09:30',
        0
    ),
    (
        2,
        '01/06/2023',
        '10:00',
        '11:00',
        0
    );

CREATE PROCEDURE GENERARTURNOS(
    @FECHAINICIO DATE,
    @FECHAFIN DATE,
    @IDSERVICIO INT
) AS BEGIN DECLARE @HoraApertura TIME,
@HoraCierre TIME,
@DuracionServicio INT,
@FechaActual DATE,
@TurnoHora TIME;

-- Obtener los datos del servicio según el IdServicio
SELECT
    @HoraApertura = hora_apertura,
    @HoraCierre = hora_cierre,
    @DuracionServicio = duracion
FROM
    Servicios
WHERE
    id_servicio = @IdServicio;

SET
    @FechaActual = @FechaInicio;

SET
    @TurnoHora = @HoraApertura;

-- Bucle para generar y almacenar los turnos diarios
WHILE @FechaActual <= @FechaFin BEGIN WHILE DATEADD(
    MINUTE,
    @DuracionServicio,
    @TurnoHora
) <= @HoraCierre BEGIN -- Insertar el turno en la tabla de turnos
INSERT INTO
    Turnos (
        id_servicio,
        fecha_turno,
        hora_inicio,
        hora_fin,
        estado
    )
VALUES
    (
        @IdServicio,
        @FechaActual,
        @TurnoHora,
        DATEADD(
            MINUTE,
            @DuracionServicio,
            @TurnoHora
        ),
        0
    );

-- Avanzar al siguiente turno
SET
    @TurnoHora = DATEADD(
        MINUTE,
        @DuracionServicio,
        @TurnoHora
    );

END;

-- Avanzar al siguiente día
SET
    @FechaActual = DATEADD(DAY, 1, @FechaActual);

SET
    @TurnoHora = @HoraApertura;

END;

-- Devolver los turnos generados
SELECT
    *
FROM
    Turnos
WHERE
    fecha_turno BETWEEN @FechaInicio
    AND @FechaFin
    AND id_servicio = @IdServicio;

END;

exec GENERARTURNOS '2023/06/03',
'2023/06/04',
1
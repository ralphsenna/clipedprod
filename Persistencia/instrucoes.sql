CREATE TABLE cliente(
    cli_cod INT NOT NULL AUTO_INCREMENT,
    cli_nome VARCHAR(100) NOT NULL,
    cli_tel VARCHAR(20) NOT NULL,
    CONSTRAINT pk_cliente PRIMARY KEY(cli_cod)
);

CREATE TABLE pedido(
    ped_cod INT NOT NULL AUTO_INCREMENT,
    ped_qtdItens INT NOT NULL DEFAULT 0,
    ped_valTotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    ped_data DATE,
    ped_obs VARCHAR(200) NOT NULL,
    cli_cod INT NOT NULL,
    CONSTRAINT pk_pedido PRIMARY KEY(ped_cod),
    CONSTRAINT fk_cliente FOREIGN KEY(cli_cod) REFERENCES cliente(cli_cod)
);
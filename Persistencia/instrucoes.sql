CREATE TABLE cliente(
    cli_cod INT NOT NULL AUTO_INCREMENT,
    cli_nome VARCHAR(100) NOT NULL,
    cli_tel VARCHAR(20) NOT NULL,
    cli_end VARCHAR(200) NOT NULL,
    CONSTRAINT pk_cliente PRIMARY KEY(cli_cod)
);

CREATE TABLE pedido(
    ped_cod INT NOT NULL AUTO_INCREMENT,
    ped_data DATE NOT NULL,
    ped_obs VARCHAR(200) NOT NULL,
    ped_valTotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    cli_cod INT NOT NULL,
    CONSTRAINT pk_pedido PRIMARY KEY(ped_cod),
    CONSTRAINT fk_cliente FOREIGN KEY(cli_cod) REFERENCES cliente(cli_cod)
);

CREATE TABLE produto(
    pro_cod INT NOT NULL AUTO_INCREMENT,
    pro_desc VARCHAR(100) NOT NULL,
    pro_precoCusto DECIMAL(10,2) NOT NULL,
    pro_precoVenda DECIMAL(10,2) NOT NULL,
    pro_valid DATE NOT NULL,
    pro_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    CONSTRAINT pk_produto PRIMARY KEY(pro_cod)
);

CREATE TABLE pedido_produto(
    pro_cod INT NOT NULL,
    pro_qtd INT NOT NULL,
    pro_valUnit DECIMAL(10,2) NOT NULL,
    ped_cod INT NOT NULL,
    CONSTRAINT pk_pedido_produto PRIMARY KEY(pro_cod, ped_cod),
    CONSTRAINT fk_produto FOREIGN KEY(pro_cod) REFERENCES produto(pro_cod),
    CONSTRAINT fk_pedido FOREIGN KEY(ped_cod) REFERENCES pedido(ped_cod)
);
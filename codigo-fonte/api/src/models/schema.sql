CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    login VARCHAR(100) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('fotografo', 'cliente')) NOT NULL,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE
);

CREATE TABLE detalhe_usuarios (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    rua VARCHAR(100),
    numero INT,
    cep VARCHAR(10),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    cart_identidade VARCHAR(20),
    cpf VARCHAR(20) UNIQUE,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE,
    CONSTRAINT fk_detalhe_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

/*CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_evento DATE NOT NULL,
    publico BOOLEAN DEFAULT FALSE,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE
);

CREATE TABLE detalhe_evento (
    id SERIAL PRIMARY KEY,
    evento_id INT NOT NULL,
    foto BYTEA NOT NULL,
    tem_marca_agua BOOLEAN DEFAULT TRUE,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE,
    CONSTRAINT fk_detalhe_evento FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
);

CREATE TABLE albuns (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE,
    CONSTRAINT fk_albuns FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE album_fotos (
    album_id INT NOT NULL,
    id_foto INT NOT NULL,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE,
    PRIMARY KEY (album_id, id_foto),
    CONSTRAINT fk_album_fotos_album FOREIGN KEY (album_id) REFERENCES albuns(id) ON DELETE CASCADE,
    CONSTRAINT fk_album_fotos_foto FOREIGN KEY (id_foto) REFERENCES detalhe_evento(id) ON DELETE CASCADE
);

CREATE TABLE produto (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    id_evento INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE,
    CONSTRAINT fk_produto FOREIGN KEY (id_evento) REFERENCES eventos(id) ON DELETE CASCADE
);

CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE,
    CONSTRAINT fk_compras FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE itens_compra (
    compra_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE,
    PRIMARY KEY (compra_id, produto_id),
    CONSTRAINT fk_itens_compra_compra FOREIGN KEY (compra_id) REFERENCES compras(id) ON DELETE CASCADE,
    CONSTRAINT fk_itens_compra_produto FOREIGN KEY (produto_id) REFERENCES produto(id) ON DELETE CASCADE
);

CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    compra_id INT NOT NULL,
    metodo VARCHAR(10) CHECK (metodo IN ('pix', 'picpay', 'boleto')) NOT NULL,
    status VARCHAR(10) CHECK (status IN ('pendente', 'pago', 'cancelado')) DEFAULT 'pendente',
    dtpagamento DATE,
    dtestorno DATE,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE,
    CONSTRAINT fk_pagamentos FOREIGN KEY (compra_id) REFERENCES compras(id) ON DELETE CASCADE
);

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    id_foto_evento INT NOT NULL,
    dtinclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dtalteracao DATE,
    CONSTRAINT fk_comentarios_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_comentarios_foto FOREIGN KEY (id_foto_evento) REFERENCES detalhe_evento(id) ON DELETE CASCADE
);*/
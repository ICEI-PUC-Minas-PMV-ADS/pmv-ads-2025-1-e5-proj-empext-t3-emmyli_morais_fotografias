# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. 

## Usuários
| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **xxx** | xxxxx | xxxxx |

### Exemplo

| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **Administrador** | Gerencia a aplicação e os usuários. | Gerenciar usuários, configurar o sistema, acessar todos os relatórios. |
| **Funcionário** | Usa a aplicação para suas tarefas principais. | Criar e editar registros, visualizar relatórios. |


## Arquitetura e Tecnologias

Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

Deve ser desenvolvido a partir do microfundamento: Empreendedorismo e inovação.
Colocar a imagem do modelo construído apresentando a proposta de solução.

> **Links Úteis**:
> Disponíveis em material de apoio do projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.


### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Login do fotógrafo – Controle de acesso para o fotógrafo. | ALTA | 
|RF-002| Sistema de cadastro para os clientes – Permite que os clientes criem suas próprias contas.   | MÉDIA |
|RF-003| Compra de fotos – Funcionalidade principal para monetização do site. | ALTA | 
|RF-004| Proteção contra impressões – Evite que as fotos sejam copiadas sem autorização. | ALTA | 
|RF-005| Download de fotos editadas – Entrega final das imagens adquiridas. | ALTA | 
|RF-006| Sistema de pagamento integrado (PicPay, Pix) – Garantir que as transações sejam realizadas. | ALTA | 
|RF-007| Gerenciamento de pedidos – Permite que o fotógrafo acompanhe vendas e pagamentos. | MÉDIA | 
|RF-008| Sistema de notificações – Informações automáticas para clientes e fotógrafos.| MÉDIA | 
|RF-009| Backup automático – Segurança para evitar perda de dados e fotos | MÉDIA | 
|RF-010| Áreas de feedbacks – Permite avaliações sobre o serviço e fotos. | BAIXA | 
|RF-011| Galeria de amostras – Exposição do portfólio do fotógrafo para atrair novos clientes.| BAIXA | 


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Segurança – Proteção dos dados dos usuários e das fotos contra acessos não autorizados. | ALTA | 
|RNF-002| Desempenho – O site deve ser carregado rapidamente e ter alta disponibilidade.
 |  ALTA | 
|RNF-003| Escalabilidade – O sistema deve suportar um número crescente de usuários e fotos. |  ALTA | 
|RNF-004| Usabilidade – A interface deve ser intuitiva e fácil de navegar em qualquer dispositivo. |  ALTA | 
|RNF-005| Compatibilidade – O site deve ser acessível em navegadores modernos e responsivo para dispositivos móveis (iOS e Android). |  ALTA | 
|RNF-006| Confiabilidade – O sistema deve operar sem falhas críticas e garantir que os pagamentos sejam processados ​​corretamente. |  MÉDIA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:



## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| O projeto deve ser publicado no GitHub       |
|02| O sistema precisa ser compatível com navegadores mais utilizados (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge)      |

## Diagrama de Caso de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

Para mais informações, consulte o microfundamento Engenharia de Requisitos de Software 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.

## Modelo ER 

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - 

## Esquema Relacional 

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 




## Modelo Físico
```
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    tipo ENUM('fotografo', 'cliente') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    fotografo_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_evento DATE NOT NULL,
    publico BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fotografo_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE fotos_evento (
    id SERIAL PRIMARY KEY,
    evento_id INT NOT NULL,
    url TEXT NOT NULL,
    tem_marca_agua BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
);

CREATE TABLE albuns (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE album_fotos (
    album_id INT NOT NULL,
    foto_id INT NOT NULL,
    PRIMARY KEY (album_id, foto_id),
    FOREIGN KEY (album_id) REFERENCES albuns(id) ON DELETE CASCADE,
    FOREIGN KEY (foto_id) REFERENCES fotos_evento(id) ON DELETE CASCADE
);

CREATE TABLE itens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pendente', 'pago', 'cancelado') DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE itens_compra (
    compra_id INT NOT NULL,
    item_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (compra_id, item_id),
    FOREIGN KEY (compra_id) REFERENCES compras(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES itens(id) ON DELETE CASCADE
);

CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    compra_id INT NOT NULL,
    metodo ENUM('pix', 'picpay') NOT NULL,
    status ENUM('pendente', 'confirmado', 'falha') DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compra_id) REFERENCES compras(id) ON DELETE CASCADE
);

CREATE TABLE notificacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    fotografo_id INT NOT NULL,
    avaliacao INT CHECK (avaliacao BETWEEN 1 AND 5),
    comentario TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (fotografo_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE backup (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    url_backup TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```
## Tecnologias Utilizadas

**HTML:** Linguagem de marcação usada para estruturar o conteúdo de páginas da web.

**CSS:** Linguagem de estilo usada para definir a aparência visual de elementos HTML, como cores, fontes e layout.

**C#**: Linguagem de programação usada para escrever a lógica do lado do servidor, geralmente em conjunto com o .NET.

**.NET:** Framework da Microsoft usado para construir aplicações de software, incluindo APIs e aplicações web no lado do servidor.

**SQL Server:** Sistema de gerenciamento de banco de dados relacional da Microsoft usado para armazenar e gerenciar dados estruturados.

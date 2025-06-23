#  Implantação do Software

##  Planejamento da Implantação

A implantação do sistema **Emmyli Moraes Fotografias** foi cuidadosamente planejada para garantir:

- Estabilidade  
- Segurança  
- Facilidade de manutenção  
- Escalabilidade  

### 🔧 Tecnologias e Estrutura Utilizada

| Tecnologia        | Descrição                                                                 |
|-------------------|---------------------------------------------------------------------------|
| **GitHub**        | Controle de versão e colaboração entre os desenvolvedores.                |
| **AWS EC2 (Ubuntu)** | Hospedagem da aplicação e banco de dados.                                |
| **NGINX**         | Proxy reverso para API e servidor de arquivos estáticos (front-end).      |
| **PM2**           | Gerenciador de processos para manter e monitorar a API em execução.       |
| **PostgreSQL**    | Banco de dados relacional utilizado no projeto.                           |
| **Sequelize**     | ORM utilizado para gerenciar as migrations e comunicação com o banco.     |
| **Node.js + Express** | Backend RESTful API modular com autenticação via JWT.                    |
| **React + Vite**  | Front-end moderno, performático e modularizado.                           |
| **Certbot (Let's Encrypt)** | Certificado SSL gratuito com renovação automática via `certbot`.    |

### 🚀 Etapas do Deploy Manual

1. Acesso ao servidor via SSH, navegue até a pasta de instalçao do projeto
2. Atualização do código:
   ```bash
   git pull origin main
3. Atualização de dependências:
   ```bash
   npm install
4. Aplicação de migrations:
   ```bash
   npx sequelize db:migrate
5. Geração do build do front-end:
   ```bash
   npm run build
6. Cópia dos arquivos gerados para o NGINX:
   ```bash
   sudo cp -r dist/* /var/www/html/
7. Reinício da API com PM2:
   ```bash
   pm2 restart nome-do-processo

##  Link da Aplicação em Produção

A aplicação está disponível publicamente através do seguinte endereço:

🔗 https://emmylifotografias.com.br

##  Planejamento de Evolução da Aplicação


A seguir, o roadmap de melhorias previstas para o sistema:

# Funcionalidades Técnicas

- Melhorias no painel administrativo

- Implementação de gráficos e dashboards

- Automação de backup de banco e imagens

- Expansão das opções de pagamento (Pix, boleto, PayPal)

- Envio automático de e-mails transacionais

- Otimização de segurança (firewall, logs de acesso, cache)

⚙️ Automatização
CI/CD via GitHub Actions para facilitar o deploy e reduzir erros manuais

# Considerações Finais
Este processo garante que a aplicação seja mantida em ambiente de produção com segurança, desempenho e organização, oferecendo uma boa base para o crescimento futuro do projeto.

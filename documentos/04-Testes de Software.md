# Plano de Teste de Software

## 1. Introdução

Este documento apresenta o Plano de Teste de Software para os módulos de cadastro e login de usuário no sistema "Emmyli Fotografias". O objetivo é garantir que as funcionalidades de autenticação estejam operando corretamente, prevenindo falhas e assegurando a segurança dos dados dos usuários.

## 2. Objetivo dos Testes

O plano de teste visa validar o funcionamento adequado do cadastro e login de usuário, garantindo que:

- Usuários possam se cadastrar com informações válidas.
- O sistema rejeite dados inválidos no cadastro.
- O login funcione corretamente para usuários registrados.
- O sistema impeça acessos não autorizados.

## 3. Escopo

Os testes serão aplicados exclusivamente ao módulo de autenticação do sistema, cobrindo:

- Cadastro de novos usuários.
- Validação de informações no cadastro.
- Login de usuários cadastrados.
- Manutenção de sessão e redirecionamento.

## 4. Critérios de Sucesso

O sistema será considerado funcional para este módulo se:

- Permitir que usuários se registrem com dados válidos.
- Impedir cadastros com informações inválidas.
- Permitir login apenas para usuários registrados.
- Impedir tentativas de login com credenciais incorretas.
- Gerenciar sessões corretamente.

### Tipo de Teste
- **Sucesso**: Tem o objetivo de verificar se as funcionalidades funcionam corretamente.
- **Insucesso**: Tem o objetivo de verificar se o sistema trata erros de maneira correta.

## 5. Casos de Teste

### 5.1. Cadastro de Usuário

<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Cadastro com credenciais válidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um usuário pode fazer cadastro com sucesso utilizando credenciais válidas.</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplição em um navegador.<br>
      2. Navegar para a tela de cadastro.<br>
      3. Inserir um Nome válido.<br>
      4. Inserir um Email válida.<br>
      5. Inserir um Login válida.<br>
      6. Inserir uma Senha válida.<br>
      7. Confirmar uma Senha válida.<br>
      8. Clicar no botão "Cadastrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Nome:</strong> Inserir um Nome válido na base<br>
      - <strong>Email:</strong> Inserir um Email válido na base<br>
      - <strong>Login:</strong> Inserir um Login válido na base<br>
      - <strong>Senha:</strong> Inserir uma Senha válido na base
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de sucesso e permitir o login do novo usuário.</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Cadastro com email já registrado</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede o cadastro de um usuário com um Email já existente.</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplição em um navegador.<br>
      2. Navegar para a tela de cadastro.<br>
      3. Inserir um Nome válido.<br>
      4. Inserir um Email ja cadastrado.<br>
      5. Inserir um Login válida.<br>
      6. Inserir uma Senha válida.<br>
      7. Confirmar uma Senha válida.<br>
      8. Clicar no botão "Cadastrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Nome:</strong> Inserir um Nome válido na base<br>
      - <strong>Email:</strong> Inserir um Email já cadastrado<br>
      - <strong>Login:</strong> Inserir um Login válido na base<br>
      - <strong>Senha:</strong> Inserir uma Senha válido na base
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando que o Email já está em uso.</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Cadastro com email inválido</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede o cadastro de um usuário com um Email inválido.</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplição em um navegador.<br>
      2. Navegar para a tela de cadastro.<br>
      3. Inserir um Nome válido.<br>
      4. Inserir um Email inválido.<br>
      5. Inserir um Login válida.<br>
      6. Inserir uma Senha válida.<br>
      7. Confirmar uma Senha válida.<br>
      8. Clicar no botão "Cadastrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Nome:</strong> Inserir um Nome válido na base<br>
      - <strong>Email:</strong> Inserir um Email inválido<br>
      - <strong>Login:</strong> Inserir um Login válido na base<br>
      - <strong>Senha:</strong> Inserir uma Senha válida na base
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando que o formato de email é inválido</td>
  </tr>
</table>



<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Cadastro com Senha Fraca</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede o cadastro de um usuário com uma senha fraca.</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplição em um navegador.<br>
      2. Navegar para a tela de cadastro.<br>
      3. Inserir um Nome válido.<br>
      4. Inserir um Email válida.<br>
      5. Inserir um Login válida.<br>
      6. Inserir uma Senha fraca.<br>
      7. Confirmar uma Senha fraca.<br>
      8. Clicar no botão "Cadastrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Nome:</strong> Inserir um Nome válido na base<br>
      - <strong>Email:</strong> Inserir um Email válido na base<br>
      - <strong>Login:</strong> Inserir um Login válido na base<br>
      - <strong>Senha:</strong> Inserir uma Senha Inválida
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando que a senha precisa ter ao menos 8 caracteres, incluindo letras e números</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Cadastro com campo obrigatório ausente</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede o cadastro de um usuário com um dos campos obrigatorios ausente.</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplição em um navegador.<br>
      2. Navegar para a tela de cadastro.<br>
      3. Deixar um ou mais campos obrigatorios vazios.<br>
      4. Preencher os demais campos obrigatórios.<br>
      8. Clicar no botão "Cadastrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Nome:</strong> Inserir um Nome válido na base caso preenchido<br>
      - <strong>Email:</strong> Inserir um Email válido na base caso preenchido<br>
      - <strong>Login:</strong> Inserir um Login válido na base caso preenchido<br>
      - <strong>Senha:</strong> Inserir uma Senha válida na base caso preenchido
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando que todos os campos obrigatórios devem ser preenchidos</td>
  </tr>
</table>


### 5.2. Login de Usuário


<table>
  <tr>
    <th colspan="2" width="1000">CT-002<br>Login com credenciais válidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um usuário pode fazer login com sucesso utilizando credenciais válidas.</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplição em um navegador.<br>
      2. Navegar para a tela de Login.<br>
      3. Inserir um Email válido.<br>
      4. Inserir uma Senha válida.<br>
      5. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Email:</strong> Inserir um Email válido na base<br>
      - <strong>Senha:</strong> Inserir uma Senha válida na base
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve redirecionar o usuário para a página inicial da aplicação após o login bem-sucedido.</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-002<br>Login com email incorreto</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema exibe uma mensagem de erro ao tentar login com um Email inválido.</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplição em um navegador.<br>
      2. Navegar para a tela de Login.<br>
      3. Inserir um Email inexistente.<br>
      4. Inserir uma Senha válida.<br>
      5. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Email:</strong> Inserir um Email inválido na base<br>
      - <strong>Senha:</strong> Inserir uma Senha válida na base
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando que não foi possivel encontrar um Usuário com esse Email.</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-002<br>Login com senha incorreta</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema exibe uma mensagem de erro ao tentar login com uma Senha inválido.</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplição em um navegador.<br>
      2. Navegar para a tela de Login.<br>
      3. Inserir um Email válido.<br>
      4. Inserir uma Senha inválida.<br>
      5. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Email:</strong> Inserir um Email válido na base<br>
      - <strong>Senha:</strong> Inserir a Senha inválida na base
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando que a senha esta incorreta.</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-002<br>Login com campos vazios</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema exibe uma mensagem de erro ao tentar login com um ou mais campos ausentes.</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplição em um navegador.<br>
      2. Navegar para a tela de Login.<br>
      3. Não preencher o campo de email e/ou senha.<br>
      4. Preencher os demais campos caso queira.<br>
      5. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Email:</strong> Inserir um Email válido na base caso preenchido<br>
      - <strong>Senha:</strong> Inserir uma Senha válida na base caso preenchido
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando que todos os campos devem ser preenchidos</td>
  </tr>
</table>

### 5.3. Gerenciamento de Marca d'Água no Login do Admin

<table>
  <tr>
    <th colspan="2" width="1000">
      CT-003<br />Upload de marca d'água com imagem válida
    </th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Verificar se o admin consegue fazer upload de uma imagem
      válida para a marca d'água.
    </td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-013: Permite a inclusão e exclusão de marca d`águas.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Fazer login como administrador.<br />
      2. Navegar até a página "Configurações".<br />
      3. Clicar em "+".<br />
      4. Escolher uma imagem válida (JPG, PNG, até 2MB).<br />
      5. Clicar no botão "Enviar".<br />
      6. Verificar a exibição da marca d`água.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>-</td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
     A imagem deve ser exibida na tela e uma mensagem de sucesso deve ser apresentada.
    </td>
  </tr>
</table>
<table>
  <tr>
    <th colspan="2" width="1000">CT-003<br />Remoção da marca d'água atual</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Verificar se o administrador consegue remover a imagem
      atual da marca d'água da tela de login.
    </td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-013: Permite a inclusão e exclusão de marca d`águas.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Fazer login como administrador.<br />
      2. Navegar até a página "Configurações".<br />
      3. Clique no ícone da lixeira. <br />
      4. Confirme a exclusão no modal. <br />
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>-</td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      A imagem deve ser removida e a tela deverá renderizar apenas as marca d`águas não apagadas.
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">
      CT-003<br />Upload de marca d'água com arquivo inválido
    </th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Verifica se sistema impede o upload de arquivos não suportados (como PDF, CSV stc).
    </td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-013: Permite a inclusão e exclusão de marca d`águas.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Fazer login como administrador.<br />
      2. Navegar até a página "Configurações".<br />
      3. Clicar em "+".<br />
      4. Escolher uma imagem válida (JPG, PNG, até 2MB).<br />
      5. Clicar no botão "Enviar".<br />
      6. Verificar a exibição da marca d`água.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>-</td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      A imagem não deverá ser enviada para o BunnyCDN e nem registrada no banco. O sistema deve exibir mensagem de erro.
    </td>
  </tr>
</table>

### 5.3. Edição e Exclusão de Usuários pelo Admin

<table>
  <tr>
    <th colspan="2" width="1000">CT-004<br />Edição de dados do usuário</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Verifica se o administrador consegue editar com sucesso
      os dados de um usuário cadastrado.
    </td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002:	Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Fazer login como administrador.<br />
      2. Navegar até a página "Cadastro realizados".<br />
      3. Clicar em “Editar” no usuário desejado.<br />
      4. Alterar os campos permitidos (ex.: nome, email, senha).<br />
      5. Clicar em “Salvar”.<br />
      6. Confirmar se os dados foram atualizados.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - Nome: João da Silva → João Pedro da Silva<br />
      - Email: joao@email.com → joaopedro@email.com
      - Senha: '' → 'joao1234'
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      O sistema deve salvar e refletir as mudanças feitas pelo admin na listagem
      de usuários.
    </td>
  </tr>
</table>
<table>
  <tr>
    <th colspan="2" width="1000">CT-004<br />Exclusão de usuário do sistema</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Verifica se o administrador pode excluir um usuário do
      sistema com sucesso.
    </td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002:	Sistema de cadastro, leitura, atualização e exclusão de clientes.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Fazer login como administrador.<br />
      2. Navegar até a página "Cadastro realizados".<br />
      3. Clicar em “Excluir” no usuário desejado.<br />
      4. Confirmar a exclusão.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>- Usuário: João Pedro da Silva (ID 123)</td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      O sistema deve remover o usuário selecionado e exibir uma mensagem de
      sucesso.
    </td>
  </tr>
</table>

### 5.4. Criação de novo ensaio com imagens

<table>
  <tr>
    <th colspan="2" width="1000">CT-005<br />Criação de novo ensaio com imagens</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Verificar se a fotógrafa consegue criar um novo ensaio com título, categoria e imagens.
    </td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>
      RF-007: Cadastrar fotos tiradas em eventos públicos e privados<br />
      RF-010: Upload de fotos - Ver, alterar e apagar
    </td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Fazer login como fotógrafa.<br />
      2. Clicar em “Criar nova galeria”.<br />
      3. Preencher o título do ensaio.<br />
      4. Selecionar uma categoria.<br />
      5. Selecionar uma ou mais imagens para upload.<br />
      6. Clicar em “Criar”.<br />
      7. Verificar se o ensaio aparece na galeria.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>- </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      O ensaio deve ser salvo com sucesso e listado na galeria, com a mensagem "Ensaio criado com sucesso!" visível.
    </td>
  </tr>
</table>



<table>
  <tr>
    <th colspan="2" width="1000">CT-006<br />Validação de campos obrigatórios no novo ensaio</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Verificar se o sistema impede o envio do formulário sem o preenchimento dos campos obrigatórios.</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Validação</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-007, RF-010</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Fazer login como fotógrafa.<br />
      2. Abrir o formulário de novo ensaio.<br />
      3. Preencher apenas o título.<br />
      4. Deixar categoria e imagens vazias.<br />
      5. Clicar em “Criar”.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>- </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir a mensagem "Preencha todas as informações e adicione imagens antes de criar o ensaio!" e impedir a criação.</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-007<br />Adição de imagem ao álbum existente</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Verificar se a fotógrafa consegue adicionar novas imagens a um álbum existente.</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-010: Upload de fotos - Ver, alterar e apagar</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Fazer login como fotógrafa.<br />
      2. Acessar a galeria de clientes.<br />
      3. Abrir um álbum existente.<br />
      4. Clicar no botão “+”.<br />
      5. Selecionar uma imagem.<br />
      6. Confirmar o envio.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>- </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>A imagem deve aparecer no álbum e a mensagem "Foto adicionada com sucesso!" deve ser exibida.</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-008<br />Exclusão de imagem com modal de confirmação</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Verificar se o sistema exibe um modal de confirmação visual ao tentar excluir uma imagem.</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Interface / Confirmação</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-010</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Acessar um álbum com imagens.<br />
      2. Clicar nos três pontinhos de uma imagem.<br />
      3. Selecionar “Excluir”.<br />
      4. Confirmar a ação no modal exibido.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>- </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>A imagem é removida da galeria e a mensagem "Foto deletada com sucesso" deve ser exibida.</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="2" width="1000">CT-009<br />Exclusão de álbum com confirmação estilizada</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Verificar se o sistema solicita confirmação estilizada ao excluir um álbum e remove todas as imagens vinculadas.</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Interface / Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-007, RF-010</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Acessar a galeria de clientes.<br />
      2. Clicar nos três pontinhos de um álbum.<br />
      3. Selecionar “Excluir”.<br />
      4. Confirmar a exclusão no modal.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>- </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O álbum e todas as imagens vinculadas devem ser excluídas. Exibir mensagem “Álbum apagado com sucesso!”.</td>
  </tr>
</table>


  
## 6. Ferramentas e Ambiente de Teste

Os testes serão conduzidos em:

- Ambiente web responsivo
- Navegadores: Chrome, Opera, Firefox, Edge, Opera GX,
- Ferramentas: Postman (testes de API).

## 7. Considerações Finais

Este plano de testes garantirá que as funcionalidades de cadastro e login estejam seguras e funcionais. Ajustes serão feitos conforme os resultados dos testes e feedbacks coletados durante a execução.


 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

### Cadastro de Usuário
<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Cadastro com credenciais válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O sistema deve exibir uma mensagem de sucesso e permitir o login do novo usuário.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Rafael Cassiano </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 03/04/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)O sistema está permitindo o cadastro corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/141cb65f-0efd-47a7-a2dc-03ea3d0e1f72"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Cadastro com email já registrado</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O sistema deve exibir uma mensagem de erro informando que o Email ou Login já está em uso.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Rafael Cassiano </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 03/04/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)Este caso de teste verifica se o sistema impede o cadastro de um usuário com um Email ou Login já existente. </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/3dae09ab-efdb-4cd5-ba93-41cd62f91d9d"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Cadastro com email inválido</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5"> O sistema deve exibir uma mensagem de erro informando que o formato de email é inválido</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Rafael Cassiano</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 03/04/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)Este caso de teste verifica se o sistema impede o cadastro de um usuário com um Email inválido.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/dd026f8b-542f-4b20-9c85-2a5b8dadc690"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Cadastro com Senha Fraca</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Insuucesso) O sistema deve exibir uma mensagem de erro informando que a senha precisa ter ao menos 8 caracteres, incluindo letras e números</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Rafael Cassiano</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 03/04/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Insuucesso)Este caso de teste verifica se o sistema impede o cadastro de um usuário com uma senha fraca. Não esta fazendo validação da senha!</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/264b2de5-8371-495c-8509-07b5d562f902"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Cadastro com campo obrigatório ausente</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5"> O sistema deve exibir uma mensagem de erro informando que todos os campos obrigatórios devem ser preenchidos</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Rafael Cassiano </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 03/04/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Insuucesso)Este caso de teste verifica se o sistema impede o cadastro de um usuário com um dos campos obrigatorios ausente. Foi possível fazer o cadastro com dados ausentes.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/8b7bc031-63af-446f-b237-f55e889c25e8"/></td>
  </tr>
</table>


### Login de Usuário


<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Login com credenciais válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O sistema deve redirecionar o usuário para a página inicial da aplicação após o login bem-sucedido.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Bárbara Sena </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 03/04/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso) Este caso de teste verifica se um usuário pode fazer login com sucesso utilizando credenciais válidas. Foi possível realizar login com credencias válidas</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/b1eaaa1f-ad9e-4bab-91f2-479385ff0875"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Login com email incorreto</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Insucesso) O sistema deve exibir uma mensagem de erro informando que não foi possivel encontrar um Usuário com esse Email.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Bárbara Sena </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 03/04/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso) Este caso de teste verifica se o sistema exibe uma mensagem de erro ao tentar login com um Email inválido ou que não tem cadastro no sistema. O sistema exibe mensagem genérica ao tentar acessar com e-mail inválido e com e-mail que não tem cadastro no sistema.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
     <td colspan="6" align="center">
       <video src="https://github.com/user-attachments/assets/3dd8638d-b280-4b6f-ae19-7678b78fa69e"/>
     </td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Login com senha incorreta</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Insucesso) O sistema deve exibir uma mensagem de erro informando que a senha esta incorreta.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">  Bárbara Sena </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 03/04/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso) Este caso de teste verifica se o sistema exibe uma mensagem de erro ao tentar login com uma Senha inválido. O sistema não permite o login do usuário que digitou a senha errada. Uma mensagem de erro genérica é exibida e não é informado qual campo está errado por questão de segurança.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/b2ab94c2-d65e-465b-9601-05a0e57a61ba"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Login com campos vazios</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Insucesso) O sistema deve exibir uma mensagem de erro informando que todos os campos devem ser preenchidos</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">  Bárbara Sena </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 03/04/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso) Este caso de teste verifica se o sistema exibe uma mensagem de erro ao tentar login com um ou mais campos ausentes. O sistema não permite tentar realizar login com a ausência dos campos.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/3e156acc-3e7c-4e38-91ed-fb5f7d59698c"/></td>
  </tr>
</table>

### Gerenciamento de Marca d'Água no Login do Admin
<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Upload de marca d'água com imagem válida</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O admin deve conseguir fazer upload de uma imagem válida para a marca d'água.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Bárbara Sena </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 02/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)A imagem é exibida na tela e uma mensagem de sucesso é apresentada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/a3978f8c-f1bd-4b91-9c3a-d00807ba2e43"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Remoção de marca d'água</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O administrador deve conseguir remover a marca d'água que desejar.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Bárbara Sena </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 02/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)A imagem é removida e a tela renderiza apenas as marca d`águas não apagadas.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6ee1fad6-079c-4b60-8c3b-73c238cc1641"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Upload de marca d'água com arquivo inválido</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O sistema deve impedir o upload de arquivos não suportados (como PDF, CSV stc).</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Bárbara Sena </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 02/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)A imagem não é enviada para o BunnyCDN e nem registrada no banco. O sistema exibe mensagem de erro.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/3f2576ac-f80e-41cf-9120-06afd40e6947"/></td>
  </tr>
</table>

### Edição e Exclusão de Usuários pelo Admin
<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Edição de dados do usuário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O administrador deve conseguir editar com sucesso os dados de um usuário cadastrado.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Bárbara Sena </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 02/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)O sistema salva e reflete as mudanças feitas pelo admin na listagem de usuários.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/ab73920b-7b41-41c6-834b-60a136b1d2fb"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Exclusão de usuário do sistema</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) o administrador pode excluir um usuário do sistema com sucesso.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Bárbara Sena </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 02/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso) O sistema remove o usuário selecionado e exibe uma mensagem de sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/3e546591-4b0f-4c5d-8bd0-9548cd5e12e6"/></td>
  </tr>
</table>


### Criação de novo ensaio com imagens

<table>
  <tr>
    <th colspan="6" width="1000">CT-005<br>Criação de novo ensaio com imagens</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O ensaio deve ser salvo com sucesso e listado na galeria com a mensagem "Ensaio criado com sucesso!" visível.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Data do Teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso) O ensaio foi criado e as imagens foram exibidas corretamente na galeria.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/266c08d9-18b2-4251-9772-b4ce6e703d42"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-006<br>Validação de campos obrigatórios no novo ensaio</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Validação) O sistema deve bloquear a criação do ensaio e exibir a mensagem de erro ao deixar campos obrigatórios em branco.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Data do Teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(Validação) A validação foi acionada corretamente e o botão "Criar" não finalizou o envio.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/94d39d0f-717c-4595-8eac-1b752cc6eedc"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-007<br>Adição de imagem ao álbum existente</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) A imagem deve aparecer no álbum e a mensagem "Foto adicionada com sucesso!" deve ser exibida.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Data do Teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso) O botão de upload funcionou corretamente e atualizou o estado da galeria.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/0ab20213-ab1f-4b9b-afad-65c0f10780a8"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-008<br>Exclusão de imagem com modal de confirmação</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) A imagem deve ser excluída da galeria após confirmação no modal. A mensagem "Foto deletada com sucesso!" deve ser exibida.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Data do Teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso) A exclusão foi feita com modal estilizado e resposta rápida no front-end.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/82c37da3-b635-41f6-95e8-6bfbc5c40c8f"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-009<br>Exclusão de álbum com confirmação estilizada</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O álbum e suas imagens devem ser excluídos após confirmação. Mensagem "Álbum apagado com sucesso!" exibida.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Data do Teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso) O modal estilizado foi exibido corretamente e a exclusão refletiu imediatamente na interface.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/0d783c63-685f-456c-a302-a2af0b7073d0"/></td>
  </tr>
</table>




### Cadastro de Produtos
<table>
  <tr>
    <th colspan="6" width="1000">CT-014<br>Cadastro de produtos com dados Válidos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O sistema deve exibir uma mensagem de sucesso, retornando para lista de Produtos Cadastrados</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Rafael Cassiano </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 04/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)O sistema está permitindo o cadastro corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/c7e7d348-267b-48b2-8b01-74faec5e9ae4"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-014<br>Cadastro com falta de informações</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O sistema deve exibir uma mensagem de erro, informando os campos que precisam ser preenchidos</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Rafael Cassiano </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)Este caso de teste verifica se o sistema impede o cadastro de um produto com falta de dados </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/896d86a8-caaa-4ce6-a017-6fabb60bfa1c"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-014<br>Edição de produtos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5"> O sistema deve deixar o usuário fazer alterações no produto, menos no campo Evento</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Rafael Cassiano</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 04/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)Este caso de teste verifica se o sistema deixa o Admin fazer alterações no produto.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/98d503d1-0f17-42ce-8167-eacaca12d3cc"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-014<br>Exclusao de produtos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(sucesso) O sistema deve deixar o Admin remover os produtos quando achar necessário</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Rafael Cassiano</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 04/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(sucesso)Este caso de teste verifica se o sistema permite ao Admin remover produtos</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/fabe724a-bb0d-47cb-a0ef-3d6132431d31"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-014<br>Busca por Produtos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5"> O sistema deve retornar os registro após o usuário fazer um busca</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Rafael Cassiano </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 04/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(sucesso)Este caso de teste verifica se o sistema permite ao usuário de fazer buscas.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/1dac8711-4430-48e2-a9b7-78c11c0d7172"/></td>
  </tr>
</table>


### Edição de Perfil do Cliente

<table>
  <tr>
    <th colspan="6" width="1000">CT-015<br>Edição de dados do Usuário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O usuário deve conseguir editar com sucesso os seus dados</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Adriel Agnes Costa Bosco </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 04/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)O sistema salva e reflete as mudanças feitas pelo usuário.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6ad1991f-9060-45ba-a5c7-5ae5a7751174"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-015<br>Edição de dados para um Login ja Registrado</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve exibir uma mensagem de erro informando que o Login já está em uso</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Adriel Agnes Costa Bosco </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 04/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Este caso de teste verifica se o sistema impede o usuário modifique seu Login para um já existente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6d887160-281b-43a8-a399-80a6c1bbfe5a"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-015<br>Edição de dados para um Email ja Registrado</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve exibir uma mensagem de erro informando que o Email já está em uso</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Adriel Agnes Costa Bosco </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 04/05/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Este caso de teste verifica se o sistema impede o usuário modifique seu Email para um já existente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/d68a1f1e-fd6c-435c-823e-c5791334ab55"/></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).
      
### 1. Gerenciamento de Marca d'Água no Login do Admin

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Upload de marca d'água com imagem válida</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O admin deve conseguir  fazer upload de uma imagem válida para a marca d'água.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Bárbara Fernandes Sena </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Gleyston Guimarães </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">02/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">A imagem é exibida na tela e uma mensagem de sucesso é apresentada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/379e454e-e0e4-407a-a93e-31eb053672fd"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Remoção de marca d'água</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O administrador deve conseguir remover a marca d'água que desejar.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Bárbara Fernandes Sena </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Gleyston Guimarães </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">02/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">A imagem é removida e a tela renderiza apenas as marca d`águas não apagadas.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/f1d469c7-5e14-46c0-ad6a-84201ab413bf"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Upload de marca d'água com arquivo inválido</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve impedir o upload de arquivos não suportados (como PDF, CSV stc).</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Bárbara Fernandes Sena </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Gleyston Guimarães </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">02/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">A imagem não é enviada para o BunnyCDN e nem registrada no banco. O sistema exibe mensagem de erro.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/7ff48eb5-8fc9-4a7d-a7b9-0769ed3dabbb"/></td>
  </tr>
</table>

### 2. Edição e Exclusão de Usuários pelo Admin


<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Edição de dados do usuário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Verificar se o administrador consegue editar com sucesso os dados de um usuário cadastrado.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Bárbara Fernandes Sena </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Gleyston Guimarães </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">02/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema salva e reflete as mudanças feitas pelo admin na listagem de usuários.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/b6b01845-0838-4862-a30b-70ba41ed2b64"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Exclusão de usuário do sistema</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Verificar se o administrador pode excluir um usuário do sistema com sucesso.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Bárbara Fernandes Sena </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Gleyston Guimarães </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">02/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema remove o usuário selecionado e exibe uma mensagem de sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/2070d1d1-ffad-4076-be7f-98f999262798"/></td>
  </tr>
</table>



### 3. Criação de novo ensaio com imagens


<table>
  <tr>
    <th colspan="6" width="1000">CT-005<br>Criação de novo ensaio com imagens</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O ensaio deve ser criado com título, categoria e imagens e listado com mensagem de sucesso.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Bárbara Fernandes Sena</td>
    <td><strong>Data do teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">Criação realizada com sucesso, imagens renderizadas e mensagem exibida corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/03240bf3-cb2f-4e03-881b-47840913d4a5"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-006<br>Validação de campos obrigatórios no novo ensaio</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve impedir o envio de ensaio sem imagens ou sem categoria, exibindo aviso claro.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Bárbara Fernandes Sena</td>
    <td><strong>Data do teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">O botão de criação bloqueou o envio corretamente e a mensagem de erro apareceu em destaque.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6405dcd4-4b5e-4c76-af56-e5530f004514"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-007<br>Adição de imagem ao álbum existente</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">A nova imagem deve ser adicionada corretamente ao álbum e renderizada na tela com mensagem.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Bárbara Fernandes Sena</td>
    <td><strong>Data do teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">O upload da imagem foi imediato e a galeria se atualizou automaticamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/9cc2147d-3915-43a7-8f29-0bcc07c74a7f"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-008<br>Exclusão de imagem com modal de confirmação</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Modal de confirmação deve ser exibido e, após confirmação, a imagem removida com mensagem.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Bárbara Fernandes Sena</td>
    <td><strong>Data do teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">Modal personalizado exibido no centro da tela. Exclusão e feedback executados corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/96a434ab-c80c-4af1-b52b-195e3120012c"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-009<br>Exclusão de álbum com confirmação estilizada</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Confirmação visual deve ser exibida, e ao confirmar, o álbum e suas imagens devem ser removidos.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Gleyston Guimaraes Silva</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Bárbara Fernandes Sena</td>
    <td><strong>Data do teste</strong></td>
    <td>03/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">O modal de exclusão apareceu com a estética esperada. A exclusão afetou imediatamente a interface.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/62ecd005-41b5-4464-84e4-af1ca2f4e8ca"/></td>
  </tr>
</table>

### 4. Cadastro de Produtos


<table>
  <tr>
    <th colspan="6" width="1000">CT-014 <br>Cadastro de produtos com dados Válidos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O sistema deve exibir uma mensagem de sucesso, retornando para lista de Produtos Cadastrados</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Rafael Cassiano</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Adriel Agnes Costa Bosco</td>
    <td><strong>Data do teste</strong></td>
    <td>04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)O sistema está permitindo o cadastro corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4985d0d8-c662-4fa1-a1f3-4a51e0b8d06f"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-014 <br>Cadastro com falta de informações</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve exibir uma mensagem de erro, informando os campos que precisam ser preenchidos</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Rafael Cassiano</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Adriel Agnes Costa Bosco</td>
    <td><strong>Data do teste</strong></td>
    <td>04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">Este caso de teste verifica se o sistema impede o cadastro de um produto com falta de dados</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6cb45da0-6fe7-47c5-8928-f0c6519e9ddb"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-014 <br>Edição de produtos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve deixar o usuário fazer alterações no produto, menos no campo Evento</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Rafael Cassiano</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Adriel Agnes Costa Bosco</td>
    <td><strong>Data do teste</strong></td>
    <td>04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)Este caso de teste verifica se o sistema deixa o Admin fazer alterações no produto.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/a89d1218-2382-4b50-976c-ec10bd59ed33"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-014 <br>Exclusao de produtos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(sucesso) O sistema deve deixar o Admin remover os produtos quando achar necessário</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Rafael Cassiano</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Adriel Agnes Costa Bosco</td>
    <td><strong>Data do teste</strong></td>
    <td>04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(sucesso)Este caso de teste verifica se o sistema permite ao Admin remover produtos.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/9a014892-a707-44dd-9a26-d13a7646cd04"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-014 <br>Busca por Produtos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve retornar os registro após o usuário fazer um busca</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Rafael Cassiano</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Adriel Agnes Costa Bosco</td>
    <td><strong>Data do teste</strong></td>
    <td>04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(sucesso)Este caso de teste verifica se o sistema permite ao usuário de fazer buscas.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/9b42e415-3cca-4487-82d6-aefb5e6d6096"/></td>
  </tr>
</table>


### 4. Perfil do Usuário


<table>
  <tr>
    <th colspan="6" width="1000">CT-015 <br>Alterar dados Perfil Usuário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Sucesso) O sistema deve exibir uma mensagem de sucesso após atualizar os dados</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Adriel Agnes Costa Bosco</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Rafael Cassiano</td>
    <td><strong>Data do teste</strong></td>
    <td>04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">(Sucesso)O sistema está permitindo o usuário a fazer alteração dos seus dados</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="#"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-015 <br>Alterar dados Usuário com login existente</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema não deve iserir um login já existente! Exibir uma mensagem de erro, informando que o login já existe</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Adriel Agnes Costa Bosco</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Rafael Cassiano</td>
    <td><strong>Data do teste</strong></td>
    <td>04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">Este caso de teste verifica se existe o login informado pelo usuário, caso exista, o sistema impede o cadastro.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="#"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-015 <br>Alterar dados Usuário com Email existente</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema não deve iserir um Email já existente! Exibir uma mensagem de erro, informando que o email já existe</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td>Adriel Agnes Costa Bosco</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td>Rafael Cassiano</td>
    <td><strong>Data do teste</strong></td>
    <td>04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Comentário</strong></td>
    <td colspan="5">Este caso de teste verifica se existe o Email informado pelo usuário, caso exista, o sistema impede o cadastro.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="#"/></td>
  </tr>
</table>


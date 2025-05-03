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
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
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
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
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
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
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
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
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
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
  </tr>
</table>






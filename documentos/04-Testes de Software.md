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
    <td width="430"> n/a </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> n/a </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Este caso de teste verifica se o sistema exibe uma mensagem de erro ao tentar login com um Email inválido.</td>
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
    <th colspan="6" width="1000">CT-002<br>Login com senha incorreta</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Insucesso) O sistema deve exibir uma mensagem de erro informando que a senha esta incorreta.</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> n/a </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> n/a </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Este caso de teste verifica se o sistema exibe uma mensagem de erro ao tentar login com uma Senha inválido.</td>
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
    <th colspan="6" width="1000">CT-002<br>Login com campos vazios</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">(Insucesso) O sistema deve exibir uma mensagem de erro informando que todos os campos devem ser preenchidos</td>
  </tr>
    <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> n/a </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> n/a </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Este caso de teste verifica se o sistema exibe uma mensagem de erro ao tentar login com um ou mais campos ausentes.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

### Exemplo
<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Login com credenciais válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve redirecionar o usuário para a página inicial do aplicativo após o login bem-sucedido.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">José da Silva </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Maria Oliveira </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">08/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
  </tr>
</table>




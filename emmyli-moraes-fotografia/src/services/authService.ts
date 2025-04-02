const API_URL = 'http://localhost:3000';

// Função para realizar o login

export const loginUser = async (usernameOrEmail: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    if (!response.ok) {
      throw new Error('O e-mail ou a senha estão incorretos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Ocorreu um erro, tente novamente');
  }
};

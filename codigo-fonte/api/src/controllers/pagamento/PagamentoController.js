// pagamentoController.js
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-4408220913517581-053116-d32addaa3e560bbfd22bcfb28f4d8876-2467253734' }); //ACCESS TOKEN DE TESTE
const preference = new Preference(client);

const criarPreferencia = async (req, res) => {
  const { items } = req.body;

  try {
    const result = await preference.create({
      body: {
        items,
        external_reference: req.body.external_reference,
        "back_urls": {
          "success": "https://emmylifotografias.com.br/pagamento-aprovado",
          "failure": "https://emmylifotografias.com.br/pagamento-recusado",
          "pending": "https://emmylifotografias.com.br/pagamento-pendente",
        },
        "auto_return": "approved",
      },
    });
    
    res.json({ result });
    console.log("resultback", result)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
};

module.exports = { criarPreferencia };

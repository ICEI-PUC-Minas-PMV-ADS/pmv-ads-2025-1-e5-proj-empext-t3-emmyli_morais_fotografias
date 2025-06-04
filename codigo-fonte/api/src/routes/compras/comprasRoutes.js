const express = require('express');
const router = express.Router();
const comprasController = require('../../controllers/compras/ComprasController');
const factoryMiddlewareNotification = require('../../middleware/geradorMiddlewaresNotificacao');
const verifyToken = require('../../middleware/AuthMiddlewareToken');

const notificarNovaCompra = factoryMiddlewareNotification(
    (req) => {
        return {
            topico: "Compra",
            acao: `Nova compra criado para ${req.nome}`, // TODO: trocar idusuario por nome que vem do token
            local_acao: "Compras"
        }
    }
)

router.get('/', comprasController.getAll);
router.get('/:id', comprasController.getById);
router.post('/', [verifyToken, notificarNovaCompra], comprasController.create)
router.put('/:id', comprasController.update);
router.delete('/:id', comprasController.delete);

module.exports = router;

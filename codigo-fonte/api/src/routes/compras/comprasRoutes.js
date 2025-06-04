const express = require('express');
const router = express.Router();
const comprasController = require('../../controllers/compras/ComprasController');
const factoryMiddlewareNotification = require('../../middleware/geradorMiddlewaresNotificacao');

const notificarNovoAlbum = factoryMiddlewareNotification(
    (req) => {
        return {
            topico: "Album",
            acao: `Novo album criado para ${req.nome}`, // TODO: trocar idusuario por nome que vem do token
            local_acao: "Albuns"
        }
    }
)

router.get('/', comprasController.getAll);
router.get('/:id', comprasController.getById);
router.post('/', notificarNovoAlbum, comprasController.create)
router.put('/:id', comprasController.update);
router.delete('/:id', comprasController.delete);

module.exports = router;

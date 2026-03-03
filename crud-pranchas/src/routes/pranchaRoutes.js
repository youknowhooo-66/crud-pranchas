import express from 'express';
import {
  criarPrancha,
  listarPranchas,
  buscarPrancha,
  atualizarPrancha,
  deletarPrancha
} from '../controllers/pranchaController.js';

const router = express.Router();

router.post('/', criarPrancha);
router.get('/', listarPranchas);
router.get('/:id', buscarPrancha);
router.put('/:id', atualizarPrancha);
router.delete('/:id', deletarPrancha);

export default router;
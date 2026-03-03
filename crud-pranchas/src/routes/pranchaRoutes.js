import express from 'express';
import {
  criarPrancha,
  listarPranchas,
  buscarPrancha,
  atualizarPrancha,
  deletarPrancha,
  deletarVariasPranchas
} from '../controllers/pranchaController.js';

const router = express.Router();

router.post('/', criarPrancha);           // Criar
router.get('/', listarPranchas);          // Listar todas
router.get('/:id', buscarPrancha);        // Buscar por ID
router.patch('/:id', atualizarPrancha);   // Atualizar atributos
router.delete('/:id', deletarPrancha);    // Deletar 1 prancha
router.delete('/', deletarVariasPranchas);// Deletar múltiplas

export default router;
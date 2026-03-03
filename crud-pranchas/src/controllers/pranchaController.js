import prisma from '../models/prismaClient.js';

// Criar
export const criarPrancha = async (req, res) => {
  try {
    const prancha = await prisma.prancha.create({
      data: req.body
    });
    res.status(201).json(prancha);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar
export const listarPranchas = async (req, res) => {
  const pranchas = await prisma.prancha.findMany();
  res.json(pranchas);
};

// Buscar por ID
export const buscarPrancha = async (req, res) => {
  const { id } = req.params;

  const prancha = await prisma.prancha.findUnique({
    where: { id: Number(id) }
  });

  if (!prancha) {
    return res.status(404).json({ error: "Prancha não encontrada" });
  }

  res.json(prancha);
};

// Atualizar
export const atualizarPrancha = async (req, res) => {
  const { id } = req.params;

  const prancha = await prisma.prancha.update({
    where: { id: Number(id) },
    data: req.body
  });

  res.json(prancha);
};

// Deletar
export const deletarPrancha = async (req, res) => {
  const { id } = req.params;

  await prisma.prancha.delete({
    where: { id: Number(id) }
  });

  res.json({ mensagem: "Prancha deletada com sucesso" });
};
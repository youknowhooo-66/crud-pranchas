import prisma from '../models/prismaClient.js';

// Criar prancha
export const criarPrancha = async (req, res) => {
  try {
    const { nome, modelo, tamanho, tipo, preco, status } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !tamanho || !tipo) {
      return res.status(400).json({ error: "Campos obrigatórios: nome, tamanho, tipo" });
    }

    // Criação da prancha
    const prancha = await prisma.prancha.create({
      data: {
        nome,
        modelo: modelo || null,
        tamanho,
        tipo,
        preco: preco ? Number(preco) : null, // Decimal
        status: status || undefined // Default DISPONIVEL será usado
      }
    });

    res.status(201).json(prancha);
  } catch (error) {
    console.error("Erro ao criar prancha:", error);
    res.status(500).json({ error: error.message });
  }
};

// Listar todas as pranchas
export const listarPranchas = async (req, res) => {
  try {
    const pranchas = await prisma.prancha.findMany();
    res.json(pranchas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar por ID
export const buscarPrancha = async (req, res) => {
  const { id } = req.params;
  try {
    const prancha = await prisma.prancha.findUnique({ where: { id: Number(id) } });
    if (!prancha) return res.status(404).json({ error: "Prancha não encontrada" });
    res.json(prancha);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar atributos
export const atualizarPrancha = async (req, res) => {
  const { id } = req.params;
  try {
    const prancha = await prisma.prancha.update({
      where: { id: Number(id) },
      data: req.body
    });
    res.json(prancha);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ error: "Prancha não encontrada" });
    res.status(500).json({ error: error.message });
  }
};

// Deletar 1 prancha
export const deletarPrancha = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.prancha.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ error: "Prancha não encontrada" });
    res.status(500).json({ error: error.message });
  }
};

// Deletar múltiplas pranchas
export const deletarVariasPranchas = async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: "IDs inválidos" });
  try {
    await prisma.prancha.deleteMany({ where: { id: { in: ids.map(Number) } } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
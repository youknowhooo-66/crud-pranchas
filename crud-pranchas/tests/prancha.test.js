import request from 'supertest';
import app from '../src/app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('API de Pranchas - CRUD', () => {

  // Limpa a tabela antes de cada teste
  beforeEach(async () => {
    await prisma.prancha.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // =======================
  // CREATE
  // =======================
  test('POST /pranchas - deve criar uma nova prancha', async () => {
    const res = await request(app)
      .post('/pranchas')
      .send({
        nome: 'Prancha Teste',
        modelo: 'Modelo T',
        tamanho: "6'0",
        tipo: 'Shortboard',
        preco: 1200
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Prancha Teste');
  });

  // =======================
  // READ ALL
  // =======================
  test('GET /pranchas - deve listar todas as pranchas', async () => {
    await prisma.prancha.create({
      data: {
        nome: 'Prancha Lista',
        modelo: 'Modelo L',
        tamanho: "6'2",
        tipo: 'Longboard',
        preco: 1500
      }
    });

    const res = await request(app).get('/pranchas');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('nome', 'Prancha Lista');
  });

  // =======================
  // READ ONE
  // =======================
  test('GET /pranchas/:id - deve retornar uma prancha pelo id', async () => {
    const prancha = await prisma.prancha.create({
      data: {
        nome: 'Prancha Única',
        modelo: 'Modelo U',
        tamanho: "6'3",
        tipo: 'Funboard',
        preco: 1300
      }
    });

    const res = await request(app).get(`/pranchas/${prancha.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Prancha Única');
  });

  test('GET /pranchas/:id - deve retornar 404 se não encontrar', async () => {
    const res = await request(app).get('/pranchas/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Prancha não encontrada');
  });

  // =======================
  // UPDATE
  // =======================
  test('PATCH /pranchas/:id - deve atualizar uma prancha', async () => {
    const prancha = await prisma.prancha.create({
      data: {
        nome: 'Prancha Atual',
        modelo: 'Modelo A',
        tamanho: "5'10",
        tipo: 'Fish',
        preco: 1100
      }
    });

    const res = await request(app)
      .patch(`/pranchas/${prancha.id}`)
      .send({ preco: 1200, status: 'VENDIDA' });

    expect(res.statusCode).toBe(200);
    expect(Number(res.body.preco)).toBe(1200);
    expect(res.body.status).toBe('VENDIDA');
  });

  // =======================
  // DELETE ONE
  // =======================
  test('DELETE /pranchas/:id - deve deletar uma prancha', async () => {
    const prancha = await prisma.prancha.create({
      data: {
        nome: 'Prancha Remover',
        modelo: 'Modelo R',
        tamanho: "6'4",
        tipo: 'Gun',
        preco: 1600
      }
    });

    const res = await request(app).delete(`/pranchas/${prancha.id}`);
    expect(res.statusCode).toBe(204);

    // Confirma que realmente foi removida
    const deleted = await prisma.prancha.findUnique({ where: { id: prancha.id } });
    expect(deleted).toBeNull();
  });

  // =======================
  // DELETE MULTIPLE
  // =======================
  test('DELETE /pranchas - deve deletar múltiplas pranchas', async () => {
    const p1 = await prisma.prancha.create({
      data: { nome: 'A', modelo: 'M1', tamanho: "5'5", tipo: 'Fish' }
    });
    const p2 = await prisma.prancha.create({
      data: { nome: 'B', modelo: 'M2', tamanho: "6'0", tipo: 'Shortboard' }
    });

    const res = await request(app).delete('/pranchas').send({ ids: [p1.id, p2.id] });
    expect(res.statusCode).toBe(204);

    const remaining = await prisma.prancha.findMany();
    expect(remaining.length).toBe(0);
  });
});
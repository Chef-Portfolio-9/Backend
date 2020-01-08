const request = require('supertest');

const server = require('../../api/server');

const db = require('../../data/dbConfig');

describe('chefsRouter', function() {
	// environment test----------------------------
	describe('environment', function() {
		it('should set environment to testing', function() {
			expect(process.env.DB_ENV).toBe('testing');
		});
	});

	// Global GET for gathering all the chefs
	describe('GET /', function() {
		beforeEach(async function() {
			await db('chefs').truncate();
		});
		it('should return a json', function() {
			return request(server)
				.get('/api/chefs/')
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		it('Empty Chefs table should return with a status 400', async function() {
			return request(server)
				.get('/api/chefs/')
				.then(res => {
					expect(res.status).toBe(400);
				});
		});
	});

	// GET by id for gathering a specific chef
	describe('GET /:id', function() {
		beforeEach(async function() {
			await db('chefs').truncate();
		});
		it('should return a json', function() {
			const id = 2;

			return request(server)
				.get(`/api/chefs/${id}`)
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		it('Should fail with a status 400', function() {
			const id = 2;

			return request(server)
				.get(`/api/chefs/${id}`)
				.then(res => {
					expect(res.status).toBe(400);
				});
		});
	});

	// GET by id fo gathering a specific chefs recipe
	describe('GET /:id/recipes', function() {
		beforeEach(async function() {
			await db('chefs').truncate();
		});
		it('should return a json', function() {
			const id = 2;

			return request(server)
				.get(`/api/chefs/${id}/recipes`)
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		it('With No chefs registered, it should fail with a status 400', function() {
			const id = 1;

			return request(server)
				.get(`/api/chefs/${id}/recipes`)
				.then(res => {
					expect(res.status).toBe(400);
				});
		});
	});

	// PUT by id for updating a chefs profile
	describe('PUT /:id', async function() {
		beforeEach(async function() {
			await db('chefs').truncate();
        });
        it('should return a json', async function() {
			const id = 2;

			return request(server)
				.get(`/api/chefs/${id}`)
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		it('With No chefs registered, it should fail with a status 400', async function() {
			const id = 1;

			return request(server)
				.get(`/api/chefs/${id}`)
				.then(res => {
					expect(res.status).toBe(400);
				});
		});
    });
    // DELETE by id for a specific chef
    describe('DELETE /:id', async function() {
		beforeEach(async function() {
			await db('chefs').truncate();
        });
        it('should return a json', async function() {
			const id = 2;

			return request(server)
				.get(`/api/chefs/${id}`)
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		it('With No chefs registered, it should fail with a status 400', async function() {
			const id = 1;

			return request(server)
				.get(`/api/chefs/${id}`)
				.then(res => {
					expect(res.status).toBe(400);
				});
		});
    });
});

const request = require('supertest');

const server = require('../../api/server');

const db = require('../../data/dbConfig');

describe('chefsRouter', () => {
	// environment test----------------------------
	describe('environment', () => {
		it('should set environment to testing', () => {
			expect(process.env.DB_ENV).toBe('testing');
		});
	});

	// Global GET for gathering all the chefs
	describe('GET /', () => {
		beforeEach(async () => {
			await db('chefs').truncate();
		});
		it('should return a json', () => {
			return request(server)
				.get('/api/chefs/')
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		it('Empty Chefs table should return with a status 400', async () => {
			return request(server)
				.get('/api/chefs/')
				.then(res => {
					expect(res.status).toBe(400);
				});
		});
	});

	// GET by id for gathering a specific chef
	describe('GET /:id', () => {
		beforeEach(async () => {
			await db('chefs').truncate();
		});
		it('should return a json', () => {
			const id = 2;

			return request(server)
				.get(`/api/chefs/${id}`)
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		
	});

	// GET by id fo gathering a specific chefs recipe
	describe('GET /:id/recipes', () => {
		beforeEach(async () => {
			await db('chefs').truncate();
		});
		it('should return a json', () => {
			const id = 2;

			return request(server)
				.get(`/api/chefs/${id}/recipes`)
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		
	});

	// PUT by id for updating a chefs profile
	describe('PUT /:id', async () => {
		beforeEach(async () => {
			await db('chefs').truncate();
        });
        it('should return a json', async () => {
			const id = 2;

			return request(server)
				.get(`/api/chefs/${id}`)
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		
    });
    // DELETE by id for a specific chef
    describe('DELETE /:id', async () => {
		beforeEach(async () => {
			await db('chefs').truncate();
        });
        it('should return a json', async () => {
			const id = 2;

			return request(server)
				.get(`/api/chefs/${id}`)
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		
    });
});

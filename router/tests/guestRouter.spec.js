const request = require('supertest');

const server = require('../../api/server');

const db = require('../../data/dbConfig');

describe('guestRouter', () => {
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
				.get('/api/chef/')
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		it('Should return with a status 200', async () => {
			return request(server)
				.get('/api/chef/')
				.then(res => {
					expect(res.status).toBe(200);
				});
		});
    });
    // GET by id for gathering a specific chef
	describe('GET /:id', () => {
		beforeEach(async () => {
			await db('chefs').truncate();
		});
		it('should return a 200', () => {
			const id = 2;

			return request(server)
				.get(`/api/chef/${id}`)
				.then(res => {
					expect(res.status).toBe(200);
				});
		});
		
	});

	// GET by id fo gathering a specific chefs recipe
	describe('GET /:id/recipes', () => {
		beforeEach(async () => {
			await db('chefs').truncate();
		});
		it('should return a 404 status', () => {
			const id = 2;

			return request(server)
				.get(`/api/chef/${id}/recipes`)
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		
    });


    // Global GET for gathering all the recipes
	describe('GET /', () => {
		beforeEach(async () => {
			await db('recipes').truncate();
		});
		it('should return a json', () => {
			return request(server)
				.get('/api/chef/')
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		it('Should return with a status 200', async () => {
			return request(server)
				.get('/api/dish/')
				.then(res => {
					expect(res.status).toBe(200);
				});
		});
    });

    
    // GET by id for gathering a specific recipe
	describe('GET /:id', () => {
		beforeEach(async () => {
			await db('recipes').truncate();
		});
		it('should return a 200', () => {
			const id = 2;

			return request(server)
				.get(`/api/dish/${id}`)
				.then(res => {
					expect(res.status).toBe(200);
				});
		});
		
	});
});
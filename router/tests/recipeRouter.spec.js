const request = require('supertest');

const server = require('../../api/server');

const db = require('../../data/dbConfig');

describe('recipeRouter', () => {
    // environment test-------------------------------
    describe('environment', () => {
		it('should set environment to testing', () => {
			expect(process.env.DB_ENV).toBe('testing');
		});
    });
    // Global GET for gathering all the recipes
	describe('GET /', () => {
		beforeEach(async () => {
			await db('recipes').truncate();
		});
		it('should return a json', () => {
			return request(server)
				.get('/api/recipes/')
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
		it('Should return with a status 400', async () => {
                return request(server)
                .get('/api/recipes/')
				.then(res => {
					expect(res.status).toBe(400);
				});
            
				
		});
    });
    describe('GET /:id', () => {
        
    })

})
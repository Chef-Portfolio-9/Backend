const request = require('supertest');

const server = require('../../api/server');

const db = require('../../data/dbConfig');

describe('authChefsRouter', () => {
	// environment test---------------------------------------
	describe('environment', () => {
		it('should set environment to testing', () => {
			expect(process.env.DB_ENV).toBe('testing');
		});
	});

	//REGISTER/LOGIN POST tests-----------------------------------
	describe('Post ', () => {
		beforeEach(async () => {
			await db('chefs').truncate();
		});
		describe('Register chef', () => {
			it('should return with json', () => {
				return request(server)
					.post('/api/auth/chefs/register')
					.send({ username: 'Justin', password: 'Giants' })
					.then(res => {
						expect(res.type).toMatch(/json/i);
					});
			});
		});
		describe('Login chef', () => {
			it('Login Should fail with 401 when bcryptCompare has wrong password', () => {
				return request(server)
					.post('/api/auth/chefs/login')
					.send({ username: 'Jeremy', password: 'Kumquat' })
					.then(res => {
						expect(res.status).toBe(401);
					});
			});
			it('should return json', () => {
				return request(server)
					.post('/api/auth/chefs/login')
					.send({ username: 'Jeremy', password: 'Bear' })
					.then(res => {
						expect(res.type).toMatch(/json/i);
					});
			});
		});
	});
});

const request = require('supertest');

const server = require('../../api/server');

const db = require('../../data/dbConfig');

describe('authChefRouter', function() {
	// environment test---------------------------------------
	describe('environment', function() {
		it('should set environment to testing', function() {
			expect(process.env.DB_ENV).toBe('testing');
		});
    });
    
	//REGISTER/LOGIN POST tests-----------------------------------
	describe('Post ', function() {
		beforeEach(async function() {
			await db('chefs').truncate();
		});
		describe('Register chef', function() {
			it('should return a 201 ok', function() {
				return request(server)
					.post('/api/auth/chefs/register')
					.send({ username: 'Jeremy', password: 'Bear' })
					.then(res => {
						expect(res.status).toBe(201);
					});
			});
			it('should return with json', function() {
				return request(server)
					.post('/api/auth/chefs/register')
					.send({ username: 'Justin', password: 'Giants' })
					.then(res => {
						expect(res.type).toMatch(/json/i);
					});
			});
		});
		describe('Login chef', function() {
			it('Login Should fail with 401 when bcryptCompare has wrong password', function() {
				return request(server)
					.post('/api/auth/chefs/login')
					.send({ username: 'Jeremy', password: 'Kumquat' })
					.then(res => {
						expect(res.status).toBe(401);
					});
			});
			it('should return json', function() {
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

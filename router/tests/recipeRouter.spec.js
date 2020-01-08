const request = require('supertest');

const server = require('../../api/server');

const db = require('../../data/dbConfig');

describe('recipeRouter', function() {
    // environment test-------------------------------
    describe('environment', function() {
		it('should set environment to testing', function() {
			expect(process.env.DB_ENV).toBe('testing');
		});
    });
    
    
})
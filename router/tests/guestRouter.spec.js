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
});
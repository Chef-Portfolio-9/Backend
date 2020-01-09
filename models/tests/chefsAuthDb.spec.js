const Chefs = require('../authModels/chefsAuthDb');
const db = require('../../data/dbConfig');

describe('chefsAuthDb', function() {
	beforeEach(async () => {
		await db('chefs').truncate();
	});
	describe('getBy', () => {
		it('data model should contain certain equal fields and values', async () => {
			await Chefs.add({
				username: 'Jeremy',
				password: 'Bear',
				full_name: 'Jeremy_McWilliams',
				location: 'Dublin'
			});
			await Chefs.getBy({ username: 'Jeremy' });

			const cooks = await db('chefs');
			expect(cooks).toContainEqual({
				full_name: 'Jeremy_McWilliams',
				id: 1,
				location: 'Dublin',
				password: 'Bear',
				restaurant: null,
				username: 'Jeremy'
			});
		});
	});
	describe('add', async () => {
		it('should add chef to the db', async () => {
			await Chefs.add({
				username: 'Jeremy',
				password: 'Bear',
				full_name: 'Jeremy_McWilliams',
				location: 'Dublin'
			});
			await Chefs.add({
				username: 'Justin',
				password: 'Giants',
				full_name: 'Justin_Deering',
				location: 'San_Francisco'
			});

			const kitchen = await db('chefs');
			expect(kitchen).toHaveLength(2);
		});
	});
});

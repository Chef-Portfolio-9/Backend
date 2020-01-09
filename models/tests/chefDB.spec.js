const Chefs = require('../chefDb');
// const Recipes = require('../recipesDb');
const db = require('../../data/dbConfig');

describe('chefDb', () => {
	beforeEach(async () => {
		await db('chefs').truncate();
	});
	describe('get', () => {
		it('get returns what has been added to the db', async () => {
			const kitchen = [
				{
					id: 1,
					username: 'Lewis',
					password: 'Dyno',
					full_name: 'Lewis_Chen',
					location: 'Los_Angeles',
					restaurant: 'BS_Taqueria'
				}
			];

			await Chefs.add({
				username: 'Lewis',
				password: 'Dyno',
				full_name: 'Lewis_Chen',
				location: 'Los_Angeles',
				restaurant: 'BS_Taqueria'
			});
			await Chefs.get();
			const cooks = await db('chefs');
			expect(cooks).toEqual(kitchen);
		});
	});
	describe('getById', async () => {
		it('should return a specific chef', async () => {
			const chef = [
				{
					full_name: 'Jeremy_McWilliams',
					id: 1,
					location: 'Dublin',
					password: 'Bear',
					restaurant: null,
					username: 'Jeremy'
				}
			];

			await Chefs.add({
				username: 'Jeremy',
				password: 'Bear',
				full_name: 'Jeremy_McWilliams',
				location: 'Dublin'
			});

			await Chefs.getById(1);
			const cooks = await db('chefs');
			expect(cooks).toMatchObject(chef);
		});
	});
	describe('add', async () => {
		it('should add a chef to the Db', async () => {
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
				location: 'SanFrancisco',
				restaurant: 'Scalas'
			});
			await Chefs.add({
				username: 'Neil',
				password: 'Grace',
				full_name: 'Neil_Frasier',
				location: 'LosAngeles',
				restaurant: 'Redbird'
			});
			const cooks = await db('chefs');
			expect(cooks).toHaveLength(3);
		})
	})
	describe('update', async () => {
		it('should update a specific chef', async () => {
			const kitchen = [
				{
					full_name: 'Jeremy_McWilliams',
					id: 1,
					location: 'Alameda',
					password: 'Bear',
					restaurant: null,
					username: 'Jeremy'
				}
			];

			await Chefs.add({
				username: 'Jeremy',
				password: 'Bear',
				full_name: 'Jeremy_McWilliams',
				location: 'Dublin'
			});

			await Chefs.update(1, {
				username: 'Jeremy',
				password: 'Bear',
				full_name: 'Jeremy_McWilliams',
				location: 'Alameda'
			});

			const cooks = await db('chefs');
			expect(cooks).toEqual(kitchen);
		});
	});

	describe('remove', async () => {
		it('should remove a chef and return an empty array', async () => {
			await Chefs.add({
				username: 'Jeremy',
				password: 'Bear',
				full_name: 'Jeremy_McWilliams',
				location: 'Dublin'
			});
			await Chefs.remove(1);
			const cooks = await db('chefs');
			expect(cooks).toMatchObject([]);
		});
	});
});

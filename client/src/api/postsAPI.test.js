import { postsAPI } from './postsAPI'

// Задание 4. Покажите пример, как тестировать ассинхронный код

describe('Получаем с сервера пост с выбранным id', () => {
	test('получаем пост с id 27', async () => {
		const id = 27

		const { post } = await postsAPI.fetchbyId(id)

		expect(post.id).toBe(id)
	})
})

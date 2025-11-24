interface BallonI {
    id: number
    isPublic: boolean
}

/**
 * @description имитация fetch. возвращает количество шариков
 * @param {Number} id ID шарика по цвету
 * @returns {Number} количество шариков
 * @example const res = await fetchBallonAmount(202);
 */
async function fetchBallonAmount(id: BallonI['id']): Promise<number> {
	const RANDOM_TIMEOUT: number = Math.ceil(Math.random() * 10000); // 1-9 секунд
	const RANDOM_AMOUNT: number = Math.ceil(Math.random() * id); // случайное число

	return new Promise(resolve => setTimeout(() => resolve(RANDOM_AMOUNT), RANDOM_TIMEOUT));
}

// данные о шариках
const BALLONS: { [key: string]: BallonI } = {
	red: {
		id: 202,
		isPublic: true,
	},
	blue: {
		id: 356,
		isPublic: false,
	},
	yellow: {
		id: 451,
		isPublic: false,
	},
	black: {
		id: 35,
		isPublic: true,
	},
	green: {
		id: 191,
		isPublic: true,
	},
	white: {
		id: 911,
		isPublic: true,
	},
};

// Ваш код здесь
async function fetchAllPublicBallons(ballons: { [key: string]: BallonI }) {
  let totalBallonsAmount = 0
  for (let color in ballons) {
    let ballonsAmountById = 0
    try {
      if (ballons[color].isPublic) {
        ballonsAmountById = await fetchBallonAmount(ballons[color].id)
        totalBallonsAmount += ballonsAmountById
      }
    } catch (error) {
      console.log('fetch error')
    }
  }
  return totalBallonsAmount
}

console.log(
  'result',
  fetchAllPublicBallons(BALLONS)
    .then((result) => console.log('result', result))
    .catch(console.error)
)
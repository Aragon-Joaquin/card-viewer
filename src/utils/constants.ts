//* aspect ratio should be 59:86
export const CARD_SIZES = {
	WIDTH: 59,
	HEIGHT: 86,
	THICKNESS: 0.1
} as const

export const LOCAL_CARDS = {
	MONSTER: 'monster.jpg',
	SPELL: 'spell.jpg',
	TRAP: 'trap.png'
} as const

export type LOCAL_CARD_VALUES = (typeof LOCAL_CARDS)[keyof typeof LOCAL_CARDS]

export const UTILITY_IMGS = {
	BACKCARD: 'backcard.png'
}

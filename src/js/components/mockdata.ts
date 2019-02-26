import { Player } from '../model/player'

export const players1: Array<Player> = [
	{
		name: 'Noah',
		role: {
			name: 'Werewolf',
			team: 'Werewolves',
			description: 'Werewolves like to eat things.',
			image: './img/werewolf.jpg'
		},
		alive: true,
		charmed: false,
		sheriff: false,
		lover: false
	},
	{
		name: 'Twix',
		role: undefined,
		alive: true,
		charmed: false,
		sheriff: false,
		lover: false
	},
	{
		name: 'KitKat',
		role: {
			name: 'Defender',
			team: 'Villagers',
			description: 'Defenders defend other people.',
			image: './img/defender.jpg'
		},
		alive: true,
		charmed: false,
		sheriff: false,
		lover: false
	},
	{
		name: 'John',
		role: {
			name: 'Fortune Teller',
			team: 'Villagers',
			description: 'Fortune Tellers like to tell fortunes.',
			image: './img/fortuneTeller.jpg'
		},
		alive: true,
		charmed: false,
		sheriff: false,
		lover: false
	},
	{
		name: 'Ryan',
		role: {
			name: 'Villager',
			team: 'Villagers',
			description: 'Villagers are useless.',
			image: './img/villager.jpg'
		},
		alive: true,
		charmed: false,
		sheriff: false,
		lover: false
	},
]

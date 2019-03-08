import { Player } from '../model/player'

export const players1: Array<Player> = [
	{
		name: 'Noah',
		role: {
			name: 'Werewolf',
			team: 'Werewolves',
			description: 'Werewolves like to eat things.',
			image: 'https://imgur.com/OoBCrfl.jpg'
		},
		alive: true,
		charmed: false,
		sheriff: false,
		markedForDeath: false,
		markedForLife: false,
		lover: false
	},
	{
		name: 'Twix',
		role: undefined,
		alive: true,
		charmed: false,
		sheriff: false,
		markedForDeath: false,
		markedForLife: false,
		lover: false
	},
	{
		name: 'KitKat',
		role: {
			name: 'Defender',
			team: 'Villagers',
			description: 'Defenders defend other people.',
			image: 'https://imgur.com/xqvmm6G.jpg'
		},
		alive: true,
		charmed: false,
		sheriff: false,
		markedForDeath: false,
		markedForLife: false,
		lover: false
	},
	{
		name: 'John',
		role: {
			name: 'Fortune Teller',
			team: 'Villagers',
			description: 'Fortune Tellers like to tell fortunes.',
			image: 'https://imgur.com/65JgSjs.jpg'
		},
		alive: true,
		charmed: false,
		sheriff: false,
		markedForDeath: false,
		markedForLife: false,
		lover: false
	},
	{
		name: 'Ryan',
		role: {
			name: 'Villager',
			team: 'Villagers',
			description: 'Villagers are useless.',
			image: 'https://imgur.com/jmUN6iN.jpg'
		},
		alive: true,
		charmed: false,
		sheriff: false,
		markedForDeath: false,
		markedForLife: false,
		lover: false
	},
]

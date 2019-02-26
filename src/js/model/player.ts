export type Role = {
	name: string
	team: string
	description: string
	image: string
	count?: number
}

export type Player = {
	name: string
	alive: boolean
	charmed: boolean
	sheriff: boolean
	lover: boolean
	role?: Role
	email?: string
}

export type Players = Array<Player>

export const roles: Array<Role> = [
	{
		name: 'Werewolf',
		team: 'Werewolves',
		description: 'Werewolves like to eat things.',
		image: 'https://imgur.com/OoBCrfl.jpg'
	},
	{
		name: 'Villager',
		team: 'Villagers',
		description: 'Villagers are useless.',
		image: 'https://imgur.com/jmUN6iN.jpg'
	},
	{
		name: 'Defender',
		team: 'Villagers',
		description: 'Defenders defend other people.',
		image: 'https://imgur.com/xqvmm6G.jpg'
	},
	{
		name: 'Fortune Teller',
		team: 'Villagers',
		description: 'Fortune Tellers like to tell fortunes.',
		image: 'https://imgur.com/65JgSjs.jpg'
	},
	{
		name: 'Witch',
		team: 'Villagers',
		description: 'The witch has two spooky potions.',
		image: 'https://imgur.com/FQOoE7q.jpg'
	},
	{
		name: 'Elder',
		team: 'Villagers',
		description: 'The elder has fallen and can\'t get up.',
		image: 'https://imgur.com/0FdYO2a.jpg'
	},
	{
		name: 'Fox',
		team: 'Villagers',
		description: 'The fox can find out if you\'re spooky.',
		image: 'https://imgur.com/pfzTCYY.jpg'
	},
	{
		name: 'Little Girl',
		team: 'Villagers',
		description: 'She looks at werewolves.',
		image: 'https://cdn.myminifactory.com/assets/object-assets/5971a8bd270db/images/720X720-beto-thingiverse.jpg'
	},
	{
		name: 'Hunter',
		team: 'Villagers',
		description: 'His gun goes pew pew when he dies.',
		image: 'https://imgur.com/w3Sgalv.jpg'
	},
	{
		name: 'Cupid',
		team: 'Villagers',
		description: 'Makes people fall in love.',
		image: 'https://imgur.com/lLCcEgv.jpg'
	},
	{
		name: 'Two Sisters',
		team: 'Villagers',
		description: 'There are two of them.',
		image: 'https://cdn.myminifactory.com/assets/object-assets/5971a8bd270db/images/720X720-beto-thingiverse.jpg'
	},
	{
		name: 'Three Brothers',
		team: 'Villagers',
		description: 'There are three of them.',
		image: 'https://cdn.myminifactory.com/assets/object-assets/5971a8bd270db/images/720X720-beto-thingiverse.jpg'
	},
	{
		name: 'Scapegoat',
		team: 'Villagers',
		description: 'Point to him when things go bad.',
		image: 'https://imgur.com/iCh4fzZ.jpg'
	},
	{
		name: 'Village Idiot',
		team: 'Villagers',
		description: 'Does dumb things.',
		image: 'https://cdn.myminifactory.com/assets/object-assets/5971a8bd270db/images/720X720-beto-thingiverse.jpg'
	},
	{
		name: 'Piper',
		team: 'Other',
		description: 'The Piper charms people.',
		image: 'https://imgur.com/ApPk72N.jpg'
	},
]

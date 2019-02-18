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

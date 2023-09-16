/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Event = "event",
	Media = "media",
	Suggestion = "suggestion",
	UserMedia = "user_media",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type EventRecord = {
	datetime: IsoDateString
	watching?: RecordIdString
	description?: HTMLString
	attended?: RecordIdString[]
}

export enum MediaTypeOptions {
	"movie" = "movie",
}
export type MediaRecord<Tmetadata = unknown> = {
	tmdb_id?: number
	metadata: null | Tmetadata
	type: MediaTypeOptions
}

export type SuggestionRecord = {
	media?: RecordIdString
	user?: RecordIdString
	active?: boolean
}

export enum UserMediaIntentOptions {
	"want" = "want",
	"dont" = "dont",
}
export type UserMediaRecord = {
	user?: RecordIdString
	media?: RecordIdString
	watches?: number
	intent?: UserMediaIntentOptions
	rating?: number
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type EventResponse<Texpand = unknown> = Required<EventRecord> & BaseSystemFields<Texpand>
export type MediaResponse<Tmetadata = unknown, Texpand = unknown> = Required<MediaRecord<Tmetadata>> & BaseSystemFields<Texpand>
export type SuggestionResponse<Texpand = unknown> = Required<SuggestionRecord> & BaseSystemFields<Texpand>
export type UserMediaResponse<Texpand = unknown> = Required<UserMediaRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	event: EventRecord
	media: MediaRecord
	suggestion: SuggestionRecord
	user_media: UserMediaRecord
	users: UsersRecord
}

export type CollectionResponses = {
	event: EventResponse
	media: MediaResponse
	suggestion: SuggestionResponse
	user_media: UserMediaResponse
	users: UsersResponse
}
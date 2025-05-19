import {pgTable, integer, varchar, date, text} from 'drizzle-orm/pg-core'

export const taskTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length: 255}).notNull(),
    deadline: date().notNull(),
    expectedTime: date().notNull(),
    description: text(),
    priority: ,
    tags: ,
});
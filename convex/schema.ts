import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const GrantRoleUnion = v.union(
  v.literal('OWNER'),
  v.literal('EDITOR'),
  v.literal('VIEWER'),
)

export default defineSchema({
  grants: defineTable({
    role: GrantRoleUnion,
    userId: v.optional(v.string()),
    workspaceId: v.id('workspaces'),
    accepted: v.boolean(),
    email: v.optional(v.string()),
  }),
  users: defineTable({
    fullName: v.string(),
    profilePic: v.optional(v.string()),
    email: v.string(),
    userId: v.string(),
  }),
  workspaces: defineTable({
    createdAt: v.string(),
    name: v.string(),
  }),
  documentations: defineTable({
    name: v.string(),
    slug: v.string(), // e.g. "api-docs"
    workspaceId: v.id('workspaces'),
    createdAt: v.string(),
    // visibility: v.union(v.literal('private'), v.literal('public')),
  })
    .index('by_workspaceId', ['workspaceId'])
    .index('by_slug', ['slug']),
  routes: defineTable({
    title: v.string(),
    slug: v.string(),
    parent: v.optional(v.id('routes')),
    docSetId: v.id('documentations'),
    createdAt: v.string(),
  })
    .index('by_docSetId_slug', ['docSetId', 'slug'])
    .index('by_docSetId_parent', ['docSetId', 'parent']),
  elements: defineTable({
    routeId: v.id('routes'),
    type: v.union(),
    order: v.number(),
    content: v.any(),
  }).index('by_routeId_order', ['routeId', 'order']),
})

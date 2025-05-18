import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    workspaceId: v.id('workspaces'),
  },
  handler: async (ctx, args) => {
    const docId = await ctx.db.insert('documentations', {
      name: args.name,
      slug: args.slug,
      workspaceId: args.workspaceId,
      createdAt: new Date().toISOString(),
    })
    return docId
  },
})

export const getByWorkspace = query({
  args: {
    workspaceId: v.id('workspaces'),
  },
  handler: async (ctx, args) => {
    const docs = await ctx.db
      .query('documentations')
      .withIndex('by_workspaceId', q => q.eq('workspaceId', args.workspaceId))
      .collect()
    return docs
  },
})

export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const docs = await ctx.db
      .query('documentations')
      .withIndex('by_slug', q => q.eq('slug', args.slug))
      .first()
    return docs
  },
})

export const getById = query({
  args: {
    id: v.id('documentations'),
  },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.id)
    return doc
  },
})

export const update = mutation({
  args: {
    id: v.id('documentations'),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    await ctx.db.patch(id, updates)
  },
})

export const remove = mutation({
  args: {
    id: v.id('documentations'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

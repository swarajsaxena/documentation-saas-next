import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { GrantRoleUnion } from './schema'

export const getWorkspaces = query({
  args: {},
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }
    const grants = await ctx.db
      .query('grants')
      .filter(q => q.eq(q.field('userId'), identity.subject))
      .collect()

    const workspaces = await ctx.db
      .query('workspaces')
      .filter(q =>
        q.or(...grants.map(grant => q.eq(q.field('_id'), grant.workspaceId))),
      )
      .collect()
    return workspaces
  },
})

export const createWorkspace = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    const { name } = args
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Not authenticated')
    }

    // Create the workspace
    const workspace = await ctx.db.insert('workspaces', {
      name,
      createdAt: new Date().toISOString(),
    })

    await ctx.db.insert('grants', {
      userId: identity.subject,
      workspaceId: workspace,
      role: 'OWNER',
      accepted: false,
    })

    return workspace
  },
})

export const getWorkspaceGrants = query({
  args: {
    workspaceId: v.string(),
  },
  async handler(ctx, { workspaceId }) {
    const grants = await ctx.db
      .query('grants')
      .filter(q => q.eq(q.field('workspaceId'), workspaceId))
      .collect()

    // Use Promise.all to wait for all user queries to complete
    const grantsWithUsers = await Promise.all(
      grants.map(async grant => {
        const user = await ctx.db
          .query('users')
          .filter(q => q.eq(q.field('userId'), grant.userId))
          .first()

        return {
          ...grant,
          user,
        }
      }),
    )

    return grantsWithUsers
  },
})

export const createGrantForWorkspace = mutation({
  args: {
    workspaceId: v.id('workspaces'),
    email: v.string(),
    role: GrantRoleUnion,
  },
  async handler(ctx, { workspaceId, email, role }) {
    await ctx.db.insert('grants', {
      accepted: false,
      email,
      workspaceId: workspaceId,
      role: role,
    })
  },
})

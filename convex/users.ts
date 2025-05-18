import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const sync = mutation({
  args: {
    fullName: v.string(),
    profilePic: v.optional(v.string()),
    email: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    const { fullName, profilePic, email, userId } = args;

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        fullName,
        profilePic,
        email,
      });
      return existingUser._id;
    } else {
      // Create new user
      const newUserId = await ctx.db.insert("users", {
        fullName,
        profilePic,
        email,
        userId,
      });
      return newUserId;
    }
  },
});
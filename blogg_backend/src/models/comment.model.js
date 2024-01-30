import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    commentContent: {
      type: String,
      requied: true,
    },
    postID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replies: [
      {
        comment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);

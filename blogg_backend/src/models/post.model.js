import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    photo: {
      type: String, //cloudary url
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isLike: {
      type: Boolean,
      default: false,
    },

    isSave: {
      type: Boolean,
      default: false,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);

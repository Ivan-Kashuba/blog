import { Comment, Post } from "../types/models";

export const findLikeStatus = (item: Post | Comment, itemId: string) =>
  item.likes!.find((id: string) => {
    if (id === itemId) {
      return id;
    }
    return undefined;
  });

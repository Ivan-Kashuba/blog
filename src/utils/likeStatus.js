export const findLikeStatus = (item, itemId) =>
  item.likes.find((id) => {
    if (id === itemId) {
      return id;
    }
    return undefined;
  });

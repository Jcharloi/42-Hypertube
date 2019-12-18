const checkInvalidComment = (stars: number, comment: string): boolean => {
  return stars >= 0 && stars <= 5 && comment.length > 0;
};

export default checkInvalidComment;

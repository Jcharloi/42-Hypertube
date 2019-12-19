const checkInvalidCommentOrStars = (
  stars: number,
  comment: string
): { comment: boolean; stars: boolean } => {
  return {
    comment: comment.length <= 0 || comment.length > 1000,
    stars: stars < 1 || stars > 5
  };
};

export default checkInvalidCommentOrStars;

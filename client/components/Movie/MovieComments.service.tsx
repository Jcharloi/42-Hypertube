const checkInvalidComment = (stars: number, comment: string): boolean => {
  return stars >= 0 && stars <= 5 && comment.length > 0;
};

const newMovieRating = (movieRating: number): void => {
  console.log(movieRating);
};

export default { checkInvalidComment, newMovieRating };

export function checkIfCardIsLiked(card, currentUser) {
  return card.likes.some(i => i._id === currentUser._id);
}
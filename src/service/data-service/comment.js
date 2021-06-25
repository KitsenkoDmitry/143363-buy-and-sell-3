'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  findAll(offer) {
    return offer.comments;
  }

  create(offer, comment) {
    const newComment = {id: nanoid(MAX_ID_LENGTH), ...comment};
    offer.comments.push(newComment);
    return newComment;
  }

  drop(offer, commentId) {
    const dropComment = offer.comments.find((c) => c.id === commentId);

    if (!dropComment) {
      return null;
    }
    offer.comments = offer.comments.filter((c) => c.id !== commentId);
    return dropComment;
  }
}

module.exports = CommentService;

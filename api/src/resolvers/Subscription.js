function newLinkSubsucribe(parent, args, context) {
  return context.pubsub.asyncIterator('NEW_LINK');
};

const newLink = {
  subscribe: newLinkSubsucribe,
  resolve: (payload) => {
    return payload;
  },
};

function newVoteSubscription(parent, args, context) {
  return context.pubsub.asyncIterator('NEW_VOTE');
};

const newVote = {
  subscribe: newVoteSubscription,
  resolve: (payload) => {
    return payload;
  }
};

module.exports = {
  newLink,
  newVote,
};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    }
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
};

async function login(parent, args, context) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  });
  if (!user) {
    throw new Error('ユーザーが存在しません');
  }
  const isMatch = await bcrypt.compare(args.password, user.password);
  if (!isMatch) {
    throw new Error('IDとパスワードが一致しません');
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
};

async function post(parent, args, context) {
  const { userId } = context;

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    }
  });
  // 送信
  context.pubsub.publish('NEW_LINK', newLink);
  return newLink;
};

module.exports = {
  signup,
  login,
  post,
}
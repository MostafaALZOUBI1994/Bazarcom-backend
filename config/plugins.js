module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendmail',
    settings: {
      defaultFrom: 'myemail@protonmail.com',
      defaultReplyTo: 'myemail@protonmail.com',
    },
  },
  // ...
});

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f82e4e3dd047a140fd20c80aeb7f59ab'),
    },
    
  },
  cron: { enabled: true },
});

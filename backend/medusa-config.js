// Medusa v2 Core Server Configurations

module.exports = {
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:postgrespassword@localhost:5432/sugarstory_db",
    databaseType: "postgres",
    redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
    storeCors: process.env.STORE_CORS || "http://localhost:3000",
    adminCors: process.env.ADMIN_CORS || "http://localhost:9000",
    jwtSecret: process.env.JWT_SECRET || "super-secret-jwt-key",
    cookieSecret: process.env.COOKIE_SECRET || "super-secret-cookie-key",
  },
  modules: {
    // Custom database extended tables mapped to discrete business modules
    sugarStoryService: {
      resolve: "./src/modules/sugar-story-module",
      options: {
        bhopalZones: true,
        loyaltyPoints: true,
        referrals: true,
        customisationQueue: true,
      }
    },
    // Cloudflare R2 / S3 Storage plugin config
    fileService: {
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-s3",
            options: {
              s3Url: process.env.S3_ENDPOINT,
              bucket: process.env.S3_BUCKET,
              region: "auto",
              accessKeyId: process.env.S3_ACCESS_KEY,
              secretAccessKey: process.env.S3_SECRET,
            },
          },
        ],
      },
    },
  },
  plugins: [
    // Third-party India-centric payment gateways & logic integrations
    {
      resolve: "medusa-payment-razorpay",
      options: {
        key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_sugarstory123",
        key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_secret_key_secret_code",
        webhook_secret: process.env.RAZORPAY_WEBHOOK_SECRET,
        secure: true
      }
    },
    {
      resolve: "medusa-fulfillment-shiprocket",
      options: {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
        sandbox: true
      }
    }
  ],
};

import "dotenv/config"

import { z } from "zod"

import { logger } from "@shared/helpers/logger"
import { AppError } from "../error/AppError"

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().default(""),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  SALT_RESULT: z.coerce.number().default(10),
  MAIL_HOST: z.string(),
  MAIL_SECURITY: z.coerce.boolean().default(false),
  MAIL_PORT: z.coerce.number().default(587),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_FROM: z.string(),
  FRONTEND_URL: z.string(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_REGION: z.string(),
  S3_BUCKET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  logger.error("Invalid environment variable", _env.error.format())

  throw new AppError("❌ Invalid environment variables")
}

export const env = _env.data

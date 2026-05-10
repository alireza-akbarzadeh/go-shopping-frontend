// config/auth.ts
export const authConfig = {
  accessToken: {
    defaultMaxAge: 15 * 60, // 15 minutes (in seconds)
    rememberMeMaxAge: 7 * 24 * 60 * 60 // 7 days
  },
  refreshToken: {
    maxAge: 7 * 24 * 60 * 60 // 7 days
  }
} as const;

export type AuthConfig = typeof authConfig;

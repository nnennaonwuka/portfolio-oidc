import { config } from "dotenv";
import { ConnectionOptions } from "typeorm";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  GCS_PROJECT_ID,
  GCS_BUCKET,
  GCS_CLIENT_EMAIL,
  GCS_PICTURES_PATH,
  GCS_AUDIOS_PATH,
  GCS_PAYMENT_COLLECTION_PATH,
  MESSAGE_SERVICE,
  SSO_BASE_URL,
} = process.env;

// export const GCS_PRIVATE_KEY =
//   "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDv195DXMMQoIXY\nmILzu7HalwxkBEvU3lVO0oD66RL9OmZ0VoUnvZILXD7CGMMwHHrnnX4+x73MCpEs\nbPkfHCNkDPIcQB6kjhZfMMsEyiZGfXqxvOu10g9+2fleENtwC7ZSuo61pMZNPdiX\ngjBu7riRR3F2pokmHRPWWsXUApOVny3zyPJmZtBuzB3yO3qkGAz4rnaJVxEtmJVa\nMPU/UzF+WVkQ3jG4q9GCrq/sCyrgx0E0nJQkTIXA097xWHKrI6qUcq7hCmpDXh+I\n+roD4JSafMHA/B0TDApOAfN+1w0uo8yvy4SrtTCx5rAHqms1j2RMkEgWNvjLDwF6\n2ymONce5AgMBAAECggEACBB6fcouGTkbLwHNG2a4T54sZuYvFONR5n0qTuV3Lj0L\nCgaJDSGbuhaPWfriVek157jyWv2Kf+8WBl1L+2ljNj9qL5wnUPH3G3BvpG5V9Euj\n9xB1XiRylsRmVQJHl+rzkIYLJjKPZAmm5qHpwNJ1hxWqIWrEP0a92UNYQK1CgEbB\n0V7qOSxk6UZRYOiu75jslqImkh8l4Kw9rfSNTSa9JhjRiv9Djm+S1cjtjR5vYvhP\nn4KHyYll5aeihBQEZBccx1QMTHe3XHPrAeBHe7SZtq/xgJ4CQQgXN/nV5A/qWS0P\nHJkKUU0c2wR+oNGqU+/WCT1EyYJWl4D3YxxAJTNR9QKBgQD8PCASriA17wcXzfcS\nAaa+TpBuylFznbJkHP+iDHFVz5rLP+bq0pd5wYXLXnSkP0ALRB8WQxaVYFYu+Z4v\n3g8R4pRSuNOjMWdZxfKd9X8O8+2R2BQrDKYsz5WrIVxpQUKogsuXatElJF31ZTM0\nvRpoF70EAOhTrbdD+ibpoYqXjQKBgQDzbGPsUvyyczwiJHQivgzfTf4FFM0O1+Jv\nD0vXTd5n4q2YejJHFC+D9zVXrS3pAz8iDkByPqu84tq0MWeCdj1cIFxk/AlzZTCa\nWxwC2R1smdlaJsl27vpOmevFQT39A0KSyN5moqtaaRUZZYH9gRBaLEotVETTgYRd\nJ/0q+Gp/3QKBgQCV7H7723fV1u+WXJwgnc6oizYaRDNJz0/7ZakkftTWtoFBkggF\nR4s1mauXB9u4zMeaarE3oETKIOrZHRHDTfATJ2QWDznsZC8UEy50aTlOf/qTl6XV\nOL2FIRXLFBdDkMC4PJYauCj8NLOMasyW6lfJy2JUAN4W7shhpUx/zb78+QKBgBRw\nkodihIN7d54qT3InYS9S/jRxBbLsX8ARmb2vdTBl8UuvXw9m24KKPHlrOkKpmiCC\n79hn+MW4isK8r0NeKFLXCMsV+rks0wLzCYwXrQfUd1LBlQMel/gHpqt+ifT31Bw9\nL6eQmzDRSAtE4cBmmPfpZiUeQVU9N98Wn4R/LXolAoGAMTdaaHteq5miVNDwfyzb\ne1UcuDGoPPFizon0M2if+KYaMaG/RHzX+iIHURUNHWMawh8CW9kw6/wWlEKIYnBC\nLNHPxhZQRH7X0jQ+ALDueDtZnR5eOfP32Uf4EHF54r4ngmxldoKHJ99WrXPjm0uY\n5TDodKRc/A3y24j9djoNpo0=\n-----END PRIVATE KEY-----\n";


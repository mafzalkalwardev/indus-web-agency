/** RS256 public key — embedded in client SDKs for offline JWT signature verification. */
export const LICENSE_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvSs97mdbBj+wgf4mLVqQ
kyE2DKQuTxhhJ+Ze8YLM162CjOiUllUOft+8l2eAnb8ER+OX/gqBDybwv7ncDtDy
jStlygwGv1L5EuT4mMrCEaxRgsyHct36JgkcSZ5Fxk+zFSjFbq1+mN02AT/sZ6xo
NXWqBYto2L9RZp4I66GmLMXePz4Q+1DgraC4eB/YGsFKg32SebRISDoFzMhcayKH
lBVJz+riN+psvHpehA2dshiAw47JpTpvRohTrXzeGkNiZucnzADGEFQ+T2KzSfau
djQ6lxfLVF7CgFf/QFSnDUhUfrrwkMFqnztpAOGjwiw0/NceocYsQSUWjzsoq9cR
LwIDAQAB
-----END PUBLIC KEY-----`;

export const LICENSE_VERIFY_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://indus-web-agency.vercel.app";

export const LICENSE_VERIFY_ENDPOINT = `${LICENSE_VERIFY_URL}/api/license/verify`;

export const MAX_MACHINES_PER_SUBSCRIPTION = 2;

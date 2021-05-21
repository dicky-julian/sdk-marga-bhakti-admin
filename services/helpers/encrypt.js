import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

import { NEXT_PUBLIC_HASH_KEY } from "../config";

export const encrypt = (text) => {
  const hash = hmacSHA512(text, NEXT_PUBLIC_HASH_KEY);
  const hashDigest = Base64.stringify(hash);
  return hashDigest;
};

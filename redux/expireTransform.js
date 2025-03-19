import { createTransform } from "redux-persist";

const expireTransform = createTransform(
  (inboundState) => {
    // Add timestamp when saving
    return { ...inboundState, _persistedAt: Date.now() };
  },
  (outboundState) => {
    // Check expiration when rehydrating
    if (Date.now() - outboundState._persistedAt > 24 * 60 * 60 * 1000) {
      return undefined; // Clear state if expired
    }
    return outboundState;
  }
);

export default expireTransform;

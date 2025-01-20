/* eslint-disable @typescript-eslint/no-unused-vars */
export const sanitizeData = (data: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );
};
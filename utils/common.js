export const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
export const reformatDate = rawDate => new Date(rawDate).toLocaleString("ru", { day: "numeric", month: "numeric", year: "numeric" });
export const isServer = () => typeof window === "undefined";
export const isDev = () => process.env.NODE_ENV !== "production";
export const removeTagsFromText = text => text.replace(/<.+?>/g, "");
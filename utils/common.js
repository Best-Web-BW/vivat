export const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
export const reformatDate = rawDate => new Date(rawDate).toLocaleString("ru", { day: "numeric", month: "numeric", year: "numeric" });

export const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
export const reformatDate = rawDate => new Date(rawDate).toLocaleString("ru", { day: "numeric", month: "numeric", year: "numeric" });
export const currentISODate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
}
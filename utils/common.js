export const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
export const reformatDate = rawDate => new Date(rawDate).toLocaleString("ru", { day: "numeric", month: "numeric", year: "numeric" });
export const currentISODate = () => toISODate(new Date());
export const toISODate = _date => {
    const date = new Date(_date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
}
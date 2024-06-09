// This function is for providing the 7days date, which will be displayed afte the habit is created.
export const getOneWeekDate =() => {
    const week = [];
    for (const day of [6, 5, 4, 3, 2, 1, 0]) {
        let today = new Date();
        today.setDate(today.getDate() - day)
        week.push(today.toDateString().split(" ").slice(1, 3).join(" "))
    }
    return week;
}
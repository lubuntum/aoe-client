export const sortDate = (a,b)=>{
    //console.log(`${JSON.stringify(a)}  ${b}`)
    const [dateA, timeA] = a.split(' ');
    const [dateB, timeB] = b.split(' ');

    const [dayA, monthA, yearA] = dateA.split('.').map(Number);
    const [dayB, monthB, yearB] = dateB.split('.').map(Number);

    const [hourA, minuteA, secondA] = timeA.split(':').map(Number)
    const [hourB, minuteB, secondB] = timeB.split(':').map(Number)

    const fullDateA = new Date(yearA, monthA-1, dayA, hourA, minuteA, secondA)
    const fullDateB = new Date(yearB, monthB-1, dayB, hourB, minuteB, secondB)

    return fullDateB - fullDateA}
export const sortCustomerTasks = (a, b) => {
    const first = a.completeDate;
    const second = b.completeDate;
    return sortDate(first, second)
}
export const sortExams = (a, b) => {
    const first = a.examCompleteDate
    const second = b.examCompleteDate
    return sortDate(first, second)
}
export const sortVariants = (a, b) => {
    const first = a.creationDate;
    const second = b.creationDate
    return sortDate(first, second)
}
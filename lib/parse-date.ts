export function parseDate(value: string) {
    if (!value) {
        throw new Error(`${value}의 날짜 형식이 올바르지 않습니다.`);
    } else {
        const [, year, month, day] = value.match(/^(\d{4})-(\d{2})-(\d{2})/) || [];
        return `${year}. ${month}. ${day}.`;
    }
}

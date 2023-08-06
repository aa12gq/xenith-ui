import { Timestamp } from '@/stores/proto/google/protobuf/timestamp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn'); //设置为中文
dayjs.extend(relativeTime); //使用相对时间插件

/**
 * 将时间戳转换为相对时间（如：2天前、3小时前、刚刚）
 * @param {bigint} timestamp - 要转换的时间戳（以秒为单位）
 * @returns {string} 相对时间字符串
 */
export function formatRelativeTime(timestamp: bigint) {
    const date = new Date(Number(timestamp) * 1000); // 将秒转换为毫秒
    return dayjs(date).fromNow();
}

export function TimestampFromDate(date: Date): any {
    return date && !isNaN(date.getTime()) ? Timestamp.fromDate(date) : null;
}

/**
 * 格式化时间戳为特定格式的日期时间字符串
 * @param {bigint} timestamp - 要格式化的时间戳（以秒为单位）
 * @param {boolean} includeTime - 是否包含时分秒
 * @returns {string} 格式化后的日期时间字符串
 */
export function formatDate(timestamp: bigint, includeTime: boolean) {
    const date = new Date(Number(timestamp) * 1000); // 将秒转换为毫秒

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    if (includeTime) {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } else {
        return `${year}-${month}-${day}`;
    }
}

export function DateFromTimestamp(ts: Timestamp): Date {
    return ts && Timestamp.toDate(ts);
}

export function getDaysInRange(startDate: Date, endDate: Date) {
    const days = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        days.push(formattedDate);
    }

    return days;
}

export const formatDateRule = 'YYYY-MM-DD';

//获得时间 年月日 格式 日-月-年
export function getDays(date: Date | number, rule?: string) {
    if (rule && rule != '') {
        return dayjs(date)?.format(rule);
    }
    return dayjs(date)?.format(formatDateRule);
}

//根据Timestamp获得时间 年月日 格式 年-月-日
export function getDaysTs(date: Timestamp | undefined, rule?: string) {
    if (!date) return '';
    if (date.seconds === 0n && date.nanos === 0) return '';
    let d = Timestamp.toDate(date);
    if (rule && rule != '') {
        return dayjs(d)?.format(rule);
    }
    return dayjs(d)?.format(formatDateRule);
}

export function checkTS(a: Timestamp | undefined, b: Timestamp | undefined) {
    if (a && b) {
        // 目前只使用秒级别的ts
        return a.seconds - b.seconds > 0;
    } else if (a) {
        return true;
    } else {
        return false;
    }
}

const leftHalfYear = ['一月', '二月', '三月', '四月', '五月', '六月'];
const rightHalfYear = ['七月', '八月', '九月', '十月', '十一月', '十二月'];

export function getHalfYear(date: Date | number) {
    const month = dayjs(date).month() + 1;
    if (month <= 6) {
        return leftHalfYear;
    } else {
        return rightHalfYear;
    }
}

export function getDaysInMonthsForHalfYear(date: Date): number[] {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstMonth = month < 6 ? 0 : 6; // 0 表示 1 月，6 表示 7 月
    const lastMonth = firstMonth + 5; // 半年有 6 个月

    const daysInMonths: number[] = [];

    for (let i = firstMonth; i <= lastMonth; i++) {
        // 创建日期对象，将月份设为 i+1，并将日设为 0
        const d = new Date(year, i + 1, 0);
        // 获取日期对象中的日期，即当月天数
        daysInMonths.push(d.getDate());
    }

    return daysInMonths;
}

export function getDayZero(date: Date) {
    if (!date) {
        date = new Date();
    }
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return dayjs(today).format(formatDateRule);
}

export function getDayZeroByCurrent() {
    const today = new Date();
    return dayjs(today).format(formatDateRule);
}

/**
 * @author Jensen<zhhnch@gmail.com>
 * @description Parse Datetime String to Unix timestamp
 * @since 2018/01/12
 */


/**
 * @type {number}
 * @const
 */
const systemOffsetMinutes = (new Date()).getTimezoneOffset();

/**
 * Specify Regular Expression: Date Separator
 * @type {RegExp}
 * @const
 */
const dateSeparator = /[\u0000-\u0028\u002a\u002c-\u002f\u003a-\u0040]+/;


/**
 * Specify Regular Expression: Time Separator
 * @type {RegExp}
 * @const
 */
const timeSeparator = /[:]\s*/;

/**
 * Specify Regular Expression: Separator between Date and Time
 * @type {RegExp}
 * @const
 */
const datetimeSeparator = /(?:[T]|\s+)/;

/**
 * Specify Regular Expression: Separator between Time String and Milliseconds String
 * @type {RegExp}
 * @const
 */
const mSecSeparator = /[.]/;

/**
 * Specify Regular Expression String: Date String Pattern
 * @type {string}
 * @const
 */
const datePatternStr = `\\d{4}(?:${dateSeparator.source}\\d{1,2}(?:${dateSeparator.source}\\d{1,2})?)?`;

/**
 * Specify Regular Expression String: Time String Pattern
 * @type {string}
 * @const
 */
const timePatternStr = `\\d{1,2}(?:${timeSeparator.source}\\d{0,2}(?:${timeSeparator.source}\\d{0,2}(?:${mSecSeparator.source}\\d+)?)?)?`;

/**
 * Specify Regular Expression: GMT Timezone Offset
 * @type {RegExp}
 * @const
 */
const utcTzPattern = /GMT(?:[+-]\d{1,2}[:]?\d{0,2})?/;

/**
 * Specify Regular Expression String: ISO or GMT Timezone Offset
 * @type {string}
 * @const
 */
const tzPatternStr = `(?:Z|${utcTzPattern.source})`;

/**
 * Specify Regular Expression String: Datetime String Pattern
 * @type {string}
 * @const
 */
const dtPatternStr = `(${datePatternStr})(?:${datetimeSeparator.source}(${timePatternStr}))?(?:\\s*(${tzPatternStr}))?`;

/**
 * Specify Regular Expression: Date String Pattern
 * @type {RegExp}
 * @const
 */
const datePattern = new RegExp(`^${datePatternStr}$`, 'i');

/**
 * Specify Regular Expression: Time String Pattern
 * @type {RegExp}
 * @const
 */
const timePattern = new RegExp(`^${timePatternStr}$`, 'i');


/**
 * Specify Regular Expression: Datetime String Pattern
 * @type {RegExp}
 * @const
 */
const dtPattern = new RegExp(`^${dtPatternStr}$`, 'i');

/**
 * Specify Regular Expression: Math ISO Date String
 * @type {RegExp}
 * @const
 */
const isISOPattern = /(?:Z)/i;

/**
 * Specify Regular Expression: Math UTC Date String with GMT Timezone Offset
 * @type {RegExp}
 * @const
 */
const isUTCPattern = /(?:GMT)/i;

const UTC = Date.UTC;

/**
 * String against which to match Date Pattern
 * @param dateStr
 * @return {boolean}
 */
function isDateStr(dateStr) {
    return datePattern.test(dateStr);
}

/**
 * String against which to match Time Pattern
 * @param timeStr
 * @return {boolean}
 */
function isTimeStr(timeStr) {
    return timePattern.test(timeStr);
}

/**
 * Datetime String against which to match Datetime Pattern
 * @param dtStr
 * @return {boolean}
 */
function isDatetimeStr(dtStr) {
    return dtPattern.test(dtStr);
}

/**
 * Datetime String against which to match UTC Datetime Pattern
 * @param {String} dtStr Datetime String
 * @return {boolean}
 */
function isUTCDatetime(dtStr) {
    return isDatetimeStr(dtStr) && isUTCPattern.test(dtStr);
}

/**
 * Datetime String against which to match ISO Datetime Pattern
 * @param {String} dtStr Datetime String
 * @return {boolean}
 */
function isISODatetime(dtStr) {
    return isDatetimeStr(dtStr) && isISOPattern.test(dtStr);
}


/**
 * Datetime String against which to match Locale Datetime Pattern
 * @param {String} dtStr Datetime String
 * @return {boolean}
 */
function isLocaleDatetime(dtStr) {
    return isDatetimeStr(dtStr) && !isUTCPattern.test(dtStr) && !isISOPattern.test(dtStr);
}

/**
 * Divide Datetime String into 3 parts: Date, Time and Timezone
 * @param {String} datetime
 * @return {[*,*,*]}
 */
function matchDatetime(datetime) {
    let dateStr, timeStr, tzStr;
    [datetime, dateStr = '', timeStr = '', tzStr = ''] = datetime.match(dtPattern) || [datetime];
    return [dateStr, timeStr, tzStr];
}

/**
 * Parse Datetime String to Timestamp
 * @param dtStr
 * @return {number}
 */
function timestamp(dtStr) {
    dtStr += '';
    if (!isDatetimeStr(dtStr)) {
        throw new Error('Invalid Date');
    }
    let [dateStr, timeStr, tzStr] = matchDatetime(dtStr);
    let [year, month, date] = _divideDateStr(dateStr);
    let [hours, minutes, seconds, milliseconds] = _divideTimeStr(timeStr);

    let detailArr = [year, month, date, hours, minutes, seconds, milliseconds];
    [year, month, date, hours, minutes, seconds, milliseconds] = detailArr.map(function (t) {
        return Number(t) || 0;
    });
    month = (month || 1) - 1;
    date = date || 1;
    milliseconds = Number('0.' + milliseconds) * 1000;

    let datetime = new Date(UTC(year, month, date, hours, minutes, seconds, milliseconds));
    let offsetMinutes;
    if (isLocaleDatetime(dtStr)) {
        offsetMinutes = systemOffsetMinutes;
    } else if (isISODatetime(dtStr)) {
        offsetMinutes = 0;
    } else if (isUTCDatetime(dtStr)) {
        offsetMinutes = _getUTCOffsetMinutes(tzStr);
    }
    datetime.setUTCMinutes(datetime.getUTCMinutes() + offsetMinutes);
    return datetime.getTime();
}

/**
 * Divide Date String into 3 parts: Year, Month and Date
 * @param {String} dateStr
 * @return {Array<String|Number>}
 * @private
 */
function _divideDateStr(dateStr) {
    let [year, month = '', date = ''] = dateStr.split(dateSeparator);
    return [year, month, date];
}

/**
 * Divide Time String into 4 parts: Hours, Minutes, Seconds and Milliseconds
 * @param {String} timeStr
 * @return {Array<String|Number>}
 * @private
 */
function _divideTimeStr(timeStr) {
    let [hourMinSec, milliseconds = ''] = timeStr.split(mSecSeparator);
    let [hours, minutes = '', seconds = ''] = hourMinSec.split(timeSeparator);
    return [hours, minutes, seconds, milliseconds];
}

/**
 * Get Offset Minutes from UTC Timezone Offset String
 * @param {String} tzStr: GMT*
 * @return {number}
 * @private
 */
function _getUTCOffsetMinutes(tzStr) {
    let [sign = '+'] = tzStr.match(/[+-]/) || [];
    let tzOffset = tzStr.toLowerCase().replace(/[^0-9:]/g, '');
    let offsetMinutes = _countOffsetMinutes(tzOffset);
    return -1 * Number(sign + '' + offsetMinutes);
}

/**
 * Count Offset Minutes from UTC Timezone Offset String
 * @param {String} offsetStr: hours and minutes
 * @return {number}
 * @private
 */
function _countOffsetMinutes(offsetStr = '') {
    let separator = ':';
    if (offsetStr.indexOf(separator) === -1) {
        if (offsetStr.length % 2) {
            offsetStr = '0' + offsetStr;
        }
        offsetStr += '0000';
        offsetStr = offsetStr.slice(0, 2) + ':' + offsetStr.slice(2, 4);
    }
    let [offsetHours, offsetMinutes = ''] = offsetStr.split(separator);
    return Number(offsetHours || 0) * 60 + Number(offsetMinutes || 0);
}

export {
    matchDatetime,
    isDateStr,
    isTimeStr,
    isDatetimeStr,
    isUTCDatetime,
    isISODatetime,
    isLocaleDatetime,
    timestamp,
    timestamp as default
};

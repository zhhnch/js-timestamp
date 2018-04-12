import {timestamp, matchDatetime, isDateStr, isTimeStr, isDatetimeStr} from '@/timestamp';

let d_y = '2017';
let d_yM = '2017-01';
let d_yM_slash = '2017/1';
let d_yM_dot = '2017.01';
let d_yMd = '2017-01-01';
let d_yMd_slash = '2017/1/1';
let d_yMd_dot = '2017.1.1';

let dt_yMdH = '2017-01-01T12';
let dt_yMdHm = '2017-01-01 12:00';
let dt_yMdHms = '2017-01-01 12:00:00';
let dt_mSec = '2017-01-01 12:00:00.9';
let dt_utc = '2017-01-01 12:00:00.9 GMT';
let dt_utc_spec = '2017-01-01 12:00:00.9 GMT-5';
let dt_utc_full = '2017-01-01 12:00:00.9 GMT+05:00';
let dt_iso = '2017-01-01T00:00:00.000Z';

let t_hour = '12';
let t_min = '12:59';
let t_sec = '12:59:59';
let t_mSec = '12:59:59.9';
let t_mSec_std = '12:59:59.999';

let tz_iso = 'Z';
let tz_gmt = 'GMT';
let tz_gmt_1num = 'GMT+3';
let tz_gmt_2num = 'GMT-03';
let tz_gmt_3num = 'GMT-0330';
let tz_gmt_std = 'GMT+0330';
let tz_gmt_full = 'GMT+03:30';

describe('Date string testing.', function () {

    it(`"${d_y}" is a date string.`, function () {
        expect(isDateStr(d_y)).to.be.equal(true);
    });

    it(`"${d_yM}" is a date string.`, function () {
        expect(isDateStr(d_yM)).to.be.equal(true);
    });

    it(`"${d_yM_dot}" is a date string.`, function () {
        expect(isDateStr(d_yM_dot)).to.be.equal(true);
    });

    it(`"${d_yM_slash}" is a date string.`, function () {
        expect(isDateStr(d_yM_slash)).to.be.equal(true);
    });

    it(`"${d_yMd}" is a date string.`, function () {
        expect(isDateStr(d_yMd)).to.be.equal(true);
    });

    it(`"${d_yMd_slash}" is a date string.`, function () {
        expect(isDateStr(d_y)).to.be.equal(true);
    });

    it(`"${d_yMd_dot}" is a date string.`, function () {
        expect(isDateStr(d_yMd_dot)).to.be.equal(true);
    });

});


describe('Time string testing.', function () {

    it(`"${t_hour}" is a time string.`, function () {
        expect(isTimeStr(t_hour)).to.be.equal(true);
    });

    it(`"${t_min}" is a time string.`, function () {
        expect(isTimeStr(t_min)).to.be.equal(true);
    });

    it(`"${t_sec}" is a time string.`, function () {
        expect(isTimeStr(t_sec)).to.be.equal(true);
    });

    it(`"${t_mSec}" is a time string.`, function () {
        expect(isTimeStr(t_mSec)).to.be.equal(true);
    });

    it(`"${t_mSec_std}" is a time string.`, function () {
        expect(isTimeStr(t_mSec_std)).to.be.equal(true);
    });

});


describe('Datetime string testing.', function () {

    it(`"${d_y}" is a datetime string.`, function () {
        expect(isDatetimeStr(d_y)).to.be.equal(true);
    });

    it(`"${d_yM}" is a datetime string.`, function () {
        expect(isDatetimeStr(d_yM)).to.be.equal(true);
    });

    it(`"${d_yM_dot}" is a datetime string.`, function () {
        expect(isDatetimeStr(d_yM_dot)).to.be.equal(true);
    });

    it(`"${d_yM_slash}" is a datetime string.`, function () {
        expect(isDatetimeStr(d_yM_slash)).to.be.equal(true);
    });

    it(`"${d_yMd}" is a datetime string.`, function () {
        expect(isDatetimeStr(d_yMd)).to.be.equal(true);
    });

    it(`"${d_yMd_slash}" is a datetime string.`, function () {
        expect(isDatetimeStr(d_yMd_slash)).to.be.equal(true);
    });

    it(`"${d_yMd_dot}" is a datetime string.`, function () {
        expect(isDatetimeStr(d_yMd_dot)).to.be.equal(true);
    });

    it(`"${dt_yMdH}" is a datetime string.`, function () {
        expect(isDatetimeStr(dt_yMdH)).to.be.equal(true);
    });

    it(`"${dt_yMdHm}" is a datetime string.`, function () {
        expect(isDatetimeStr(dt_yMdHm)).to.be.equal(true);
    });

    it(`"${dt_yMdHms}" is a datetime string.`, function () {
        expect(isDatetimeStr(dt_yMdHms)).to.be.equal(true);
    });

    it(`"${dt_mSec}" is a datetime string.`, function () {
        expect(isDatetimeStr(dt_mSec)).to.be.equal(true);
    });

    it(`"${dt_utc}" is a datetime string.`, function () {
        expect(isDatetimeStr(dt_utc)).to.be.equal(true);
    });

    it(`"${dt_utc_spec}" is a datetime string.`, function () {
        expect(isDatetimeStr(dt_utc_spec)).to.be.equal(true);
    });

    it(`"${dt_utc_full}" is a datetime string.`, function () {
        expect(isDatetimeStr(dt_utc_full)).to.be.equal(true);
    });

    it(`"${dt_iso}" is a datetime string.`, function () {
        expect(isDatetimeStr(dt_iso)).to.be.equal(true);
    });

});

describe('Datetime Counterexample verification: testing.', function () {
    it('Counterexample verification: "20" is not a date string.', function () {
        let dtStr = '20';
        try {
            timestamp(dtStr);
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

    it('Counterexample verification: "20Z" is not a date string.', function () {
        let dtStr = '20Z';
        try {
            timestamp(dtStr);
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

    it('Counterexample verification: "2012:00:00.000 GMT+0800" is not a date string.', function () {
        let dtStr = '2012:00:00.000 GMT+0800';
        try {
            timestamp(dtStr);
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });
});

describe('Datetime matches testing.', function () {
    let str_dt_iso = `${d_yMd}T${t_mSec_std}${tz_iso}`;
    let str_utc = `${d_yMd} ${t_mSec_std}`;
    let str_utc_full = `${d_yMd} ${t_mSec_std} ${tz_gmt_full}`;
    let str_dt_dot = `${d_yMd_dot} ${t_mSec}`;

    it(`Match Locale Datetime "${d_y}": [${d_y}, '', '']`, function () {
        expect(matchDatetime(d_y)).to.eql([d_y, '', '']);
    });

    it(`Match Spec Date Separator "${str_dt_dot}": [${d_yMd_dot}, ${t_mSec}, '']`, function () {
        expect(matchDatetime(str_dt_dot)).to.eql([d_yMd_dot, t_mSec, '']);
    });

    it(`Match UTC Datetime "${str_utc}": [${d_yMd}, ${t_mSec_std}, '']`, function () {
        expect(matchDatetime(str_utc)).to.eql([d_yMd, t_mSec_std, '']);
    });

    it(`Match UTC Standard Datetime "${str_utc_full}": [${d_yMd}, ${t_mSec_std}, ${tz_gmt_full}]`, function () {
        expect(matchDatetime(str_utc_full)).to.eql([d_yMd, t_mSec_std, tz_gmt_full]);
    });

    it(`Match ISO Datetime "${str_dt_iso}": [${d_yMd}, ${t_mSec_std}, ${tz_iso}]`, function () {
        expect(matchDatetime(str_dt_iso)).to.eql([d_yMd, t_mSec_std, tz_iso]);
    });
});





import timestamp from '@/timestamp';

describe('日期分隔符测试', function () {
    let t = Date.parse('2017/01/01 00:00:00');
    it('日期分隔符点号"."', function () {
        expect(timestamp('2017.01.01 00:00:00.000') === t).to.be.equal(true);
    });

    it('日期分隔符"-"', function () {
        expect(timestamp('2017-01-01 00:00:00.000') === t).to.be.equal(true);
    });

    it('日期分隔符"/"', function () {
        expect(timestamp('2017/01/01 00:00:00.000') === t).to.be.equal(true);
    });
});

describe('日期分隔符正确性测试', function () {
    let t = Date.parse('2017-12-31T23:59:59.900Z');
    it('日期分隔符点号"."', function () {
        expect(timestamp('2017.12.31T23:59:59.9Z') - t).to.be.equal(0);
    });

    it('日期分隔符"/"', function () {
        expect(timestamp('2017/12/31T23:59:59.9Z') - t).to.be.equal(0);
    });
});

describe('字符串转时间戳测试', function () {
    it('2017-01-01T23:59:59 可以转为时间戳', function () {
        expect(timestamp('2017-01-01T23:59:59')).to.be.above(0);
    });

    it('2017/01/01 23:59:59.999 可以转为时间戳', function () {
        expect(timestamp('2017/01/01 23:59:59.999')).to.be.above(0);
    });

    it('2017/01/01T23:59:59.999 可以转为时间戳', function () {
        expect(timestamp('2017/01/01T23:59:59.999')).to.be.above(0);
    });

    it('2017-01-01T23:59:59.999Z 可以转为时间戳', function () {
        expect(timestamp('2017-01-01T23:59:59.999Z')).to.be.above(0);
    });
});

describe('字符串转时间戳默认值测试', function () {
    let t = (new Date(2017, 0, 1, 0, 0, 0, 0)).getTime();
    let t2017 = timestamp('2017');
    it(`2017 ${t2017} 应该等于 ${t}`, function () {
        expect(t2017).to.be.equal(t);
    });

    it(`2017/01 应该等于 ${t}`, function () {
        expect(timestamp('2017/01')).to.be.equal(t);
    });

    it(`2017-01-01 应该等于 ${t}`, function () {
        expect(timestamp('2017-01-01')).to.be.equal(t);
    });

    it(`2017/01/01 00:00 应该等于 ${t}`, function () {
        expect(timestamp('2017/01/01 00:00')).to.be.equal(t);
    });

    it(`2017-01-01T00:00:00 应该等于 ${t}`, function () {
        expect(timestamp('2017-01-01T00:00:00')).to.be.equal(t);
    });
});

describe('时区差值验证测试', function () {
    let dateStr = '2017-01-01 03:25:00.000';
    let gmt0 = timestamp(`${dateStr} GMT`);
    let gmt0830 = timestamp(`${dateStr} GMT+0830`);
    let gmtMinus1120 = timestamp(`${dateStr} GMT-1120`);
    let diff0830 = -1 * ((-8 * 3600 * 1000) + (-30 * 60 * 1000));
    let diffMinus1120 = -1 * (11 * 3600 * 1000 + 20 * 60 * 1000);

    it(`GMT+0270 minus GMT+0830 equal ${diff0830} `, function () {
        expect(gmt0 - gmt0830).to.be.equal(diff0830);
    });

    it(`GMT-1120 minus GMT-0551 equal ${diffMinus1120} `, function () {
        expect(gmt0 - gmtMinus1120).to.be.equal(diffMinus1120);
    });
});


describe('时区测试', function () {

    it('2017-01-01 08:00:00.000 GMT above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT')).to.be.above(0);
    });

    it('2017-01-01 08:00:00.000 GMT+5 above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT+5')).to.be.above(0);
    });

    it('2017-01-01 08:00:00.000 GMT+05 above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT+05')).to.be.above(0);
    });

    it('2017-01-01 08:00:00.000 GMT+050 above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT+050')).to.be.above(0);
    });

    it('2017-01-01 08:00:00.000 GMT+0050 above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT+0050')).to.be.above(0);
    });

    it('2017-01-01 08:00:00.000 GMT+00:50 above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT+00:50')).to.be.above(0);
    });

    it('2017-01-01 08:00:00.000 GMT-5 above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT-5')).to.be.above(0);
    });

    it('2017-01-01 08:00:00.000 GMT-05 above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT-05')).to.be.above(0);
    });

    it('2017-01-01 08:00:00.000 GMT-050 above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT-050')).to.be.above(0);
    });

    it('2017-01-01 08:00:00.000 GMT-0050 above 0', function () {
        expect(timestamp('2017-01-01 08:00:00.000 GMT-0050')).to.be.above(0);
    });
});

describe('时区相等测试', function () {
    let utc5 = Date.parse('Sun, Jan 01 2017 03:25:13 GMT+0500');
    let gmt5 = timestamp('2017-01-01 03:25:13.000 GMT+5');
    let gmt05 = timestamp('2017-01-01 03:25:13.000 GMT+05');
    let gmt0500 = timestamp('2017-01-01 03:25:13.000 GMT+0500');

    let gmtMinus120 = timestamp('2017-01-01 03:25:00.000 GMT-120');
    let gmtMinus0120 = timestamp('2017-01-01 03:25:00.000 GMT-0120');

    it(`parse ${gmt5} equal Date.parse ${utc5} `, function () {
        expect(utc5 - gmt5).to.be.equal(0);
    });

    it('GMT+5 equal GMT+05', function () {
        expect(gmt5 - gmt05).to.be.equal(0);
    });

    it('GMT+5 equal GMT+0500', function () {
        expect(gmt5 - gmt0500).to.be.equal(0);
    });

    it('GMT-010 equal GMT-0010', function () {
        expect(gmtMinus120 - gmtMinus0120).to.be.equal(0);
    });

});

describe('ISO时间测试', function () {
    let t = Date.parse('2017-12-31T23:59:59.900Z');
    it('2017-12-31T23:59:59.90Z ', function () {
        expect(timestamp('2017-12-31T23:59:59.90Z') - t).to.be.equal(0);
    });
});

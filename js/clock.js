/**
 * 使用HTML，CSS绘制一个时钟（注意指针可以旋转到任意位置）
 * 用Javascript编写一个Clock类，实现如下接口：
 * 1. 构造函数Clock(HTMLDomElement dom) ：在参数dom中生成上述时钟
 * 2. setTime(hour,minute,second) ：设置时钟时间，指针指定到正确位置
 * 3. run()时钟开始工作 可以使用jQuery等任何前端框架
 * */


function Clock(dom){
    thisClock = this;
    /*特有属性*/
    thisClock._cssSelector = dom;
    thisClock._cssSelector_hour = thisClock._cssSelector + ' .ico-hour';//时针
    thisClock._cssSelector_minute = thisClock._cssSelector + ' .ico-minute';//分针
    thisClock._cssSelector_second = thisClock._cssSelector + ' .ico-second';//秒针
    thisClock._cssSelector_setHour = thisClock._cssSelector + ' .setHour';//设置的时数
    thisClock._cssSelector_setMinute = thisClock._cssSelector + ' .setMinute';//设置的分数
    thisClock._cssSelector_setSecond = thisClock._cssSelector + ' .setSecond';//设置的秒数
    var HOUR = 0,
        MINUTE = 0,
        SECOND = 0;

    /*特权方法*/
    thisClock.setTime = function (hour , minute , second){
        HOUR = hour || 0;
        MINUTE = minute || 0;
        SECOND = second || 0;
        var hourRotate,
            minuteRotate,
            secondRotate;

        /*格式化时分秒数值*/
        HOUR = HOUR > 13 ? HOUR - 12 : HOUR;
        MINUTE = MINUTE > 60 ? 0 : MINUTE;
        SECOND = SECOND > 60 ? 0 : SECOND;

        /*时分秒对应的旋转弧度*/
        secondRotate = SECOND * 6;
        minuteRotate = MINUTE * 6;
        hourRotate = HOUR * 30;

        /*页面上的时钟显示*/
        $(thisClock._cssSelector_hour).css({
            transform: 'rotate(' + hourRotate + 'deg)',
            '-ms-transform': 'rotate(' + hourRotate + 'deg)',
            '-webkit-transform': 'rotate(' + hourRotate + 'deg)',
            '-o-transform': 'rotate(' + hourRotate + 'deg)'
        });
        $(thisClock._cssSelector_minute).css({
            transform: 'rotate(' + minuteRotate + 'deg)',
            '-ms-transform': 'rotate(' + minuteRotate + 'deg)',
            '-webkit-transform': 'rotate(' + minuteRotate + 'deg)',
            '-o-transform': 'rotate(' + minuteRotate + 'deg)'
        });
        $(thisClock._cssSelector_second).css({
            transform: 'rotate(' + secondRotate + 'deg)',
            '-ms-transform': 'rotate(' + secondRotate + 'deg)',
            '-webkit-transform': 'rotate(' + secondRotate + 'deg)',
            '-o-transform': 'rotate(' + secondRotate + 'deg)'
        });
    };//设置时间
    thisClock.init = function(){
        var clockStr = '<div class="ico clock-body">'
            + ' <span class="ico ico-hour"></span>'
            + ' <span class="ico ico-minute"></span>'
            + ' <span class="ico ico-second"></span>'
            + '</div>'
            + '<div class="setTime">设置时间：'
            + ' <input type="text" placeholder="0" name="setHour" class="setHour"/>:'
            + ' <input type="text" placeholder="0" name="setMinute" class="setMinute" />:'
            + ' <input type="text" placeholder="0" name="setSecond" class="setSecond" />'
            + ' <button type="button" name="submit" class="setSubmit">确定</button>'
            + '</div>';

        $(thisClock._cssSelector).append(clockStr);
        var date = new Date();
        thisClock.setTime(date.getHours(),date.getMinutes(),date.getSeconds());
        run();
    };//初始化时钟

    var run = function(){
        setInterval(function(){
            SECOND++;
            if(SECOND == 60){
                MINUTE++;
                SECOND = 0;
            }
            if(MINUTE == 60){
                HOUR++;
                MINUTE = 0;
            }
            thisClock.setTime(HOUR , MINUTE , SECOND);
        },1000);
    };//时间的增加函数
}

var myClock = new Clock('#clock');
myClock.init();

$(document).on('input','.setHour',function(){
    if($(this).val() > 23) $(this).val('0');
});
$(document).on('input','.setMinute , .setSecond',function(){
    if($(this).val() > 59) $(this).val('0');
});
/*设置*/
$(document).on('click','.setSubmit',function(){
    var hour = $(myClock._cssSelector_setHour).val(),
        minute = $(myClock._cssSelector_setMinute).val(),
        second = $(myClock._cssSelector_setSecond).val();
    myClock.setTime(hour , minute , second);
});

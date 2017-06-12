/**
 * Created by HUCC on 2017/2/4.
 */
function animate(element, obj, fn) {
    clearInterval(element.timer);

    element.timer = setInterval(function () {

        var flag = true;

        for (var k in obj) {
            var attr = k;
            var target = obj[k];

            if (attr == "opacity") {
                var leader = getStyle(element, attr);
                leader = parseFloat(leader) || 0;
                //1. opacity是小数，我们为了方便做动画，leader和target都需要扩大100
                leader *= 100;
                target *= 100;

                //2. 算出来的step也是扩大了100倍
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;

                //3. 设置的时候，需要让leader缩小100倍,不要px
                element.style[attr] = leader/100;

                if (leader != target) {
                    flag = false;
                }

            }else if(attr == "zIndex"){
                //如果是zIndex，特殊处理
                element.style.zIndex = target;
            } else {
                var leader = getStyle(element, attr);
                leader = parseFloat(leader) || 0;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                element.style[attr] = leader + "px";

                if (leader != target) {
                    flag = false;
                }
            }
        }

        if (flag) {
            clearInterval(element.timer);
            //1. 清除定时器的时候，说明我这次动画已经执行完了
//                if(fn){
//                    fn();
//                }

            fn && fn();


        }
        //console.log("代码还在执行吗");
    }, 15);
}

function getStyle(element, attr) {
    //能力检测
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    } else {
        return element.currentStyle[attr];
    }
}
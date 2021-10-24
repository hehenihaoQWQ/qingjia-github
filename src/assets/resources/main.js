//请假审核
function check(id, state) {
    if (state === 1 && dateFormat(new Date()) >= $("input[name='endTime']").val()) {
        info("当前时间晚于请假结束时间，不能批准")
    } else {
        var params = {id: id, state: state};
        $.post("check", params, function (result) {
            if (result.code === 0) {
                layer.msg(result.msg, {icon: 6, time: 1000}, function () {
                    location.href = 'teacher';
                })
            } else if (result.code === 1) {
                layer.msg(result.msg, {icon: 5, time: 1000})
            }
        })
    }
}

//弹框通知
function msg(content) {
    layer.open({
        type: 1,
        title: '提示',
        offset: 'auto', //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        id: 'layerDemo',//防止重复弹出
        content: content,
        btn: '确定',
        btnAlign: 'c', //按钮居中
        closeBtn: false,
        shade: 0.8, //不显示遮罩
        yes: function () {
            layer.closeAll();
        }
    });
}

//弹框提醒
function info(content, icon = 5) {
    layer.msg(content, {icon: icon, time: 1200})
}

//格式化时间
function dateFormat(date, fmt = "YYYY-mm-dd HH:MM:SS") {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}
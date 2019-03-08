<!-- 加在微信资源 -->
$.getScript("https://res.wx.qq.com/open/js/jweixin-1.4.0.js", function(){
     function getWxData(){
        $.ajax({
            url: "https://h5.opbear.com/share",
            data: {
                "act_type":"TM_LYX"
            },
            type: "POST",
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if (data.code == 0) {
                    setWXConfig(data.data);
                }
            },
            error: function (err) {
                // console.log(err);
            }
        });
    }

    function setWXConfig(wxConfig) {
        wx.config({
            debug: false,
            appId: wxConfig.appId,
            timestamp: wxConfig.timestamp,
            nonceStr: wxConfig.nonceStr,
            signature: wxConfig.signature,
            jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone'
            ]
        });
        wx.ready(function () {
            var shareData = {
                title:$("meta[itemprop=name]").attr("content"),
                desc: $("meta[itemprop=description]").attr("content"),
                link: $("meta[itemprop=url]").attr("content"),
                imgUrl:$("meta[itemprop=image]").attr("content"),
                success: function () {
                    // 用户确认分享后执行的回调函数}
                    // alert('成功');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    // alert('取消');
                }
            };
            wx.checkJsApi({
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareQZone'
                ]
            });
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareQZone(shareData);
        });
        wx.error(function (res) {
            // alert('wx.error:' + JSON.stringify(res));
        });
    }
    getWxData();
});

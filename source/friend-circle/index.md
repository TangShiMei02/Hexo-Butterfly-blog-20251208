---
title: 朋友圈
date: 2026-01-03 17:03:53
top_img: transparent
comments: false
---

<div id="friend-circle-lite-root"></div>

<script>

    if (typeof UserConfig === 'undefined') {

        var UserConfig = {

            // 填写你的fc Lite地址

            private_api_url: 'https://fcircle.lilys.top/',    // https://fcircle.leleosd.top/  这个也是可以用，但是用leleo牢牢地分发的而二级域名需要一个月一解析，太麻烦。

            // 点击加载更多时，一次最多加载几篇文章，默认20

            page_turning_number: 21,

            // 头像加载失败时，默认头像地址

            error_img: 'https://i.p-i.vip/30/20240815-66bced9226a36.webp',

        }

    }

</script>

<link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.css">

<script src="https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.js"></script>

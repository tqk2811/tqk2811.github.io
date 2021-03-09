// ==UserScript==
// @name               LINE Sticker Download
// @name:zh-CN         LINE Sticker Download
// @namespace          https://veltlion.github.io/line-sticker-download
// @include            https://store.line.me/stickershop/product/*
// @include            https://store.line.me/emojishop/product/*
// @version            1.6
// @description        Add download button for line sticker/emoji store
// @description:zh-cn  在 LINE STORE 的 Sticker/Emoji 页面添加下载按钮
// @author             空
// @grant              GM_download
// ==/UserScript==

var path = window.location.pathname;
var id = path.replace(/\/(emoji|sticker)shop\/product\/([a-f\d]+).*/g, '$2');
var link = 'https://sdl-stickershop.line.naver.jp/stickershop/v1/product/' + id + '/iphone/stickers@2x.zip';
var aslink = 'https://sdl-stickershop.line.naver.jp/stickershop/v1/product/' + id + '/iphone/stickerpack@2x.zip';
var emlink = 'http://dl.stickershop.line.naver.jp/sticonshop/v1/' + id + '/sticon/iphone/package.zip?v=1'
if ($('span').hasClass('MdIcoAni_b') || $('span').hasClass('MdIcoPlay_b') ||$('span').hasClass('MdIcoSound_b') ||
    $('span').hasClass('MdIcoFlashAni_b') || $('span').hasClass('MdIcoFlash_b')) link = aslink;
else if (path.indexOf('emoji') > -1) link = emlink;
var file = { url: link, name: document.title.replace(/(.+) (-|–) .+/g, '$1') + '.zip' };
var btnstr = 'Download';
var btn = '<li class="mdCMN08Li" style="list-style-type: none">'
        + '<a class="MdBtn01 mdBtn01" id="download" style="background: #33b1ff">'
        + '<span class="mdBtn01Inner">'
        + '<span class="mdBtn01Txt">' + btnstr + '</span>'
        + '</span></a></li>';
if ($('div').hasClass('MdCMN38EndTop')) {
    btn = '<li><button class="MdBtn01P01" id="download" style="list-style-type: none;background: #33b1ff" >'
        + btnstr
        + '</button></li>';
    $('.mdCMN38Item01Ul').find('li:eq(0)').remove();
    $('.mdCMN38Item01Ul').prepend(btn);
}
else if ($('div').hasClass('mdCMN08Txt')) {
    $('.mdCMN08Ul').find('li:eq(0)').remove();
    $('.mdCMN08Ul').prepend(btn);
}
else if ($('div').hasClass('mdMN05Btn')) {
    //$('.MdBtn01').remove();
    $('.mdMN05Btn').prepend(btn);
}
$('body').on('click', '#download', function(){download(file.url,file.name);});

function download(downloadUrl,fileName){
    var postData = new FormData();
		var xhr = new XMLHttpRequest();
		xhr.open('GET', downloadUrl, true);
		xhr.responseType = 'blob';
		xhr.onload = function (e) {
			var blob = xhr.response;
			this.saveOrOpenBlob(fileName,blob);
		}.bind(this)
		xhr.send(postData);
 }
function saveOrOpenBlob(fileName,blob) {
		var tempEl = document.createElement("a");
    	document.body.appendChild(tempEl);
    	tempEl.style = "display: none";
        url = window.URL.createObjectURL(blob);
        tempEl.href = url;
        tempEl.download = fileName;
        tempEl.click();
		window.URL.revokeObjectURL(url);
	}
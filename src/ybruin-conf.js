fis.config.set('projectConf', {
    name: 'ybruin-site', //项目名称
    terminal: 'pc', //设备端分类:pc,mobild
    domainList: ['http://res.cont.yy.com'], //静态资源CDN
    compDomain: 'http://res.cont.yy.com', //组件资源CDN
    outputPath: '../dist', //项目产出路径
    compressCss: true, //开启css文件压缩
    compressImg: true, //开启图片文件压缩
    compressJs: true, //开启js文件压缩
    useSprite: true, //开启雪碧图
    useHash: true, //开启MD5文件戳
    useModule: 'cmd' //模块化模式:amd,cmd,commonjs,false

})

fis.config.set('projectConf.useSprite', {
    to: '/images/sprites', //雪碧图产出路径
    margin: 2 //图片间隔
})

fis.runConf();
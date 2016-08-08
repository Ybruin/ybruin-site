var settings = {
    domainList: ['http://res.cont.yy.com'], //静态资源CDN
    compDomain: 'http://res.cont.yy.com', //组件资源CDN
    devPath: '../local', //项目开发路径
    buildPath: '../dist', //项目产出路径
    useModule: 'cmd', //模块化模式:amd,cmd,commonjs,false
    compressCss: true, //开启css文件压缩
    compressImg: true, //开启图片文件压缩
    compressJs: true, //开启js文件压缩
    useSprite: true, //开启雪碧图
    useHash: true, //开启MD5文件戳 
};

// 模块化
ybruin.hook('commonjs', {
    paths: {
        'ejs': '/lib/ejs.js'
    }
})

// 打包
ybruin.match('::package', {
    spriter: fis.plugin('csssprites-group', {
        to: '/images/sprites', //雪碧图产出路径
        margin: 2 //图片间隔
    })
})

// 默认产出路径
ybruin
    // 默认文件
    .match('/(**)', {
        release: '/ybruin-site/pc/$1'
    })
    // html文件
    .match('/html/(**)', {
        isViews: true,
        //release: '/html/ybruin-site/$1'
    })
    // 图片文件
    .match('/images/(**)', {
        useHash: settings.useHash,
        //release: '/images/ybruin-site/$1'
    })
    // js文件
    .match('/js/**', {
        isMod: settings.useModule,
        useHash: settings.useHash,
        //release: '/js/ybruin-site/$1'
    })
    // scss文件
    .match('/sass/(**).scss', {
        useSprite: settings.useSprite,
        useHash: settings.useHash,
        parser: fis.plugin('node-sass'),
        rExt: '.css',
        release: '/ybruin-site/pc/css/$1'
    })
    // css文件
    .match('/css/(**)', {
        useSprite: settings.useSprite,
        useHash: settings.useHash,
        //release: '/css/ybruin-site/$1'
    })
    // 私有scss文件
    .match('/sass/(_**.scss)', {
        release: false
    })
    // 第三方库
    .match('/lib/(**)', {
        //release: '/lib/ybruin-site/$1'
    })

// 发布本地开发版本
ybruin.media('dev')
    // 打包
    .match('::package', {
        postpackager: ybruin.plugin('loader', {
            useModule: settings.useModule //引入入口文件模式:amd,cmd,commonjs,false
        })
    })
    // 组件库
    .match('/components/(**)', {
        //release: '/components/ybruin-site/$1'
    })
    .match('**', {
        deploy: fis.plugin('local-deliver', {
            to: settings.devPath
        })
    })

// 发布线上开发版本：js压缩，样式压缩，png压缩
ybruin.media('build')
    // 打包
    .match('::package', {
        postpackager: ybruin.plugin('loader', {
            domain: settings.domainList[0], //非组件合并链接CDN
            compDomain: settings.compDomain, //组件合并链接CDN
            useModule: settings.useModule //引入入口文件模式:amd,cmd,commonjs,false
        })
    })
    // 对js进行压缩
    .match('**.js', {
        optimizer: settings.compressJs && fis.plugin('uglify-js'),
        domain: settings.domainList
    })
    // 对scss,css进行压缩
    .match('**.{scss,css}', {
        optimizer: settings.compressCss && fis.plugin('clean-css', {
            'keepBreaks': true //保持一个规则一个换行
        }),
        domain: settings.domainList
    })
    // 对图片进行png压缩
    .match('**.png', {
        optimizer: settings.compressImg && fis.plugin('png-compressor', {
            'type': 'pngquant'
        })
    })
    // 所有图片
    .match('::image', {
        domain: settings.domainList
    })
    // 组件库
    .match('/components/(**)', {
        release: false
    })
    .match('**', {
        deploy: fis.plugin('local-deliver', {
            to: settings.buildPath
        })
    })

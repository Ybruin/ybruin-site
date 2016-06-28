fis.config.set('projectConf',{
    name:'ybruin-site',
    terminal:'pc',
    domainList:['http://res.cont.yy.com'],
    compDomain:'http://res.cont1.yy.com',
    outputPath:'../dist',
    compressCss:true,
    compressImg:true,
    compressJs:true,
    useSprite:true,
    useHash:true
})

fis.config.set('projectConf.useSprite',{
	to:'/images/sprites',
    margin:2
})

fis.runConf();
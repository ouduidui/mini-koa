const fs = require('fs');
const path = require('path');

module.exports = (dirPath) => {
    return async (ctx, next) => {
        const url = path.resolve(__dirname, dirPath);
        const fileBaseName = path.basename(url);

        if(ctx.url.indexOf(`/${fileBaseName}`) === 0){
            // 读取文件
            try {
                const filepath = url + ctx.url.replace(`/${fileBaseName}`, "");
                const stats = fs.statSync(filepath);

                if(stats.isDirectory()) {  // 判断是否会文件夹
                    const dir = fs.readdirSync(filepath);
                    const ret = [`<div style="padding-left: 20px">`];
                    dir.forEach(filename => {
                        if(filename.indexOf(".") > -1) {  // 不带小数点格式就是文件夹
                            ret.push(
                                `<p><a style="color:black" href="${ctx.url}/${filename}">${filename}</a></p>`
                            )
                        }else {  // 文件
                            ret.push(`<p><a href="${ctx.url}/${filename}">${filename}</a></p>`)
                        }
                    })
                    ret.push(`</div>`);
                    ctx.body = ret.join('');
                }else {
                    // 文件
                    ctx.body = fs.readFileSync(filepath).toString();
                }
            }catch (e) {
                console.log(e);
                ctx.body = "404, not found";
            }
        }else {
            // 不是静态文件
            await next();
        }
    }
}

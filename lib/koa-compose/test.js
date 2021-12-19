const compose = require('./index');

async function fn1(ctx, next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
}

async function fn2(ctx, next) {
    console.log("fn2");
    await delay();
    await next();
    console.log("end fn2");
}

function fn3(ctx, next) {
    console.log("fn3");
}

function delay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();

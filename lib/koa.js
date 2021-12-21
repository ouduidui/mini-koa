const http = require('http');

const context = require('./context');
const request = require('./request');
const response = require('./response');

const compose = require('./koa-compose');

module.exports = class Koa {
	constructor() {
		this.middlewares = [];
	}

	/**
	 * 监听端口
	 * */
	listen(...args) {
		// 创建服务
		const server = http.createServer((req, res) => {
			// 创建上下文
			const ctx = this.createContext(req, res);

			// 中间件合成
			const fn = compose(this.middlewares);
			fn(ctx);

			// 执行响应
			let body = ctx.body;
			if (typeof body === 'object') {
				body = JSON.stringify(body);
			}
			res.end(body);
		});

		// 开启监听
		server.listen(...args);
	}

	/**
	 * 添加中间件方法
	 * @param middleware {function}
	 * */
	use(middleware) {
		this.middlewares.push(middleware);
	}

	/**
	 * 创建上下文
	 * @param req {object}
	 * @param res {object}
	 * */
	createContext(req, res) {
		const ctx = Object.create(context);
		ctx.request = Object.create(request);
		ctx.response = Object.create(response);

		ctx.req = ctx.request.req = req;
		ctx.res = ctx.response.res = res;

		return ctx;
	}
};

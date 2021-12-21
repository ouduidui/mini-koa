class Router {
	constructor() {
		this.stack = [];
	}

	/**
	 * 注册
	 * */
	register(path, methods, middleware) {
		this.stack.push({ path, methods, middleware });
	}

	/**
	 * get请求
	 * */
	get(path, middleware) {
		this.register(path, 'get', middleware);
	}

	/**
	 * post请求
	 * */
	post(path, middleware) {
		this.register(path, 'post', middleware);
	}

	routes() {
		let stock = this.stack;
		return async function (ctx, next) {
			let currentPath = ctx.url;
			let route;

			for (let i = 0; i < stock.length; i++) {
				let item = stock[i];
				// 匹配页面和方法
				if (currentPath === item.path && item.methods.includes(ctx.method)) {
					route = item.middleware;
					break;
				}
			}

			// 执行中间件
			if (typeof route === 'function') {
				route(ctx, next);
				return;
			}

			await next();
		};
	}
}

module.exports = Router;

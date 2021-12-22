/**
 * 洋葱圈模型
 * */
module.exports = function compose(middlewares) {
  return function (ctx) {
    return dispatch(0);

    function dispatch(i) {
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(
          ctx,
          // next函数
          () => dispatch(++i)
        )
      );
    }
  };
};

function asyncHandler(fn) {
    return function asyncHandlerWrapper(...args) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
    };
}

function requestLogger(req, res, next) {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
}

module.exports = {
    asyncHandler,
    requestLogger,
}
import { Response, Request, NextFunction } from 'express';

/**
 * this function handles all errors for express. It can be more complex depending on the needs
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (!err) return next();

    res.status(500);
    return res.json({
        error: Object.keys(err).length ? err : err.toString(),
        name: err?.name || undefined,
        message: err?.message || 'Unknown error',
        stack: err?.stack ? err.stack.split('\n') : undefined,
    });
}

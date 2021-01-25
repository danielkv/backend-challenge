import { Response, Request, NextFunction } from 'express';

/**
 * this function handles all errors for express. It can be more complex depending on the needs
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (!err) return next();

    res.status(500);
    return res.render('error', { error: err });
}

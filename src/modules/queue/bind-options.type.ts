import { Options } from 'amqplib';

export type BindOpts = { exchange?: Options.AssertExchange; queue?: Options.AssertQueue };

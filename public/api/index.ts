import handler from './_utils/graphql-server';
import { NowRequest, NowResponse } from '@now/node'

const api = (req: NowRequest, res: NowResponse) => handler(req, res);

export {api};

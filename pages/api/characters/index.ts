import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

type QueryConfig = {
    take?: number;
    skip?: number;
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const limit = req.query.limit;
    const limitString = Array.isArray(limit) ? limit[0] : limit;
    const skip = req.query.skip;
    const skipString = Array.isArray(skip) ? skip[0] : skip;

    const queryConfig: QueryConfig = {};

    if(limitString) {
        const take = parseInt(limitString);
        if (isNaN(take)) {
            return res.status(400).json({ message: 'Invalid limit' });
        }
        queryConfig.take = take;
    }
    if (skipString) {
        const skip = parseInt(skipString);
        if (isNaN(skip)) {
            return res.status(400).json({ message: 'Invalid skip' });
        }
        queryConfig.skip = skip;
    }

    const characters = await prisma.tog_character.findMany(queryConfig);
    return res.status(200).json(characters);
}

export default handler;

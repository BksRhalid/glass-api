import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const id = req.query.id;
    const idString = Array.isArray(id) ? id[0] : id || ''; 
    const idNum = parseInt(idString);
    if (!idNum) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    const character = await prisma.tog_character.findUnique({
        where: {
            id: idNum,
        },
    });
    if (!character) {
        return res.status(404).json({ message: 'Character not found' });
    }
    return res.status(200).json(character);
}

export default handler;



import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

const publisherSelection = {
    id: publishers.id,
    name: publishers.name,
};

type PublisherRow = {
    id: number;
    name: string;
};

function mapPublisher(row: PublisherRow): Publisher {
    return {
        id: row.id,
        name: row.name,
    };
}

/**
 * Returns every publisher in alphabetical order by name.
 *
 * @param db - The database instance used to query publisher records.
 * @returns The publishers ordered by their display name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select(publisherSelection)
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map(mapPublisher);
}

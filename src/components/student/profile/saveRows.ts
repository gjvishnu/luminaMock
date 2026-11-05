// Saves a list section row by row. Finished steps are recorded as they happen,
// so a retry after a partial failure does not repeat them.
export async function saveRows<Row extends { key: string; id?: string }, Body>({
  rows,
  removedIds,
  savedBodies,
  toBody,
  create,
  update,
  remove,
  onCreated,
  onUpdated,
  onRemoved,
}: {
  rows: Row[];
  removedIds: string[];
  savedBodies: Map<string, Body>;
  toBody: (row: Row) => Body;
  create: (body: Body) => Promise<{ id: string }>;
  update: (id: string, body: Body) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  onCreated: (key: string, id: string) => void;
  onUpdated?: (key: string) => void;
  onRemoved: (id: string) => void;
}) {
  let changes = 0;

  for (const row of rows) {
    const body = toBody(row);

    if (!row.id) {
      const created = await create(body);
      onCreated(row.key, created.id);
      savedBodies.set(row.key, body);
      changes += 1;
    } else if (JSON.stringify(body) !== JSON.stringify(savedBodies.get(row.key))) {
      await update(row.id, body);
      onUpdated?.(row.key);
      savedBodies.set(row.key, body);
      changes += 1;
    }
  }

  for (const id of removedIds) {
    await remove(id);
    onRemoved(id);
    changes += 1;
  }

  return changes;
}

One file per batch of use-case pages, e.g. `wave-a-jobs.ts`:

```ts
import type { UseCase } from "../useCases";

const entries: UseCase[] = [
  { slug: "...", publishDate: "2026-12-01", /* ... */ },
];

export default entries;
```

`src/data/useCases.ts` loads every `*.ts` file here. Slugs must be unique across all files.

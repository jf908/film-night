import type { CreditsResponse } from '../../../hooks/movieDbTypes';

const importantJobs = [
  'Director',
  'Screenplay',
  'Author',
  'Novel',
  'Characters',
  'Writer',
  'Story',
  'Teleplay',
];

export const coalesceCrew = (crew: NonNullable<CreditsResponse['crew']>) => {
  const results: { id: number; name: string; jobs: string[] }[] = [];
  const rest: typeof crew = [];
  crew.forEach((member) => {
    const existing = results.find((r) => r.id === member.id);
    if (
      member.id &&
      member.name &&
      member.job &&
      (importantJobs.includes(member.job) || existing)
    ) {
      if (existing) {
        existing.jobs.push(member.job);
      } else {
        results.push({ id: member.id, name: member.name, jobs: [member.job] });
      }
    } else {
      rest.push(member);
    }
  });
  return [results, rest] as const;
};

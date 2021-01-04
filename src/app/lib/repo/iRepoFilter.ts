export interface iRepoFilter {
  filter: {
    [key: string]: string | string[],
  },
  transform: string,
  includes: string[],
}

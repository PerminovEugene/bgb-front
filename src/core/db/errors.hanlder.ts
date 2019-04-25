export const isUniqDbError = (e: any) => {
  return e.code === '23505';
};

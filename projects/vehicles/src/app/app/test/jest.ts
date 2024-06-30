export function isJest(): boolean {
  return typeof (jest as any) !== 'undefined';
}

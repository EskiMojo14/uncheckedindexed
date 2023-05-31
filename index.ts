type IfMaybeUndefined<T, True, False> = [undefined] extends [T] ? True : False;

const testAccess = ({} as Record<string, 0>)["a"];

export type IfUncheckedIndexedAccess<True, False> = IfMaybeUndefined<
  typeof testAccess,
  True,
  False
>;

export type UncheckedIndexedAccess<T> = IfUncheckedIndexedAccess<
  T | undefined,
  T
>;

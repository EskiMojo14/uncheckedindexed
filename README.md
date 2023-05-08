# `uncheckedindexed`
Some type helpers to match the user's `noUncheckedIndexedAccess` setting

## Installation

Install via `npm`:

```
npm install uncheckedindexed
```

## Exports

### `UncheckedIndexedAccess<T>`

The most common use case - Evaluates to `T | undefined` if `noUncheckedIndexedAccess` is enabled, otherwise evaluates to `T`.

```ts
import type { UncheckedIndexedAccess } from "uncheckedindexed"

type SelectById<T> = (record: Record<string, T>, id: string) => UncheckedIndexedAccess<T>
```

### `IfUncheckedIndexedAccess<True, False>`

Evaluates to `True` if `noUncheckedIndexedAccess` is enabled, otherwise evaluates to `False`.

```ts
import type { IfUncheckedIndexedAccess } from "uncheckedindexed"

type SelectById<T> = (record: Record<string, T>, id: string) => IfUncheckedIndexedAccess<T | undefined, T>
```

## Explanation

Currently, there is no officially supported way to see if the user has [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) enabled.

*There is a [feature request](https://github.com/microsoft/TypeScript/issues/50196) for compiler settings to be available as Types - please support it if this is something you would find useful!*

However, it is possible to detect:
```ts
const testAccess = ({} as Record<string, 0>).a; // will be 0 | undefined if enabled, otherwise 0
```

This sort of test is impossible to make in a `.d.ts`, as it would be compiled down to 
```ts
declare const testAccess: 0
```
based on the *package's* `noUncheckedIndexedAccess` setting.

This package keeps its type declarations in a `.ts` file, where this limitation isn't the case and the value is evaluated by the user's TypeScript properly.

```ts
type IfMaybeUndefined<T, True, False> = [undefined] extends [T] ? True : False;

const testAccess = ({} as Record<string, 0>).a;

export type IfUncheckedIndexedAccess<True, False> = IfMaybeUndefined<
  typeof testAccess,
  True,
  False
>;

export type UncheckedIndexedAccess<T> = IfUncheckedIndexedAccess<
  T | undefined,
  T
>;
```

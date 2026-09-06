/**
 * Widens a content module's type from its exact literal values (produced by
 * `as const` on the English source) down to their base primitive types,
 * while preserving object/array/tuple structure.
 *
 * Every `*.hi.ts` file does `satisfies LocaleShape<typeof enModule>` instead
 * of `satisfies typeof enModule`. Without the widening, TypeScript would
 * require the Hindi file's strings to be the SAME literal values as
 * English's (`'Kind Words'`, never `'आपकी बातें'`) — which is exactly what a
 * translation isn't. `LocaleShape` keeps the check that actually matters
 * (same keys, same nesting, same array lengths-of-shape) and drops the one
 * that doesn't (identical text).
 */
export type LocaleShape<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? LocaleShape<U>[]
        : T extends object
          ? { [K in keyof T]: LocaleShape<T[K]> }
          : T

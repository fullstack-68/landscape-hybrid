# Todo RSC + RCC

- `cd rsc-client`
- `pnpm install`
- `pnpm run build`
- `pnpm run start`

## Issue

- From the linked React GitHub issue #28923, a known bug was reported in React 19 where when a component suspends using the use hook together with useTransition(), the transition's pending flag turns to true initially but never switches back to false after the transition finishes. This causes any UI indicators based on the pending state (like loading spinners) to remain stuck on "pending" indefinitely.

  - https://github.com/facebook/react/issues/28923

- I got error during build. So I have to ignore the type during build. (See `next.config.ts`)
  - https://community.vercel.com/t/nextjs-15-deployment-linting-errors/14971/4

```
Checking validity of types  ...next/types/app/page.ts:34:29
Type error: Type 'PageProps' does not satisfy the constraint 'import("C:/Users/admin/Desktop/rsc-client/.next/types/app/page").PageProps'.
  Types of property 'params' are incompatible.
    Type '{ slug: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```

# Todo

https://github.com/facebook/react/issues/28923

From the linked React GitHub issue #28923, a known bug was reported in React 19 where when a component suspends using the use hook together with useTransition(), the transition's pending flag turns to true initially but never switches back to false after the transition finishes. This causes any UI indicators based on the pending state (like loading spinners) to remain stuck on "pending" indefinitely.

import { useRef, useLayoutEffect, useEffect } from 'react'

/* When we are performing a server rendered, window is still undefined (we haven't had a DOM) so we use useEffect,
* otherwise when we're in client side, we alredy have a DOM so we use useLayoutEffect
* check this: https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
* */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }) {
    if (!isBrowser) return { x: 0, y: 0 }

    const target = element ? element.current : document.body
    const position = target.getBoundingClientRect()

    return useWindow
        ? { x: window.scrollX, y: window.scrollY }
        : { x: position.left, y: position.top }
}

export default function useScrollPosition(effect, deps, element, useWindow, wait) {
    const position = useRef(getScrollPosition({ useWindow }))

    let throttleTimeout = null

    const callBack = () => {
        const currPos = getScrollPosition({ element, useWindow })
        effect({ prevPos: position.current, currPos })
        position.current = currPos
        throttleTimeout = null
    }

    useIsomorphicLayoutEffect(() => {
        if (!isBrowser) {
            return
        }

        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait)
                }
            } else {
                callBack()
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('load', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('load', handleScroll)
        }
    }, deps)
}

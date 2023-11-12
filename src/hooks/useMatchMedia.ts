import {useState, useLayoutEffect} from "react";

const queries = [
    '(max-width: 768px)',
    '(min-width: 769px) and (max-width: 992px)',
    '(min-width: 993px)'
]

export const useMatchMedia = (): { [key: string]: boolean } => {

    const mediaQueryLists = queries.map(query => matchMedia(query));
    const getValues = () => mediaQueryLists.map(mql => mql.matches);
    const [values, setValues] = useState(getValues);

    useLayoutEffect(() => {
        //updating matches values
        const handler = () => setValues(getValues);

        mediaQueryLists.forEach(mql => mql.addEventListener('change', handler))

        // handler cleaning function
        return () => mediaQueryLists.forEach(mql => mql.removeEventListener('change', handler));
    })

    return ['isMobile', 'isTablet', 'isDesktop'].reduce((acc, scr, i) => ({
        ...acc, [scr]: values[i],
    }), {})
}
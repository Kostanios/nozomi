import { FC, useEffect } from 'react';

interface IRedirect {
    to: string
}
export const Redirect: FC<IRedirect> = ({ to }) => {
    useEffect(() => {
        window.location.href = to;
    }, []);

    return null;
};


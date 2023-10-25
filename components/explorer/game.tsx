import { useEffect, useRef, useState } from 'react';
import kaboom from 'kaboom';
import { BackIcon } from '@/components/ui/icons';

import { initScenes } from './scenes'


export const Explorer = () => {
    const inputElement = useRef();
    const [kaboomState, setKaboomState] = useState(null);

    useEffect(() => {
        if (inputElement) {
            const kaboomGame = kaboom({
                canvas: inputElement.current,
                background: [233, 131, 123],
                global: true,
            });

            // window.kaboomGame = kaboomGame;

            setKaboomState(kaboomGame as any);

            initScenes({ kaboomGame })
        }

        console.log('KABOOM: ', kaboom);
    }, [inputElement]);

    console.log('KABOOM GAME', kaboomState);
    return (
        <div className='h-screen relative'>
            <div className='flex z-50 absolute mx-4 my-4'>
                <a href='/videos2'>
                    {' '}
                    <BackIcon className="text-4xl" />{' '}
                </a>
            </div>
            <canvas className='z-10 absolute' ref={inputElement as any}>
                {' '}
            </canvas>
        </div>
    );
};

import React from 'react'
import { TopBar } from './top-bar';
import { MapArea } from './map-area';
import '../../public/styles/styles.scss';

export const App = () => {
    return (
        <>
            <TopBar />
            <MapArea />
        </>
    )
}

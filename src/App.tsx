import React from 'react';
import {ApiContextProvider} from "./contexts/ApiContext";

// @ts-ignore
import AlertTemplate from 'react-alert-template-basic';
import {Provider as AlertProvider, positions, transitions} from 'react-alert';

import ResumeCreate from "./pages/ResumeCreate";

const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}

function App() {
    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <ApiContextProvider>
                <div className="m-auto" style={{maxWidth: 600}}>
                    <ResumeCreate/>
                </div>
            </ApiContextProvider>
        </AlertProvider>
    );
}

/*
                <BrowserRouter>
                    <Routes>
                        <Route path="" element={}/>
                    </Routes>
                </BrowserRouter>
 */

export default App;

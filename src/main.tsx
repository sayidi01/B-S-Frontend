import React, { Suspense, useState } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind CSS
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';



// Redux
import { Provider } from 'react-redux';
import store from './store/index';
import { Toaster } from 'react-hot-toast';
import UserContext from './config/UserContext';
import { MantineProvider } from '@mantine/core';

const App = () => {
    const [data, setData] = useState({});

    return (
        <UserContext.Provider value={{ data, setData }}>
            <RouterProvider router={router } />
            <Toaster />
        </UserContext.Provider>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <MantineProvider>
                    <App />
                </MantineProvider>
            </Provider>
        </Suspense>
    </React.StrictMode>
);

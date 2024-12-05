import { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import store from './store';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [isLargeDevice, setIsLargeDevice] = useState<boolean>(true);



    useEffect(() => {
        // Vérifier la largeur de la fenêtre lors du premier rendu
        const handleResize = () => {
            // Autoriser les appareils avec une largeur supérieure ou égale à 1024px (tablettes grandes et ordinateurs)
            setIsLargeDevice(window.innerWidth >= 1024);
        };

        // Ajouter l'écouteur d'événement lors du montage
        window.addEventListener('resize', handleResize);

        // Exécuter la logique au chargement initial
        handleResize();

        // Nettoyer l'écouteur d'événements au démontage
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

    if (!isLargeDevice) {
        return (
            <div className="flex items-center justify-center h-screen w-screen text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Accès limité aux appareils de taille tablette ou supérieure
            </div>
        );
    }

    return (
        <div
            className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
    );
}

export default App;

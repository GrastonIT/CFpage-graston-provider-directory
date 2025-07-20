import { createContext, useContext, useEffect, useState } from 'react';

interface ProviderContextType {
    favorites: number[];
    recentViews: number[];
    toggleFavorite: (providerId: number) => void;
    addRecentView: (providerId: number) => void;
    isFavorite: (providerId: number) => boolean;
}

const ProviderContext = createContext<ProviderContextType | null>(null);

const MAX_RECENT_VIEWS = 10;
const STORAGE_KEYS = {
    FAVORITES: 'graston-favorites',
    RECENT_VIEWS: 'graston-recent-views'
};

export function ProviderContextProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [recentViews, setRecentViews] = useState<number[]>([]);

    // Load saved data on mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        const savedRecentViews = localStorage.getItem(STORAGE_KEYS.RECENT_VIEWS);

        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
        if (savedRecentViews) {
            setRecentViews(JSON.parse(savedRecentViews));
        }
    }, []);

    // Save changes to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.RECENT_VIEWS, JSON.stringify(recentViews));
    }, [recentViews]);

    const toggleFavorite = (providerId: number) => {
        setFavorites(prev => {
            const isFavorited = prev.includes(providerId);
            if (isFavorited) {
                return prev.filter(id => id !== providerId);
            } else {
                return [...prev, providerId];
            }
        });
    };

    const addRecentView = (providerId: number) => {
        setRecentViews(prev => {
            const withoutCurrent = prev.filter(id => id !== providerId);
            return [providerId, ...withoutCurrent].slice(0, MAX_RECENT_VIEWS);
        });
    };

    const isFavorite = (providerId: number) => favorites.includes(providerId);

    return (
        <ProviderContext.Provider
            value={{
                favorites,
                recentViews,
                toggleFavorite,
                addRecentView,
                isFavorite
            }}
        >
            {children}
        </ProviderContext.Provider>
    );
}

export function useProviderContext() {
    const context = useContext(ProviderContext);
    if (!context) {
        throw new Error('useProviderContext must be used within a ProviderContextProvider');
    }
    return context;
}

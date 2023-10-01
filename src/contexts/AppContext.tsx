import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { AppContextType, IForm, IQuestion } from '../@types/app';

export const AppContext = createContext<AppContextType | null>(null);


export default function AppProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<IForm | null>(null);
    const [personalInformation, setPersonalInformation] = useState<IForm | null>(null);
    const [customizedQuestions, setCustomisedQuestions] = useState<IQuestion[] | []>([]);
    const [profileTypes, setProfileTypes] = useState<string[] | []>([])
    const [personalTypes, setPersonalTypes] = useState<string[] | []>([])
    const [customisedTypes, setCustomisedTypes] = useState<string[] | []>([])

    return (
        <AppContext.Provider value={{
            profile,
            setProfile,
            personalInformation,
            setPersonalInformation,
            customizedQuestions,
            setCustomisedQuestions,
            setProfileTypes,
            setPersonalTypes,
            personalTypes,
            profileTypes,
            customisedTypes,
            setCustomisedTypes
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
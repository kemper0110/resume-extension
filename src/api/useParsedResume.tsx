import {useEffect, useState} from "react";
import {useAlert} from 'react-alert';

export type Resume = {
    id: string | null
    link: string | null
    fullname: string
    phone: string
    email: string
    education: string
    experience: string
}

const useParsedResume = () => {
    const alert = useAlert();
    const [isLoading, setIsLoading] = useState(true);
    const [resume, setResume] = useState<Resume>({
        id: null,
        link: null,
        fullname: "",
        phone: "",
        email: "",
        education: "",
        experience: "",
    })
    useEffect(() => {
        const fetchingForm = async () => {
            try {
                const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})
                if (tab.id == null) throw new Error("Tab is null")
                const response: Resume = await chrome.tabs.sendMessage(tab.id, "");
                setResume(response)
                setIsLoading(false);
            } catch (e: any) {
                setIsLoading(false);
                alert.error(JSON.stringify(e));
            }
        }
        fetchingForm();
    }, [alert])
    return {resume, isLoading}
};

export default useParsedResume;
import { useState, useMemo, ChangeEvent } from "react";
import { languages } from "../data/languages";
import { toast } from "react-toastify";
import { Language } from "../types/translateTypes";

export default function useTranslate() {

    const MAX_TEXT_LENGTH = 500;

    const [inputLang, setInputLang] = useState({
        input: '',
        output: ''
    });
    const [firstLang, setFirstLang] = useState('');
    const [secondLang, setSecondLang] = useState('');
    const [changeLanguages, setChangeLanguages] = useState(false);

    // useMemo(() => inputLang.output = inputLang.input, [inputLang.input]); // enable to get a real time typying

    const langsToTranslate = useMemo(() => languages.filter((lang: Language) => lang.code !== secondLang), [secondLang]); // first section
    const langsTranslated = useMemo(() => languages.filter((lang: Language) => lang.code !== firstLang), [firstLang]); // second section

    const handle = {
        firstSection: !changeLanguages ? langsToTranslate : langsTranslated,
        secondSection: !changeLanguages ? langsTranslated : langsToTranslate
    };

    const handleInputLang = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;

        if (inputValue.length <= MAX_TEXT_LENGTH) {
            setInputLang({
                ...inputLang,
                [e.target.name]: inputValue
            });
        } else {
            toast.error('Maximum number of characters reached');
        }
    };

    return {
        MAX_TEXT_LENGTH,
        inputLang,
        setInputLang,
        langsTranslated,
        langsToTranslate,
        firstLang,
        setFirstLang,
        secondLang,
        setSecondLang,
        changeLanguages,
        setChangeLanguages,
        handle,
        handleInputLang
    };
}

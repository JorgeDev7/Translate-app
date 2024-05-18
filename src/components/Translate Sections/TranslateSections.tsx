import { FormEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { parse } from 'valibot';

import Spinner from '../spinner/Spinner';

import { translateReponse } from '../../schemas/TranslateSchema';
import { Language } from '../../types/translateTypes';

// icons
import alfa from '/icons/Sort_alfa.svg';
import sound from '/icons/sound_max_fill.svg';
import copy from '/icons/Copy.svg';
import arrows from '/icons/Horizontal_top_left_main.svg';

// styles
import styles from './TranslateSections.module.css';
import useTranslate from '../../hooks/useTranslate';

export default function TranslateSections() {

    const { MAX_TEXT_LENGTH, inputLang, setInputLang, firstLang, setFirstLang, secondLang, setSecondLang, changeLanguages, setChangeLanguages, handle, handleInputLang } = useTranslate();

    const [loading, setLoading] = useState(false);
    const [isDetectingLanguage, setIsDetectingLanguage] = useState(false);

    useEffect(() => {
        const detectALanguage = () => {
            if (inputLang.input && isDetectingLanguage) {
                // detect and return a lang code
            }
        };

        detectALanguage();
    }, [inputLang.input, isDetectingLanguage]);

    const handleTranslateSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if ([inputLang.input].includes('')) {
            toast.error('The Text to translate cannot be empty', {
                theme: "dark",
                autoClose: 3000
            });
            return;
        }

        if ([firstLang, secondLang].includes('')) {
            toast.error('You must select a language to translate', {
                theme: "dark",
                autoClose: 3000
            });
            return;
        }

        setLoading(true);

        const url = `https://api.mymemory.translated.net/get?q=${inputLang.input}&langpair=${firstLang}|${secondLang}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                toast.error('Error to translate');
                return;
            }

            const { responseData } = await response.json();
            const result = parse(translateReponse, responseData);

            if (result) {
                setInputLang({
                    ...inputLang,
                    output: result.translatedText
                });
            } else {
                toast.error('Translate Failed');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {

        if (e.currentTarget.id.includes('input')) {
            navigator.clipboard.writeText(inputLang.input)
                .then(() => {
                    toast.success('Copied to Clipboard');
                });
        } else {
            navigator.clipboard.writeText(inputLang.output)
                .then(() => {
                    toast.success('Copied to Clipboard');
                });
        }
    };

    return (
        <main className={`${styles.flex} container`}>
            <div className={styles.input}>
                <header className={styles.header}>
                    <ul className={styles.list}>
                        <li>
                            <button
                                type="button"
                                onClick={() => setIsDetectingLanguage(true)}
                                className={`${isDetectingLanguage ? styles.active : ''}`}
                            >
                                Detect Language
                            </button>
                        </li>
                        {handle.firstSection.map((lang: Language) => (
                            <li key={lang.id}>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setFirstLang(lang.code),
                                            setIsDetectingLanguage(false);
                                    }}
                                    className={`${lang.code === firstLang || lang.code === secondLang ? styles.active : ''}`}
                                >
                                    {lang.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </header>
                <main className={styles.inputArea}>
                    <textarea
                        name="input"
                        id="input"
                        className={styles.inputText}
                        onChange={handleInputLang}
                        value={!changeLanguages ? inputLang.input : inputLang.output}
                        maxLength={MAX_TEXT_LENGTH}
                    >
                    </textarea>
                    <div className={styles.inputAreaCounter}>
                        <span>{inputLang.input.length}</span>/<span>{MAX_TEXT_LENGTH}</span>
                    </div>
                </main>
                <form
                    className={styles.form}
                    onSubmit={handleTranslateSubmit}
                >
                    <div className={styles.actions}>
                        <button
                            type="button"
                        >
                            <img
                                src={sound}
                                alt="sound icon"
                            />
                        </button>
                        <button
                            type="button"
                            id='input'
                            onClick={copyToClipboard}
                        >
                            <img
                                src={copy}
                                alt="copy icon"
                            />
                        </button>
                    </div>

                    <button
                        type='submit'
                        className={styles.translate}
                    >
                        <img
                            src={alfa}
                            alt="Alfa search icon"
                            width={25}
                        />
                        Translate
                    </button>
                </form>
            </div>
            <div className={styles.output}>
                <header className={`${styles.header} ${styles.headerOutput}`}>
                    <ul className={styles.list}>
                        {handle.secondSection.map(lang => (
                            <li
                                key={lang.id}
                            >
                                <button
                                    type='button'
                                    onClick={() => setSecondLang(lang.code)}
                                    className={`${lang.code === secondLang || lang.code === firstLang ? styles.active : ''}`}
                                >
                                    {lang.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.actions}>
                        {!isDetectingLanguage && (
                            <button
                                type="button"
                                onClick={() => setChangeLanguages(!changeLanguages)}
                            >
                                <img
                                    src={arrows}
                                    alt="arrows icon"
                                />
                            </button>
                        )}
                    </div>
                </header>
                <main>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <textarea
                            name="output"
                            id="output"
                            className={styles.inputText}
                            value={!changeLanguages ? inputLang.output : inputLang.input}
                            disabled={true}
                        >
                        </textarea>
                    )}
                </main>
                <footer className={styles.footer}>
                    <div className={styles.actions}>
                        <button
                            type="button"
                        >
                            <img
                                src={sound}
                                alt="sound icon"
                            />
                        </button>
                        <button
                            type="button"
                            id='output'
                            onClick={copyToClipboard}
                        >
                            <img
                                src={copy}
                                alt="copy icon"
                            />
                        </button>
                    </div>
                </footer>
            </div>
        </main >
    );
}

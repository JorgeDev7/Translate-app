import { array, object, string } from 'valibot';

export const translateReponse = object({
    translatedText: string()
});

export const detectedLang = array(
    object({
        "language": string()
    })
);
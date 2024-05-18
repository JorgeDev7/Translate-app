import { Output } from 'valibot';
import { detectedLang } from "../schemas/TranslateSchema";

export type Language = {
    id: `${string}-${string}-${string}-${string}-${string}`;
    label: string,
    code: string;
};

export type DetectLang = Output<typeof detectedLang>;
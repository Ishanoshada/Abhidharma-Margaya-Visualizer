
// Fix: Define and export Language type, remove circular import.
export type Language = 'en' | 'si' | 'ta' | 'hi';
export type Tab = 'foundation' | 'visualization' | 'masterDashboard' | 'panchaskandha' | 'paticcasamuppada' | 'dream' | 'abhinna' | 'maranasanna' | 'punabbhava' | 'suvisiPratyaya' | 'arpana';

export type Cetasika = {
    id: string;
    name: string;
    pali: string;
};

export type CittaType = 'kusala' | 'vipaka' | 'kiriya' | 'akusala' | 'jhana' | 'magga' | 'phala';
export type VedanaType = 'somanassa' | 'domanassa' | 'upekkha' | 'sukha';

export type Citta = {
    id: string;
    name: string;
    pali: string;
    type: CittaType;
    vedana: VedanaType;
    hasPanna?: boolean;
    cetasikas: string[];
};

export type VithiStep = {
    cittaId: string;
    duration: number; // in kshanas (ක්ශන)
    label: string;
    story?: Record<Language, string>;
};

export const KASINA_TYPES = ['Pathavi (Earth)', 'Tejo (Fire)', 'Āpo (Water)', 'Vāyo (Wind)'] as const;
export type KasinaType = typeof KASINA_TYPES[number];

export type KasinaData = {
    name: KasinaType;
    description: string;
    vithi: VithiStep[];
};

export type DreamScenario = {
    id: string;
    title: string;
    description: string;
    vithi: VithiStep[];
};

export type AbhinnaScenario = {
    id: string;
    title: Record<Language, string>;
    initialStory: Record<Language, string>;
    steps: {
        pali: string;
        cittaId: string;
        story: Record<Language, string>;
    }[];
};

export type ArpanaScenario = {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    practitionerTypes: {
        id: 'dandhabhinna' | 'khippabhinna';
        name: Record<Language, string>;
        steps: {
            pali: string;
            cittaId: string;
            duration?: number;
            story: Record<Language, string>;
        }[];
    }[];
};


export type RebirthScenario = {
    id: string;
    title: Record<Language, string>;
    initialStory: Record<Language, string>;
    steps: {
        pali: string;
        cittaId: string;
        story: Record<Language, string>;
    }[];
};

export type CittaInstance = {
    id: string; // unique instance id
    citta: Citta;
    startTime: number;
    duration: number;
    label: string;
};


import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Radar, RadarChart, PolarGrid, PolarAngleAxis, PieChart, Pie, Cell, BarChart, Bar, ComposedChart, Line, ScatterChart, Scatter } from 'recharts';
import { CITTAS, CETASIKAS } from '../constants';
import type { Language } from '../types';

type Theme = 'default' | 'hacky' | 'matrix' | 'neon';

const THEMES: { id: Theme; name: string }[] = [
    { id: 'default', name: 'Default' },
    { id: 'hacky', name: 'Hacky' },
    { id: 'matrix', name: 'Matrix' },
    { id: 'neon', name: 'Neon' },
];

const THEME_COLORS: Record<Theme, {
    bg: string;
    cardBg: string;
    border: string;
    accent: string;
    accentHex: string;
    accentText: string;
    secondary: string;
    secondaryHex: string;
    text: string;
    muted: string;
    glow: string;
    gridColor: string;
}> = {
    default: {
        bg: 'bg-slate-950',
        cardBg: 'bg-slate-900/40',
        border: 'border-slate-800',
        accent: 'cyan-500',
        accentHex: '#22d3ee',
        accentText: 'text-cyan-400',
        secondary: 'purple-500',
        secondaryHex: '#a855f7',
        text: 'text-slate-200',
        muted: 'text-slate-500',
        glow: 'rgba(34,211,238,0.4)',
        gridColor: '#1e293b'
    },
    hacky: {
        bg: 'bg-zinc-950',
        cardBg: 'bg-zinc-900/50',
        border: 'border-zinc-800',
        accent: 'lime-500',
        accentHex: '#84cc16',
        accentText: 'text-lime-400',
        secondary: 'amber-500',
        secondaryHex: '#f59e0b',
        text: 'text-zinc-200',
        muted: 'text-zinc-600',
        glow: 'rgba(132,204,22,0.4)',
        gridColor: '#27272a'
    },
    matrix: {
        bg: 'bg-black',
        cardBg: 'bg-zinc-950/80',
        border: 'border-green-900/50',
        accent: 'green-500',
        accentHex: '#22c55e',
        accentText: 'text-green-500',
        secondary: 'green-700',
        secondaryHex: '#15803d',
        text: 'text-green-400',
        muted: 'text-green-900',
        glow: 'rgba(34,197,94,0.4)',
        gridColor: '#052e16'
    },
    neon: {
        bg: 'bg-gray-950',
        cardBg: 'bg-fuchsia-950/20',
        border: 'border-purple-900/50',
        accent: 'fuchsia-500',
        accentHex: '#d946ef',
        accentText: 'text-fuchsia-400',
        secondary: 'cyan-500',
        secondaryHex: '#06b6d4',
        text: 'text-purple-100',
        muted: 'text-purple-900',
        glow: 'rgba(217,70,239,0.4)',
        gridColor: '#4a044e'
    }
};

const LOGIC_SNIPPETS = [
    "PROCESS: citta_vithi.init()",
    "LINK: nidana[phassa] -> nidana[vedana]",
    "IF object_vibrates == true THEN flow(Bhavanga_Calana)",
    "APPLY condition(Sahajata) -> sync(Mind, Body)",
    "EXECUTE javana(7_moments) -> finalize(Kamma)",
    "DETECT rebirth_sign -> set_target(Gati_Nimitta)",
    "KERNEL: fetch(Dhamma_Object)",
    "MAP: object -> sanna_recognition",
    "FLUX: karma_energy += javana.intensity",
    "PROC: analyze_cetasika(Sabbacitta_Sadharaṇa)",
    "STATE: adhimokkha.decision = RESOLVED",
    "MEM: store_result(Tadarammana_Phase)",
    "CALL: transition(Bhavanga_Upaccheda)",
    "MATH: vithi_complexity = pratyaya.length * 24",
    "SYST: focus_stability.recalculate()",
    "PROC: arpana.absorb(Jhana_Level)",
    "IF defilement_present == true CALL(Anuloma)",
    "KERNEL: update_resonance(Citta_Stream)"
];

const PRATYAYA_IDS = [
    'hetu', 'arammana', 'adhipati', 'anantara', 'samanantara', 'sahajata', 'annamanna', 'nissaya', 
    'upanissaya', 'purejata', 'pacchajata', 'asevana', 'kamma', 'vipaka', 'ahara', 'indriya', 
    'jhana', 'magga', 'sampayutta', 'vippayutta', 'atthi', 'natthi', 'vigata', 'avigata'
];

const TIMELINE_LENGTH = 9;

const PRATYAYA_LABELS: Record<string, Record<Language, string>> = {
    hetu: { en: 'Root', si: 'හේතු', ta: 'ஹேது', hi: 'हेतु' },
    arammana: { en: 'Object', si: 'ආරම්මණ', ta: 'ஆரம்பன', hi: 'आरम्मण' },
    adhipati: { en: 'Dominance', si: 'අධිපති', ta: 'அதிபதி', hi: 'அதிபதி' },
    anantara: { en: 'Proximity', si: 'අනන්තර', ta: 'அனந்தர', hi: 'अनन्तर' },
    samanantara: { en: 'Contiguity', si: 'සමනන්තර', ta: 'සමනන්තර', hi: 'समनन्तर' },
    sahajata: { en: 'Co-nascence', si: 'සහජාත', ta: 'சஹஜாத', hi: 'सहजात' },
    annamanna: { en: 'Mutuality', si: 'අඤ්ඤමඤ්ඤ', ta: 'அஞ்ஞமஞ்ஞ', hi: 'अन्योन्य' },
    nissaya: { en: 'Dependence', si: 'නිස්සය', ta: 'நிஸ்ஸய', hi: 'निस्सय' },
    upanissaya: { en: 'Decisive Support', si: 'උපනිස්සය', ta: 'உபனிஸ்ஸய', hi: 'உपनिस्रय' },
    purejata: { en: 'Pre-nascence', si: 'පුරේජාත', ta: 'புரேஜாத', hi: 'पुरेजात' },
    pacchajata: { en: 'Post-nascence', si: 'පච්ඡාජාත', ta: 'பச்சாஜாத', hi: 'पच्छाजात' },
    asevana: { en: 'Repetition', si: 'ආසේවන', ta: 'ஆசேவன', hi: 'आसेवन' },
    kamma: { en: 'Kamma', si: 'කම්ම', ta: 'கம்ம', hi: 'कम्म' },
    vipaka: { en: 'Result', si: 'විපාක', ta: 'விபாகம்', hi: 'विपाक' },
    ahara: { en: 'Nutriment', si: 'ආහාර', ta: 'ආහාර', hi: 'आहार' },
    indriya: { en: 'Faculty', si: 'ඉන්ද්‍රිය', ta: 'இந்திரிய', hi: 'इन्द्रिय' },
    jhana: { en: 'Jhāna', si: 'ඣාන', ta: 'ஞான', hi: 'झान' },
    magga: { en: 'Path', si: 'මග්ග', ta: 'மார்க்க', hi: 'මග්ග' },
    sampayutta: { en: 'Association', si: 'සම්පයුත්ත', ta: 'சம்பயுத்த', hi: 'संप्रयुक्त' },
    vippayutta: { en: 'Dissociation', si: 'විප්පයුත්ත', ta: 'විප්පයුත්ත', hi: 'විප්‍රයුත්ත' },
    atthi: { en: 'Presence', si: 'අත්ථි', ta: 'அத்தி', hi: 'अत्थि' },
    natthi: { en: 'Absence', si: 'නත්ථි', ta: 'நத்தி', hi: 'නත්ථි' },
    vigata: { en: 'Disappearance', si: 'විගත', ta: 'விகத', hi: 'விगत' },
    avigata: { en: 'Non-disappearance', si: 'අවිගත', ta: 'அவிகத', hi: 'අවිගත' }
};

const AGGREGATE_LABELS: Record<string, Record<Language, string>> = {
    rupa: { en: 'Rūpa', si: 'රූප', ta: 'ரூபம்', hi: 'रूप' },
    vedana: { en: 'Vedanā', si: 'වේදනා', ta: 'வேதனை', hi: 'वेदना' },
    sanna: { en: 'Saññā', si: 'සංඥා', ta: 'சஞ்ஞை', hi: 'संज्ञा' },
    sankhara: { en: 'Saṅkhāra', si: 'සංස්කාර', ta: 'සංස්කාර', hi: 'संस्कार' },
    vinnana: { en: 'Viññāṇa', si: 'විඥානය', ta: 'விஞ்ஞானம்', hi: 'विज्ञान' }
};

const ELEMENT_LABELS: Record<string, Record<Language, string>> = {
    pathavi: { en: 'Paṭhavī', si: 'පඨවි', ta: 'பதவி', hi: 'पथवी' },
    apo: { en: 'Āpo', si: 'ආපෝ', ta: 'ஆபோ', hi: 'आबा' },
    tejo: { en: 'Tejo', si: 'තේජෝ', ta: 'தேஜෝ', hi: 'तेजो' },
    vayo: { en: 'Vāyo', si: 'වායෝ', ta: 'வாயோ', hi: 'वायो' }
};

const CITTA_TYPE_LABELS: Record<string, Record<Language, string>> = {
    kusala: { en: 'Wholesome', si: 'කුසල', ta: 'நன்மை', hi: 'कुशल' },
    akusala: { en: 'Unwholesome', si: 'අකුසල', ta: 'தீமை', hi: 'अकुशल' },
    vipaka: { en: 'Resultant', si: 'විපාක', ta: 'விபாகம்', hi: 'विपाक' },
    kiriya: { en: 'Functional', si: 'කිරිය', ta: 'கிரியா', hi: 'क्रिया' },
    jhana: { en: 'Jhāna', si: 'ඣාන', ta: 'தியானம்', hi: 'झान' },
    magga: { en: 'Path', si: 'මග්ග', ta: 'மார்க்க', hi: 'මග්ග' },
    phala: { en: 'Fruition', si: 'ඵල', ta: 'பலன்', hi: 'ফল' }
};

const VEDANA_TYPE_LABELS: Record<string, Record<Language, string>> = {
    somanassa: { en: 'Joy', si: 'සෝමනස්ස', ta: 'மகிழ்ச்சி', hi: 'सौमनस्य' },
    domanassa: { en: 'Grief', si: 'දෝමනස්ස', ta: 'දුක්ඛ', hi: 'दौमनस्य' },
    upekkha: { en: 'Equanimity', si: 'උපේක්ඛා', ta: 'சමநிலை', hi: 'உपेक्षा' }
};

const UI_LABELS: Record<string, Record<Language, string>> = {
    libraryTitle: { en: 'Citta-Vīthi Library', si: 'චිත්ත වීථි එකතුව', ta: 'சித்த-வீதி நூலகம்', hi: 'चित्त-वीथि पुस्तकालय' },
    monitorTitle: { en: 'Mind-Stream Monitor', si: 'චිත්ත ප්‍රවාහ නිරීක්ෂකය', ta: 'மன-ஓட்ட கண்காணிப்பு', hi: 'चित्त-प्रवाह मॉनिटर' },
    activeTelemetry: { en: 'Active Telemetry Terminal', si: 'සක්‍රීය ටෙලිමෙට්‍රි පර්යන්තය', ta: 'செயலில் உள்ள டெலிமெட்ரி முனையம்', hi: 'सक्रिय टेलीमेट्री टर्मिनल' },
    frequency: { en: 'Process Frequency (Hz)', si: 'ක්‍රියාකාරී සංඛ්‍යාතය (Hz)', ta: 'செயல்முறை அதிர்வெண் (Hz)', hi: 'प्रक्रिया आवृत्ति (Hz)' },
    stability: { en: 'Stability index', si: 'ස්ථාවරත්ව දර්ශකය', ta: 'நிலைத்தன்மை குறியீடு', hi: 'स्थिरता सूचकांक' },
    focus: { en: 'Focus', si: 'සමාධිගත වන්න', ta: 'கவனம்', hi: 'ध्यान केंद्रित' },
    exitFocus: { en: 'Exit Focus', si: 'නික්මෙන්න', ta: 'வெளியேறு', hi: 'बाहर निकलें' },
    conditionMatrix: { en: 'Condition Matrix', si: 'ප්‍රත්‍යය අනුකෘතිය', ta: 'நிபந்தனை அணி', hi: 'प्रत्यय मैट्रिक्स' },
    streamTelemetry: { en: 'STREAM TELEMETRY', si: 'ප්‍රවාහ ටෙලිමෙට්‍රි', ta: 'ஓடை டெலிமெட்டரி', hi: 'அலைவரிசை டெலிமெட்ரி' },
    momentData: { en: 'Moment Data', si: 'ක්ෂණ දත්ත', ta: 'கண தரவு', hi: 'क्षण डेटा' },
    cetasikaLattice: { en: 'Active Cetasika Lattice', si: 'සක්‍රීය චෛතසික ජාලය', ta: 'செயலில் உள்ள சைதசிக வலையமைப்பு', hi: 'सक्रिय चैतसिक जाली' },
    systemProcess: { en: 'System Process Stream', si: 'පද්ධති ක්‍රියාවලි ප්‍රවාහය', ta: 'கணினி செயல்முறை ஓடை', hi: 'सिस्टम प्रक्रिया प्रवाह' },
    realtimeTelemetry: { en: 'Real-time Telemetry', si: 'තථ්‍ය කාලීන ටෙලිමෙට්‍රි', ta: 'நிகழ்நேர டெலிமெட்ரி', hi: 'रीयल-टाइम टेलीमेट्री' },
    waiting: { en: 'Waiting for mind-stream initialization...', si: 'චිත්ත ප්‍රවාහය ආරම්භ වන තෙක් රැඳී සිටින්න...', ta: 'மன-ஓட்டத் தொடக்கத்திற்காக காத்திருக்கிறது...', hi: 'चित्त-प्रवाह प्रारंभ होने की प्रतीक्षा कर रहा है...' },
    stabilityAnalysis: { en: 'Stability Analysis', si: 'ස්ථාවරත්ව විශ්ලේෂණය', ta: 'நிலைத்தன்மை பகுப்பாய்வு', hi: 'स्थिरता विश्लेषण' },
    sysVersion: { en: 'System Version', si: 'පද්ධති සංස්කරණය', ta: 'பதிப்பு', hi: 'सिस्टम संस्करण' },
    stabilityLabel: { en: 'Stability', si: 'ස්ථාවරත්වය', ta: 'நிலைத்தன்மை', hi: 'स्थිරතාවය' },
    vedana: { en: 'VEDANĀ', si: 'වේදනා', ta: 'வேதனை', hi: 'वेदना' },
    domain: { en: 'DOMAIN', si: 'ගෝත්‍රය', ta: 'டொமைன்', hi: 'डोमेन' },
    processedMoment: { en: 'PROCESSED_MOMENT', si: 'සකසන ලද ක්ෂණය', ta: 'செயல்படுத்தப்பட்ட கணம்', hi: 'संसाधित क्षण' },
    phase: { en: 'PHASE', si: 'අදියර', ta: 'கட்டம்', hi: 'चरण' },
    aggregateBalance: { en: 'Aggregate Balance', si: 'ස්කන්ධ තුලනය', ta: 'திறன் சமநிலை', hi: 'स्कंध संतुलन' },
    typeMix: { en: 'Consciousness Type Mix', si: 'චිත්ත ස්වභාවයන්', ta: 'சித்த வகைகள்', hi: 'चित्त प्रकार मिश्रण' },
    paticcasamuppada: { en: 'Paticcasamuppāda', si: 'පටිච්චසමුප්පාදය', ta: 'சார்பு உற்பத்தி', hi: 'प्रतीत्यसमुत्पाद' },
    causalComplexity: { en: 'Causal Complexity', si: 'හේතුඵල සංකීර්ණත්වය', ta: 'காரண சிக்கல்', hi: 'कारण जटिलता' },
    intensityLabel: { en: 'Focus Intensity', si: 'සමාධි තීව්‍රතාවය', ta: 'கவனத்தின் தீவிரம்', hi: 'एकाग्रता तीव्रता' },
    resonanceFlux: { en: 'Mental Resonance', si: 'මනෝ මූල ස්පන්දනය', ta: 'மன அதிர்வு', hi: 'मानसिक अनुनाद' },
    momentumLabel: { en: 'Cognitive Momentum', si: 'ප්‍රජානන ගම්‍යතාවය', ta: 'அறிவுசார் வேகம்', hi: 'संज्ञानात्मक गति' },
    synchronicityFlux: { en: 'Causal Synchronicity', si: 'හේතුඵල සමමුහුර්තකරණය', ta: 'காரண ஒத்திசைவு', hi: 'कारण तुल्यकालन' },
    cittaFlow: { en: 'Citta Flow Resonance', si: 'චිත්ත ප්‍රවාහ ස්පන්දනය', ta: 'சித்த ஓட்டம்', hi: 'चित्त प्रवाह' },
    causalKernel: { en: 'Causal Kernel Execute', si: 'හේතුඵල පද්ධති මෙහෙයුම', ta: 'காரண கர்னல் செயல்படுத்தல்', hi: 'कारण कर्नेल निष्पादन' },
    neuralResonance: { en: 'Mental Energy (Cittaja Rupa)', si: 'චිත්තජ රූප ඝනත්වය', ta: 'நியூரல் அதிர்வு அடர்த்தி', hi: 'न्यूरल अनुनाद घनत्व' }
};

const NIDANA_LABELS = {
    avijja: { en: 'Ignorance', si: 'අවිද්‍යාව', ta: 'அவித்தை', hi: 'अविद्या' },
    sankhara: { en: 'Formations', si: 'සංස්කාර', ta: 'சம்ஸ்காரம்', hi: 'संस्कार' },
    vinnana: { en: 'Consciousness', si: 'විඥානය', ta: 'விஞ்ஞானம்', hi: 'विज्ञान' },
    namarupa: { en: 'Name & Form', si: 'නාමරූප', ta: 'நாமரூபம்', hi: 'नामरूप' },
    salayatana: { en: 'Six Senses', si: 'සළායතන', ta: 'ஆறு புலன்கள்', hi: 'षडायतन' },
    phassa: { en: 'Contact', si: 'ඵස්ස', ta: 'ஸ்பரிசம்', hi: 'ஸ்பर्श' },
    vedana: { en: 'Feeling', si: 'වේදනා', ta: 'வேதனை', hi: 'वेदना' },
    tanha: { en: 'Craving', si: 'තණ්හා', ta: 'தாகம்', hi: 'तृष्णा' },
    upadana: { en: 'Clinging', si: 'උපාදාන', ta: 'பற்று', hi: 'උපාදාන' },
    bhava: { en: 'Becoming', si: 'භව', ta: 'பவம்', hi: 'भव' },
    jati: { en: 'Birth', si: 'ජාති', ta: 'பிறப்பு', hi: 'जाதி' },
    jaramarana: { en: 'Aging & Death', si: 'ජරා මරණ', ta: 'மூப்பு & மரணம்', hi: 'जरा-मरण' }
};

const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

type DashboardExample = {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    sequence: string[];
    baseAggregates: number[]; 
    pratyayas: string[];
    samadhiStability: number; 
    speed: number; 
};

const VITHI_PATTERNS = {
    eye: [
        'pancadvaravajjana', 'cakkhuvinnana', 'sampaticchana', 'santirana', 'votthapana', 
        'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 
        'tadarammana', 'tadarammana'
    ],
    ear: [
        'pancadvaravajjana', 'sotavinnana', 'sampaticchana', 'santirana', 'votthapana', 
        'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 'lobhaCitta', 
        'tadarammana', 'tadarammana'
    ],
    mind: ['manodvaravajjana', 'kusala', 'kusala', 'kusala', 'kusala', 'kusala', 'kusala', 'kusala', 'bhavanga', 'bhavanga'],
    bhavanga: ['bhavanga', 'bhavanga', 'bhavanga']
};

const DASHBOARD_EXAMPLES: DashboardExample[] = [
    {
        id: 'video_watching',
        title: { en: 'Watching a Video (Cakkhu-dvāra)', si: 'වීඩියෝවක් නැරඹීම (චක්ෂුද්වාර)', ta: 'வீடியோ பார்ப்பது', hi: 'वीडियो देखना' },
        description: { en: 'Object: Vanna Rūpa (pixels). Perception: Moving person.', si: 'අරමුණ: වර්ණ රූප. සංඥාව: චලනය වන පුද්ගලයෙක්.', ta: 'பொருள்: உருவம்.', hi: 'विषय: रूप।' },
        sequence: VITHI_PATTERNS.eye,
        baseAggregates: [90, 70, 85, 40, 75],
        pratyayas: ['arammana', 'purejata', 'nissaya', 'vipaka', 'atthi'],
        samadhiStability: 15,
        speed: 600
    },
    {
        id: 'song_listening',
        title: { en: 'Listening to a Song (Sota-dvāra)', si: 'ගීතයකට සවන්දීම (සෝතද්වාර)', ta: 'பாடல் கேட்பது', hi: 'गाना सुनना' },
        description: { en: 'Object: Sadda Rūpa (vibrations). Perception: Melody.', si: 'අරමුණ: ශබ්ද රූප. සංඥාව: තනුව.', ta: 'පொருள்: ஒலி.', hi: 'विषय: शब्द।' },
        sequence: VITHI_PATTERNS.ear,
        baseAggregates: [80, 75, 80, 45, 70],
        pratyayas: ['arammana', 'purejata', 'nissaya', 'vipaka', 'atthi'],
        samadhiStability: 18,
        speed: 700
    },
    {
        id: 'video_with_audio',
        title: { en: 'Watching Video with Audio (Cakkhu+Sota)', si: 'ශබ්දය සමඟ වීඩියෝ නැරඹීම (ද්වාර දෙකම)', ta: 'ஒலியுடன் வீடியோ', hi: 'ऑडियो के साथ वीडियो' },
        description: { en: 'Rapid switching between Eye and Ear doors. Processing pixels and frequencies.', si: 'ඇස සහ කන අතර වේගයෙන් සිත් මාරු වීම. රූප සහ ශබ්ද එකවර සැකසීම.', ta: 'கண் மற்றும் செவிக்கு இடையே வேகமாக மாறுதல்.', hi: 'आंख और कान के बीच तेजी से स्विच करना।' },
        sequence: [...VITHI_PATTERNS.eye, ...VITHI_PATTERNS.ear, 'manodvaravajjana', 'lobhaCitta', 'lobhaCitta'],
        baseAggregates: [85, 80, 85, 50, 80],
        pratyayas: ['arammana', 'purejata', 'nissaya', 'anantara', 'samanantara', 'atthi'],
        samadhiStability: 12,
        speed: 550
    },
    {
        id: 'random_stream',
        title: { en: 'Complex Mind-Stream (Sambhinnapavatta)', si: 'සම්භින්නපවත්ත චිත්ත ප්‍රවාහය (සජීවී ප්‍රත්‍යය)', ta: 'தற்செயலான மன ஓட்டம்', hi: 'यादृच्छिक मन-प्रवाह' },
        description: { en: 'Simulation of a restless mind with rapid, logical door-switching and fluctuating causal conditions.', si: 'දොරටු අතර වේගයෙන් මාරු වන සහ නිරන්තරයෙන් වෙනස් වන ප්‍රත්‍යයන් සහිත නොසන්සුන් මනසක ආකෘතියකි.', ta: 'ஓய்வற்ற மனம்.', hi: 'अशांत मन का अनुकरण।' },
        sequence: ['bhavanga'], // Placeholder
        baseAggregates: [50, 60, 50, 70, 60],
        pratyayas: PRATYAYA_IDS,
        samadhiStability: 5,
        speed: 500
    },
    {
        id: 'arm_lifting',
        title: { en: 'Lifting an Arm (Mano-dvāra)', si: 'අත එසවීම (මනෝද්වාර)', ta: 'கையை உயர்த்துவது', hi: 'हाथ उठाना' },
        description: { en: 'Function: Producing Vāyo-dhātu. Perception: "I lift".', si: 'කෘත්‍ය: වායෝ ධාතු උත්පාදනය. සංඥාව: "මම ඔසවමි".', ta: 'செயல்: அசைவு.', hi: 'कार्य: वायु तत्व।' },
        sequence: VITHI_PATTERNS.mind,
        baseAggregates: [60, 50, 40, 95, 85],
        pratyayas: ['hetu', 'sahajata', 'adhipati', 'kamma', 'indriya'], 
        samadhiStability: 30,
        speed: 800
    }
];

interface MasterDashboardProps {
    language: Language;
    isFullscreen: boolean;
    onExitFullscreen?: () => void;
}

type LogEntry = {
    id: string;
    timestamp: string;
    cittaPali: string;
    type: string;
    isKusala: boolean;
};

export const MasterDashboard: React.FC<MasterDashboardProps> = ({ language: initialLanguage, isFullscreen: parentIsFullscreen, onExitFullscreen }) => {
    const [theme, setTheme] = useState<Theme>('default');
    const [internalFullscreen, setInternalFullscreen] = useState(false);
    const [currentLang, setCurrentLang] = useState<Language>(initialLanguage);
    const [tick, setTick] = useState(0);
    const [selectedId, setSelectedId] = useState(DASHBOARD_EXAMPLES[0].id);
    const [activeCittaIdx, setActiveCittaIdx] = useState(0);
    const [stabilityHistory, setStabilityHistory] = useState<{ time: number; level: number }[]>([]);
    const [complexityHistory, setComplexityHistory] = useState<{ time: number; value: number }[]>([]);
    const [intensityHistory, setIntensityHistory] = useState<{ time: number; value: number }[]>([]);
    const [resonanceHistory, setResonanceHistory] = useState<{ time: number; v1: number; v2: number }[]>([]);
    const [momentumHistory, setMomentumHistory] = useState<{ time: number; wholesome: number; friction: number }[]>([]);
    const [fluxHistory, setFluxHistory] = useState<{ time: number; synergy: number; resistance: number }[]>([]);
    const [neuralHistory, setNeuralHistory] = useState<{ time: number; density: number }[]>([]);
    const [aggregates, setAggregates] = useState([50, 50, 50, 50, 50]);
    const [activePratyayas, setActivePratyayas] = useState<Set<string>>(new Set());
    const [timeline, setTimeline] = useState<(string | null)[]>(Array(TIMELINE_LENGTH).fill(null));
    const [systemLog, setSystemLog] = useState<LogEntry[]>([]);
    const [currentRandomVithi, setCurrentRandomVithi] = useState<string[]>(VITHI_PATTERNS.bhavanga);
    const [kernelCode, setKernelCode] = useState<string>("");
    
    const colors = THEME_COLORS[theme];
    
    const activeExample = useMemo(() => 
        DASHBOARD_EXAMPLES.find(ex => ex.id === selectedId) || DASHBOARD_EXAMPLES[0],
    [selectedId]);

    const [frequency, setFrequency] = useState(1000 / activeExample.speed);
    const tickInterval = 1000 / frequency;

    const getT = (obj: Record<Language, string>) => obj[currentLang] || obj['en'];

    useEffect(() => {
        setFrequency(1000 / activeExample.speed);
        setTimeline(Array(TIMELINE_LENGTH).fill(null));
        setSystemLog([]);
        setActiveCittaIdx(0);
        if (selectedId === 'random_stream') {
            setCurrentRandomVithi(VITHI_PATTERNS.bhavanga);
        }
    }, [selectedId, activeExample.speed]);

    const tickRef = useRef(0);
    const isActuallyFullscreen = parentIsFullscreen || internalFullscreen;

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTick = tickRef.current + 1;
            tickRef.current = currentTick;
            
            let activeCittaId: string;
            let nextIdx: number;

            if (selectedId === 'random_stream') {
                nextIdx = (activeCittaIdx + 1);
                if (nextIdx >= currentRandomVithi.length) {
                    const types = ['eye', 'ear', 'mind', 'bhavanga'];
                    const chosen = types[Math.floor(Math.random() * types.length)] as keyof typeof VITHI_PATTERNS;
                    setCurrentRandomVithi(VITHI_PATTERNS[chosen]);
                    nextIdx = 0;
                }
                activeCittaId = currentRandomVithi[nextIdx];
            } else {
                nextIdx = (activeCittaIdx + 1) % activeExample.sequence.length;
                activeCittaId = activeExample.sequence[nextIdx];
            }

            const activeCitta = CITTAS[activeCittaId] || CITTAS['bhavanga'];

            setTick(currentTick);
            setActiveCittaIdx(nextIdx);
            setTimeline(prev => [...prev.slice(1), activeCittaId]);

            // Rapid Kernel Typing Effect
            const rawSnippet = LOGIC_SNIPPETS[currentTick % LOGIC_SNIPPETS.length];
            setKernelCode(rawSnippet);

            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
            setSystemLog(prev => [{
                id: `${currentTick}-${Date.now()}`,
                timestamp: timeStr,
                cittaPali: activeCitta.pali,
                type: activeCitta.type,
                isKusala: activeCitta.type === 'kusala' || activeCitta.type === 'jhana' || activeCitta.type === 'magga' || activeCitta.type === 'phala'
            }, ...prev].slice(0, 50));

            setAggregates(prev => prev.map((base, idx) => {
                let target = activeExample.baseAggregates[idx];
                if (activeCitta.type === 'jhana' || activeCitta.type === 'magga' || activeCitta.type === 'phala') {
                    if (idx === 4) target = 98; 
                    if (idx === 0) target = 5;  
                }
                const diff = target - base;
                return Math.min(100, Math.max(2, base + (diff * 0.15) + (Math.random() * 1.5 - 0.75)));
            }));
            
            const newPratyayas = new Set<string>();
            if (selectedId === 'random_stream') {
                PRATYAYA_IDS.forEach(p => { if (Math.random() > 0.4) newPratyayas.add(p); });
            } else {
                ['sahajata', 'nissaya', 'atthi', 'avigata', 'arammana'].forEach(p => newPratyayas.add(p));
                if (activeCitta.cetasikas.some(c => ['lobha', 'dosa', 'moha', 'alobha', 'adosa', 'panna'].includes(c))) newPratyayas.add('hetu');
                const isJavana = ['kusala', 'akusala', 'jhana', 'magga'].includes(activeCitta.type);
                if (isJavana && nextIdx > 0) {
                    const prevCittaId = selectedId === 'random_stream' ? currentRandomVithi[nextIdx - 1] : activeExample.sequence[nextIdx - 1];
                    const prevCitta = CITTAS[prevCittaId];
                    if (prevCitta && ['kusala', 'akusala', 'jhana', 'magga'].includes(prevCitta.type)) newPratyayas.add('asevana');
                }
                if (activeCitta.type === 'vipaka') newPratyayas.add('vipaka');
                if (activeCitta.type === 'jhana') newPratyayas.add('jhana');
                if (activeCitta.type === 'magga' || activeCitta.type === 'phala') newPratyayas.add('magga');
                if (activeCitta.cetasikas.includes('jivitindriya')) newPratyayas.add('indriya');
            }
            setActivePratyayas(newPratyayas);

            setComplexityHistory(prev => [...prev.slice(-29), { time: currentTick, value: (newPratyayas.size / PRATYAYA_IDS.length) * 100 }]);
            setIntensityHistory(prev => {
                let intensity = activeCitta.type === 'jhana' ? 90 : activeCitta.type === 'magga' ? 100 : activeCitta.type === 'kusala' ? 60 : activeCitta.type === 'akusala' ? 30 : 10;
                return [...prev.slice(-19), { time: currentTick, value: intensity + Math.random() * 10 }];
            });
            setResonanceHistory(prev => {
                const phase = currentTick * 0.4;
                const baseRes = activeCitta.type === 'jhana' ? 70 : activeCitta.type === 'akusala' ? 20 : 45;
                const mod = activeExample.samadhiStability / 100;
                return [...prev.slice(-29), { time: currentTick, v1: baseRes + Math.sin(phase) * (30 * (1 - mod)) + Math.random() * 10, v2: baseRes + Math.cos(phase * 0.7) * (20 * (1 - mod)) + Math.random() * 10 }];
            });
            setMomentumHistory(prev => {
                const isKusala = ['kusala', 'jhana', 'magga', 'phala'].includes(activeCitta.type);
                return [...prev.slice(-39), { time: currentTick, wholesome: isKusala ? 85 + Math.random() * 15 : 20 + Math.random() * 20, friction: !isKusala && activeCitta.type === 'akusala' ? 70 + Math.random() * 30 : 10 + Math.random() * 20 }];
            });
            setFluxHistory(prev => {
                const isHarmonious = ['jhana', 'magga', 'kusala'].includes(activeCitta.type);
                return [...prev.slice(-24), { time: currentTick, synergy: isHarmonious ? 70 + Math.random() * 30 : 10 + Math.random() * 30, resistance: !isHarmonious ? 50 + Math.random() * 50 : 5 + Math.random() * 15 }];
            });
            setNeuralHistory(prev => {
                const density = (activeCitta.cetasikas.length / 52) * 100;
                return [...prev.slice(-19), { time: currentTick, density: density + (Math.random() * 5 - 2.5) }];
            });
            setStabilityHistory(prev => [...prev.slice(-39), { time: currentTick, level: Math.max(0, Math.min(100, activeExample.samadhiStability + (Math.random() * 8 - 4) * (1 - activeExample.samadhiStability / 100))) }]);
        }, tickInterval);
        return () => clearInterval(intervalId);
    }, [selectedId, tickInterval, activeExample, activeCittaIdx, currentRandomVithi]);

    const radarData = useMemo(() => [
        { subject: getT(AGGREGATE_LABELS.rupa), A: aggregates[0] },
        { subject: getT(AGGREGATE_LABELS.vedana), A: aggregates[1] },
        { subject: getT(AGGREGATE_LABELS.sanna), A: aggregates[2] },
        { subject: getT(AGGREGATE_LABELS.sankhara), A: aggregates[3] },
        { subject: getT(AGGREGATE_LABELS.vinnana), A: aggregates[4] },
    ], [aggregates, currentLang]);

    const pieData = useMemo(() => {
        const counts: Record<string, number> = {};
        systemLog.slice(0, 20).forEach(log => { counts[log.type] = (counts[log.type] || 0) + 1; });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [systemLog]);

    const currentCittaId = timeline[TIMELINE_LENGTH - 1];
    const activeCittaMoment = currentCittaId ? (CITTAS[currentCittaId] || CITTAS['bhavanga']) : CITTAS['bhavanga'];

    const activeNidanas = useMemo(() => {
        const active = new Set<number>();
        const type = activeCittaMoment.type;
        const id = currentCittaId;

        if (id === 'lobhaCitta' || id === 'dosaCitta') {
            active.add(0); 
            active.add(7); 
            active.add(8); 
            active.add(9); 
        } else if (type === 'akusala') {
            active.add(7); active.add(8);
        } else if (type === 'kusala' || type === 'jhana') {
            active.add(1); 
            active.add(9); 
        } else if (type === 'vipaka') {
            active.add(2); active.add(3); active.add(4); active.add(5); active.add(6);
        } else if (type === 'kiriya') {
            active.add(4); active.add(5);
        }
        return active;
    }, [activeCittaMoment, currentCittaId]);

    const toggleFullscreen = () => setInternalFullscreen(!internalFullscreen);

    return (
        <div className={`flex flex-col gap-6 ${isActuallyFullscreen ? '' : 'animate-citta-arise'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 px-4">
                <div className={`flex items-center gap-2 ${colors.cardBg} p-1.5 rounded-2xl border ${colors.border} shadow-xl backdrop-blur-md`}>
                    {THEMES.map(t => (
                        <button key={t.id} onClick={() => setTheme(t.id)} className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${theme === t.id ? `bg-${colors.accent} text-slate-900 shadow-[0_0_15px_${colors.glow}]` : `text-slate-500 hover:text-slate-300`}`}>{t.name}</button>
                    ))}
                </div>
                <div className={`flex items-center gap-2 ${colors.cardBg} p-1.5 rounded-2xl border ${colors.border} shadow-xl backdrop-blur-md`}>
                    {LANGUAGES.map(l => (
                        <button key={l.id} onClick={() => setCurrentLang(l.id)} className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase transition-all duration-300 ${currentLang === l.id ? `bg-${colors.accent} text-slate-900 shadow-[0_0_15px_${colors.glow}]` : `text-slate-500 hover:text-slate-300`}`}>{l.name}</button>
                    ))}
                </div>
            </div>

            {!isActuallyFullscreen && (
                <section className={`${colors.cardBg} p-6 rounded-[2.5rem] border ${colors.border} shadow-xl`}>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 px-2 gap-4">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-2xl bg-${colors.accent}/20 flex items-center justify-center border border-${colors.accent}/30`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${colors.accentText}`}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M16.5 15.75l-1.591-1.591m-9.418 5.834 1.591-1.591M6 10.5H3.75m4.084-5.834L9.418 6.25" /></svg></div>
                            <h2 className={`text-xl font-black ${colors.text} uppercase tracking-widest italic`}>{getT(UI_LABELS.libraryTitle)}</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {DASHBOARD_EXAMPLES.map(ex => (
                            <button key={ex.id} onClick={() => { setSelectedId(ex.id); setActiveCittaIdx(0); setTimeline(Array(TIMELINE_LENGTH).fill(null)); setSystemLog([]); setStabilityHistory([]); setComplexityHistory([]); setIntensityHistory([]); setResonanceHistory([]); setMomentumHistory([]); setFluxHistory([]); setNeuralHistory([]); tickRef.current = 0; }} className={`px-4 py-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 relative overflow-hidden group ${selectedId === ex.id ? `bg-${colors.accent} border-${colors.accent} text-slate-900 shadow-[0_0_30px_${colors.glow}] scale-105` : `${colors.cardBg} border-${colors.border.split('-')[1]}-800 ${colors.muted} hover:border-slate-600 hover:text-slate-300`}`}><span className={`font-black uppercase tracking-tighter text-[11px] ${selectedId === ex.id ? 'text-slate-900' : colors.text}`}>{getT(ex.title)}</span><div className="flex items-center justify-between mt-1"><span className={`text-[9px] font-black uppercase tracking-widest ${selectedId === ex.id ? 'text-slate-900/60' : colors.muted}`}>{getT(UI_LABELS.stabilityLabel)}: {ex.samadhiStability}%</span>{selectedId === ex.id && <div className="w-2 h-2 bg-slate-900 rounded-full animate-ping"></div>}</div></button>
                        ))}
                    </div>
                </section>
            )}

            <div className={`flex flex-col lg:flex-row items-center justify-between gap-6 px-10 py-6 ${colors.bg}/80 border-2 ${colors.border} rounded-[2.5rem] shadow-2xl backdrop-blur-3xl transition-all duration-300 ${isActuallyFullscreen ? 'hidden pointer-events-none opacity-0' : 'opacity-100'}`}>
                <div className="flex items-center gap-6"><div className="relative"><div className={`w-6 h-6 rounded-full bg-${colors.accent} animate-pulse shadow-[0_0_25px_${colors.accent}]`}></div><div className={`absolute inset-0 w-6 h-6 rounded-full bg-${colors.accent} animate-ping opacity-20`}></div></div><div><h1 className={`text-2xl font-black tracking-tighter ${colors.accentText} uppercase leading-none`}>{getT(UI_LABELS.monitorTitle)}</h1><p className={`text-[10px] ${colors.muted} font-black uppercase tracking-[0.3em] mt-2`}>{getT(UI_LABELS.activeTelemetry)}</p></div></div>
                <div className="flex-grow max-w-md w-full px-8"><div className="flex justify-between items-center mb-3"><span className={`text-[11px] ${colors.muted} font-black uppercase tracking-widest`}>{getT(UI_LABELS.frequency)}</span><span className={`text-base ${colors.accentText} font-black font-mono`}>{frequency.toFixed(2)} Hz</span></div><input type="range" min="0.1" max="40.0" step="0.05" value={frequency} onChange={(e) => setFrequency(parseFloat(e.target.value))} className={`w-full h-1.5 bg-${colors.border.split('-')[1]}-800 rounded-lg appearance-none cursor-pointer accent-${colors.accent} transition-all hover:accent-${colors.accent}`} /></div>
                <div className="flex items-center gap-12"><div className="text-center"><div className={`text-[10px] ${colors.muted} font-black uppercase tracking-widest mb-1`}>{getT(UI_LABELS.stability)}</div><div className={`text-xl text-${colors.secondary} font-black`}>{activeExample.samadhiStability}%</div></div><button onClick={toggleFullscreen} className={`p-3 px-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center gap-3 border-2 bg-${colors.accent}/10 border-${colors.accent}/30 ${colors.accentText} hover:bg-${colors.accent} hover:text-slate-900`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg><span>{getT(UI_LABELS.focus)}</span></button></div>
            </div>

            <div className={`${isActuallyFullscreen ? 'fixed inset-0 z-[999] rounded-none' : `relative h-[1180px] rounded-[3rem]`} w-full ${theme === 'matrix' ? 'bg-black' : colors.bg} ${colors.text} flex flex-col font-mono border-4 ${colors.border} shadow-2xl transition-all duration-500 overflow-hidden`}>
                {isActuallyFullscreen && (
                    <header className={`flex flex-col sm:flex-row items-center justify-between px-8 py-4 border-b ${colors.accent}/20 ${colors.bg}/80 backdrop-blur-2xl z-[1001] gap-4`}><div className="flex items-center gap-4"><div className={`w-4 h-4 rounded-full bg-${colors.accent} animate-pulse shadow-[0_0_15px_${colors.glow}]`}></div><h1 className={`text-xl font-black tracking-tighter ${colors.accentText} uppercase leading-none`}>{getT(UI_LABELS.monitorTitle)} [{getT(UI_LABELS.focus).toUpperCase()}]</h1></div><button onClick={toggleFullscreen} className="p-2 px-6 rounded-xl font-black uppercase tracking-widest text-[10px] bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all shrink-0">{getT(UI_LABELS.exitFocus)}</button></header>
                )}
                <div className="flex-grow flex overflow-hidden min-h-0">
                    <aside className={`w-72 border-r ${colors.border} flex flex-col ${colors.bg}/40 backdrop-blur-3xl z-40 shrink-0`}><div className="p-5 flex flex-col h-full min-h-0 overflow-hidden"><h3 className={`text-[10px] ${colors.muted} font-black uppercase mb-4 tracking-widest flex items-center gap-3`}><div className="w-2.5 h-2.5 bg-yellow-500 rounded-sm"></div>{getT(UI_LABELS.conditionMatrix)}</h3><div className="h-28 mb-4 w-full bg-slate-950/40 rounded-xl border border-slate-800/50 p-2 overflow-hidden flex flex-col shrink-0"><div className="flex justify-between items-center mb-1"><span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest">{getT(UI_LABELS.causalComplexity)}</span><span className={`text-[8px] ${colors.accentText} font-mono`}>{activePratyayas.size}/24</span></div><div className="flex-grow"><ResponsiveContainer width="100%" height="100%"><AreaChart data={complexityHistory}><defs><linearGradient id={`complexityGrad-${theme}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={colors.secondaryHex} stopOpacity={0.4}/><stop offset="95%" stopColor={colors.secondaryHex} stopOpacity={0}/></linearGradient></defs><Area type="step" dataKey="value" stroke={colors.secondaryHex} fill={`url(#complexityGrad-${theme})`} strokeWidth={1.5} isAnimationActive={false} /></AreaChart></ResponsiveContainer></div></div>
                    
                    {/* Causal Kernel Execute - Relocated to left side below Complexity chart */}
                    <div className="flex flex-col min-h-0 h-28 bg-slate-950/50 rounded-xl border-2 border-dashed border-slate-700/50 p-2 mb-4 relative overflow-hidden group">
                        <div className={`text-[8px] ${colors.muted} font-black uppercase mb-1 tracking-widest text-center flex items-center justify-center gap-2`}>
                            <div className="w-1 h-1 bg-red-500 rounded-full animate-ping"></div>
                            {getT(UI_LABELS.causalKernel)}
                        </div>
                        <div className="flex-grow flex items-center justify-center relative font-mono overflow-hidden">
                            <div className={`text-[10px] ${colors.accentText} font-black animate-pulse text-center leading-tight`}>
                                <span className="opacity-50">&gt; </span>
                                {kernelCode}
                                <span className="w-1.5 h-3 bg-cyan-400 inline-block align-middle ml-1"></span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none"></div>
                        </div>
                        <div className={`absolute bottom-0 inset-x-0 h-px bg-${colors.accent} opacity-30 shadow-[0_0_10px_${colors.glow}]`}></div>
                    </div>

                    {/* NEW GRAPH: Neural Resonance Density - Added to left side down */}
                    <div className="flex flex-col min-h-0 h-28 bg-slate-950/60 rounded-xl border border-slate-700/50 p-2 mb-4 relative overflow-hidden group">
                        <div className={`text-[8px] ${colors.muted} font-black uppercase mb-1 tracking-widest text-center flex items-center justify-center gap-2`}>
                            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></div>
                            {getT(UI_LABELS.neuralResonance)}
                        </div>
                        <div className="flex-grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart>
                                    <XAxis type="number" dataKey="time" hide />
                                    <YAxis type="number" dataKey="density" domain={[0, 100]} hide />
                                    <Scatter name="Resonance" data={neuralHistory} fill={colors.accentHex}>
                                        {neuralHistory.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors.accentHex} opacity={index / neuralHistory.length} />
                                        ))}
                                    </Scatter>
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="absolute top-0 right-2 text-[6px] text-cyan-900 font-mono tracking-tighter">DATA_SYNC_LOCKED</div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 flex-grow content-start overflow-y-auto custom-scrollbar pr-1 mb-4">{PRATYAYA_IDS.map((id) => ( <div key={id} className={`px-2 py-1.5 text-[9px] rounded-lg transition-all duration-300 border font-black tracking-tighter text-left uppercase truncate ${activePratyayas.has(id) ? `bg-${colors.accent}/20 border-${colors.accent}/50 ${colors.accentText} shadow-[0_0_10px_${colors.glow}]` : `bg-slate-900/20 border-transparent ${colors.muted}`}`}>{getT(PRATYAYA_LABELS[id] || { en: id, si: id, ta: id, hi: id })}</div> ))}</div></div></aside>
                    
                    <main className={`flex-grow flex flex-col relative ${theme === 'matrix' ? 'bg-black' : colors.bg} overflow-hidden min-w-0`}>
                    
                    <div className={`grid grid-cols-5 gap-px ${colors.muted}/40 border-b ${colors.border}`}>{[ { key: 'rupa', label: AGGREGATE_LABELS.rupa }, { key: 'vedana', label: AGGREGATE_LABELS.vedana }, { key: 'sanna', label: AGGREGATE_LABELS.sanna }, { key: 'sankhara', label: AGGREGATE_LABELS.sankhara }, { key: 'vinnana', label: AGGREGATE_LABELS.vinnana } ].map((agg, i) => ( <div key={agg.key} className={`${colors.cardBg} p-3 space-y-2`}><div className={`flex justify-between text-[9px] uppercase tracking-tighter ${colors.muted} font-black`}><span>{getT(agg.label)}</span><span className={colors.accentText}>{(aggregates[i]).toFixed(1)}%</span></div><div className={`h-1 ${theme === 'matrix' ? 'bg-zinc-950' : 'bg-slate-900'} rounded-full overflow-hidden`}><div className={`h-full bg-${colors.accent}/80 transition-all duration-700 ease-out`} style={{ width: `${aggregates[i]}%` }}></div></div></div> ))}</div><div className="flex-grow relative flex flex-col items-center justify-center p-4 min-h-0"><div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: `linear-gradient(${colors.accentHex} 1px, transparent 1px), linear-gradient(90deg, ${colors.accentHex} 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div><div className={`absolute top-4 left-4 w-40 h-40 ${colors.bg}/60 rounded-3xl border ${colors.border} p-2 z-50`}><div className={`text-[8px] ${colors.muted} font-black uppercase text-center mb-1`}>{getT(UI_LABELS.aggregateBalance)}</div><ResponsiveContainer width="100%" height="85%"><RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}><PolarGrid stroke={colors.gridColor} /><PolarAngleAxis dataKey="subject" tick={{ fill: theme === 'matrix' ? colors.accentHex : '#475569', fontSize: 6 }} /><Radar name="Aggregates" dataKey="A" stroke={colors.accentHex} fill={colors.accentHex} fillOpacity={0.4} /></RadarChart></ResponsiveContainer></div><div className={`absolute top-4 right-48 w-44 h-44 ${colors.bg}/80 rounded-3xl border ${colors.border} p-3 z-50 shadow-2xl backdrop-blur-md`}><div className={`text-[8px] ${colors.muted} font-black uppercase text-center mb-2`}>{getT(UI_LABELS.paticcasamuppada)}</div><div className="relative w-full h-32 flex items-center justify-center"><div className={`absolute w-24 h-24 border ${colors.border} rounded-full`}></div>{Object.keys(NIDANA_LABELS).map((key, i) => { const angle = (i * 30) - 90; const isActive = activeNidanas.has(i); return ( <div key={key} className={`absolute w-4 h-4 rounded-full border transition-all duration-500 ${isActive ? `bg-${colors.accent} border-${colors.accent} scale-150 shadow-lg shadow-${colors.glow}` : `bg-slate-900 border-slate-800`}`} style={{ transform: `rotate(${angle}deg) translateY(-40px) rotate(-${angle}deg)` }}></div> ); })}</div></div><div className={`absolute top-4 right-4 w-40 h-40 ${colors.bg}/60 rounded-3xl border ${colors.border} p-2 z-50`}><div className={`text-[8px] ${colors.muted} font-black uppercase text-center mb-1`}>{getT(UI_LABELS.typeMix)}</div><ResponsiveContainer width="100%" height="85%"><PieChart><Pie data={pieData} innerRadius={20} outerRadius={35} paddingAngle={5} dataKey="value">{pieData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={[colors.accentHex, colors.secondaryHex, '#f59e0b', '#ef4444'][index % 4]} stroke="none" /> ))}</Pie></PieChart></ResponsiveContainer></div><div className="relative w-full max-w-5xl px-12"><div className="text-center mb-10"><div className={`text-${colors.accent}/40 text-[9px] font-black tracking-[0.6em] flex items-center justify-center gap-6`}><div className={`h-px flex-grow bg-gradient-to-r from-transparent to-${colors.accent}/20`}></div>{getT(UI_LABELS.streamTelemetry)}<div className={`h-px flex-grow bg-gradient-to-l from-transparent to-${colors.accent}/20`}></div></div></div><div className="flex items-center justify-center py-8"><div className="flex items-center"><div className="flex flex-row-reverse items-center gap-4">{timeline.slice(1, 6).map((cId, idx) => { const citta = cId ? CITTAS[cId] : null; return ( <div key={`hist-${idx}`} className="relative flex flex-col items-center opacity-40 scale-95 grayscale-[0.5]"><div className="w-20 h-24 rounded-2xl border bg-slate-900/30 border-slate-800/60 flex flex-col items-center justify-center"><div className={`text-[6px] text-${colors.accent}/40 font-black mb-1 uppercase truncate w-full px-1 text-center`}>{citta ? getT(CITTA_TYPE_LABELS[citta.type] || {en: citta.type, si: citta.type, ta: citta.type, hi: citta.type}) : '...'}</div><div className={`text-[9px] font-black text-center leading-tight px-1 uppercase tracking-tighter ${colors.muted}`}>{citta ? citta.pali : '...'}</div></div></div> ); })}</div><div className="mx-4 relative flex flex-col items-center z-10">{timeline[0] && CITTAS[timeline[0]!] ? ( <div key={`${tick}-active`} className="animate-citta-arise"><div className={`w-20 h-24 rounded-2xl border flex flex-col items-center justify-center bg-${colors.accent}/15 border-${colors.accent} scale-110 shadow-[0_0_40px_${colors.glow}]`}><div className={`text-[6px] text-${colors.accent}/60 font-black mb-1 uppercase truncate w-full px-1 text-center`}>{getT(CITTA_TYPE_LABELS[CITTAS[timeline[0]!].type] || {en: CITTAS[timeline[0]!].type, si: CITTAS[timeline[0]!].type, ta: CITTAS[timeline[0]!].type, hi: CITTAS[timeline[0]!].type})}</div><div className={`text-[9px] font-black text-center leading-tight px-1 uppercase tracking-tighter ${colors.text}`}>{CITTAS[timeline[0]!].pali}</div></div></div> ) : ( <div className="w-20 h-24 rounded-2xl border border-dashed border-slate-800 flex items-center justify-center"><span className="text-[8px] text-slate-700 font-bold uppercase">Ready</span></div> )}</div><div className="flex items-center gap-4">{[...Array(5)].map((_, i) => ( <div key={`spacer-${i}`} className="w-20 h-24 opacity-0 pointer-events-none hidden sm:block"></div> ))}</div></div></div></div><div className="absolute bottom-6 left-6 right-6 grid grid-cols-4 gap-4 z-40"><div className={`${colors.bg}/80 border ${colors.border} p-4 rounded-[1.5rem] backdrop-blur-xl`}><div className={`text-[9px] ${colors.muted} font-black uppercase mb-2`}>{getT(UI_LABELS.momentData)}</div><div className="space-y-1 text-[10px]"><div className="flex justify-between"><span className={`${colors.muted} uppercase`}>{getT(UI_LABELS.vedana)}:</span><span className={`text-${colors.secondary} uppercase font-bold`}>{getT(VEDANA_TYPE_LABELS[activeCittaMoment.vedana] || {en: activeCittaMoment.vedana, si: activeCittaMoment.vedana, ta: activeCittaMoment.vedana, hi: activeCittaMoment.vedana})}</span></div><div className="flex justify-between"><span className={`${colors.muted} uppercase`}>{getT(UI_LABELS.domain)}:</span><span className="text-amber-500 uppercase font-bold">{getT(CITTA_TYPE_LABELS[activeCittaMoment.type] || {en: activeCittaMoment.type, si: activeCittaMoment.type, ta: activeCittaMoment.type, hi: activeCittaMoment.type})}</span></div></div></div><div className={`${colors.bg}/80 border ${colors.border} p-4 rounded-[1.5rem] backdrop-blur-xl col-span-3 overflow-hidden`}><div className={`text-[9px] ${colors.muted} font-black uppercase mb-2`}>{getT(UI_LABELS.cetasikaLattice)}</div><div className="flex flex-wrap gap-1.5 max-h-[60px] overflow-y-auto custom-scrollbar">{activeCittaMoment.cetasikas.map(cId => ( <span key={cId} className={`px-2 py-1 bg-slate-900 border border-slate-800 text-[8px] ${colors.muted} rounded-lg font-black uppercase`}>{CETASIKAS[cId]?.pali || cId}</span> ))}</div></div></div></div><div className={`h-40 border-t ${colors.border} ${colors.bg}/90 flex flex-col font-mono shrink-0`}><div className={`px-4 py-2 bg-slate-900/50 border-b ${colors.border} flex justify-between items-center`}><span className={`text-[9px] font-black text-${colors.accent}/60 uppercase tracking-widest flex items-center gap-2`}><div className={`w-1.5 h-1.5 rounded-full bg-${colors.accent} animate-pulse`}></div>{getT(UI_LABELS.systemProcess)}</span><span className={`text-[8px] ${colors.muted} uppercase font-black tracking-tighter`}>{getT(UI_LABELS.realtimeTelemetry)}</span></div><div className="flex-grow overflow-y-auto custom-scrollbar p-3 space-y-1 text-[9px]">{systemLog.length > 0 ? systemLog.map(entry => ( <div key={entry.id} className="flex items-center gap-4 group animate-citta-arise"><span className={`${colors.muted} shrink-0`}>[{entry.timestamp}]</span><span className={`font-black tracking-widest shrink-0 ${entry.isKusala ? 'text-emerald-500' : 'text-rose-500'}`}>{entry.isKusala ? '>>>' : '!!!'}</span><span className={`${colors.text} font-bold uppercase shrink-0 w-24 truncate`}>{entry.cittaPali}</span><span className={`${colors.muted} shrink-0 uppercase`}>{getT(UI_LABELS.processedMoment)}:</span><span className={`${colors.accentText}/80 group-hover:${colors.accentText} uppercase tracking-tighter`}>{getT(UI_LABELS.phase)} {getT(CITTA_TYPE_LABELS[entry.type] || {en: entry.type, si: entry.type, ta: entry.type, hi: entry.type})}</span><div className={`flex-grow h-px ${colors.accent.split('-')[1]}-900 opacity-20`}></div></div> )) : ( <div className={`h-full flex items-center justify-center ${colors.muted} animate-pulse uppercase text-[10px] font-black tracking-widest`}>{getT(UI_LABELS.waiting)}</div> )}</div></div></main>
                    
                    <aside className={`w-80 border-l ${colors.border} flex flex-col ${colors.bg}/60 backdrop-blur-3xl z-40 shrink-0`}><div className="p-6 flex flex-col h-full gap-4 min-h-0"><div className="flex flex-col min-h-0 h-32"><div className={`text-[10px] ${colors.muted} font-black uppercase mb-3 tracking-widest text-center shrink-0`}>{getT(UI_LABELS.stabilityAnalysis)}</div><div className="flex-grow w-full overflow-hidden"><ResponsiveContainer width="100%" height="100%" debounce={100}><AreaChart data={stabilityHistory}><defs><linearGradient id={`stabilityGrad-${theme}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={colors.accentHex} stopOpacity={0.2}/><stop offset="95%" stopColor={colors.accentHex} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke={colors.gridColor} vertical={false} /><XAxis dataKey="time" hide /><YAxis hide domain={[0, 100]} /><Area type="monotone" dataKey="level" stroke={colors.accentHex} fillOpacity={1} fill={`url(#stabilityGrad-${theme})`} strokeWidth={2} isAnimationActive={false} /></AreaChart></ResponsiveContainer></div></div><div className="h-28 w-full bg-slate-950/40 rounded-xl border border-slate-700/50 p-2 relative overflow-hidden shrink-0 group"><div className={`text-[8px] ${colors.muted} font-black uppercase mb-2 tracking-[0.2em] text-center z-10 relative`}>{getT(UI_LABELS.cittaFlow)}</div><div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"><svg width="100%" height="100%" className="opacity-80"><path d={`M 10 50 Q 50 ${40 + Math.sin(tick*0.1)*20}, 120 50 T 230 50`} fill="none" stroke={colors.accentHex} strokeWidth="0.5" strokeDasharray="4 4" className="transition-all duration-700" />{[...Array(8)].map((_, i) => { const offset = ((tick + i * 10) % 80) / 80; const pulse = 1 + Math.sin(tick * 0.2 + i) * 0.3; const x = 20 + (offset * 200); const y = 50 + Math.sin(offset * Math.PI * 2 + tick * 0.05) * 15; return ( <g key={i}><circle cx={x} cy={y} r={3 * pulse} fill={colors.accentHex} className="blur-[1px]" /><circle cx={x} cy={y} r={6 * pulse} fill="none" stroke={colors.accentHex} strokeWidth="0.5" className="animate-ping opacity-20" /></g> ); })}{[...Array(12)].map((_, i) => ( <rect key={`p-${i}`} x={((tick * (i + 2)) % 250)} y={20 + (i * 5) % 60} width="1" height="1" fill={colors.secondaryHex} className="opacity-30"><animate attributeName="opacity" values="0;0.5;0" dur={`${1 + Math.random()}s`} repeatCount="indefinite" /></rect> ))}</svg></div><div className={`absolute bottom-1 right-2 text-[6px] ${colors.muted} font-bold uppercase tracking-widest`}>REALTIME_FLUX_ACTIVE</div></div><div className="flex flex-col min-h-0 h-24 bg-slate-950/30 rounded-xl border border-slate-800/40 p-2"><div className={`text-[8px] ${colors.muted} font-black uppercase mb-2 tracking-widest text-center`}>{getT(UI_LABELS.intensityLabel)}</div><div className="flex-grow w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={intensityHistory}><Bar dataKey="value" isAnimationActive={false}>{intensityHistory.map((entry, index) => ( <Cell key={`cell-${index}`} fill={entry.value > 80 ? colors.accentHex : entry.value > 50 ? colors.secondaryHex : '#64748b'} opacity={0.6 + (index / intensityHistory.length) * 0.4} /> ))}</Bar></BarChart></ResponsiveContainer></div></div>

                        <div className="flex flex-col min-h-0 h-24 bg-slate-950/40 rounded-xl border border-slate-800/50 p-2 relative overflow-hidden"><div className={`text-[8px] ${colors.muted} font-black uppercase mb-1 tracking-widest text-center z-10`}>{getT(UI_LABELS.resonanceFlux)}</div><div className="flex-grow w-full z-10"><ResponsiveContainer width="100%" height="100%"><AreaChart data={resonanceHistory}><Area type="monotone" dataKey="v1" stroke={colors.accentHex} fill="transparent" strokeWidth={2} isAnimationActive={false} /><Area type="monotone" dataKey="v2" stroke={colors.secondaryHex} fill="transparent" strokeWidth={1.5} strokeDasharray="4 2" isAnimationActive={false} /></AreaChart></ResponsiveContainer></div></div><div className="flex flex-col min-h-0 h-32 bg-slate-950/50 rounded-xl border border-slate-700/50 p-2 relative group"><div className={`text-[8px] ${colors.muted} font-black uppercase mb-2 tracking-[0.2em] text-center`}>{getT(UI_LABELS.momentumLabel)}</div><div className="flex-grow w-full"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={momentumHistory}><defs><linearGradient id={`momentumGrad-${theme}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme === 'matrix' ? colors.accentHex : '#f59e0b'} stopOpacity={0.4}/><stop offset="95%" stopColor={theme === 'matrix' ? colors.accentHex : '#f59e0b'} stopOpacity={0}/></linearGradient></defs><Area type="monotone" dataKey="wholesome" fill={`url(#momentumGrad-${theme})`} stroke={theme === 'matrix' ? colors.accentHex : '#f59e0b'} strokeWidth={1} isAnimationActive={false} /><Line type="step" dataKey="friction" stroke="#ef4444" strokeWidth={1} dot={false} isAnimationActive={false} strokeDasharray="2 2" /><Line type="monotone" dataKey="wholesome" stroke={colors.accentHex} strokeWidth={2} dot={false} isAnimationActive={false} /></ComposedChart></ResponsiveContainer></div><div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div></div>
                        
                        {/* Causal Synchronicity - Relocated to the bottom of the right sidebar */}
                        <div className={`h-28 w-full bg-slate-950/60 rounded-xl border border-slate-700/50 p-2 overflow-hidden flex flex-col shrink-0 relative group`}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest">{getT(UI_LABELS.synchronicityFlux)}</span>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping"></div>
                                    <div className="w-1 h-1 rounded-full bg-rose-400 animate-ping" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={fluxHistory}>
                                        <Line type="monotone" dataKey="synergy" stroke={colors.accentHex} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                                        <Area type="monotone" dataKey="resistance" fill="#ef4444" stroke="#ef4444" fillOpacity={0.1} strokeWidth={1} strokeDasharray="3 3" isAnimationActive={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
                        </div>

                        <div className="space-y-1 shrink-0">{[ { key: 'pathavi', label: ELEMENT_LABELS.pathavi }, { key: 'apo', label: ELEMENT_LABELS.apo }, { key: 'tejo', label: ELEMENT_LABELS.tejo }, { key: 'vayo', label: ELEMENT_LABELS.vayo } ].map((el, i) => ( <div key={el.key} className="space-y-0.5"><div className={`flex justify-between text-[8px] ${colors.muted} font-black uppercase`}><span>{getT(el.label)}</span><span className={colors.text}>{(aggregates[0] * (0.8 + i * 0.05)).toFixed(1)}%</span></div><div className={`h-0.5 bg-slate-900/50 rounded-full overflow-hidden`}><div className={`h-full bg-${colors.accent} opacity-60`} style={{ width: `${aggregates[0] * (0.8 + i * 0.05)}%` }}></div></div></div> ))}</div><div className={`mt-auto p-2 ${colors.cardBg} rounded-xl border ${colors.border} text-center shrink-0`}><div className={`text-[8px] ${colors.muted} font-black uppercase mb-0.5 tracking-[0.2em]`}>{getT(UI_LABELS.sysVersion)}</div><div className={`text-[9px] text-${colors.accent} font-black tracking-widest italic`}>BUILD 2026.01.X</div></div></div></aside>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
            `}</style>
        </div>
    );
};

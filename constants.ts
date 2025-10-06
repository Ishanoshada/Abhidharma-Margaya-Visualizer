import type { Cetasika, Citta, KasinaData, KasinaType, VithiStep, DreamScenario, Language, AbhinnaScenario, RebirthScenario, ArpanaScenario, Tab } from './types';

export const TABS: { id: Tab; label: Record<Language, string> }[] = [
    { id: 'foundation', label: { en: 'Foundation (පදනම)', si: 'පදනම', ta: 'அடித்தளம்', hi: 'आधार' } },
    { id: 'visualization', label: { en: 'Citta Vīthi (චිත්ත වීථි)', si: 'චිත්ත වීථි', ta: 'சித்த வீதி', hi: 'चित्त वीथि' } },
    { id: 'arpana', label: { en: 'Arpaṇa (අර්පණ)', si: 'අර්පණ', ta: 'அர்ப்பணம்', hi: 'अर्पण' } },
    { id: 'panchaskandha', label: { en: 'The Five Aggregates (පඤ්චස්කන්ධය)', si: 'පඤචස්කන්ධය', ta: 'பஞ்சஸ்கந்தம்', hi: 'पंचस्कंध' } },
    { id: 'paticcasamuppada', label: { en: 'Dependent Origination (පටිච්චසමුප්පාදය)', si: 'පටිච්චසමුප්පාදය', ta: 'சார்பு உற்பத்தி', hi: 'प्रतीत्यसमुत्पाद' } },
    { id: 'suvisiPratyaya', label: { en: '24 Conditions (සුවිසි ප්‍රත්‍යය)', si: 'සුවිසි ප්‍රත්‍යය', ta: '24 நிபந்தனைகள்', hi: '24 प्रत्यय' } },
    { id: 'dream', label: { en: 'Dream State (සිහින)', si: 'සිහින', ta: 'கனவு நிலை', hi: 'स्वप्न अवस्था' } },
    { id: 'abhinna', label: { en: 'Abhiññā (අභිඤ්ඤා)', si: 'අභිඤ්ඤා', ta: 'அபிஞ்ஞா', hi: 'अभिज्ञा' } },
    { id: 'maranasanna', label: { en: 'Dying Process (මරණාසන්න)', si: 'මරණාසන්න', ta: 'மரண செயல்முறை', hi: 'मरण प्रक्रिया' } },
    { id: 'punabbhava', label: { en: 'Rebirth (පුනරුත්පත්තිය)', si: 'පුනරුත්පත්තිය', ta: 'மறுபிறப்பு', hi: 'पुनर्जन्म' } },
];

export const VITHI_AVG_KSHANAS = 12; // An average from vithi definitions (in kshanas).
export const REAL_KSHANAS_PER_SEC = 667 * 10 ** 12;  // 667 trillion cittas/kshanas per second according to some Abhidhamma commentaries.

export const DHYANA_STAGES = [
    { time: 0, factors: { vitakka: 0, vicara: 0, piti: 0, sukha: 0, upekkha: 50, ekaggata: 10 } },
    { time: 5, factors: { vitakka: 80, vicara: 80, piti: 40, sukha: 40, upekkha: 0, ekaggata: 70 } },
    { time: 10, factors: { vitakka: 100, vicara: 100, piti: 100, sukha: 100, upekkha: 0, ekaggata: 100 } },
    { time: 15, factors: { vitakka: 0, vicara: 100, piti: 100, sukha: 100, upekkha: 0, ekaggata: 100 } },
    { time: 25, factors: { vitakka: 0, vicara: 0, piti: 100, sukha: 100, upekkha: 0, ekaggata: 100 } },
    { time: 35, factors: { vitakka: 0, vicara: 0, piti: 0, sukha: 100, upekkha: 0, ekaggata: 100 } },
    { time: 45, factors: { vitakka: 0, vicara: 0, piti: 0, sukha: 0, upekkha: 100, ekaggata: 100 } },
];

export const CETASIKAS: Record<string, Cetasika> = {
    // Sabbacittasādhāraṇa (Universal)
    phassa: { id: 'phassa', name: 'Contact', pali: 'Phassa' },
    vedana: { id: 'vedana', name: 'Feeling', pali: 'Vedanā' },
    sanna: { id: 'sanna', name: 'Perception', pali: 'Saññā' },
    cetana: { id: 'cetana', name: 'Volition', pali: 'Cetanā' },
    ekaggata: { id: 'ekaggata', name: 'One-pointedness', pali: 'Ekaggatā' },
    jivitindriya: { id: 'jivitindriya', name: 'Life Faculty', pali: 'Jīvitindriya' },
    manasikara: { id: 'manasikara', name: 'Attention', pali: 'Manasikāra' },
    // Pakiṇṇaka (Particulars)
    vitakka: { id: 'vitakka', name: 'Initial Application', pali: 'Vitakka' },
    vicara: { id: 'vicara', name: 'Sustained Application', pali: 'Vicāra' },
    adhimokkha: { id: 'adhimokkha', name: 'Decision', pali: 'Adhimokkha' },
    viriya: { id: 'viriya', name: 'Energy', pali: 'Viriya' },
    piti: { id: 'piti', name: 'Rapture', pali: 'Pīti' },
    chanda: { id: 'chanda', name: 'Desire-to-act', pali: 'Chanda' },
    // Akusala (Unwholesome)
    moha: { id: 'moha', name: 'Delusion', pali: 'Moha' },
    ahirika: { id: 'ahirika', name: 'Shamelessness', pali: 'Ahirika' },
    anottappa: { id: 'anottappa', name: 'Fearlessness of wrong', pali: 'Anottappa' },
    uddhacca: { id: 'uddhacca', name: 'Restlessness', pali: 'Uddhacca' },
    lobha: { id: 'lobha', name: 'Greed', pali: 'Lobha' },
    ditthi: { id: 'ditthi', name: 'Wrong View', pali: 'Diṭṭhi' },
    mana: { id: 'mana', name: 'Conceit', pali: 'Māna' },
    dosa: { id: 'dosa', name: 'Aversion', pali: 'Dosa' },
    issa: { id: 'issa', name: 'Envy', pali: 'Issā' },
    macchariya: { id: 'macchariya', name: 'Stinginess', pali: 'Macchariya' },
    kukkucca: { id: 'kukkucca', name: 'Worry', pali: 'Kukkucca' },
    // Sobhana (Beautiful)
    saddha: { id: 'saddha', name: 'Faith', pali: 'Saddhā' },
    sati: { id: 'sati', name: 'Mindfulness', pali: 'Sati' },
    hiri: { id: 'hiri', name: 'Shame of wrong', pali: 'Hiri' },
    ottappa: { id: 'ottappa', name: 'Fear of wrong', pali: 'Ottappa' },
    alobha: { id: 'alobha', name: 'Non-greed', pali: 'Alobha' },
    adosa: { id: 'adosa', name: 'Non-hatred', pali: 'Adosa' },
    tatramajjhattata: { id: 'tatramajjhattata', name: 'Equanimity', pali: 'Tatramajjhattatā' },
    passaddhi: { id: 'passaddhi', name: 'Tranquility', pali: 'Kāyapassaddhi/Cittapassaddhi' },
    lahuta: { id: 'lahuta', name: 'Lightness', pali: 'Kāyalahutā/Cittalahutā' },
    muduta: { id: 'muduta', name: 'Malleability', pali: 'Kāyamudutā/Cittamudutā' },
    kammannata: { id: 'kammannata', name: 'Wieldiness', pali: 'Kāyakammaññatā/Cittakammaññatā' },
    pagunnata: { id: 'pagunnata', name: 'Proficiency', pali: 'Kāyapāguññatā/Cittapāguññatā' },
    ujukata: { id: 'ujukata', name: 'Rectitude', pali: 'Kāyujukatā/Cittujukatā' },
    panna: { id: 'panna', name: 'Wisdom', pali: 'Paññā' },
};

const UNIVERSALS = ['phassa', 'vedana', 'sanna', 'cetana', 'ekaggata', 'jivitindriya', 'manasikara'];
const PARTICULARS = ['vitakka', 'vicara', 'adhimokkha', 'viriya', 'piti', 'chanda'];
const AKUSALA_UNIVERSALS = ['moha', 'ahirika', 'anottappa', 'uddhacca'];
const SOBHANA_UNIVERSALS = ['saddha', 'sati', 'hiri', 'ottappa', 'alobha', 'adosa', 'tatramajjhattata', 'passaddhi', 'lahuta', 'muduta', 'kammannata', 'pagunnata', 'ujukata'];

export const CITTAS: Record<string, Citta> = {
    bhavanga: { id: 'bhavanga', name: 'Life-Continuum', pali: 'Bhavanga', type: 'vipaka', vedana: 'upekkha', cetasikas: [...UNIVERSALS, ...PARTICULARS] },
    manodvaravajjana: { id: 'manodvaravajjana', name: 'Mind-Door Adverting', pali: 'Manodvārāvajjana', type: 'kiriya', vedana: 'upekkha', cetasikas: [...UNIVERSALS, 'adhimokkha', 'viriya'] },
    
    // Generic and Pathavi Kusala
    kusala: { id: 'kusala', name: 'Wholesome Javana', pali: 'Kusala Javana', type: 'kusala', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, ...PARTICULARS, ...SOBHANA_UNIVERSALS, 'panna'] },
    
    // Kasina-specific Kusala Javanas
    kusala_tejo: { id: 'kusala_tejo', name: 'Fire Kusala Javana', pali: 'Tejo-Kusala', type: 'kusala', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, ...PARTICULARS, ...SOBHANA_UNIVERSALS, 'panna'] },
    kusala_apo: { id: 'kusala_apo', name: 'Water Kusala Javana', pali: 'Āpo-Kusala', type: 'kusala', vedana: 'upekkha', hasPanna: true, cetasikas: [...UNIVERSALS, ...PARTICULARS, ...SOBHANA_UNIVERSALS, 'panna'] },
    kusala_vayo: { id: 'kusala_vayo', name: 'Wind Kusala Javana', pali: 'Vāyo-Kusala', type: 'kusala', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, ...PARTICULARS, ...SOBHANA_UNIVERSALS, 'panna'] },

    // Jhanas
    jhana1: { id: 'jhana1', name: 'First Dhyāna', pali: 'Paṭhamajjhāna', type: 'jhana', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    jhana2: { id: 'jhana2', name: 'Second Dhyāna', pali: 'Dutiyajjhāna', type: 'jhana', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    jhana3: { id: 'jhana3', name: 'Third Dhyāna', pali: 'Tatiyajjhāna', type: 'jhana', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    jhana4: { id: 'jhana4', name: 'Fourth Dhyāna', pali: 'Catutthajjhāna', type: 'jhana', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, ...SOBHANA_UNIVERSALS, 'panna'] },
    jhana5: { id: 'jhana5', name: 'Fifth Dhyāna', pali: 'Pañcamajjhāna', type: 'jhana', vedana: 'upekkha', hasPanna: true, cetasikas: [...UNIVERSALS, ...SOBHANA_UNIVERSALS, 'panna'] },
    
    // Distractions
    lobhaCitta: { id: 'lobhaCitta', name: 'Greed-rooted', pali: 'Lobha-mūla', type: 'akusala', vedana: 'somanassa', cetasikas: [...UNIVERSALS, ...PARTICULARS, ...AKUSALA_UNIVERSALS, 'lobha', 'ditthi'] },
    dosaCitta: { id: 'dosaCitta', name: 'Aversion-rooted', pali: 'Dosa-mūla', type: 'akusala', vedana: 'domanassa', cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'adhimokkha', 'viriya', ...AKUSALA_UNIVERSALS, 'dosa', 'issa', 'macchariya', 'kukkucca'] },

    // Maranasanna Vithi Cittas
    pancadvaravajjana: { id: 'pancadvaravajjana', name: 'Five-Door Adverting', pali: 'Pañcadvārāvajjana', type: 'kiriya', vedana: 'upekkha', cetasikas: [...UNIVERSALS, 'adhimokkha', 'viriya'] },
    cakkhuvinnana: { id: 'cakkhuvinnana', name: 'Eye-Consciousness', pali: 'Cakkhu-viññāṇa', type: 'vipaka', vedana: 'upekkha', cetasikas: [...UNIVERSALS] },
    sampaticchana: { id: 'sampaticchana', name: 'Receiving', pali: 'Sampaṭicchana', type: 'vipaka', vedana: 'upekkha', cetasikas: [...UNIVERSALS] },
    santirana: { id: 'santirana', name: 'Investigating', pali: 'Santīraṇa', type: 'vipaka', vedana: 'upekkha', cetasikas: [...UNIVERSALS, 'adhimokkha'] },
    votthapana: { id: 'votthapana', name: 'Determining', pali: 'Votthapana', type: 'kiriya', vedana: 'upekkha', cetasikas: [...UNIVERSALS, 'adhimokkha', 'viriya'] }, // Same as Manodvaravajjana in function
    cuti: { id: 'cuti', name: 'Death Consciousness', pali: 'Cuti', type: 'vipaka', vedana: 'upekkha', cetasikas: [...UNIVERSALS, ...PARTICULARS] }, // Similar to Bhavanga
    patisandhi: { id: 'patisandhi', name: 'Rebirth-linking', pali: 'Paṭisandhi', type: 'vipaka', vedana: 'upekkha', cetasikas: [...UNIVERSALS, ...PARTICULARS] }, // Similar to Bhavanga

    // Arpana Vithi Cittas
    sotapatti_magga: { id: 'sotapatti_magga', name: 'Stream-Entry Path', pali: 'Sotāpatti-magga', type: 'magga', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    sotapatti_phala: { id: 'sotapatti_phala', name: 'Stream-Entry Fruition', pali: 'Sotāpatti-phala', type: 'phala', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    sakadagami_magga: { id: 'sakadagami_magga', name: 'Once-Return Path', pali: 'Sakadāgāmi-magga', type: 'magga', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    sakadagami_phala: { id: 'sakadagami_phala', name: 'Once-Return Fruition', pali: 'Sakadāgāmi-phala', type: 'phala', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    anagami_magga: { id: 'anagami_magga', name: 'Non-Return Path', pali: 'Anāgāmi-magga', type: 'magga', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    anagami_phala: { id: 'anagami_phala', name: 'Non-Return Fruition', pali: 'Anāgāmi-phala', type: 'phala', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    arahatta_magga: { id: 'arahatta_magga', name: 'Arahantship Path', pali: 'Arahatta-magga', type: 'magga', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
    arahatta_phala: { id: 'arahatta_phala', name: 'Arahantship Fruition', pali: 'Arahatta-phala', type: 'kiriya', vedana: 'somanassa', hasPanna: true, cetasikas: [...UNIVERSALS, 'vitakka', 'vicara', 'piti', ...SOBHANA_UNIVERSALS, 'panna'] },
};

export const vithiKasinaSequence: (kusalaCittaId: string, jhanaCittaId: string) => VithiStep[] = (kusalaCittaId, jhanaCittaId) => [
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga' },
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga-calana' },
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga-upaccheda' },
    { cittaId: 'manodvaravajjana', duration: 1, label: 'Manodvārāvajjana' },
    { cittaId: kusalaCittaId, duration: 1, label: 'Parikamma' },
    { cittaId: kusalaCittaId, duration: 1, label: 'Upacāra' },
    { cittaId: kusalaCittaId, duration: 1, label: 'Anuloma' },
    { cittaId: kusalaCittaId, duration: 1, label: 'Gotrabhū' },
    { cittaId: jhanaCittaId, duration: 2, label: 'Jhāna' },
    { cittaId: 'bhavanga', duration: 3, label: 'Bhavanga' },
];

export const DISTRACTION_VITHI: VithiStep[] = [
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga' },
    { cittaId: 'manodvaravajjana', duration: 1, label: 'Adverting' },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Distraction' },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Distraction' },
    { cittaId: 'dosaCitta', duration: 1, label: 'Aversion' },
    { cittaId: 'dosaCitta', duration: 1, label: 'Aversion' },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Distraction' },
    { cittaId: 'bhavanga', duration: 2, label: 'Bhavanga' },
];

export const KASINA_DATA: Record<KasinaType, KasinaData> = {
    'Pathavi (Earth)': {
        name: 'Pathavi (Earth)',
        description: 'Meditation on the earth element, cultivating concentration through the concept of solidity.',
        vithi: vithiKasinaSequence('kusala', 'jhana1'),
    },
    'Tejo (Fire)': {
        name: 'Tejo (Fire)',
        description: 'Meditation on the fire element, cultivating concentration through the concept of heat and energy.',
        vithi: vithiKasinaSequence('kusala_tejo', 'jhana1'),
    },
    'Āpo (Water)': {
        name: 'Āpo (Water)',
        description: 'Meditation on the water element, cultivating concentration through the concept of cohesion.',
        vithi: vithiKasinaSequence('kusala_apo', 'jhana1'),
    },
    'Vāyo (Wind)': {
        name: 'Vāyo (Wind)',
        description: 'Meditation on the wind element, cultivating concentration through the concept of motion.',
        vithi: vithiKasinaSequence('kusala_vayo', 'jhana1'),
    },
};

const PLEASANT_DREAM_VITHI: VithiStep[] = [
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga', story: { en: 'The mind is in a deep, dreamless state...', si: 'සිත ගැඹුරු, සිහින රහිත තත්වයක පවතී...', ta: 'மனம் ஆழ்ந்த, கனவற்ற நிலையில் உள்ளது...', hi: 'मन एक गहरी, स्वप्नहीन अवस्था में है...' } },
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga-calana' },
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga-upaccheda' },
    { cittaId: 'manodvaravajjana', duration: 1, label: 'Manodvārāvajjana', story: { en: 'A vague memory-image begins to stir in the mind...', si: 'මනසෙහි නොපැහැදිලි මතක රූපයක් ඇවිස්සීමට පටන් ගනී...', ta: 'மனதில் ஒரு மங்கலான நினைவுப் பிம்பம் கிளரத் தொடங்குகிறது...', hi: 'मन में एक अस्पष्ट स्मृति-छवि उभरने लगती है...' } },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Javana', story: { en: 'The image becomes clearer: a cherished person from the past.', si: 'රූපය පැහැදිලි වේ: අතීතයේ සිටි ආදරණීය පුද්ගලයෙකි.', ta: 'படம் தெளிவாகிறது: கடந்த காலத்தைச் சேர்ந்த ஒரு நேசத்துக்குரிய நபர்.', hi: 'छवि स्पष्ट हो जाती है: अतीत का एक प्रिय व्यक्ति।' } },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Javana', story: { en: 'A feeling of joy and attachment arises with the sight.', si: 'එම දසුනත් සමග සතුට සහ ඇල්ම පිළිබඳ හැඟීමක් ඇතිවේ.', ta: 'அந்தக் காட்சியுடன் மகிழ்ச்சியும் பற்றும் எழுகின்றன.', hi: 'उस दृश्य के साथ खुशी और लगाव की भावना उत्पन्न होती है।' } },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Javana', story: { en: 'The mind clings to the pleasant feeling.', si: 'සිත එම සුන්දර හැඟීමට ඇලී සිටී.', ta: 'மனம் அந்த இனிமையான உணர்வில் ஒட்டிக்கொள்கிறது.', hi: 'मन उस सुखद অনুভূতি से चिपक जाता है।' } },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Javana' },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Javana', story: { en: 'You are together, sharing a happy moment.', si: 'ඔබ දෙදෙනා එකට, සතුටු මොහොතක් බෙදා ගනිමින් සිටී.', ta: 'நீங்கள் இருவரும் ஒன்றாக ஒரு மகிழ்ச்சியான தருணத்தைப் பகிர்ந்து கொள்கிறீர்கள்.', hi: 'आप एक साथ हैं, एक सुखद पल साझा कर रहे हैं।' } },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Javana' },
    { cittaId: 'lobhaCitta', duration: 1, label: 'Javana', story: { en: 'The mind holds onto this constructed reality...', si: 'සිත මෙම ගොඩනැගූ යථාර්ථය මත රැඳී සිටී...', ta: 'மனம் இந்த உருவாக்கப்பட்ட யதார்த்தத்தைப் பற்றிக்கொள்கிறது...', hi: 'मन इस निर्मित वास्तविकता पर टिका रहता है...' } },
    { cittaId: 'bhavanga', duration: 2, label: 'Bhavanga', story: { en: 'The dream image fades, and the mind falls back into the life-continuum.', si: 'සිහින රූපය මැකී යන අතර, සිත නැවත භවාංගයට වැටේ.', ta: 'கனவுப் பிம்பம் மங்குகிறது, மனம் மீண்டும் வாழ்க்கை-தொடர்ச்சிக்குள் விழுகிறது.', hi: 'स्वप्न की छवि धूमिल हो जाती है, और मन वापस जीवन-सातत्य में चला जाता है।' } },
];

const FEARFUL_DREAM_VITHI: VithiStep[] = [
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga', story: { en: 'The mind is resting in the dark, quiet space between thoughts...', si: 'සිත සිතුවිලි අතර අඳුරු, නිහඬ අවකාශයේ විවේක ගනිමින් සිටී...', ta: 'மனம் எண்ணங்களுக்கு இடையிலான இருண்ட, அமைதியான இடத்தில் ஓய்வெடுக்கிறது...', hi: 'मन विचारों के बीच के अंधेरे, शांत स्थान में आराम कर रहा है...' } },
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga-calana' },
    { cittaId: 'bhavanga', duration: 1, label: 'Bhavanga-upaccheda' },
    { cittaId: 'manodvaravajjana', duration: 1, label: 'Manodvārāvajjana', story: { en: 'Suddenly, a disturbing impression flickers...', si: 'හදිසියේම, කැළඹිලි සහිත හැඟීමක් මතු වේ...', ta: 'திடீரென்று, ஒரு குழப்பமான உணர்வு மின்னுகிறது...', hi: 'अचानक, एक परेशान करने वाली छाप कौंधती है...' } },
    { cittaId: 'dosaCitta', duration: 1, label: 'Javana', story: { en: 'The impression sharpens—a menacing shadow, a feeling of being pursued.', si: 'හැඟීම තියුණු වේ—තර්ජනාත්මක සෙවනැල්ලක්, ලුහුබඳිනු ලබන හැඟීමක්.', ta: 'உணர்வு கூர்மையாகிறது—ஒரு அச்சுறுத்தும் நிழல், துரத்தப்படுவதற்கான உணர்வு.', hi: 'छाप तेज हो जाती है—एक खतरनाक छाया, पीछा किए जाने का एहसास।' } },
    { cittaId: 'dosaCitta', duration: 1, label: 'Javana', story: { en: 'Aversion and fear arise powerfully.', si: 'ද්වේෂය සහ බිය බලවත් ලෙස හට ගනී.', ta: 'வெறுப்பும் பயமும் சக்தி வாய்ந்ததாக எழுகின்றன.', hi: 'घृणा और भय शक्तिशाली रूप से उत्पन्न होते हैं।' } },
    { cittaId: 'dosaCitta', duration: 1, label: 'Javana', story: { en: 'The mind reacts with panic, trying to escape.', si: 'සිත භීතියෙන් ප්‍රතිචාර දක්වයි, ගැලවීමට උත්සාහ කරයි.', ta: 'மனம் பீதியுடன் പ്രതികരിക്കുന്നു, தப்பிக்க முயற்சிக்கிறது.', hi: 'मन घबराहट के साथ प्रतिक्रिया करता है, भागने की कोशिश करता है।' } },
    { cittaId: 'dosaCitta', duration: 1, label: 'Javana' },
    { cittaId: 'dosaCitta', duration: 1, label: 'Javana', story: { en: 'You are running, but your feet feel heavy, stuck.', si: 'ඔබ දුවමින් සිටී, නමුත් ඔබේ පාද බර වී, හිරවී ඇති බවක් දැනේ.', ta: 'நீங்கள் ஓடுகிறீர்கள், ஆனால் உங்கள் கால்கள் கனமாகவும், சிக்கிக்கொண்டதாகவும் உணர்கின்றன.', hi: 'आप दौड़ रहे हैं, लेकिन आपके पैर भारी, फंसे हुए महसूस हो रहे हैं।' } },
    { cittaId: 'dosaCitta', duration: 1, label: 'Javana' },
    { cittaId: 'dosaCitta', duration: 1, label: 'Javana', story: { en: 'The mind is caught in a loop of fear...', si: 'සිත බියේ චක්‍රයක සිරවී ඇත...', ta: 'மனம் பயத்தின் ஒரு வளையத்தில் சிக்கியுள்ளது...', hi: 'मन भय के एक चक्र में फँस गया है...' } },
    { cittaId: 'bhavanga', duration: 2, label: 'Bhavanga', story: { en: 'The terrifying scene dissolves as the mind returns to its resting state.', si: 'සිත විවේක තත්වයට පත්වත්ම, බියකරු දර්ශනය දියවී යයි.', ta: 'மனம் அதன் ஓய்வு நிலைக்குத் திரும்பும்போது திகிலூட்டும் காட்சி கரைகிறது.', hi: 'जैसे ही मन अपनी आराम की स्थिति में लौटता है, भयानक दृश्य भंग हो जाता है।' } },
];


export const DREAM_SCENARIOS: DreamScenario[] = [
    {
        id: 'pleasant_encounter',
        title: 'Dreaming of a Pleasant Encounter',
        description: 'A short dream sequence involving attachment to a pleasant memory.',
        vithi: PLEASANT_DREAM_VITHI,
    },
    {
        id: 'fearful_chase',
        title: 'Dreaming of Being Chased',
        description: 'A common anxiety dream rooted in aversion and fear.',
        vithi: FEARFUL_DREAM_VITHI,
    }
];

export const ABHINNA_EXAMPLES: AbhinnaScenario[] = [
    {
        id: 'mind_reading',
        title: {
            en: 'Mind-Reading (Ceto-pariya-ñāṇa)',
            si: 'මනස කියවන චිත්ත (චේතෝපරිය ඤාණය)',
            ta: 'மனம் படித்தல் (செட்டோ-பரிய-ஞானம்)',
            hi: 'मन पढ़ना (सेतो-परिय-ज्ञान)',
        },
        initialStory: {
            en: 'Select a step to see the explanation or press play to begin the sequence.',
            si: 'විස්තරය බැලීමට පියවරක් තෝරන්න හෝ අනුපිළිවෙල ආරම්භ කිරීමට play බොත්තම ඔබන්න.',
            ta: 'விளக்கத்தைக் காண ஒரு படியைத் தேர்ந்தெடுக்கவும் அல்லது வரிசையைத் தொடங்க ப்ளே பொத்தானை அழுத்தவும்.',
            hi: 'स्पष्टीकरण देखने के लिए एक चरण चुनें या अनुक्रम शुरू करने के लिए प्ले बटन दबाएं।',
        },
        steps: [
            { pali: 'Base Jhāna', cittaId: 'jhana4', story: { en: 'First, one must attain a base Jhāna. The mind must be stable and clear.', si: 'පළමුව ධ්‍යානයේ සමවැදීම අවශ්‍යයි. චිත්තය ඉතා නිර්බීජ සහ පැහැදිලි විය යුතුයි.', ta: 'முதலில், ஒருவர் அடிப்படை ஜானத்தை அடைய வேண்டும். மனம் நிலையானதாகவும் தெளிவாகவும் இருக்க வேண்டும்.', hi: 'पहले, आधार झान प्राप्त करना होगा। मन स्थिर और स्पष्ट होना चाहिए।' } },
            { pali: 'Bhavaṅga-calana', cittaId: 'bhavanga', story: { en: 'The life-continuum vibrates as the mind prepares to shift its object.', si: 'මනස තම අරමුණ වෙනස් කිරීමට සූදානම් වන විට භවාංගය කම්පනය වේ.', ta: 'மனம் தனது பொருளை மாற்றத் தயாராகும் போது வாழ்க்கை-தொடர்ச்சி அதிர்வுகிறது.', hi: 'मन जब अपनी वस्तु को बदलने की तैयारी करता है तो भवंग कांपता है।' } },
            { pali: 'Bhavaṅga-upaccheda', cittaId: 'bhavanga', story: { en: 'The life-continuum is cut off, making way for the active mind-door process.', si: 'ක්‍රියාකාරී මනෝද්වාර වීථියට ඉඩ සලසමින් භවාංගය සිඳී යයි.', ta: 'செயலில் உள்ள மன-வாசல் செயல்முறைக்கு வழி வகுக்கும் வகையில் வாழ்க்கை-தொடர்ச்சி துண்டிக்கப்படுகிறது.', hi: 'सक्रिय मन-द्वार प्रक्रिया के लिए मार्ग प्रशस्त करते हुए, भवंग काट दिया जाता है।' } },
            { pali: 'Parikamma', cittaId: 'kusala', story: { en: 'Preparation: The mind initially prepares to direct its attention outwards to another being\'s mind.', si: 'පරිකර්ම: සිත මුලින්ම තම අවධානය වෙනත් සත්වයෙකුගේ සිත වෙත යොමු කිරීමට සූදානම් වේ.', ta: 'தயாரிப்பு: மனம் ஆரம்பத்தில் தனது கவனத்தை மற்றொரு உயிரினத்தின் மனதை நோக்கி செலுத்தத் தயாராகிறது.', hi: 'परिकर्म: मन शुरू में अपना ध्यान दूसरे प्राणी के मन की ओर निर्देशित करने की तैयारी करता है।' } },
            { pali: 'Upacāra', cittaId: 'kusala', story: { en: 'Access: The mind gets closer to the object, the consciousness of the other being.', si: 'උපචාර: සිත අරමුණට, එනම් අනෙක් සත්වයාගේ විඥානයට, ළං වේ.', ta: 'அணுகல்: மனம் பொருளுக்கு நெருக்கமாகிறது, மற்ற உயிரினத்தின் உணர்வு.', hi: 'उपचार: मन वस्तु के करीब आता है, दूसरे प्राणी की चेतना।' } },
            { pali: 'Anuloma', cittaId: 'kusala', story: { en: 'Adaptation: The mind adapts to conform with the object.', si: 'අනුලෝම: සිත අරමුණට අනුකූල වන පරිදි හැඩගැසේ.', ta: 'தழுவல்: மனம் பொருளுடன் ஒத்துப்போகத் தன்னை மாற்றிக்கொள்கிறது.', hi: 'अनुलोम: मन वस्तु के अनुरूप ढल जाता है।' } },
            { pali: 'Gotrabhū', cittaId: 'kusala', story: { en: 'Change-of-lineage: The mind transcends the ordinary sensual sphere and touches the supernormal object.', si: 'ගෝත්‍රභූ: සිත සාමාන්‍ය කාමාවචර භූමිය ඉක්මවා අසාමාන්‍ය අරමුණ ස්පර්ශ කරයි.', ta: 'வம்சாவளி மாற்றம்: மனம் சாதாரண புலனின்ப மண்டலத்தைக் கடந்து அசாதாரண பொருளைத் தொடுகிறது.', hi: 'गोत्रभू: मन सामान्य कामुक क्षेत्र से परे जाकर अलौकिक वस्तु को छूता है।' } },
            { pali: 'Abhiññā Citta', cittaId: 'kusala', story: { en: 'Abhiññā Javana: The actual "knowing" consciousness arises, perceiving the other\'s thoughts (past, present, or future tendencies).', si: 'අභිඤ්ඤා ජවන්: අනෙකාගේ සිතිවිලි (අතීත, වර්තමාන, හෝ අනාගත ප්‍රවණතා) වටහා ගනිමින්, සැබෑ "දැනගැනීමේ" විඥානය පහළ වේ.', ta: 'அபிஞ்ஞா ஜவனம்: உண்மையான "அறியும்" உணர்வு எழுகிறது, மற்றவரின் எண்ணங்களை (கடந்த, நிகழ்கால, அல்லது எதிர்காலப் போக்குகள்) உணர்கிறது.', hi: 'अभिज्ञा चित्त: वास्तविक "जानने" वाली चेतना उत्पन्न होती है, जो दूसरे के विचारों (अतीत, वर्तमान, या भविष्य की प्रवृत्तियों) को समझती है।' } },
        ]
    },
    {
        id: 'distant_hearing',
        title: {
            en: 'Clairaudience (Dibba-sota)',
            si: 'දුර සිටින ශබ්ද ඇසීම (දිබ්බසෝත)',
            ta: 'தெய்வீக செவி (திப்ப-சோதம்)',
            hi: 'दिव्यश्रवण (दिब्ब-सोत)',
        },
        initialStory: {
            en: 'Select a step to see the explanation or press play to begin the sequence.',
            si: 'විස්තරය බැලීමට පියවරක් තෝරන්න හෝ අනුපිළිවෙල ආරම්භ කිරීමට play බොත්තම ඔබන්න.',
            ta: 'விளக்கத்தைக் காண ஒரு படியைத் தேர்ந்தெடுக்கவும் அல்லது வரிசையைத் தொடங்க ப்ளே பொத்தானை அழுத்தவும்.',
            hi: 'स्पष्टीकरण देखने के लिए एक चरण चुनें या अनुक्रम शुरू करने के लिए प्ले बटन दबाएं।',
        },
        steps: [
            { pali: 'Base Jhāna', cittaId: 'jhana4', story: { en: 'First, one must attain a base Jhāna. The mind focuses solely on the concept of sound.', si: 'පළමුව, ධ්‍යානයේ සමවැදීම අවශ්‍යයි. ශබ්ද සංකල්පය කෙරෙහි පමණක් සිත යොමු කරයි.', ta: 'முதலில், ஒருவர் அடிப்படை ஜானத்தை அடைய வேண்டும். மனம் ஒலி என்ற கருத்தில் மட்டுமே கவனம் செலுத்துகிறது.', hi: 'पहले, आधार झान प्राप्त करना होगा। मन केवल ध्वनि की अवधारणा पर ध्यान केंद्रित करता है।' } },
            { pali: 'Bhavaṅga-calana', cittaId: 'bhavanga', story: { en: 'The life-continuum vibrates as the mind prepares to direct itself towards a distant sound.', si: 'දුරස්ථ ශබ්දයක් වෙත සිත යොමු කිරීමට සූදානම් වන විට භවාංගය කම්පනය වේ.', ta: 'தொலைதூர ஒலியை நோக்கி தன்னை செலுத்த மனம் தயாராகும் போது வாழ்க்கை-தொடர்ச்சி அதிர்வுகிறது.', hi: 'मन जब दूर की ध्वनि की ओर खुद को निर्देशित करने की तैयारी करता है तो भवंग कांपता है।' } },
            { pali: 'Bhavaṅga-upaccheda', cittaId: 'bhavanga', story: { en: 'The life-continuum is cut, allowing the mind-door process for hearing the sound to begin.', si: 'ශබ්දය ඇසීම සඳහා වූ මනෝද්වාර වීථිය ආරම්භ වීමට ඉඩ සලසමින් භවාංගය සිඳී යයි.', ta: 'வாழ்க்கை-தொடர்ச்சி துண்டிக்கப்பட்டு, ஒலியைக் கேட்பதற்கான மன-வாசல் செயல்முறையைத் தொடங்க அனுமதிக்கிறது.', hi: 'भवंग कट जाता है, जिससे ध्वनि सुनने के लिए मन-द्वार प्रक्रिया शुरू हो जाती है।' } },
            { pali: 'Parikamma', cittaId: 'kusala', story: { en: 'Preparation: The mind prepares to "listen" without the physical ear, extending its range.', si: 'පරිකර්ම: භෞතික කනකින් තොරව "සවන් දීමට" සිත සූදානම් වෙමින්, එහි පරාසය විහිදුවයි.', ta: 'தயாரிப்பு: மனம் భౌతిక చెవి లేకుండా "వినడానికి" సిద్ధమవుతుంది, దాని పరిధిని విస్తరిస్తుంది.', hi: 'परिकर्म: मन भौतिक कान के बिना "सुनने" की तैयारी करता है, अपनी सीमा का विस्तार करता है।' } },
            { pali: 'Upacāra', cittaId: 'kusala', story: { en: 'Access: The mind nears the distant auditory object.', si: 'උපචාර: සිත දුරස්ථ ශ්‍රවණ අරමුණට ළඟා වේ.', ta: 'அணுகல்: மனம் தொலைதூர செவிவழிப் பொருளை நெருங்குகிறது.', hi: 'उपचार: मन दूर के श्रवण वस्तु के पास पहुँचता है।' } },
            { pali: 'Anuloma', cittaId: 'kusala', story: { en: 'Adaptation: The mind adapts to the nature of the distant sound.', si: 'අනුලෝම: සිත දුරස්ථ ශබ්දයේ ස්වභාවයට හැඩගැසේ.', ta: 'தழுவல்: மனம் தொலைதூர ஒலியின் தன்மைக்கு தன்னை மாற்றிக்கொள்கிறது.', hi: 'अनुलोम: मन दूर की ध्वनि की प्रकृति के अनुकूल हो जाता है।' } },
            { pali: 'Gotrabhū', cittaId: 'kusala', story: { en: 'Change-of-lineage: The mind transcends normal hearing and grasps the supernormal sound.', si: 'ගෝත්‍රභූ: සිත සාමාන්‍ය ශ්‍රවණය ඉක්මවා ගොස් අසාමාන්‍ය ශබ්දය ග්‍රහණය කර ගනී.', ta: 'வம்சாவளி மாற்றம்: மனம் சாதாரண செவியுணர்வைக் கடந்து அசாதாரண ஒலியைப் గ్రహిస్తుంది.', hi: 'गोत्रभू: मन सामान्य श्रवण से परे जाकर अलौकिक ध्वनि को पकड़ता है।' } },
            { pali: 'Dibba-sota Citta', cittaId: 'kusala', story: { en: 'Clairaudient Javana: The consciousness that directly "hears" the distant sound arises, knowing its source and nature.', si: 'දිබ්බසෝත ජවන්: දුරස්ථ ශබ්දය කෙලින්ම "අසන" විඥානය පහළ වන අතර, එහි මූලාශ්‍රය සහ ස්වභාවය දැන ගනී.', ta: 'தெய்வீக செவி ஜவனம்: தொலைதூர ஒலியை நேரடியாக "கேட்கும்" உணர்வு எழுகிறது, அதன் மூலத்தையும் தன்மையையும் அறிந்து கொள்கிறது.', hi: 'दिव्यश्रवण चित्त: वह चेतना जो दूर की ध्वनि को सीधे "सुनती है" उत्पन्न होती है, उसके स्रोत और प्रकृति को जानते हुए।' } },
        ]
    }
];

export const REBIRTH_SCENARIOS: RebirthScenario[] = [
    {
        id: 'human_to_deva',
        title: {
            en: 'Human to Deva Realm (Heaven)',
            si: 'මනුෂ්‍ය භවයේ සිට දේව ලෝකයට',
            ta: 'மனித உலகத்திலிருந்து தேவ உலகம் வரை',
            hi: 'मानव लोक से देव लोक तक',
        },
        initialStory: {
            en: 'A person who has lived a virtuous life is on their deathbed. A pleasant karmic sign (Kamma Nimitta) appears, leading to a heavenly rebirth.',
            si: 'ගුණවත් ජීවිතයක් ගත කළ පුද්ගලයෙක් මරණාසන්නව සිටී. සුගතිගාමී කර්ම නිමිත්තක් පහළ වී, දේව ලෝකයක උත්පත්තියට මග පාදයි.',
            ta: 'ஒரு புண்ணிய జీవితம் வாழ்ந்த ஒருவர் மரணப் படுக்கையில் இருக்கிறார். ஒரு இனிமையான கர்ம அடையாளம் (கர்ம நிமித்தம்) தோன்றி, ஒரு சொர்க்க மறுபிறப்புக்கு வழிவகுக்கிறது.',
            hi: 'एक पुण्यमय जीवन जीने वाला व्यक्ति अपनी मृत्यु शय्या पर है। एक सुखद कर्म निमित्त प्रकट होता है, जो एक स्वर्गीय पुनर्जन्म की ओर ले जाता है।',
        },
        steps: [
            { pali: 'Bhavaṅga', cittaId: 'bhavanga', story: { en: 'The mind rests in the passive life-continuum stream.', si: 'සිත නිෂ්ක්‍රීය භවාංග ප්‍රවාහයේ විවේක ගනී.', ta: 'மனம் செயலற்ற வாழ்க்கை-தொடர்ச்சி ஓட்டத்தில் ஓய்வெடுக்கிறது.', hi: 'मन निष्क्रिय भवंग प्रवाह में विश्राम कर रहा है।' } },
            { pali: 'Mano-dvārāvajjana', cittaId: 'manodvaravajjana', story: { en: 'A pleasant karmic sign (the sound of temple bells) appears at the mind-door.', si: 'සුගතිගාමී කර්ම නිමිත්තක් (පන්සලේ සීනු හඬ) මනෝද්වාරයට අරමුණු වේ.', ta: 'ஒரு இனிமையான கர்ம அடையாளம் (கோவில் மணிகளின் ஒலி) மன-வாசலில் தோன்றுகிறது.', hi: 'एक सुखद कर्म निमित्त (मंदिर की घंटियों की ध्वनि) मन-द्वार पर प्रकट होता है।' } },
            { pali: 'Javana 1-5', cittaId: 'kusala', story: { en: 'Five moments of wholesome (kusala) impulsion arise, taking the pleasant sign as its object and sealing the kamma for a fortunate rebirth.', si: 'කුසල් ජවන් සිත් පහක් පහළ වී, එම සුගති නිමිත්ත අරමුණු කර ගනිමින්, සුගතිගාමී පුනර්භවයක් සඳහා කර්මය මුද්‍රා තබයි.', ta: 'நன்மை (குசல) மனக்கிளர்ச்சியின் ஐந்து கணங்கள் எழுகின்றன, அந்த இனிமையான அடையாளத்தைப் பொருளாகக் கொண்டு, ஒரு அதிர்ஷ்டமான மறுபிறப்புக்கான கர்மாவை முத்திரையிடுகின்றன.', hi: 'कुशल जवन के पांच क्षण उत्पन्न होते हैं, जो उस सुखद संकेत को अपनी वस्तु के रूप में लेते हैं और एक भाग्यशाली पुनर्जन्म के लिए कर्म को सील करते हैं।' } },
            { pali: 'Cuti-citta', cittaId: 'cuti', story: { en: 'The final consciousness of the human life ceases, ending this existence.', si: 'මනුෂ්‍ය ජීවිතයේ අවසාන විඥාණය වන චුති චිත්තය නිරුද්ධ වී, මෙම භවය අවසන් කරයි.', ta: 'மனித வாழ்க்கையின் இறுதி உணர்வு நின்றுவிடுகிறது, இந்த இருப்பை முடிவுக்குக் கொண்டுவருகிறது.', hi: 'मानव जीवन की अंतिम चेतना समाप्त हो जाती है, इस अस्तित्व का अंत कर देती है।' } },
            { pali: 'Paṭisandhi-citta', cittaId: 'patisandhi', story: { en: 'Instantly, the first consciousness of the new life arises in the Deva realm, linking the two lives.', si: 'ක්ෂණිකව, නව ජීවිතයේ පළමු විඥාණය වන පටිසන්ධි චිත්තය දේව ලෝකයේ පහළ වී, භව දෙක සම්බන්ධ කරයි.', ta: 'உடனடியாக, புதிய வாழ்க்கையின் முதல் உணர்வு தேவ உலகில் எழுகிறது, இரண்டு வாழ்க்கைகளையும் இணைக்கிறது.', hi: 'तुरंत, नए जीवन की पहली चेतना देव लोक में उत्पन्न होती है, जो दोनों जीवनों को जोड़ती है।' } },
        ]
    },
    {
        id: 'human_to_niraya',
        title: {
            en: 'Human to Niraya Realm (Hell)',
            si: 'මනුෂ්‍ය භවයේ සිට නිරයට',
            ta: 'மனித உலகத்திலிருந்து நரகம் வரை',
            hi: 'मानव लोक से नरक तक',
        },
        initialStory: {
            en: 'A person with heavy unwholesome kamma is dying. A terrifying sign of their past deeds appears, leading to a woeful rebirth.',
            si: 'බරපතල අකුසල කර්ම ඇති පුද්ගලයෙක් මිය යමින් සිටී. ඔහුගේ අතීත ක්‍රියාවන්ගේ බියකරු නිමිත්තක් පහළ වී, දුක්ඛිත පුනර්භවයකට මග පාදයි.',
            ta: 'கனமான தீய கர்மம் உள்ள ஒருவர் இறந்து கொண்டிருக்கிறார். அவரது கடந்தகால செயல்களின் ஒரு திகிலூட்டும் அடையாளம் தோன்றி, ஒரு துக்ககரமான மறுபிறப்புக்கு வழிவகுக்கிறது.',
            hi: 'भारी अकुशल कर्म वाला एक व्यक्ति मर रहा है। उसके पिछले कर्मों का एक भयानक संकेत प्रकट होता है, जो एक दुखद पुनर्जन्म की ओर ले जाता है।'
        },
        steps: [
            { pali: 'Bhavaṅga', cittaId: 'bhavanga', story: { en: 'The mind rests in a weak, flickering life-continuum stream.', si: 'සිත දුර්වල, චංචල භවාංග ප්‍රවාහයක විවේක ගනී.', ta: 'மனம் ஒரு பலவீனமான, மினுமினுக்கும் வாழ்க்கை-தொடர்ச்சி ஓட்டத்தில் ஓய்வெடுக்கிறது.', hi: 'मन एक कमजोर, टिमटिमाते हुए भवंग प्रवाह में विश्राम कर रहा है।' } },
            { pali: 'Mano-dvārāvajjana', cittaId: 'manodvaravajjana', story: { en: 'A frightful karmic sign (a memory of a harmful act) appears at the mind-door.', si: 'බියකරු කර්ම නිමිත්තක් (අහිතකර ක්‍රියාවක මතකයක්) මනෝද්වාරයට අරමුණු වේ.', ta: 'ஒரு பயங்கரமான கர்ம அடையாளம் (ஒரு தீங்கு விளைவிக்கும் செயலின் நினைவு) மன-வாசலில் தோன்றுகிறது.', hi: 'एक भयावह कर्म निमित्त (एक हानिकारक कार्य की स्मृति) मन-द्वार पर प्रकट होता है।' } },
            { pali: 'Javana 1-5', cittaId: 'dosaCitta', story: { en: 'Five moments of unwholesome (akusala) impulsion rooted in aversion arise, sealing the kamma for a rebirth in a state of suffering.', si: 'ද්වේෂය මුල් වූ අකුසල් ජවන් සිත් පහක් පහළ වී, දුක්ඛිත භවයක උත්පත්තිය සඳහා කර්මය මුද්‍රා තබයි.', ta: 'வெறுப்பில் வேரூன்றிய தீய (அகுசல) மனக்கிளர்ச்சியின் ஐந்து கணங்கள் எழுகின்றன, ஒரு துன்பகரமான நிலையில் மறுபிறப்புக்கான கர்மாவை முத்திரையிடுகின்றன.', hi: 'घृणा में निहित अकुशल जवन के पांच क्षण उत्पन्न होते हैं, जो दुख की स्थिति में पुनर्जन्GEO के लिए कर्म को सील करते हैं।' } },
            { pali: 'Cuti-citta', cittaId: 'cuti', story: { en: 'The final consciousness of this miserable life ceases.', si: 'මෙම දුක්ඛිත ජීවිතයේ අවසාන විඥාණය නිරුද්ධ වේ.', ta: 'இந்தத் துக்ககரமான வாழ்க்கையின் இறுதி உணர்வு நின்றுவிடுகிறது.', hi: 'इस दुखद जीवन की अंतिम चेतना समाप्त हो जाती है।' } },
            { pali: 'Paṭisandhi-citta', cittaId: 'patisandhi', story: { en: 'Instantly, the first consciousness of the new life arises in the Niraya realm, beginning a period of intense suffering.', si: 'ක්ෂණිකව, නව ජීවිතයේ පළමු විඥාණය නිරයේ පහළ වී, තීව්‍ර දුක්ඛ කාල පරිච්ඡේදයක් ආරම්භ කරයි.', ta: 'உடனடியாக, புதிய வாழ்க்கையின் முதல் உணர்வு நிரய உலகில் எழுகிறது, இது தீவிர துன்பத்தின் ஒரு காலத்தைத் தொடங்குகிறது.', hi: 'तुरंत, नए जीवन की पहली चेतना निरय लोक में उत्पन्न होती है, जो तीव्र पीड़ा की अवधि शुरू करती है।' } },
        ]
    }
];

export const ARPANA_DATA: ArpanaScenario[] = [
    {
        id: 'jhana_attainment',
        title: {
            en: '1. Dhyāna Attainment (Ādikammika)',
            si: 'ධ්‍යාන සමාපත්තිය (ආදිකම්මික)',
            ta: 'தியான அடைவு',
            hi: 'ध्यान प्राप्ति'
        },
        description: {
            en: 'The initial mind-process of attaining the first Jhāna for the first time.',
            si: 'පළමු වරට ප්‍රථම ධ්‍යානයට සමවැදීමේ චිත්ත වීථිය.',
            ta: 'முதல் முறையாக முதல் ஜானத்தை அடையும் மன செயல்முறை.',
            hi: 'पहली बार प्रथम झान को प्राप्त करने की चित्त वीथि।'
        },
        practitionerTypes: [
            {
                id: 'dandhabhinna',
                name: { en: 'Slow Insight Person', si: 'දන්ධාභිඤ්ඤ පුද්ගලයා', ta: 'மெதுவான உள்ளுணர்வு', hi: 'मंद प्रज्ञा व्यक्ति' },
                steps: [
                    { pali: 'Mano-dvārāvajjana', cittaId: 'manodvaravajjana', story: { en: 'Mind-door adverting towards the meditation sign (nimitta).', si: 'භාවනා නිමිත්ත වෙත මනෝද්වාරාවජ්ජනය යොමු වීම.', ta: '', hi: '' } },
                    { pali: 'Parikamma', cittaId: 'kusala', story: { en: 'Preparation: The mind prepares for absorption.', si: 'පරිකර්ම: සිත ධ්‍යානයට සමවැදීමට සූදානම් වේ.', ta: '', hi: '' } },
                    { pali: 'Upacāra', cittaId: 'kusala', story: { en: 'Access: The mind approaches the state of absorption.', si: 'උපචාර: සිත ධ්‍යාන තත්වයට ළඟා වේ.', ta: '', hi: '' } },
                    { pali: 'Anuloma', cittaId: 'kusala', story: { en: 'Adaptation: The mind adapts to the Jhāna state.', si: 'අනුලෝම: සිත ධ්‍යාන තත්වයට හැඩගැසේ.', ta: '', hi: '' } },
                    { pali: 'Gotrabhū', cittaId: 'kusala', story: { en: 'Change-of-lineage: Transcending the sensual sphere.', si: 'ගෝත්‍රභූ: කාමාවචර භූමිය ඉක්මවා යයි.', ta: '', hi: '' } },
                    { pali: 'Jhāna', cittaId: 'jhana1', story: { en: 'Absorption: The First Jhāna citta arises for one moment.', si: 'අර්පණා: ප්‍රථම ධ්‍යාන චිත්තය එක් මොහොතකට පහළ වේ.', ta: '', hi: '' } },
                    { pali: 'Bhavaṅga', cittaId: 'bhavanga', story: { en: 'The mind falls back into the life-continuum.', si: 'සිත නැවත භවාංගයට වැටේ.', ta: '', hi: '' } },
                ]
            },
            {
                id: 'khippabhinna',
                name: { en: 'Quick Insight Person', si: 'ඛිප්පාභිඤ්ඤ පුද්ගලයා', ta: 'வேகமான உள்ளுணர்வு', hi: 'क्षिप्र प्रज्ञा व्यक्ति' },
                steps: [
                    { pali: 'Mano-dvārāvajjana', cittaId: 'manodvaravajjana', story: { en: 'Mind-door adverting towards the nimitta.', si: 'නිමිත්ත වෙත මනෝද්වාරාවජ්ජනය යොමු වීම.', ta: '', hi: '' } },
                    { pali: 'Upacāra', cittaId: 'kusala', story: { en: 'Access: The mind approaches absorption.', si: 'උපචාර: සිත ධ්‍යානයට ළඟා වේ.', ta: '', hi: '' } },
                    { pali: 'Anuloma', cittaId: 'kusala', story: { en: 'Adaptation: The mind adapts to the Jhāna state.', si: 'අනුලෝම: සිත ධ්‍යාන තත්වයට හැඩගැසේ.', ta: '', hi: '' } },
                    { pali: 'Gotrabhū', cittaId: 'kusala', story: { en: 'Change-of-lineage: Transcending the sensual sphere.', si: 'ගෝත්‍රභූ: කාමාවචර භූමිය ඉක්මවා යයි.', ta: '', hi: '' } },
                    { pali: 'Jhāna', cittaId: 'jhana1', story: { en: 'Absorption: The First Jhāna citta arises.', si: 'අර්පණා: ප්‍රථම ධ්‍යාන චිත්තය පහළ වේ.', ta: '', hi: '' } },
                    { pali: 'Bhavaṅga', cittaId: 'bhavanga', story: { en: 'The mind falls back into the life-continuum.', si: 'සිත නැවත භවාංගයට වැටේ.', ta: '', hi: '' } },
                ]
            }
        ]
    },
    {
        id: 'magga_attainment',
        title: {
            en: '2. Path Attainment (Magga Vīthi)',
            si: 'මාර්ග සමාපත්තිය (මග්ග වීථි)',
            ta: 'பாதை அடைவு',
            hi: 'मार्ग प्राप्ति'
        },
        description: {
            en: 'The supramundane process of attaining Stream-Entry (Sotāpatti).',
            si: 'සෝතාපත්ති මාර්ගයට පැමිණීමේ ලෝකෝත්තර චිත්ත වීථිය.',
            ta: 'சோதாபத்தி அடையும் உலகியல் கடந்த செயல்முறை.',
            hi: 'स्रोत-आपत्ति (सोतापत्ति) प्राप्त करने की लोकोत्तर प्रक्रिया।'
        },
        practitionerTypes: [
            {
                id: 'dandhabhinna',
                name: { en: 'Slow Insight Person', si: 'දන්ධාභිඤ්ඤ පුද්ගලයා', ta: 'மெதுவான உள்ளுணர்வு', hi: 'मंद प्रज्ञा व्यक्ति' },
                steps: [
                    { pali: 'Mano-dvārāvajjana', cittaId: 'manodvaravajjana', story: { en: 'Mind-door adverting to an aspect of sankhāras (e.g., Anicca).', si: 'සංස්කාර ධර්මයක අනිත්‍ය ලක්ෂණය මෙනෙහි කිරීම.', ta: '', hi: '' } },
                    { pali: 'Parikamma', cittaId: 'kusala', story: { en: 'Preparation for the path.', si: 'මාර්ගය සඳහා සූදානම් වීම.', ta: '', hi: '' } },
                    { pali: 'Upacāra', cittaId: 'kusala', story: { en: 'Approaching the path.', si: 'මාර්ගයට ළඟා වීම.', ta: '', hi: '' } },
                    { pali: 'Anuloma', cittaId: 'kusala', story: { en: 'Adapting to the path.', si: 'මාර්ගයට හැඩගැසීම.', ta: '', hi: '' } },
                    { pali: 'Gotrabhū', cittaId: 'kusala', story: { en: 'Change-of-lineage: Transcending the mundane to grasp Nibbāna.', si: 'ගෝත්‍රභූ: ලෞකිකත්වය ඉක්මවා නිර්වාණය අරමුණු කිරීම.', ta: '', hi: '' } },
                    { pali: 'Magga', cittaId: 'sotapatti_magga', story: { en: 'Path: The Sotāpatti-magga citta arises, eradicating fetters.', si: 'මාර්ගය: සෝතාපත්ති මග්ග චිත්තය පහළ වී, සංයෝජන ධර්ම ප්‍රහාණය කරයි.', ta: '', hi: '' } },
                    { pali: 'Phala', cittaId: 'sotapatti_phala', story: { en: 'Fruition: The result of the path moment is experienced.', si: 'ඵලය: මාර්ග චිත්තයේ ඵලය අත්විඳියි.', ta: '', hi: '' } },
                    { pali: 'Phala', cittaId: 'sotapatti_phala', story: { en: 'Fruition repeats, confirming the attainment.', si: 'ඵලය නැවතත් පහළ වී, මාර්ගඵලය තහවුරු කරයි.', ta: '', hi: '' } },
                    { pali: 'Bhavaṅga', cittaId: 'bhavanga', story: { en: 'The mind falls back into the life-continuum.', si: 'සිත නැවත භවාංගයට වැටේ.', ta: '', hi: '' } },
                ]
            },
            {
                id: 'khippabhinna',
                name: { en: 'Quick Insight Person', si: 'ඛිප්පාභිඤ්ඤ පුද්ගලයා', ta: 'வேகமான உள்ளுணர்வு', hi: 'क्षिप्र प्रज्ञा व्यक्ति' },
                steps: [
                    { pali: 'Mano-dvārāvajjana', cittaId: 'manodvaravajjana', story: { en: 'Mind-door adverting to an aspect of sankhāras.', si: 'සංස්කාර ධර්මයක අනිත්‍ය ලක්ෂණය මෙනෙහි කිරීම.', ta: '', hi: '' } },
                    { pali: 'Upacāra', cittaId: 'kusala', story: { en: 'Approaching the path.', si: 'මාර්ගයට ළඟා වීම.', ta: '', hi: '' } },
                    { pali: 'Anuloma', cittaId: 'kusala', story: { en: 'Adapting to the path.', si: 'මාර්ගයට හැඩගැසීම.', ta: '', hi: '' } },
                    { pali: 'Gotrabhū', cittaId: 'kusala', story: { en: 'Change-of-lineage: Transcending the mundane.', si: 'ගෝත්‍රභූ: ලෞකිකත්වය ඉක්මවා යාම.', ta: '', hi: '' } },
                    { pali: 'Magga', cittaId: 'sotapatti_magga', story: { en: 'Path: The Sotāpatti-magga citta arises.', si: 'මාර්ගය: සෝතාපත්ති මග්ග චිත්තය පහළ වේ.', ta: '', hi: '' } },
                    { pali: 'Phala', cittaId: 'sotapatti_phala', story: { en: 'Fruition: The result is experienced.', si: 'ඵලය: මාර්ග ඵලය අත්විඳියි.', ta: '', hi: '' } },
                    { pali: 'Phala', cittaId: 'sotapatti_phala', story: { en: 'Fruition repeats.', si: 'ඵලය නැවතත් පහළ වේ.', ta: '', hi: '' } },
                    { pali: 'Phala', cittaId: 'sotapatti_phala', story: { en: 'Fruition repeats again.', si: 'ඵලය නැවතත් පහළ වේ.', ta: '', hi: '' } },
                    { pali: 'Bhavaṅga', cittaId: 'bhavanga', story: { en: 'The mind falls back into the life-continuum.', si: 'සිත නැවත භවාංගයට වැටේ.', ta: '', hi: '' } },
                ]
            }
        ]
    }
];
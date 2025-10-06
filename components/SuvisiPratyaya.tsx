import React, { useState, useEffect, useCallback } from 'react';
import { StoryDisplay } from './StoryDisplay';
import { ExplanationModal } from './ExplanationModal';
import { EXPLANATIONS } from '../explanations';
import type { Language } from '../types';

// DATA CONSTANTS
const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

const PRATYAYAS_DATA = [
    { id: 'hetu', title: { si: 'හේතු ප්‍රත්‍යය', en: 'Root Condition', ta: 'ஹேது பிரத்யம்', hi: 'हेतु प्रत्यय' } },
    { id: 'arammana', title: { si: 'ආරම්මණ ප්‍රත්‍යය', en: 'Object Condition', ta: 'ஆரம்பன பிரத்யம்', hi: 'आरम्मण प्रत्यय' } },
    { id: 'adhipati', title: { si: 'අධිපති ප්‍රත්‍යය', en: 'Dominance Condition', ta: 'அதிபதி பிரத்யம்', hi: 'अधिपति प्रत्यय' } },
    { id: 'anantara', title: { si: 'අනන්තර ප්‍රත්‍යය', en: 'Proximity Condition', ta: 'அனந்தர பிரத்யம்', hi: 'अनन्तर प्रत्यय' } },
    { id: 'samanantara', title: { si: 'සමනන්තර ප්‍රත්‍යය', en: 'Contiguity Condition', ta: 'சமனந்தர பிரத்யம்', hi: 'समनन्तर प्रत्यय' } },
    { id: 'sahajata', title: { si: 'සහජාත ප්‍රත්‍යය', en: 'Co-nascence Condition', ta: 'சஹஜாத பிரத்யம்', hi: 'सहजात प्रत्यय' } },
    { id: 'annamanna', title: { si: 'අඤ්ඤමඤ්ඤ ප්‍රත්‍යය', en: 'Mutuality Condition', ta: 'அஞ்ஞமஞ்ஞ பிரத்யம்', hi: 'अञ्ञमञ्ञ प्रत्यय' } },
    { id: 'nissaya', title: { si: 'නිස්සය ප්‍රත්‍යය', en: 'Dependence Condition', ta: 'நிஸ்ஸய பிரத்யம்', hi: 'निस्सय प्रत्यय' } },
    { id: 'upanissaya', title: { si: 'උපනිස්සය ප්‍රත්‍යය', en: 'Decisive Support Condition', ta: 'உபனிஸ்ஸய பிரத்யம்', hi: 'उपनिस्रय प्रत्यय' } },
    { id: 'purejata', title: { si: 'පුරේජාත ප්‍රත්‍යය', en: 'Pre-nascence Condition', ta: 'புரேஜாத பிரத்யம்', hi: 'पुरेजात प्रत्यय' } },
    { id: 'pacchajata', title: { si: 'පච්ඡාජාත ප්‍රත්‍යය', en: 'Post-nascence Condition', ta: 'பச்சாஜாத பிரத்யம்', hi: 'पच्छाजात प्रत्यय' } },
    { id: 'asevana', title: { si: 'ආසේවන ප්‍රත්‍යය', en: 'Repetition Condition', ta: 'ஆசேவன பிரத்யம்', hi: 'आसेवन प्रत्यय' } },
    { id: 'kamma', title: { si: 'කම්ම ප්‍රත්‍යය', en: 'Kamma Condition', ta: 'கம்ம பிரத்யம்', hi: 'कम्म प्रत्यय' } },
    { id: 'vipaka', title: { si: 'විපාක ප්‍රත්‍යය', en: 'Kamma-result Condition', ta: 'விபாக பிரத்யம்', hi: 'विपाक प्रत्यय' } },
    { id: 'ahara', title: { si: 'ආහාර ප්‍රත්‍යය', en: 'Nutriment Condition', ta: 'ஆஹார பிரத்யம்', hi: 'आहार प्रत्यय' } },
    { id: 'indriya', title: { si: 'ඉන්ද්‍රිය ප්‍රත්‍යය', en: 'Faculty Condition', ta: 'இந்திரிய பிரத்யம்', hi: 'इन्द्रिय प्रत्यय' } },
    { id: 'jhana', title: { si: 'ඣාන ප්‍රත්‍යය', en: 'Jhāna Condition', ta: 'ஞான பிரத்யம்', hi: 'झान प्रत्यय' } },
    { id: 'magga', title: { si: 'මග්ග ප්‍රත්‍යය', en: 'Path Condition', ta: 'மக்க பிரத்யம்', hi: 'मग्ग प्रत्यय' } },
    { id: 'sampayutta', title: { si: 'සම්පයුත්ත ප්‍රත්‍යය', en: 'Association Condition', ta: 'சம்பயுத்த பிரத்யம்', hi: 'सम्पयुत्त प्रत्यय' } },
    { id: 'vippayutta', title: { si: 'විප්පයුත්ත ප්‍රත්‍යය', en: 'Dissociation Condition', ta: 'விப்பயுத்த பிரத்யம்', hi: 'विप्पयुत्त प्रत्यय' } },
    { id: 'atthi', title: { si: 'අත්ථි ප්‍රත්‍යය', en: 'Presence Condition', ta: 'அத்தி பிரத்யம்', hi: 'अत्थि प्रत्यय' } },
    { id: 'natthi', title: { si: 'නත්ථි ප්‍රත්‍යය', en: 'Absence Condition', ta: 'நத்தி பிரத்யம்', hi: 'नत्थि प्रत्यय' } },
    { id: 'vigata', title: { si: 'විගත ප්‍රත්‍යය', en: 'Disappearance Condition', ta: 'விகத பிரத்யம்', hi: 'विगत प्रत्यय' } },
    { id: 'avigata', title: { si: 'අවිගත ප්‍රත්‍යය', en: 'Non-disappearance Condition', ta: 'அவிகத பிரத்யம்', hi: 'अविगत प्रत्यय' } },
];

const EXAMPLES_DATA = {
    walking: {
        id: 'walking',
        title: { si: 'ඇවිදීම', en: 'Walking', ta: 'நடத்தல்', hi: 'चलना' },
        steps: PRATYAYAS_DATA.map(p => ({ pratyayaId: p.id, story: {} as Record<Language, string> }))
    },
    blinking: {
        id: 'blinking',
        title: { si: 'ඇස් පිල්ලම් ගැසීම', en: 'Blinking', ta: 'கண் சிமிட்டுதல்', hi: 'पलک झपकना' },
        steps: PRATYAYAS_DATA.map(p => ({ pratyayaId: p.id, story: {} as Record<Language, string> }))
    }
};

// Populate stories from user-provided text
const walkingStories = [
    { si: 'ඇවිදීමේ චේතනාව (ලෝභ හෝ අලෝභ) මූල ලෙස බලපායි. උදා: ගමනාන්තයට යෑමේ ආශාව.', en: 'The intention to walk (rooted in greed or non-greed) acts as a root. E.g., the desire to reach a destination.' },
    { si: 'ගමනාන්තය දැකීම (දෘශ්‍ය ආරම්මණය) ඇවිදීම ආකර්ෂණය කරයි.', en: 'Seeing the destination (a visual object) conditions the act of walking.' },
    { si: 'ඇවිදීමේ ඡන්දය (බලවත් තීරණය) ප්‍රධාන වේ. උදා: ඉක්මන් ගමනකදී වීරියය ප්‍රධාන වේ.', en: 'The will to walk (a strong decision) is dominant. E.g., in a brisk walk, energy is dominant.' },
    { si: 'පෙර සිත (ඇවිදීමේ තීරණය) ඊළඟ සිතට (පියවර තැබීම) අනුපිළිවෙල සපයයි.', en: 'The preceding thought (decision to walk) provides the sequence for the next thought (taking a step).' },
    { si: 'පෙර සිතේ අනුකූලතාව ඇවිදීමේ අඛණ්ඩතාවට බලපායි.', en: 'The contiguity of the previous thought conditions the continuity of walking.' },
    { si: 'ඇවිදීමේදී සිත සහ ශරීර චලනය එකවර උපදියි. උදා: චිත්තය සහ පාද චලනය.', en: 'During walking, the mind and bodily movement arise simultaneously. E.g., consciousness and the leg movement.' },
    { si: 'සිත සහ ශරීරය එකිනෙකට ආධාරක වේ (සමබරතාව පවත්වා ගැනීම).', en: 'Mind and body support each other (maintaining balance).' },
    { si: 'ඇවිදීම පොළොව මත (පඨවී ධාතු) රඳා පවතී.', en: 'Walking depends on the ground (the earth element).' },
    { si: 'පසුගිය පුරුදු (ඇවිදීමේ පුරුද්ද) බලවත් ආධාරකයක් වේ.', en: 'Past habits (the habit of walking) provide a strong support.' },
    { si: 'හෘද වතු (හදවත) වැනි පෙර රූප ඇවිදීමට ආධාරක වේ.', en: 'Pre-nascent matter like the heart-base supports the act of walking.' },
    { si: 'ඇවිදීමෙන් පසු සිත පෙර රූපයන්ට (ශරීරයට) ආධාරක වේ.', en: 'The mind arising after walking supports the pre-existing body.' },
    { si: 'නැවත නැවත ඇවිදීමෙන් පුරුදු වීම බලපායි.', en: 'The habit is strengthened by the repetition of walking.' },
    { si: 'පසුගිය කර්මයන් ඇවිදීමේ හැකියාවට බලපායි (සෞඛ්‍යයමත් ශරීරය).', en: 'Past kamma conditions the ability to walk (a healthy body).' },
    { si: 'කුසල් විපාකයන් ඇවිදීමේ සුඛය ලබා දෙයි.', en: 'Wholesome kamma-results provide the pleasure of walking.' },
    { si: 'ආහාරයෙන් ලැබෙන බලය ඇවිදීමට ආධාරක වේ.', en: 'The energy from food provides nutriment for walking.' },
    { si: 'ජීවිතින්ද්‍රිය ඇවිදීමේදී ශරීරය පවත්වා ගනී.', en: 'The life faculty sustains the body during walking.' },
    { si: 'ඇවිදීමේදී සමාධිය (ඣානාංග) බලපායි (භාවනාමය ඇවිදීමේදී).', en: 'Concentration (jhāna factors) conditions walking (especially in walking meditation).' },
    { si: 'සම්මා වීරිය ආදිය ඇවිදීමේදී මග ඵලයට ආධාරක වේ.', en: 'Right Effort and other path factors support walking towards the goal.' },
    { si: 'චිත්තය සමඟ චේතසික ඇවිදීමේදී එකට බලපායි.', en: 'The mind and its mental factors are associated while walking.' },
    { si: 'සිත රූපයන්ගෙන් වෙන්ව ඇවිදීමට බලපායි.', en: 'The mind (nama) is dissociated from matter (rupa) but conditions it to walk.' },
    { si: 'ඇවිදීමේදී පැවැත්ම (ශරීරයේ පැවැත්ම) බලපායි.', en: 'The presence of the body and mind conditions the act of walking.' },
    { si: 'පෙර පියවර නැතිවීමෙන් ඊළඟ පියවර ඇති වේ.', en: 'The absence of the previous step conditions the arising of the next step.' },
    { si: 'පෙර සිත විනාශයෙන් ඇවිදීමේ ඊළඟ අදියර ඇති වේ.', en: 'The disappearance of the previous thought conditions the next phase of walking.' },
    { si: 'ඇවිදීමේ අඛණ්ඩ පැවැත්ම බලපායි.', en: 'The non-disappearance of the physical and mental process allows walking to continue.' },
];
const blinkingStories = [
    { si: 'පිල්ලම් ගැසීමේ චේතනාව (අදෝස හෝ මෝහ) මූල වේ. උදා: ඇස් ආරක්ෂාවට අදෝසය බලපායි.', en: 'The intention to blink (non-aversion or delusion) is the root. E.g., non-aversion for eye protection.' },
    { si: 'දූවිලි හෝ ආලෝකය (දෘශ්‍ය ආරම්මණය) පිල්ලම් ගැසීම ආකර්ෂණය කරයි.', en: 'Dust or light (a visual object) conditions the act of blinking.' },
    { si: 'ඇස් අපහසුතාවය (වීරිය) ප්‍රධාන වේ.', en: 'Discomfort in the eye (energy) becomes dominant.' },
    { si: 'පෙර සිත (අපහසුතාව දැනීම) ඊළඟ සිතට (පිල්ලම් ගැසීම) අනුපිළිවෙල සපයයි.', en: 'The preceding thought (feeling discomfort) provides the sequence for the next thought (blinking).' },
    { si: 'පෙර සිතේ අනුකූලතාව පිල්ලම් ගැසීමේ අඛණ්ඩතාවට බලපායි.', en: 'The contiguity of the previous thought conditions the continuity of blinking.' },
    { si: 'පිල්ලම් ගැසීමේදී සිත සහ ඇස් චලනය එකවර උපදියි.', en: 'During blinking, the mind and the eye movement arise simultaneously.' },
    { si: 'සිත සහ ඇස් එකිනෙකට ආධාරක වේ (පිල්ලම් ගැසීමේ සමබරතාව).', en: 'Mind and eye mutually support each other.' },
    { si: 'ඇස් (චක්ෂු ප්‍රසාද) මත රඳා පවතී.', en: 'Blinking depends on the eye-sensitivity.' },
    { si: 'පසුගිය පුරුදු (වියළි වාතයට පුරුදු වීම) බලවත් ආධාරකයක් වේ.', en: 'Past habits (like being in dry air) act as a strong support.' },
    { si: 'ඇස් රූපයන් (චක්ෂු) පිල්ලම් ගැසීමට ආධාරක වේ.', en: 'The pre-nascent physical eye supports the act of blinking.' },
    { si: 'පිල්ලම් ගැසීමෙන් පසු සිත පෙර රූපයන්ට ආධාරක වේ.', en: 'The mind arising after the blink supports the pre-existing eye.' },
    { si: 'නැවත නැවත පිල්ලම් ගැසීමෙන් පුරුදු වීම බලපායි.', en: 'The habit is strengthened by the repetition of blinking.' },
    { si: 'පසුගිය කර්මයන් ඇස් සෞඛ්‍යයට බලපායි.', en: 'Past kamma conditions the health of the eyes.' },
    { si: 'කුසල් විපාකයන් පිල්ලම් ගැසීමේ සුඛය ලබා දෙයි.', en: 'Wholesome kamma-results provide the ease of blinking.' },
    { si: 'ආහාරයෙන් ලැබෙන බලය ඇස් ක්‍රියාකාරිත්වයට ආධාරක වේ.', en: 'Energy from food provides nutriment for the eye\'s function.' },
    { si: 'චක්ෂුරින්ද්‍රිය පිල්ලම් ගැසීමේදී බලපායි.', en: 'The eye faculty conditions the blinking process.' },
    { si: 'පිල්ලම් ගැසීමේදී සමාධිය බලපායි (භාවනාවේදී).', en: 'Concentration can condition blinking (e.g., inhibiting it during meditation).' },
    { si: 'සම්මා සති ආදිය පිල්ලම් ගැසීමේදී ආධාරක වේ.', en: 'Right Mindfulness and other path factors can influence blinking.' },
    { si: 'චිත්තය සමඟ චේතසික පිල්ලම් ගැසීමේදී එකට බලපායි.', en: 'The mind and its mental factors are associated during blinking.' },
    { si: 'සිත ඇස් රූපයන්ගෙන් වෙන්ව බලපායි.', en: 'The mind is dissociated from the physical eye but conditions its movement.' },
    { si: 'පිල්ලම් ගැසීමේදී ඇස් පැවැත්ම බලපායි.', en: 'The presence of the eye conditions the act of blinking.' },
    { si: 'පෙර පිල්ලම් නැතිවීමෙන් ඊළඟ එක ඇති වේ.', en: 'The absence of the previous blink conditions the next one.' },
    { si: 'පෙර සිත විනාශයෙන් පිල්ලම් ගැසීම ඇති වේ.', en: 'The disappearance of the previous thought conditions the blink.' },
    { si: 'පිල්ලම් ගැසීමේ අඛණ්ඩ පැවැත්ම බලපායි.', en: 'The non-disappearance of the physical process allows blinking to continue.' },
];

walkingStories.forEach((story, index) => { EXAMPLES_DATA.walking.steps[index].story = { ...story, ta: '...', hi: '...' } });
blinkingStories.forEach((story, index) => { EXAMPLES_DATA.blinking.steps[index].story = { ...story, ta: '...', hi: '...' } });

const WHAT_IS_SUVISI_PRATYAYA = {
    title: { si: 'සුවිසි ප්‍රත්‍යය යනු කුමක්ද?', en: 'What are the 24 Conditions?', ta: '24 நிபந்தனைகள் என்றால் என்ன?', hi: '24 प्रत्यय क्या हैं?' },
    introduction: {
        si: 'බුදුදහමේ අභිධර්මයට අනුව, සුවිසි ප්‍රත්‍යය (පට්ඨාන ප්‍රකරණයේ විස්තර කර ඇති 24 පච්චය) යනු ධර්මයන්ගේ උත්පත්තිය, පැවැත්ම සහ නිරෝධය සඳහා බලපාන තත්ත්වයන් හෝ උපකාරක කාරණායි. මෙම ප්‍රත්‍යයන් ධර්මයන් අතර ඇති සම්බන්ධතා (හේතු-ඵල සම්බන්ධයන්) විස්තර කරයි. ඒවා චිත්ත, චේතසික, රූප සහ නිර්වාණය වැනි ධර්මයන්ට බලපාන අයුරින් වර්ගීකරණය කර ඇත. පට්ඨානයේදී මෙම 24 ප්‍රත්‍යයන් විස්තර කර ඇති අතර, ඒවා කාලය, ජනක/අජනක, සර්වස්ථානික/අසර්වස්ථානික, භව භේද ආදිය අනුව විභාග කර ඇත.',
        en: 'According to the Abhidhamma of Buddhism, the 24 Conditions (described in the Paṭṭhāna) are the states or supporting factors that influence the arising, existence, and cessation of phenomena (dhammas). These conditions describe the relationships (cause-effect relationships) between phenomena. They are categorized by how they affect phenomena such as citta (consciousness), cetasika (mental factors), rūpa (matter), and nibbāna. These 24 conditions are detailed in the Paṭṭhāna and are analyzed according to time, generation, universality, existence, etc.',
        ta: '...',
        hi: '...'
    },
    conditions: PRATYAYAS_DATA.map((p, i) => ({
        title: p.title,
        description: {
            si: [
                'මූල භාවයෙන් උපකාර වන ධර්ම (ලෝභ, දෝස, මෝහ, අලෝභ, අදෝස, අමෝහ). උදා: ගසකට මුල ආධාරක වන මෙන්, චිත්තයන්ට ස්ථාවරත්වය ලබා දෙයි.',
                'අරමුණ භාවයෙන් උපකාරක (සියලු රූප, නාම, නිර්වාණ, ප්‍රඥප්ති). උදා: ආහාරය පිසීමේදී ගින්න අරමුණක් ලෙස බලපායි.',
                'ප්‍රධාන භාවයෙන් උපකාරක (ඡන්ද, වීරිය, චිත්ත, වීමංස). උදා: තීරණ ගැනීමේදී ඡන්දය ප්‍රධාන වේ.',
                'පූර්ව සිත නිරුද්ධ වීමෙන් ඊළඟ සිතට උපකාර (එක සිතක් අනෙකට සම්බන්ධයි). උදා: එක් සිතකින් ඊළඟ සිතකට පරිවර්තනය.',
                'අනන්තර හා සමාන (පූර්ව සිතේ අනුකූලතාව). උදා: සිතුවිලි අනුපිළිවෙලින් ගලා යාම.',
                'එකවර උපදින භාවයෙන් උපකාරක (චිත්ත-චේතසික එකට). උදා: මහා භූත සතර එකට රූපයන්ට බලපායි.',
                'අන්‍යෝන්‍ය භාවයෙන් උපකාරක (එකිනෙකට ආධාරක වීම). උදා: භූත සතර එකිනෙකට ආධාරක වේ.',
                'රඳා පැවැත්මෙන් උපකාරක (වස්තුවක් මත රඳවීම). උදා: ගසක් පොළොව මත රඳා පවතී.',
                'බලවත් ආධාරක භාවයෙන් උපකාරක (ආරම්මණ, අනන්තර, පකති). උදා: පසුගිය කුසල් ඊළඟ කුසල් සඳහා බලවත් ආධාරක වේ.',
                'පෙර උපදින භාවයෙන් උපකාරක (වස්තු, ආරම්මණ). උදා: ඇස් චක්ෂුර්විඥාණයට ආධාරක වේ.',
                'පසු උපදින භාවයෙන් උපකාරක (සිත රූපයට ආධාරක). උදා: පසු සිත පෙර රූපයන්ට ආධාරක වේ.',
                'පුනරුච්චාරණ භාවයෙන් උපකාරක (ජවන සිත් පුරුදු කිරීම). උදා: නැවත නැවත සිතීමෙන් පුරුදු වීම.',
                'කර්ම භාවයෙන් උපකාරක (සහජාත, නානක්ඛණික). උදා: පසුගිය කර්ම විපාක ලබා දෙයි.',
                'විපාක භාවයෙන් උපකාරක (විපාක සිත්). උදා: කුසල් විපාකයන්ගෙන් සුඛය ලැබීම.',
                'පෝෂණ භාවයෙන් උපකාරක (කබලීකාර ආහාර, රූප ඕජා). උදා: ආහාරය ශරීරයට බලය ලබා දෙයි.',
                'ඉන්ද්‍රිය භාවයෙන් උපකාරක (ජීවිතින්ද්‍රිය). උදා: ජීවිතින්ද්‍රිය රූපයන්ට ආධාරක වේ.',
                'ඣාන භාවයෙන් උපකාරක (ඣානාංග). උදා: ඣානයන්හිදී සමාධිය බලපායි.',
                'මාර්ග භාවයෙන් උපකාරක (අෂ්ටාංගික මාර්ගය). උදා: සම්මා දිට්ඨි ආදිය මග ඵල ලබා දෙයි.',
                'සම්බන්ධ භාවයෙන් උපකාරක (චිත්ත-චේතසික සම්බන්ධය). උදා: චිත්තය සමඟ චේතසික එකට බලපායි.',
                'වෙන්වීමෙන් උපකාරක (නාම-රූප වෙන්වීම). උදා: සිත රූපයන්ට වෙන්ව බලපායි.',
                'පැවැත්මෙන් උපකාරක (සහජාත, පුරේජාත). උදා: පැවැත්ම නිසා ධර්මයන් බලවත් වේ.',
                'නොපැවැත්මෙන් උපකාරක (පූර්ව සිත නොපැවැත්ම). උදා: එක් සිත නැතිවීමෙන් ඊළඟ සිත උපදියි.',
                'විනාශයෙන් උපකාරක (සිත විනාශය). උදා: පෙර සිත විනාශයෙන් ඊළඟ සිත උපදියි.',
                'නොවිනාශයෙන් උපකාරක (පැවැත්ම මෙන්). උදා: ධර්මයන්ගේ අඛණ්ඩ පැවැත්ම.'
            ][i],
            en: [
                'Conditions that assist by being a root (greed, hate, delusion, non-greed, non-hate, non-delusion). E.g., as a root supports a tree, it gives stability to consciousness.',
                'Support by being an object (all forms, names, Nibbāna, concepts). E.g., fire acts as an object when cooking.',
                'Support by being dominant (intention, effort, consciousness, investigation). E.g., intention is dominant in decision making.',
                'The cessation of the preceding consciousness supports the next (one mind is connected to another). E.g., transitioning from one thought to the next.',
                'Similar to proximity (consistency of the preceding thought). E.g., thoughts flowing in sequence.',
                'Support by arising together (mind-mental factors together). E.g., the four great elements affecting matter together.',
                'Support by being mutual (supporting each other). E.g., the four great elements support each other.',
                'Support by depending (relying on an object). E.g., a tree depends on the earth.',
                'Support by being a strong aid (object, proximity, natural). E.g., past merits are a strong support for future merits.',
                'Support by arising before (base, object). E.g., the eye supports eye-consciousness.',
                'Support by arising after (mind supports matter). E.g., a later mind supports earlier matter.',
                'Support by repetition (practicing javana thoughts). E.g., becoming habituated by thinking again and again.',
                'Support by action (co-nascent, different-moment). E.g., past actions give results.',
                'Support by being a result (resultant thoughts). E.g., receiving happiness from wholesome results.',
                'Support by nourishing (physical food, material nutriment). E.g., food gives energy to the body.',
                'Support by being a faculty (life faculty). E.g., the life faculty supports matter.',
                'Support by being a jhana factor (jhana factors). E.g., concentration is effective in jhānas.',
                'Support by being the path (Noble Eightfold Path). E.g., Right View etc., lead to path and fruition.',
                'Support by being associated (mind-mental factor connection). E.g., mind and mental factors influence together.',
                'Support by being dissociated (mind-matter separation). E.g., the mind influences matter separately.',
                'Support by being present (co-nascent, pre-nascent). E.g., phenomena are strong because of presence.',
                'Support by being absent (absence of the preceding thought). E.g., the next thought arises from the absence of the previous one.',
                'Support by disappearance (disappearance of consciousness). E.g., the next thought arises from the disappearance of the previous one.',
                'Support by not disappearing (like presence). E.g., the continuous existence of phenomena.'
            ][i],
            ta: '...',
            hi: '...'
        }
    }))
};

const DETAILED_EXPLANATIONS = {
    specialAnalysis: {
        title: { si: 'ප්‍ර‍ත්‍යයන්ගේ විශේෂ විභාග', en: 'Special Analysis of Conditions', ta: 'நிபந்தனைகளின் சிறப்புப் பகுப்பாய்வு', hi: 'प्रत्ययों का विशेष विश्लेषण' },
        content: { si: `<p class="mb-4">සුවිසි ප්‍ර‍ත්‍යයන් අතුරෙන් හේතු ප්‍ර‍ත්‍යය ය, සහජාත ප්‍ර‍ත්‍යය ය. අන්‍යෝන්‍ය ප්‍ර‍ත්‍යය ය, නිඃශ්‍ර‍ය ප්‍ර‍ත්‍යය ය, පුරේජාත ප්‍ර‍ත්‍යය ය, පශ්චාජාත ප්‍ර‍ත්‍යය ය, විපාක ප්‍ර‍ත්‍යය ය, ආහාර ප්‍ර‍ත්‍යය ය, ඉන්ද්‍රිය ප්‍ර‍ත්‍යය ය, ධ්‍යාන ප්‍ර‍ත්‍යය ය, මාර්ග ප්‍ර‍ත්‍යය ය, සම්ප්‍ර‍යුක්ත ප්‍ර‍ත්‍යය ය, විප්‍ර‍යුක්ත ප්‍ර‍ත්‍යය ය, අස්ති ප්‍ර‍ත්‍යය ය, අවිගත ප්‍ර‍ත්‍යය ය යන මේ ප්‍ර‍ත්‍යය පසළොස ප්‍ර‍ත්‍යුත්පන්න කාලිකයෝ ය. අනන්තරය, සමනන්තරය, ආසේවනය, නාස්තිය, විගතය යන ප්‍ර‍ත්‍යයෝ යන පස්දෙන අතීත කාලිකයෝ ය. එකක් වු කර්ම ප්‍ර‍ත්‍යය වර්තමානාතීත කාල ද්වයෙහි ම වේ. ආරම්මණය, අධිපතිය, උපනිඃශ්‍ර‍ය යන ප්‍ර‍ත්‍යයේ තිදෙන ත්‍රෛකාලිකයෝ ද කාල මුක්තයෝ ද වෙති. කාලමුක්ත වනුයේ නිර්වාණ ප්‍ර‍ඥප්ති දෙක ද ඒ ප්‍ර‍ත්‍යයන්ට අයත් බැවිනි.</p><p class="mb-4">අනන්තර ප්‍ර‍ත්‍යය ය, සමනන්තර ප්‍ර‍ත්‍යය ය, අනන්තරූපනිඃශ්‍ර‍ය ප්‍ර‍ත්‍යය ය, ප්‍ර‍කෘතෝපනිඃශ්‍ර‍ය ප්‍ර‍ත්‍යය ය, ආසේවන ප්‍ර‍ත්‍යය ය නානාක්ෂණික කර්ම ප්‍ර‍ත්‍යය ය, නාස්ති ප්‍ර‍ත්‍යය ය, විගත ප්‍ර‍ත්‍යය ය යන මොහු ජනක ප්‍ර‍ත්‍යයෝ ය. පශ්චාජ්ජාත ප්‍ර‍ත්‍යය උපස්ථම්භක ප්‍ර‍ත්‍යයෙකි. එහි ජනකත්වයක් නැත. අන්‍ය ප්‍ර‍ත්‍යයෝ ජනකයෝ ද, උපස්ථම්භකයෝ ද වෙති.</p><p class="mb-4">සහජාතය, නිඃශ්‍ර‍ය, අස්තිය, අවිගතය යන ප්‍ර‍ත්‍යයෝ සතර දෙන සර්වස්ථානික ප්‍ර‍ත්‍යයෝ ය. ඒ ප්‍ර‍ත්‍යයන් සතර දෙනා ප්‍ර‍ත්‍යය නො වන සංස්කාර ධර්මයක් නැත. ආරම්මණ ආරම්මණාධිපති අනන්තර සමනන්තර අනන්තරූපනිඃශ්‍ර‍ය ප්‍ර‍කෘතෝපනිඃශ්‍ර‍ය ආසේවන සම්ප්‍ර‍යුක්ත නාස්ති විගත යන ප්‍ර‍ත්‍යයෝ අසර්වස්ථානික ප්‍ර‍ත්‍යයෝ ය. ඔවුහු අරූප ධර්මයන්ට පමණක් ප්‍ර‍ත්‍යය වන්නෝ ය. ඒවා උපදනා රූප ධර්මයෝ නැතහ. පුරේජාත පශ්චාජ්ජාත ප්‍ර‍ත්‍යයෝ දෙදෙන ද අසර්වස්ථානිකයෝ ය. පුරේජාතය ලැබෙන්නේ නාම ධර්මයන්ට පමණකි. පශ්චාජ්ජාත ප්‍ර‍ත්‍යය ලැබෙන්නේ රූප ධර්මයන්ට පමණෙකි. ඉතිරි ප්‍ර‍ත්‍යයෝ ඇතැම් රූපාරූප ධර්මයන්ට පමණක් ප්‍ර‍ත්‍යය වන බැවින් අසර්වස්ථානිකයෝ ය.</p>`, en: '...', ta: '...', hi: '...' }
    },
    multipleConditions: {
        title: { si: 'අනේක ප්‍ර‍ත්‍යයෙන් ධර්ම හටගන්නා පරිදි', en: 'How Dhamma Arises from Multiple Conditions', ta: 'பல நிபந்தனைகளிலிருந்து தம்மம் எவ்வாறு எழுகிறது', hi: 'अनेक प्रत्ययों से धम्म कैसे उत्पन्न होता है' },
        content: { si: `<p class="mb-4">එක් ධර්මයක් හට ගන්නේ ප්‍ර‍ත්‍යය ධර්ම බොහෝ ගණනක උපකාරයෙනි. එය තේරුම් ගත හැකි වනු පිණිස පළමු වන කාමාවචර කුසල් සිතට ප්‍ර‍ත්‍යය වන ධර්ම දක්වනු ලැබේ. පළමු වන කාමාවචර කුසල් සිත සෝමනස්ස සහගත ඤාණසම්පයුත්ත අසංඛාරික සිත ය. එය සාමාන්‍යයෙන් උපදින්නේ චෛතසික තෙතිසක් ද සමග ය.</p><ol class="list-decimal list-inside space-y-2"><li>ධර්ම සූතිසක් ඇති ඒ ධර්ම පිණ්ඩයකට අයත් වූ අලෝභ අදෝෂ අමෝහ යන හේතු ධර්මයෝ සිතට හා ඒ චෛතසික සමූහයට හේතු ප්‍ර‍ත්‍යයෙන් උපකාර වේ.</li><li>රූපාදි අරමුණු අතුරෙන් යම් කිසි අරමුණක් එයට ආරම්මණ භාවයෙන් ප්‍ර‍ත්‍යය වේ.</li><li>ඡන්දාදි අධිපති ධර්ම සතර අතුරෙන් යම් කිසි එකක් එහි ඉතිරි ධර්ම තෙ තිසට අධිපති ශක්තියෙන් ප්‍ර‍ත්‍යය වේ.</li><li>(4-5) චිත්ත පරම්පරාවෙහි එයට කලින් ඉපද නිරුද්ධ වූ සිත අනන්තර වශයෙන් හා සමනන්තර වශයෙන් එයට ප්‍ර‍ත්‍යය වේ.</li><li>(6-7) ඒ ධර්ම පිණ්ඩයට අයත් ධර්ම සියල්ල ම ඔවුනොවුන්ට සහජාත ශක්තියෙන් හා අන්‍යෝන්‍ය ශක්තියෙන් ප්‍ර‍ත්‍යය වේ.</li><li>(8) සම්පූර්ණ ධර්ම පිණ්ඩයට හෘදය වස්තුව නිඃශ්‍ර‍ය ශක්තියෙන් ප්‍ර‍ත්‍යය වේ. ඒ ධර්ම පිණ්ඩයට අයත් ධර්මයෝ ද ඔවුනොවුන්ට නිඃශ්‍ර‍ය ශක්තියෙන් උපකාර වෙති.</li></ol>`, en: '...', ta: '...', hi: '...' }
    }
};

const initialStory: Record<Language, string> = {
    si: 'ආරම්භ කිරීමට උදාහරණයක් තෝරන්න.',
    en: 'Select an example to begin.',
    ta: 'தொடங்குவதற்கு ஒரு உதாரணத்தைத் தேர்ந்தெடுக்கவும்.',
    hi: 'शुरू करने के लिए एक उदाहरण चुनें।',
};

// ICONS
const PlayIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.648c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.718-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg> );
const PauseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" /></svg> );
const ResetIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-4.518a.75.75 0 0 0-.75.75v4.518l1.903-1.903a.75.75 0 0 0-1.06-1.061l-1.904 1.903a5.997 5.997 0 0 0-9.22 3.192.75.75 0 0 0 1.413.53A4.498 4.498 0 0 1 12 6.75a4.5 4.5 0 0 1 4.5 4.5a.75.75 0 0 0 1.5 0A6 6 0 0 0 6.39 6.391a.75.75 0 0 0-.992 1.06l1.353 1.353a.75.75 0 0 0 1.06 1.06l-1.903-1.903a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" /></svg> );
const InfoButton: React.FC<{onClick: () => void}> = ({ onClick }) => ( <button onClick={onClick} className="ml-3 text-xs bg-slate-700 text-red-400 px-2 py-1 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse" title="What is this?">What is this?</button> );
const ChevronDown = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"> <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /> </svg> );

export const SuvisiPratyaya: React.FC = () => {
    const [speed, setSpeed] = useState(1500); // Interval in ms
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [selectedExample, setSelectedExample] = useState<(typeof EXAMPLES_DATA)['walking'] | null>(null);
    const [currentStory, setCurrentStory] = useState<Record<Language, string>>(initialStory);
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [detailedExplanationsOpen, setDetailedExplanationsOpen] = useState<{ [key: string]: boolean }>({});
    const [isIntroOpen, setIsIntroOpen] = useState(true);

    useEffect(() => {
        if (!isPlaying || !selectedExample) return;

        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % selectedExample.steps.length;
                setCurrentStory(selectedExample.steps[nextIndex].story);
                return nextIndex;
            });
        }, speed);

        return () => clearInterval(intervalId);
    }, [speed, isPlaying, selectedExample]);

    const handleSelectExample = useCallback((example: (typeof EXAMPLES_DATA)['walking']) => {
        setSelectedExample(example);
        setIsPlaying(false);
        setActiveIndex(0);
        setCurrentStory(example.steps[0].story);
    }, []);

    const handlePlayPause = useCallback(() => {
        if (selectedExample) setIsPlaying(prev => !prev);
    }, [selectedExample]);

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setActiveIndex(0);
        if (selectedExample) setCurrentStory(selectedExample.steps[0].story);
    }, [selectedExample]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => setSpeed(3025 - Number(e.target.value));
    
    const getTranslation = (obj: Record<Language, string>) => obj[selectedLang] || obj['en'];

    const toggleDetailedExplanation = (key: string) => {
        setDetailedExplanationsOpen(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            <style>{`
                .blinking-eye { animation: blink-anim 2s infinite ease-in-out; }
                @keyframes blink-anim { 0%, 20%, 100% { transform: scaleY(1); } 10% { transform: scaleY(0.1); } }
                .walking-leg { transform-origin: top center; animation: walk-anim 1.5s infinite ease-in-out; }
                .leg-2 { animation-delay: -0.75s; }
                @keyframes walk-anim { 0%, 100% { transform: rotate(-25deg); } 50% { transform: rotate(25deg); } }
            `}</style>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6 flex flex-col gap-8">
                <div className="pb-4 mb-2 border-b border-slate-700">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold text-cyan-400">The 24 Conditions (සුවිසි ප්‍රත්‍යය)</h2>
                        <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                    </div>
                    <p className="text-slate-400 mt-1">Visualizing the causal relations (Paṭṭhāna) in everyday actions.</p>
                </div>
                
                {/* Controls */}
                <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-700 space-y-4">
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex items-center gap-2" role="tablist">
                            {LANGUAGES.map(lang => (
                                <button key={lang.id} onClick={() => setSelectedLang(lang.id)} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${selectedLang === lang.id ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`} role="tab" aria-selected={selectedLang === lang.id}>
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {Object.values(EXAMPLES_DATA).map(example => (
                                <button key={example.id} onClick={() => handleSelectExample(example)} className={`px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${selectedExample?.id === example.id ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`} aria-pressed={selectedExample?.id === example.id}>
                                    {getTranslation(example.title)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4 pt-4 border-t border-slate-700">
                        <div className="flex items-center gap-3">
                            <button onClick={handlePlayPause} className="p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-all shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed" disabled={!selectedExample}>
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </button>
                            <button onClick={handleReset} className="p-2 bg-slate-600 hover:bg-slate-500 rounded-full text-white transition-all shadow-lg disabled:bg-slate-700 disabled:cursor-not-allowed" disabled={!selectedExample}><ResetIcon /></button>
                        </div>
                        <div className="flex-grow w-full md:w-auto flex items-center gap-4">
                            <label htmlFor="pratyaya-speed-slider" className="text-sm font-medium text-slate-400">Speed</label>
                            <input id="pratyaya-speed-slider" type="range" min="25" max="3000" step="25" value={3025 - speed} onChange={handleSliderChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" disabled={!selectedExample} />
                        </div>
                    </div>
                </div>

                <StoryDisplay text={getTranslation(currentStory)} />
                
                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="flex items-center justify-center bg-slate-900/50 rounded-lg p-4 min-h-[200px] border border-slate-700">
                        {selectedExample?.id === 'blinking' && <svg width="150" height="100" viewBox="0 0 150 100" className="text-slate-300"><path d="M10 50 C 40 10, 110 10, 140 50 C 110 90, 40 90, 10 50 Z" fill="currentColor" className="blinking-eye" /><circle cx="75" cy="50" r="15" fill="#38bdf8" /></svg>}
                        {selectedExample?.id === 'walking' && <div className="w-24 h-48 relative">{/* Body */}<div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-24 bg-slate-500 rounded"></div>{/* Legs */}<div className="absolute top-24 left-1/2 -translate-x-1/2 w-4 h-24 bg-slate-400 rounded walking-leg leg-1"></div><div className="absolute top-24 left-1/2 -translate-x-1/2 w-4 h-24 bg-slate-400 rounded walking-leg leg-2"></div></div>}
                        {!selectedExample && <p className="text-slate-500">Select an example to see the animation.</p>}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {PRATYAYAS_DATA.map((p, index) => (
                            <div key={p.id} className={`p-2 rounded-md text-center transition-all duration-300 border ${isPlaying && activeIndex === index ? 'bg-purple-600 border-purple-400 scale-105 shadow-lg' : 'bg-slate-700/50 border-slate-600'}`}>
                                <p className="text-xs font-semibold text-white truncate">{getTranslation(p.title)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Detailed Explanations */}
                <div className="space-y-4 pt-4 border-t border-slate-700">
                    <div>
                        <button onClick={() => setIsIntroOpen(!isIntroOpen)} className="w-full flex justify-between items-center p-4 text-left bg-slate-900/50 rounded-lg hover:bg-slate-700/50">
                            <h3 className="text-xl font-bold text-slate-300">{getTranslation(WHAT_IS_SUVISI_PRATYAYA.title)}</h3>
                            <div className={`transition-transform duration-300 ${isIntroOpen ? 'rotate-180' : ''}`}><ChevronDown /></div>
                        </button>
                        {isIntroOpen && (
                            <div className="mt-4 p-6 bg-slate-900/50 rounded-lg border border-slate-700 text-slate-300 leading-loose">
                                <p className="mb-4">{getTranslation(WHAT_IS_SUVISI_PRATYAYA.introduction)}</p>
                                <h4 className="font-semibold text-cyan-400 mb-2">{selectedLang === 'si' ? 'සුවිසි ප්‍රත්‍යයන්ගේ ලැයිස්තුව සහ කෙටි විස්තර:' : 'List of the 24 Conditions with brief descriptions:'}</h4>
                                <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                    {WHAT_IS_SUVISI_PRATYAYA.conditions.map((item, index) => (
                                        <div key={index}>
                                            <p className="font-semibold text-slate-200">{index + 1}. {getTranslation(item.title)}</p>
                                            <p className="text-slate-400 pl-4">{getTranslation(item.description)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {Object.entries(DETAILED_EXPLANATIONS).map(([key, value]) => (
                        <div key={key}>
                            <button onClick={() => toggleDetailedExplanation(key)} className="w-full flex justify-between items-center p-4 text-left bg-slate-900/50 rounded-lg hover:bg-slate-700/50">
                                <h3 className="text-xl font-bold text-slate-300">{getTranslation(value.title)}</h3>
                                <div className={`transition-transform duration-300 ${detailedExplanationsOpen[key] ? 'rotate-180' : ''}`}><ChevronDown /></div>
                            </button>
                            {detailedExplanationsOpen[key] && <div className="mt-4 p-6 bg-slate-900/50 rounded-lg border border-slate-700 text-slate-300 leading-loose" dangerouslySetInnerHTML={{ __html: getTranslation(value.content) }} />}
                        </div>
                    ))}
                </div>
            </div>
            <ExplanationModal isOpen={isExplanationModalOpen} onClose={() => setIsExplanationModalOpen(false)} content={EXPLANATIONS.suvisiPratyaya} />
        </>
    );
};
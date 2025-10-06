

import React, { useState, useEffect, useCallback } from 'react';
import { StoryDisplay } from './StoryDisplay';
import { ExplanationModal } from './ExplanationModal';
import { EXPLANATIONS } from '../explanations';
import type { Language } from '../types';

const PANCHASKANDHA_EXAMPLES = [
    {
        id: 'hearing_sound',
        title: {
            en: 'Hearing a Sound (Bell)',
            si: 'ශබ්දය ඇසීම (බෙල් එක)',
            ta: 'ஒலி கேட்டல் (மணி)',
            hi: 'आवाज़ सुनना (घंटी)',
        },
        initialStory: {
            en: 'A bell rings. Observe how the mind processes this simple experience.',
            si: 'මලුවක බෙල් එකක් වාදනය වේ. මෙම සරල අත්දැකීම සිත විසින් සකසන ආකාරය නිරීක්ෂණය කරන්න.',
            ta: 'மணி ஒலிக்கிறது. இந்த எளிய அனுபவத்தை மனம் எவ்வாறு கையாளுகிறது என்பதைக் கவனியுங்கள்.',
            hi: 'एक घंटी बजती है। देखें कि मन इस सरल अनुभव को कैसे संसाधित करता है।',
        },
        aggregates: [
            { story: { en: 'Form (Rūpa): The sound wave itself, the physical basis for the experience.', si: 'රූපස්කන්ධය: ශබ්ද තරංගය, අත්දැකීමේ භෞතික පදනම.', ta: 'ரூபம்: ஒலி அலையே, அனுபவத்தின் பௌதிக அடிப்படை.', hi: 'रूप: ध्वनि तरंग स्वयं, अनुभव का भौतिक आधार।' } },
            { story: { en: 'Feeling (Vedanā): A pleasant, unpleasant, or neutral feeling arises from the contact with the sound.', si: 'වේදනාස්කන්ධය: ශබ්දය හා සම්බන්ධ වීමෙන් සුඛ, දුක්ඛ හෝ උපේක්ඛා සහගත වේදනාවක් හට ගනී.', ta: 'வேதனை: ஒலியுடன் தொடர்பு கொள்வதால் सुखद, неприятный, அல்லது நடுநிலை உணர்வு எழுகிறது.', hi: 'वेदना: ध्वनि के संपर्क से सुखद, दुखद या तटस्थ भावना उत्पन्न होती है।' } },
            { story: { en: 'Perception (Saññā): The mind identifies the sound, recognizing it as "a bell" based on memory.', si: 'සංඥාස්කන්ධය: මතකය මත පදනම්ව සිත ශබ්දය "බෙල් එකක්" ලෙස හඳුනා ගනී.', ta: 'சஞ்ஞை: மனம் நினைவின் அடிப்படையில் ஒலியை "மணி" என்று அடையாளம் காண்கிறது.', hi: 'संज्ञा: मन स्मृति के आधार पर ध्वनि को "घंटी" के रूप में पहचानता है।' } },
            { story: { en: 'Formations (Saṅkhāra): Volitional thoughts arise, "That is a nice sound," or "I wonder why it rang."', si: 'සංස්කාරස්කන්ධය: "ඒක ලස්සන සද්දයක්" හෝ "ඇයි ඒක නාද වුණේ?" වැනි චේතනාන්විත සිතුවිලි පැන නගී.', ta: 'சங்காரம்: "அது ஒரு நல்ல ஒலி," அல்லது "அது ஏன் ஒலித்தது?" போன்ற ইচ্ছাকৃত எண்ணங்கள் எழுகின்றன.', hi: 'संस्कार: "यह एक अच्छी ध्वनि है," या "मुझे आश्चर्य है कि यह क्यों बजी।" जैसे ऐच्छिक विचार उत्पन्न होते हैं।' } },
            { story: { en: 'Consciousness (Viññāṇa): The raw awareness of the sound, the ear-consciousness that simply knows "there is a sound."', si: 'විඥාණස්කන්ධය: ශබ්දය පිළිබඳ නිරුවත් දැනුවත්භාවය, "ශබ්දයක් ඇත" යනුවෙන් සරලව දන්නා සෝත-විඤ්ඤාණය.', ta: 'விஞ்ஞானம்: ஒலியின் மூல உணர்வு, காது-உணர்வுநிலை வெறுமனே "ஒரு ஒலி இருக்கிறது" என்பதை அறியும்.', hi: 'विज्ञान: ध्वनि की कच्ची जागरूकता, कर्ण-चेतना जो केवल यह जानती है कि "एक ध्वनि है।"' } },
        ]
    },
    {
        id: 'memory_arising',
        title: {
            en: 'Recalling a Memory (Friend)',
            si: 'මතකයක් මෙනෙහි කිරීම (මිතුරෙකු)',
            ta: 'ஒரு நினைவை நினைவுகூர்தல் (நண்பர்)',
            hi: 'एक स्मृति याद करना (मित्र)',
        },
        initialStory: {
            en: 'An image of a friend arises in the mind. See how this mental event unfolds.',
            si: 'මිතුරෙකුගේ රුවක් සිතේ මැවේ. මෙම මානසික සිදුවීම දිගහැරෙන ආකාරය බලන්න.',
            ta: 'ஒரு நண்பரின் பிம்பம் மனதில் எழுகிறது. இந்த மன நிகழ்வு எவ்வாறு விரிகிறது என்பதைப் பாருங்கள்.',
            hi: 'मन में एक दोस्त की छवि उभरती है। देखें कि यह मानसिक घटना कैसे सामने आती है।',
        },
        aggregates: [
            { story: { en: 'Form (Rūpa): The mental image of the friend, a "form" created by the mind.', si: 'රූපස්කන්ධය: මිතුරාගේ මානසික රූපය, සිත විසින් නිර්මාණය කරන ලද "රූපයකි".', ta: 'ரூபம்: நண்பரின் மனப் பிம்பம், மனதால் உருவாக்கப்பட்ட ஒரு "உருவம்".', hi: 'रूप: मित्र की मानसिक छवि, मन द्वारा बनाया गया एक "रूप"।' } },
            { story: { en: 'Feeling (Vedanā): A feeling of happiness, sadness, or neutrality accompanies the memory.', si: 'වේදනාස්කන්ධය: මතකය සමඟ සතුට, දුක හෝ උපේක්ඛා සහගත හැඟීමක් ඇතිවේ.', ta: 'வேதனை: நினைவோடு மகிழ்ச்சி, துக்கம் அல்லது நடுநிலை உணர்வு உடன்வருகிறது.', hi: 'वेदना: स्मृति के साथ सुख, दुख या तटस्थता की भावना आती है।' } },
            { story: { en: 'Perception (Saññā): The mind recognizes the image, identifying "this is my friend, [Name]."', si: 'සංඥාස්කන්ධය: සිත රූපය හඳුනා ගනිමින්, "මේ මගේ මිතුරා" ලෙස හඳුනා ගනී.', ta: 'சஞ்ஞை: மனம் பிம்பத்தை அடையாளம் கண்டு, "இது என் நண்பர், [பெயர்]" என்று குறிப்பிடுகிறது.', hi: 'संज्ञा: मन छवि को पहचानता है, "यह मेरा मित्र है, [नाम]।"' } },
            { story: { en: 'Formations (Saṅkhāra): Intentions and reactions are formed, "I should call them," or "We had a good time then."', si: 'සංස්කාරස්කන්ධය: "මම ඔවුන්ට කතා කළ යුතුයි," හෝ "අපිට එදා හොඳ කාලයක් තිබුණා" වැනි අභිප්‍රායන් සහ ප්‍රතික්‍රියා ඇතිවේ.', ta: 'சங்காரம்: "நான் அவர்களை அழைக்க வேண்டும்," அல்லது "அப்போது நாங்கள் ஒரு நல்ல நேரம் கழித்தோம்" போன்ற நோக்கங்களும் எதிர்வினைகளும் உருவாகின்றன.', hi: 'संस्कार: "मुझे उन्हें फोन करना चाहिए," या "तब हमने एक अच्छा समय बिताया था" जैसे इरादे और प्रतिक्रियाएं बनती हैं।' } },
            { story: { en: 'Consciousness (Viññāṇa): The mind-consciousness that is aware of the mental image and the associated thoughts/feelings.', si: 'විඥාණස්කන්ධය: මානසික රූපය සහ ඒ හා සම්බන්ධ සිතුවිලි/හැඟීම් පිළිබඳව දැනුවත් වන මනෝ-විඤ්ඤාණය.', ta: 'விஞ்ஞானம்: மனப் பிம்பம் மற்றும் அதனுடன் தொடர்புடைய எண்ணங்கள்/உணர்வுகளை அறிந்திருக்கும் மன-உணர்வுநிலை.', hi: 'विज्ञान: मन-चेतना जो मानसिक छवि और संबंधित विचारों/भावनाओं से अवगत है।' } },
        ]
    }
];

const AGGREGATES_META = [
  { sinhala: 'රූපස්කන්ධය', english: 'Form', pali: 'Rūpa', color: 'bg-kusala', hover: 'hover:shadow-blue-500/50' },
  { sinhala: 'වේදනාස්කන්ධය', english: 'Feeling', pali: 'Vedanā', color: 'bg-vipaka', hover: 'hover:shadow-yellow-500/50' },
  { sinhala: 'සංඥාස්කන්ධය', english: 'Perception', pali: 'Saññā', color: 'bg-somanassa', hover: 'hover:shadow-green-500/50' },
  { sinhala: 'සංස්කාරස්කන්ධය', english: 'Formations', pali: 'Saṅkhāra', color: 'bg-akusala', hover: 'hover:shadow-red-500/50' },
  { sinhala: 'විඥානස්කන්ධය', english: 'Consciousness', pali: 'Viññāṇa', color: 'bg-jhana', hover: 'hover:shadow-purple-500/50' },
];

const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

const DETAILED_PANCHASKANDHA_EXPLANATION: Record<Language, string> = {
    si: `
<p class="mb-4">රූපස්කන්ධය, වේදනාස්කන්ධය, සංඥාස්කන්ධය, සංස්කාරස්කන්ධය, සහ විඥානස්කන්ධය යි ස්කන්ධ පසෙකි.</p>
<p class="mb-4"><strong>රූපස්කන්ධය</strong> යනු රූප පරිච්ඡේදයේ දැක්වුණු රූප විසි අටය. අතීතාදි වශයෙන් භේද වූ රූප සියල්ල රූපභාවයෙන් සිතින් එක් සමූහයක් වශයෙන් ගෙන සියල්ලට ම රූපස්කන්ධය යි කියනු ලැබේ. ස්කන්ධ යන වචනයේ තේරුම සමූහය යනුයි. රූප සමූහය රූපස්කන්ධය ය.</p>
<p class="mb-4"><strong>වේදනාස්කන්ධය</strong> යනු දෙපනස් චෛතසිකයන් ගෙන් එකක් වන වේදනා චෛතසිකය ය. අතීතාදි වශයෙන් අනේකාකාරයෙන් බෙදී ඇති වේදනා සියල්ල වේදනා භාවයෙන් සිතින් එක් කොට සියල්ල ම වේදනා ස්කන්ධය යි කියනු ලැබේ.</p>
<p class="mb-4"><strong>සංඥාස්කන්ධය</strong> යනු සංඥා චෛතසිකය ය. අතීතාදි වශයෙන් අනේකප්‍ර‍කාර වන සංඥා සියල්ල සංඥා භාවයෙන් සිතින් එක් කොට සියල්ලට සංඥාස්කන්ධ යයි කියනු ලැබේ.</p>
<p class="mb-4"><strong>සංස්කාරස්කන්ධ</strong> යනු වේදනා සංඥා දෙක හැර ඉතිරි චෛතසික පනස ය. අතීතාදි වශයෙන් අනේක ප්‍ර‍කාර වන ඒ චෛතසික රාශිය සංස්කාර භාවයෙන් එක් සමූහයක් වශයෙන් සිතින් සලකා සංස්කාරස්කන්ධ යයි කියනු ලැබේ.</p>
<p class="mb-4"><strong>විඥානස්කන්ධය</strong> යනු එකුන් අනූ චිත්තය ය. අතීතාදි වශයෙන් අනේකප්‍ර‍කාර වන විඤ්ඤාණ රාශිය විඥාන වශයෙන් එක් සමූහයක් කොට විඥානස්කන්ධ යයි කියනු ලැබේ.</p>
<p class="mb-4">සතර පරමාර්ථයෙන් නිර්වාණය හැර ඉතිරි සියල්ල පඤ්චස්කන්ධයට අයත් ය. අතීතාදි වශයෙන් ප්‍රභේදයක් නැතිව එක ම ධර්මයක් ම පවත්නා බැවින් නිර්වාණ සමූහයක් නැත. එබැවින් එය ස්කන්ධ සංග්‍ර‍හයට ඇතුළත් නො වේ.</p>
<p class="mb-4">සංස්කාර යන වචනය අර්ථ කීපයක යෙදේ. “අනිච්චා වත සංඛාරා” යන ගාථාවෙහි සංස්කාර යනුවෙන් කියැවෙන්නේ ප්‍ර‍ත්‍යයෙන් හටගත් දෙය ය. පඤ්චස්කන්ධයට අයත් සියල්ල ම ප්‍ර‍ත්‍යයෙන් හට ගන්නා ධර්ම වන බැවින් “අනිච්චා වත සඞ්ඛාරා” යන්නෙහි එන “සඞ්ඛාර” ශබ්දයෙන් පඤ්චස්කන්ධය ම කියැවේ. සංස්කාරස්කන්ධය යි කියන තැන සංස්කාර නාමයෙන් ගැනෙන්නේ වේදනා සංඥාවන් නේ අන්‍ය වූ චෛතසික පනස ය. කරුණු අවුල් නො වීම පිණිස සංස්කාර යන වචනයෙන් කියැවෙන මේ අර්ථ දෙක මතක තබා ගත යුතු ය.</p>
<p class="mb-4">නාම රූප ධර්ම සමූහය රූප වේදනාදි වශයෙන් මෙසේ පස් කොටසකට බෙදා තිබෙන්නේ ආත්ම සංඥාව දුරු කර ගැනීමට පහසු වීම පිණිස ය. ආත්ම සංඥාව රූපාදි පස් කොටසෙහි වෙන් වෙන් වශයෙන් ඇති වේ. මම ලස්සනය, මම උසය, මිටිය, තරය යනාදීන් රූපයෙහි ආත්ම සංඥාව ඇති වේ. මම සැප විඳිමිය, දුක් විඳිමිය, සැප දුක් විඳින්නේ මාය යනාදීන් වේදනාව ආත්ම කොට ගනියි. මම අසවල් අසවල් දේ දනිමිය, දන්නේ මාය කියා සැලකීම් වශයෙන් සංඥාව ආත්ම කොට ගනියි. දෙන්නේත් මාය, ගන්නේත් මාය, යන්නේත් මාය, ඇලුම් කරන්නේත් මාය, කිපෙන්නේත් මාය යනාදීන් සංස්කාරයන් ආත්ම කොට ගනියි. මම දකිමිය, අසමිය යනාදීන් විඥානය ආත්ම කොට ගනියි. සාමාන්‍ය ජනයා එසේ ආත්ම වශයෙන් ගන්නා දේවල් රූපාදි ධර්මයන් බව තේරුම් ගත් කල්හි ආත්ම සංඥාව දුරු වේ. පඤ්චස්කන්ධය දැන ගැනීමේ ප්‍රයෝජනය ආත්ම සංඥාව දුරු කර ගත හැකි වීම ය.</p>
<h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">උපාදානස්කන්ධ පස</h4>
<p class="mb-4">රූපේපාදානස්කන්ධය, වේදනෝපාදානස්කන්ධය, සංඥෝ-පාදනස්කන්ධය, සංස්කාරෝපාදනස්කන්ධය, සහ විඥානෝපාදනස්කන්ධය කියා උපාදානස්කන්ධ පසෙකි. රූපාදිය මගේ ය කියා ද මම ය කියා ද තදින් ගන්නා තෘෂ්ණා දෘෂ්ටි දෙක උපාදාන නම් වේ. සම්පූර්ණ පඤ්චස්කන්ධය ම උපාදානයන් ගේ ගැන්මට හසු නො වේ. උපාදානයන්ගේ ගැන්මට හසු වන්නේ උපාදානයන්ගේ පැවැත්මට ස්ථාන වන්නේ ලෞකික ධර්මයන්ය. ලෝකෝත්තර ධර්ම උපාදානයන්ට හසු නොවේ. සසර දුකින් මිදීමට උපාදාන නැති කළ යුතු ය. ඒවා නැති කළ හැක්කේ උපාදානයන් වැඩීමට ස්ථානවන රූපාරූප ධර්මයන් විදර්ශනා කිරීමෙනි. උපාදානයන්ට හසුවන නො වන ධර්ම දෙ කොටස ම පඤ්චස්කන්ධයට අයත් ය. විදර්ශනාවට ගත යුතු ධර්ම වෙන් කොට දැක්වීම සඳහා උපාදානස්කන්ධ පස වදාරා තිබේ.</p>
<ul class="list-disc list-inside space-y-2 text-slate-300">
    <li><strong>රූපෝපාදානස්කන්ධය</strong> යනු අටවිසි රූපය ය. රූප ලෞකික බැවින් සියල්ල ම උපාදානයන්ට ස්ථාන වේ.</li>
    <li><strong>වේදනෝපාදානස්කන්ධය</strong> යනු ලෞකික සිත් අසූ එකෙහි වේදනා චෛතසිකය ය.</li>
    <li><strong>සංඥෝපාදානස්කන්ධය</strong> යනු ලෞකික සිත් එක් අසූවෙහි සංඥා චෛතසිකය ය.</li>
    <li><strong>සංස්කාරෝපාදානස්කන්ධය</strong> යනු ලෞකික සිත්වල යෙදෙන ඉතිරි චෛතසික පනස ය.</li>
    <li><strong>විඥානෝපාදානස්කන්ධය</strong> යනු ලෞකික සිත් එක් අසූව ය.</li>
</ul>
`,
    en: `
<p class="mb-4">There are five aggregates (skandhas): the aggregate of form, the aggregate of feeling, the aggregate of perception, the aggregate of formations, and the aggregate of consciousness.</p>
<p class="mb-4"><strong>The aggregate of form (Rūpaskandha)</strong> refers to the twenty-eight types of matter. All forms (past, present, future) are mentally grouped together as one collection, and this is called the aggregate of form. The word 'skandha' means aggregate. The group of forms is the aggregate of form.</p>
<p class="mb-4"><strong>The aggregate of feeling (Vedanāskandha)</strong> is the mental factor of feeling (vedanā cetasika). All feelings, differentiated in various ways, are mentally grouped together as one, and this is called the aggregate of feeling.</p>
<p class="mb-4"><strong>The aggregate of perception (Saññāskandha)</strong> is the mental factor of perception (saññā cetasika). All perceptions of various kinds are mentally grouped together as one, and this is called the aggregate of perception.</p>
<p class="mb-4"><strong>The aggregate of formations (Saṅkhāraskandha)</strong> refers to the remaining fifty mental factors, excluding feeling and perception. This collection of various mental factors is mentally considered as one group, and is called the aggregate of formations.</p>
<p class="mb-4"><strong>The aggregate of consciousness (Viññāṇaskandha)</strong> refers to the eighty-nine types of consciousness (citta). The collection of various kinds of consciousness is grouped together as one, and is called the aggregate of consciousness.</p>
<p class="mb-4">Of the four ultimate realities, everything except Nibbāna belongs to the five aggregates. Since Nibbāna exists as a single reality without divisions, there is no 'aggregate' of Nibbāna. Therefore, it is not included in this classification.</p>
<p class="mb-4">The word 'saṅkhāra' (formations) has multiple meanings. In the verse 'Aniccā vata saṅkhārā' (Impermanent are all conditioned things), 'saṅkhāra' refers to anything arisen from conditions, thus covering all five aggregates. However, in 'saṅkhāraskandha', it refers only to the fifty mental factors besides feeling and perception. Remembering these two meanings is important to avoid confusion.</p>
<p class="mb-4">The collection of name-and-form is divided into these five aggregates to make it easier to overcome the perception of a self (ātma-saññā). This perception arises in each aggregate: in form ('I am beautiful'), feeling ('I experience pleasure'), perception ('I know things'), formations ('I give, I take'), and consciousness ('I see, I hear'). When one understands that what is taken as a 'self' are merely these phenomena, the perception of a self is removed. The benefit of understanding the five aggregates is this removal of the self-perception.</p>
<h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">The Five Aggregates of Clinging (Upādānaskandha)</h4>
<p class="mb-4">There are five aggregates of clinging (Upādānaskandha). Clinging (upādāna) is the craving (taṇhā) and wrong view (diṭṭhi) that grasp form, etc., as 'mine' or 'I'. Not all five aggregates are subject to clinging; only worldly (lokiya) phenomena are. Supramundane (lokuttara) phenomena are not. To be free from suffering, clinging must be eliminated through insight meditation (Vipassanā) on the phenomena that are the basis for clinging. The five aggregates of clinging are taught to distinguish the phenomena that should be the object of insight meditation.</p>
<ul class="list-disc list-inside space-y-2 text-slate-300">
    <li><strong>Form subject to clinging</strong> refers to the twenty-eight types of matter. Since all forms are worldly, they are all bases for clinging.</li>
    <li><strong>Feeling subject to clinging</strong> refers to the feeling in the eighty-one types of worldly consciousness.</li>
    <li><strong>Perception subject to clinging</strong> refers to the perception in the eighty-one types of worldly consciousness.</li>
    <li><strong>Formations subject to clinging</strong> refers to the remaining fifty mental factors in worldly consciousness.</li>
    <li><strong>Consciousness subject to clinging</strong> refers to the eighty-one types of worldly consciousness.</li>
</ul>
`,
    ta: `
<p class="mb-4">ஐந்து கந்தங்கள் உள்ளன: ரூபக் கந்தம் (உருவத் தொகுதி), வேதனாக் கந்தம் (உணர்வுத் தொகுதி), சஞ்ஞாக் கந்தம் (அறிவுத் தொகுதி), சங்காரக் கந்தம் (செயற்பாட்டுத் தொகுதி), மற்றும் விஞ்ஞானக் கந்தம் (உணர்வுநிலைத் தொகுதி).</p>
<p class="mb-4"><strong>ரூபக் கந்தம்</strong> என்பது இருபத்தெட்டு வகையான பொருட்களைக் குறிக்கிறது. கடந்த, நிகழ்கால, எதிர்கால அனைத்து உருவங்களும் மனதளவில் ஒரு குழுவாகக் கருதப்படுகின்றன, இதுவே ரூபக் கந்தம் எனப்படும். 'கந்தம்' என்ற சொல்லுக்கு தொகுதி என்று பொருள்.</p>
<p class="mb-4"><strong>வேதனாக் கந்தம்</strong> என்பது ஐம்பத்திரண்டு மனக் காரணிகளில் ஒன்றான வேதனை (உணர்வு) என்பதாகும். பல்வேறு வகையான அனைத்து உணர்வுகளும் மனதளவில் ஒரு குழுவாகக் கருதப்படுகின்றன, இதுவே வேதனாக் கந்தம் எனப்படும்.</p>
<p class="mb-4"><strong>சஞ்ஞாக் கந்தம்</strong> என்பது சஞ்ஞை (அறிவு) என்ற மனக் காரணியாகும். பல்வேறு வகையான அனைத்து அறிவுகளும் மனதளவில் ஒரு குழுவாகக் கருதப்படுகின்றன, இதுவே சஞ்ஞாக் கந்தம் எனப்படும்.</p>
<p class="mb-4"><strong>சங்காரக் கந்தம்</strong> என்பது வேதனை மற்றும் சஞ்ஞையைத் தவிர்த்த மீதமுள்ள ஐம்பது மனக் காரணிகளைக் குறிக்கிறது. இந்த மனக் காரணிகளின் தொகுப்பே சங்காரக் கந்தம் எனப்படும்.</p>
<p class="mb-4"><strong>விஞ்ஞானக் கந்தம்</strong> என்பது எண்பத்தொன்பது வகையான சித்தங்களைக் (உணர்வுநிலை) குறிக்கிறது. பல்வேறு வகையான உணர்வுநிலைகளின் தொகுப்பே விஞ்ஞானக் கந்தம் எனப்படும்.</p>
<p class="mb-4">நான்கு பரமார்த்த உண்மைகளில், நிப்பாணத்தைத் தவிர மற்ற அனைத்தும் ஐந்து கந்தங்களுக்குள் அடங்கும். நிப்பாணம் பிரிவுகளற்ற ஒரே உண்மையாக இருப்பதால், அதற்கு 'கந்தம்' இல்லை. எனவே, அது இந்த வகைப்பாட்டில் சேர்க்கப்படவில்லை.</p>
<p class="mb-4">'சங்காரம்' என்ற சொல்லுக்கு பல பொருள்கள் உண்டு. 'அனிச்சா வத சங்காரா' (நிபந்தனைக்குட்பட்ட அனைத்தும் நிலையற்றவை) என்ற செய்யுளில், 'சங்காரம்' என்பது நிபந்தனைகளால் உருவான எதையும் குறிக்கிறது, இதனால் ஐந்து கந்தங்களையும் உள்ளடக்கியது. ஆனால், 'சங்காரக் கந்தம்' என்பதில், அது வேதனை மற்றும் சஞ்ஞையைத் தவிர்த்த ஐம்பது மனக் காரணிகளை மட்டுமே குறிக்கிறது.</p>
<p class="mb-4">நாம-ரூபக் கூட்டம் இந்த ஐந்து கந்தங்களாகப் பிரிக்கப்பட்டிருப்பது 'சுயம்' (ஆத்ம-சஞ்ஞை) என்ற கருத்தை அகற்றுவதை எளிதாக்குவதற்காகும். இந்த கருத்து ஒவ்வொரு கந்தத்திலும் எழுகிறது: உருவத்தில் ('நான் அழகாக இருக்கிறேன்'), உணர்வில் ('நான் இன்பத்தை அனுபவிக்கிறேன்'), அறிவில் ('எனக்குத் தெரியும்'), செயற்பாடுகளில் ('நான் கொடுக்கிறேன்'), மற்றும் உணர்வுநிலையில் ('நான் பார்க்கிறேன்'). 'சுயம்' என்று கருதப்படுபவை வெறும் நிகழ்வுகளே என்பதைப் புரிந்துகொள்ளும்போது, சுயத்தின் கருத்து அகற்றப்படுகிறது.</p>
<h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">ஐந்து பற்றுதல் கந்தங்கள் (உபாதானஸ்கந்தம்)</h4>
<p class="mb-4">ஐந்து உபாதானஸ்கந்தங்கள் உள்ளன. உபாதானம் என்பது ஆசை (தன்ஹா) மற்றும் தவறான பார்வை (திட்டி) ஆகும், இது உருவம் போன்றவற்றை 'என்னுடையது' அல்லது 'நான்' என்று பற்றிக்கொள்கிறது. உலகியல் (லோகிய) நிகழ்வுகள் மட்டுமே பற்றுதலுக்கு உட்பட்டவை. உலகியல் கடந்த (லோகுத்தர) நிகழ்வுகள் அல்ல. துன்பத்திலிருந்து விடுபட, பற்றுதலை அகற்ற வேண்டும். இது பற்றுதலுக்கு அடிப்படையான நிகழ்வுகளைப் பற்றிய விபாசனா தியானம் மூலம் செய்யப்படுகிறது. தியானத்தின் பொருளாக இருக்க வேண்டிய நிகழ்வுகளை வேறுபடுத்துவதற்காக ஐந்து உபாதானஸ்கந்தங்கள் கற்பிக்கப்பட்டுள்ளன.</p>
<ul class="list-disc list-inside space-y-2 text-slate-300">
    <li><strong>பற்றுதலுக்குட்பட்ட உருவம்</strong> என்பது இருபத்தெட்டு வகையான பொருட்களைக் குறிக்கிறது.</li>
    <li><strong>பற்றுதலுக்குட்பட்ட உணர்வு</strong> என்பது எண்பத்தொரு வகையான உலகியல் சித்தங்களில் உள்ள உணர்வைக் குறிக்கிறது.</li>
    <li><strong>பற்றுதலுக்குட்பட்ட அறிவு</strong> என்பது எண்பத்தொரு வகையான உலகியல் சித்தங்களில் உள்ள அறிவைக் குறிக்கிறது.</li>
    <li><strong>பற்றுதலுக்குட்பட்ட செயற்பாடுகள்</strong> என்பது உலகியல் சித்தங்களில் உள்ள மீதமுள்ள ஐம்பது மனக் காரணிகளைக் குறிக்கிறது.</li>
    <li><strong>பற்றுதலுக்குட்பட்ட உணர்வுநிலை</strong> என்பது எண்பத்தொரு வகையான உலகியல் சித்தங்களைக் குறிக்கிறது.</li>
</ul>
`,
    hi: `
<p class="mb-4">पाँच स्कंध हैं: रूप स्कंध, वेदना स्कंध, संज्ञा स्कंध, संस्कार स्कंध, और विज्ञान स्कंध।</p>
<p class="mb-4"><strong>रूप स्कंध</strong> अट्ठाईस प्रकार के पदार्थों को संदर्भित करता है। सभी रूप (भूत, वर्तमान, भविष्य) मानसिक रूप से एक समूह के रूप में एकत्रित होते हैं, और इसे रूप स्कंध कहा जाता है। 'स्कंध' शब्द का अर्थ है समूह।</p>
<p class="mb-4"><strong>वेदना स्कंध</strong> बावन चैतसिकों (मानसिक कारकों) में से एक, वेदना है। सभी प्रकार की वेदनाएँ मानसिक रूप से एक समूह में एकत्रित होती हैं, और इसे वेदना स्कंध कहा जाता है।</p>
<p class="mb-4"><strong>संज्ञा स्कंध</strong> संज्ञा (पहचान) नामक चैतसिक है। सभी प्रकार की संज्ञाएँ मानसिक रूप से एक समूह में एकत्रित होती हैं, और इसे संज्ञा स्कंध कहा जाता है।</p>
<p class="mb-4"><strong>संस्कार स्कंध</strong> वेदना और संज्ञा को छोड़कर शेष पचास चैतसिकों को संदर्भित करता है। इन विभिन्न चैतसिकों का संग्रह संस्कार स्कंध कहलाता है।</p>
<p class="mb-4"><strong>विज्ञान स्कंध</strong> नवासी प्रकार के चित्तों (चेतना) को संदर्भित करता है। विभिन्न प्रकार की चेतनाओं का संग्रह विज्ञान स्कंध कहलाता है।</p>
<p class="mb-4">चार परमार्थ सत्यों में से, निब्बान को छोड़कर बाकी सब पाँच स्कंधों में आते हैं। चूँकि निब्बान बिना किसी विभाजन के एक ही सत्य के रूप में मौजूद है, इसलिए निब्बान का कोई 'स्कंध' नहीं है। इसलिए, यह इस वर्गीकरण में शामिल नहीं है।</p>
<p class="mb-4">'संस्कार' शब्द के कई अर्थ हैं। 'अनिच्चा वत संखारा' (सभी संस्कृत धर्म अनित्य हैं) श्लोक में, 'संस्कार' का अर्थ है जो कुछ भी प्रत्ययों से उत्पन्न हुआ है, इस प्रकार यह सभी पाँच स्कंधों को समाहित करता है। हालांकि, 'संस्कारस्कंध' में, यह केवल वेदना और संज्ञा के अलावा पचास चैतसिकों को संदर्भित करता है।</p>
<p class="mb-4">नाम-रूप के समूह को इन पाँच स्कंधों में विभाजित किया गया है ताकि 'स्व' (आत्म-संज्ञा) की धारणा को दूर करना आसान हो सके। यह धारणा प्रत्येक स्कंध में उत्पन्न होती है: रूप में ('मैं सुंदर हूँ'), वेदना में ('मैं सुख का अनुभव करता हूँ'), संज्ञा में ('मैं जानता हूँ'), संस्कार में ('मैं देता हूँ'), और विज्ञान में ('मैं देखता हूँ')। जब कोई यह समझता है कि जिसे 'स्व' माना जाता है, वे केवल ये घटनाएँ हैं, तो 'स्व' की धारणा दूर हो जाती है।</p>
<h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">पाँच उपादानस्कंध</h4>
<p class="mb-4">पाँच उपादानस्कंध हैं। उपादान (आसक्ति) तृष्णा और मिथ्या दृष्टि है जो रूप आदि को 'मेरा' या 'मैं' के रूप में पकड़ती है। केवल लौकिक धर्म ही उपादान के अधीन हैं, लोकोत्तर धर्म नहीं। दुःख से मुक्त होने के लिए, उपादान को समाप्त करना होगा। यह उन धर्मों पर विपश्यना ध्यान के माध्यम से किया जा सकता है जो उपादान का आधार हैं। पाँच उपादानस्कंधों को उन धर्मों को अलग करने के लिए सिखाया गया है जो विपश्यना ध्यान का विषय होने चाहिए।</p>
<ul class="list-disc list-inside space-y-2 text-slate-300">
    <li><strong>उपादान के अधीन रूप</strong> अट्ठाईस प्रकार के पदार्थों को संदर्भित करता है।</li>
    <li><strong>उपादान के अधीन वेदना</strong> इक्यासी प्रकार के लौकिक चित्तों में वेदना को संदर्भित करती है।</li>
    <li><strong>उपादान के अधीन संज्ञा</strong> इक्यासी प्रकार के लौकिक चित्तों में संज्ञा को संदर्भित करती है।</li>
    <li><strong>उपादान के अधीन संस्कार</strong> लौकिक चित्तों में शेष पचास चैतसिकों को संदर्भित करता है।</li>
    <li><strong>उपादान के अधीन विज्ञान</strong> इक्यासी प्रकार के लौकिक चित्तों को संदर्भित करता है।</li>
</ul>
`
};


const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.648c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.718-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" /></svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-4.518a.75.75 0 0 0-.75.75v4.518l1.903-1.903a.75.75 0 0 0-1.06-1.061l-1.904 1.903a5.997 5.997 0 0 0-9.22 3.192.75.75 0 0 0 1.413.53A4.498 4.498 0 0 1 12 6.75a4.5 4.5 0 0 1 4.5 4.5a.75.75 0 0 0 1.5 0A6 6 0 0 0 6.39 6.391a.75.75 0 0 0-.992 1.06l1.353 1.353a.75.75 0 0 0 1.06 1.06l-1.903-1.903a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" /></svg>
);

const InfoButton: React.FC<{onClick: () => void}> = ({ onClick }) => (
    <button onClick={onClick} className="ml-3 text-xs bg-slate-700 text-red-400 px-2 py-1 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse" title="What is this?">
        What is this?
    </button>
);

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);

const initialStory: Record<Language, string> = {
    en: 'Select an example to begin.',
    si: 'ආරම්භ කිරීමට උදාහරණයක් තෝරන්න.',
    ta: 'தொடங்குவதற்கு ஒரு உதாரணத்தைத் தேர்ந்தெடுக்கவும்.', 
    hi: 'शुरू करने के लिए एक उदाहरण चुनें।',
};

export const Panchaskandha: React.FC = () => {
    const [speed, setSpeed] = useState(1500); // Interval in ms
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [selectedExample, setSelectedExample] = useState<typeof PANCHASKANDHA_EXAMPLES[0] | null>(null);
    const [currentStory, setCurrentStory] = useState<Record<Language, string>>(initialStory);
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [isDetailedExplanationOpen, setIsDetailedExplanationOpen] = useState(false);


    useEffect(() => {
        if (!isPlaying || !selectedExample) {
            return;
        }

        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % AGGREGATES_META.length;
                setCurrentStory(selectedExample.aggregates[nextIndex].story);
                return nextIndex;
            });
        }, speed);

        return () => clearInterval(intervalId);
    }, [speed, isPlaying, selectedExample]);

    const handleSelectExample = useCallback((example: typeof PANCHASKANDHA_EXAMPLES[0]) => {
        setSelectedExample(example);
        setIsPlaying(false);
        setActiveIndex(0);
        setCurrentStory(example.initialStory);
    }, []);

    const handlePlayPause = useCallback(() => {
        if (selectedExample) {
            setIsPlaying(prev => !prev);
            // If starting from a paused or initial state, set the story for the first item
            if (!isPlaying) {
                setCurrentStory(selectedExample.aggregates[activeIndex].story);
            }
        }
    }, [selectedExample, isPlaying, activeIndex]);

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setActiveIndex(0);
        if (selectedExample) {
            setCurrentStory(selectedExample.initialStory);
        }
    }, [selectedExample]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(2025 - Number(e.target.value));
    };

    return (
        <>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6">
                 <div className="pb-4 mb-6 border-b border-slate-700">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold text-cyan-400">The Five Aggregates (පඤ්චස්කන්ධය)</h2>
                        <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                    </div>
                    <div className="text-slate-400 mt-2">
                         <p>
                            නාම රූප ධර්ම සමූහය රූප වේදනාදි වශයෙන් මෙසේ පස් කොටසකට බෙදා තිබෙන්නේ ආත්ම සංඥාව දුරු කර ගැනීමට පහසු වීම පිණිස ය.
                        </p>
                        <span className="block text-sm text-slate-500 mt-1">
                            (The group of name-and-form phenomena is divided into these five aggregates to facilitate the removal of the perception of a self.)
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                     <div>
                        <h3 className="text-lg font-semibold text-slate-300 mb-3">1. Choose an Example Scenario:</h3>
                        <div className="flex flex-wrap gap-4">
                            {PANCHASKANDHA_EXAMPLES.map(example => (
                                <button
                                    key={example.id}
                                    onClick={() => handleSelectExample(example)}
                                    className={`px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
                                        ${selectedExample?.id === example.id 
                                            ? 'bg-cyan-600 border-cyan-500 text-white' 
                                            : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500 text-slate-300'}`
                                    }
                                    aria-pressed={selectedExample?.id === example.id}
                                >
                                    {example.title[selectedLang] || example.title['en']}
                                </button>
                            ))}
                        </div>
                    </div>

                    <StoryDisplay text={currentStory[selectedLang] || currentStory['en']} />

                    <div className="flex justify-center items-start h-40 mb-6 flex-wrap gap-6 md:gap-8">
                        {AGGREGATES_META.map((agg, index) => (
                            <div key={agg.pali} className="flex flex-col items-center gap-2 w-24" title={`${agg.pali} (${agg.english})`}>
                                <div className={`
                                    w-20 h-20 rounded-full transition-all duration-500 
                                    flex items-center justify-center text-center
                                    shadow-lg border-2
                                    ${selectedExample && isPlaying && activeIndex === index
                                        ? `${agg.color} border-slate-300/80 shadow-lg ${agg.hover} scale-105 animate-pulse`
                                        : 'bg-slate-700 border-slate-600'
                                    }
                                `}>
                                    <span className="font-bold text-white text-sm">{agg.pali}</span>
                                </div>
                                <div className="text-center mt-1">
                                    <span className="text-sm text-slate-300 block">{agg.sinhala}</span>
                                    <span className="text-xs text-slate-400 block">{agg.english}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 mt-4 pt-6 border-t border-slate-700">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handlePlayPause}
                                className="p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed"
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                                title={isPlaying ? 'Pause' : 'Play'}
                                disabled={!selectedExample}
                            >
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </button>
                            <button 
                                onClick={handleReset}
                                className="p-2 bg-slate-600 hover:bg-slate-500 rounded-full text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-700 disabled:cursor-not-allowed"
                                aria-label="Reset"
                                title="Reset"
                                disabled={!selectedExample}
                            >
                                <ResetIcon />
                            </button>
                        </div>
                        <div className="flex-grow w-full md:w-auto flex items-center gap-4">
                            <label htmlFor="pancha-speed-slider" className="text-sm font-medium text-slate-400 whitespace-nowrap">
                                Speed
                            </label>
                            <input
                                id="pancha-speed-slider"
                                type="range"
                                min="25"
                                max="2000"
                                step="25"
                                value={2025 - speed}
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                aria-label="Animation speed"
                                disabled={!selectedExample}
                            />
                        </div>
                         <div className="flex items-center gap-2 pl-4 border-l border-slate-600" role="tablist" aria-label="Language selection">
                            {LANGUAGES.map(lang => (
                                 <button
                                    key={lang.id}
                                    onClick={() => setSelectedLang(lang.id)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${selectedLang === lang.id ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                                    role="tab"
                                    aria-selected={selectedLang === lang.id}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700">
                    <button onClick={() => setIsDetailedExplanationOpen(prev => !prev)} className="w-full flex justify-between items-center p-4 text-left bg-slate-900/50 rounded-lg hover:bg-slate-700/50">
                        <h3 className="text-xl font-bold text-slate-300">Detailed Explanation (විස්තරය)</h3>
                        <div className={`transition-transform duration-300 ${isDetailedExplanationOpen ? 'rotate-180' : ''}`}><ChevronDown /></div>
                    </button>
                    {isDetailedExplanationOpen && (
                        <div className="mt-4 p-6 bg-slate-900/50 rounded-lg border border-slate-700 text-slate-300 leading-loose prose prose-invert max-w-none prose-p:text-slate-300 prose-ul:text-slate-300 prose-strong:text-slate-200"
                                dangerouslySetInnerHTML={{ __html: DETAILED_PANCHASKANDHA_EXPLANATION[selectedLang] || DETAILED_PANCHASKANDHA_EXPLANATION['en'] }}
                        >
                        </div>
                    )}
                </div>

            </div>
            <ExplanationModal
                isOpen={isExplanationModalOpen}
                onClose={() => setIsExplanationModalOpen(false)}
                content={EXPLANATIONS.panchaskandha}
            />
        </>
    );
};

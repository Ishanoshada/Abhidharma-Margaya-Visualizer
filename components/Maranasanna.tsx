
import React, { useState, useEffect, useCallback } from 'react';
import { StoryDisplay } from './StoryDisplay';
import { ExplanationModal } from './ExplanationModal';
import { CittaLog } from './CittaLog';
import { CITTAS } from '../constants';
import { EXPLANATIONS } from '../explanations';
import type { Language, CittaInstance } from '../types';

const MARANASANNA_EXAMPLES = [
    {
        id: 'eye_door_dying',
        title: {
            en: 'Eye-Door Dying Process (Human Rebirth)',
            si: 'චක්ෂුර්ද්වාරික මරණාසන්න ක්‍රියාවලිය (මනුෂ්‍ය භවය)',
            ta: 'கண்-வாசல் மரண செயல்முறை (மனித மறுபிறப்பு)',
            hi: 'चक्षु-द्वार मरण प्रक्रिया (मानव पुनर्जन्म)',
        },
        initialStory: {
            en: 'A woman, after leaving a temple, dies suddenly. Her final moments are processed through the eye-door, conditioning a human rebirth.',
            si: 'පන්සලකින් පිටව ගිය කාන්තාවක් හදිසියේ මිය යයි. ඇගේ අවසන් මොහොත චක්ෂුර්ද්වාරය හරහා සැකසී, මනුෂ්‍ය භවයක් සඳහා හේතු වේ.',
            ta: 'ஒரு கோவிலை விட்டு வெளியேறிய பிறகு ஒரு பெண் திடீரென்று இறந்துவிடுகிறார். அவரது இறுதித் தருணங்கள் கண்-வாசல் வழியாகச் செயல்படுத்தப்பட்டு, ஒரு மனித மறுபிறப்புக்கு வழிவகுக்கிறது.',
            hi: 'एक मंदिर से निकलने के बाद एक महिला की अचानक मृत्यु हो जाती है। उसके अंतिम क्षण चक्षु-द्वार के माध्यम से संसाधित होते हैं, जो एक मानव पुनर्जन्म को अनुकूलित करता है।',
        },
        steps: [
            { pali: 'Atīta Bhavaṅga', cittaId: 'bhavanga', story: { en: 'Past Life-Continuum: The normal, passive flow of consciousness maintaining life.', si: 'අතීත භවාංග: ජීවිතය පවත්වාගෙන යන භවාංග සන්තතියේ සාමාන්‍ය ගලායාම.', ta: 'கடந்தகால வாழ்க்கை-தொடர்ச்சி: வாழ்க்கையை பராமரிக்கும் உணர்வின் சாதாரண, செயலற்ற ஓட்டம்.', hi: 'अतीत भवंग: जीवन को बनाए रखने वाली चेतना का सामान्य, निष्क्रिय प्रवाह।' } },
            { pali: 'Bhavaṅga-calana', cittaId: 'bhavanga', story: { en: 'Vibrating Bhavaṅga: The life-continuum is disturbed by the impending death event.', si: 'භවාංග චලන: එළඹෙන මරණ සිදුවීම නිසා භවාංග සන්තතිය චලනය වේ.', ta: 'அதிரும் பவங்கம்: வரவிருக்கும் மரண நிகழ்வால் வாழ்க்கை-தொடர்ச்சி கலங்குகிறது.', hi: 'कंपमान भवंग: आसन्न मृत्यु की घटना से जीवन-प्रवाह बाधित होता है।' } },
            { pali: 'Bhavaṅga-upaccheda', cittaId: 'bhavanga', story: { en: 'Arrested Bhavaṅga: The life-continuum stream is cut off, preparing the mind for the final object.', si: 'භවාංග උපච්ඡේද: භවාංග සන්තතිය සිඳී ගොස්, අවසාන අරමුණ (කර්ම/නිමිති) සඳහා මනස සූදානම් කරයි.', ta: 'தடைபட்ட பவங்கம்: வாழ்க்கை-தொடர்ச்சி ஓட்டம் துண்டிக்கப்பட்டு, இறுதிப் பொருளுக்கு மனதைத் தயார்படுத்துகிறது.', hi: 'अवरुद्ध भवंग: जीवन-प्रवाह रुक जाता है, मन को अंतिम वस्तु के लिए तैयार करता है।' } },
            { pali: 'Pañca-dvārāvajjana', cittaId: 'pancadvaravajjana', story: { en: 'Five-Door Adverting: The mind turns towards the sense doors. In this case, the eye-door.', si: 'පංචද්වාරාවජ්ජන: සිත ඉන්ද්‍රිය දොරටු වෙත (මෙහිදී චක්ෂු ද්වාරය වෙත) යොමු වේ.', ta: 'ஐந்து-வாசல் அறிதல்: மனம் புலன் வாசல்களை நோக்கித் திரும்புகிறது. இந்த நிலையில், கண்-வாசலை நோக்கி.', hi: 'पंच-द्वार आवर्जन: मन इंद्रिय द्वारों की ओर मुड़ता है। इस मामले में, चक्षु-द्वार की ओर।' } },
            { pali: 'Cakkhu-viññāṇa', cittaId: 'cakkhuvinnana', story: { en: 'Eye-Consciousness: Consciousness arises dependent on the eye, seeing a final karmic sign (Kamma Nimitta).', si: 'චක්ඛු විඤ්ඤාණ: ඇස ඇසුරු කොට විඤ්ඤාණය හටගනී (දැකීම සිදුවේ).', ta: 'கண்-உணர்வு: கண்ணைச் சார்ந்து உணர்வு எழுகிறது, ஒரு இறுதி கர்ம அடையாளத்தைக் காண்கிறது.', hi: 'चक्षु-विज्ञान: आंख पर निर्भर चेतना उत्पन्न होती है, जो एक अंतिम कर्म निमित्त को देखती है।' } },
            { pali: 'Sampaṭicchana', cittaId: 'sampaticchana', story: { en: 'Receiving Consciousness: The mind "receives" the sense object that was just seen.', si: 'සම්පටිච්ඡන: දුටු රූපය පිළිගනී.', ta: 'ஏற்கும் உணர்வு: மனம் இப்போது பார்த்த புலன் பொருளை "ஏற்கிறது".', hi: 'संप्रतिच्छन्न: मन अभी-अभी देखे गए इंद्रिय विषय को "प्राप्त" करता है।' } },
            { pali: 'Santīraṇa', cittaId: 'santirana', story: { en: 'Investigating Consciousness: The mind briefly examines the object.', si: 'සන්තීරණ: රූපය විමර්ශනය කරයි.', ta: 'ஆராயும் உணர்வு: மனம் பொருளைச் சுருக்கமாக ஆராய்கிறது.', hi: 'संतिरण: मन संक्षेप में वस्तु की जांच करता है।' } },
            { pali: 'Votthapana', cittaId: 'votthapana', story: { en: 'Determining Consciousness: The mind determines the nature of the object, preparing for the decisive Javana phase.', si: 'වොත්ථපන: රූපය කුමක්දැයි තීරණය කරයි.', ta: 'நிர்ணயிக்கும் உணர்வு: மனம் பொருளின் தன்மையை நிர்ணயித்து, தீர்க்கமான ஜவன கட்டத்திற்குத் தயாராகிறது.', hi: 'वोस्थापन: मन वस्तु की प्रकृति का निर्धारण करता है, निर्णायक जवन चरण के लिए तैयारी करता है।' } },
            { pali: 'Javana', cittaId: 'kusala', story: { en: 'Impulsion: A series of wholesome mind-moments that "enjoy" the object and seal the kamma for the next life.', si: 'ජවන්: අරමුණට ප්‍රතිචාර දක්වමින් කුසල් සිත් මාලාවක් හටගනී. මෙය මීළඟ භවය සකස් කරයි.', ta: 'உந்துதல்: பொருளை "அனுபவித்து" அடுத்த வாழ்க்கைக்கு கர்மாவை முத்திரையிடும் நன்மை மன-கணங்களின் தொடர்.', hi: 'जवन: कुशल मन-क्षणों की एक श्रृंखला जो वस्तु का "आनंद" लेती है और अगले जीवन के लिए कर्म को सील करती है।' } },
            { pali: 'Cuti-citta', cittaId: 'cuti', story: { en: 'Death-Consciousness: The final mind-moment of this life, conditioned by the preceding Javana.', si: 'චුති චිත්ත: මෙම ජීවිතයේ අවසාන චිත්ත ක්ෂණය.', ta: 'மரண-உணர்வு: இந்த வாழ்க்கையின் இறுதி மன-கணம், முந்தைய ஜவனத்தால் நிபந்தனைக்குட்பட்டது.', hi: 'च्युति-चित्त: इस जीवन का अंतिम मन-क्षण, जो पूर्ववर्ती जवन द्वारा अनुकूलित होता है।' } },
            { pali: 'Paṭisandhi-citta', cittaId: 'patisandhi', story: { en: 'Rebirth-Linking Consciousness: The very first mind-moment of the new existence, immediately following Cuti.', si: 'පටිසන්ධි චිත්ත: චුතියෙන් පසු වහාම, නව භවයේ පළමු චිත්ත ක්ෂණය හටගනී.', ta: 'மறுபிறப்பு-இணைப்பு உணர்வு: புதிய இருப்பின் முதல் மன-கணம், சுதியைத் தொடர்ந்து உடனடியாக.', hi: 'पटिसंधि-चित्त: नए अस्तित्व का पहला मन-क्षण, जो च्युति के तुरंत बाद आता है।' } },
        ]
    },
    {
        id: 'mind_door_dying',
        title: {
            en: 'Mind-Door Dying Process (Formless to Hell)',
            si: 'මනෝද්වාරික මරණාසන්න ක්‍රියාවලිය (අරූප භවයේ සිට නිරයට)',
            ta: 'மனம்-வாசல் மரண செயல்முறை (உருவமற்ற நிலையிலிருந்து நரகத்திற்கு)',
            hi: 'मन-द्वार मरण प्रक्रिया (अरूप लोक से नरक तक)',
        },
        initialStory: {
            en: 'A being in a formless realm (arūpa-loka) dies due to a powerful past negative kamma, leading to a rebirth in hell (niraya). The process occurs entirely through the mind-door.',
            si: 'අරූප ලෝකයක සිටින සත්වයෙක්, අතීත බලවත් අකුසල කර්මයක් නිසා මිය ගොස්, නිරයේ උත්පත්තිය ලබයි. මෙම ක්‍රියාවලිය සම්පූර්ණයෙන්ම මනෝද්වාරය හරහා සිදු වේ.',
            ta: 'உருவமற்ற உலகில் உள்ள ஒரு உயிர், கடந்தகால சக்திவாய்ந்த தீய கர்மாவால் இறந்து, நரகத்தில் (நிரயம்) மறுபிறவி எடுக்கிறது. இந்த செயல்முறை முற்றிலும் மனம்-வாசல் வழியாக நிகழ்கிறது.',
            hi: 'अरूप लोक में एक जीव, एक शक्तिशाली पिछले नकारात्मक कर्म के कारण मर जाता है, जिससे नरक (निरय) में पुनर्जन्म होता है। यह प्रक्रिया पूरी तरह से मन-द्वार के माध्यम से होती है।'
        },
        steps: [
            { pali: 'Bhavaṅga', cittaId: 'bhavanga', story: { en: 'Life-Continuum in the Formless Realm: The passive consciousness stream of a being without physical form.', si: 'අරූප භවයේ භවාංගය: භෞතික ශරීරයක් නොමැති සත්වයෙකුගේ නිෂ්ක්‍රීය විඥාන ප්‍රවාහය.', ta: 'உருவமற்ற உலகில் வாழ்க்கை-தொடர்ச்சி: భౌతిక రూపం లేని జీవి యొక్క నిష్క్రియ చైతన్య ప్రవాహం.', hi: 'अरूप लोक में भवंग: बिना भौतिक शरीर वाले जीव की निष्क्रिय चेतना धारा।' } },
            { pali: 'Bhavaṅga-calana', cittaId: 'bhavanga', story: { en: 'Vibrating Bhavaṅga: A past negative kamma surfaces, disturbing the tranquil state.', si: 'භවාංග චලන: අතීත අකුසල කර්මයක් මතු වී, සන්සුන් තත්ත්වය කඩාකප්පල් කරයි.', ta: 'அதிரும் பவங்கம்: ஒரு கடந்தகால தீய கர்மா வெளிப்பட்டு, அமைதியான நிலையை கலங்கச் செய்கிறது.', hi: 'कंपमान भवंग: एक पिछला नकारात्मक कर्म सतह पर आता है, जो शांत अवस्था को भंग करता है।' } },
            { pali: 'Bhavaṅga-upaccheda', cittaId: 'bhavanga', story: { en: 'Arrested Bhavaṅga: The formless life-stream is cut off, forced to process the new karmic object.', si: 'භවාංග උපච්ඡේද: අරූපී භවාංග සන්තතිය සිඳී ගොස්, නව කර්ම නිමිත්ත අරමුණු කිරීමට සිත යොමු වේ.', ta: 'தடைபட்ட பவங்கம்: உருவமற்ற வாழ்க்கை-ஓட்டம் துண்டிக்கப்பட்டு, புதிய கர்மப் பொருளைச் செயல்படுத்தும்படி கட்டாயப்படுத்தப்படுகிறது.', hi: 'अवरुद्ध भवंग: अरूप जीवन-धारा कट जाती है, जिसे नए कर्म वस्तु को संसाधित करने के लिए मजबूर किया जाता है।' } },
            { pali: 'Mano-dvārāvajjana', cittaId: 'manodvaravajjana', story: { en: 'Mind-Door Adverting: With no physical senses, the mind directly turns to the karmic sign appearing in the mind itself.', si: 'මනෝද්වාරාවජ්ජන: භෞතික ඉන්ද්‍රියන් නොමැතිව, සිත කෙලින්ම මනසේම දිස්වන කර්ම නිමිත්ත වෙත යොමු වේ.', ta: 'மன-வாசல் அறிதல்: భౌతిక ఇంద్రియాలు లేకుండా, మనస్సు నేరుగా మనస్సులోనే కనిపించే కర్మ సంకేతం వైపు మళ్ళుతుంది.', hi: 'मन-द्वार आवर्जन: भौतिक इंद्रियों के बिना, मन सीधे मन में ही प्रकट होने वाले कर्म संकेत की ओर मुड़ता है।' } },
            { pali: 'Javana', cittaId: 'dosaCitta', story: { en: 'Impulsion: Powerful unwholesome (akusala) mind-moments arise, fueled by the negative kamma, creating the conditions for a woeful rebirth.', si: 'ජවන්: බලවත් අකුසල් සිත් මාලාවක් පහළ වී, අකුසල කර්මයෙන් පෝෂණය වී, දුක්ඛිත පුනර්භවයක් සඳහා කොන්දේසි නිර්මානය කරයි.', ta: 'உந்துதல்: சக்திவாய்ந்த தீய (அகுசல) மன-கணங்கள் எழுகின்றன, எதிர்மறை கர்மாவால் தூண்டப்பட்டு, ஒரு துக்ககரமான மறுபிறப்புக்கான நிலைமைகளை உருவாக்குகின்றன.', hi: 'जवन: शक्तिशाली अकुशल मन-क्षण उत्पन्न होते हैं, जो नकारात्मक कर्म से प्रेरित होते हैं, जो एक दुखद पुनर्जन्म के लिए स्थितियाँ बनाते हैं।' } },
            { pali: 'Cuti-citta', cittaId: 'cuti', story: { en: 'Death-Consciousness: The final moment of the formless existence ends, sealed by the unwholesome Javana.', si: 'චුති චිත්ත: අරූපී පැවැත්මේ අවසාන මොහොත, අකුසල ජවනයෙන් මුද්‍රා තබා, අවසන් වේ.', ta: 'மரண-உணர்வு: உருவமற்ற இருப்பின் இறுதித் தருணம், தீய ஜவனத்தால் முத்திரையிடப்பட்டு முடிவடைகிறது.', hi: 'च्युति-चित्त: अरूप अस्तित्व का अंतिम क्षण समाप्त होता है, जो अकुशल जवन द्वारा मुहरबंद होता है।' } },
            { pali: 'Paṭisandhi-citta', cittaId: 'patisandhi', story: { en: 'Rebirth-Linking Consciousness (in Hell): The first moment of consciousness in the hell realm arises immediately, a direct result of the preceding kamma.', si: 'පටිසන්ධි චිත්ත (නිරයේ): නිරයේ පළමු විඤ්ඤාණ මොහොත වහාම හට ගනී, එය පෙර කර්මයේ සෘජු ප්‍රතිඵලයකි.', ta: 'மறுபிறப்பு-இணைப்பு உணர்வு (நரகத்தில்): நரகத்தில் உணர்வின் முதல் கணம் உடனடியாக எழுகிறது, இது முந்தைய கர்மாவின் நேரடி விளைவாகும்.', hi: 'पटिसंधि-चित्त (नरक में): नरक लोक में चेतना का पहला क्षण तुरंत उत्पन्न होता है, जो पूर्ववर्ती कर्म का प्रत्यक्ष परिणाम है।' } },
        ]
    }
];

const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

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

const initialStory: Record<Language, string> = {
    en: 'Select a dying process example to begin.',
    si: 'ආරම්භ කිරීමට මරණාසන්න ක්‍රියාවලියක් තෝරන්න.',
    ta: 'தொடங்குவதற்கு ஒரு மரண செயல்முறை உதாரணத்தைத் தேர்ந்தெடுக்கவும்.',
    hi: 'शुरू करने के लिए एक मरण प्रक्रिया का उदाहरण चुनें।',
};

export const Maranasanna: React.FC = () => {
    const [speed, setSpeed] = useState(1500); // Interval in ms
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [selectedExample, setSelectedExample] = useState<typeof MARANASANNA_EXAMPLES[0] | null>(null);
    const [currentStory, setCurrentStory] = useState<Record<Language, string>>(initialStory);
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [cittaHistory, setCittaHistory] = useState<CittaInstance[]>([]);
    const [isCittaLogOpen, setIsCittaLogOpen] = useState(false);


    useEffect(() => {
        if (!isPlaying || !selectedExample) return;

        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % selectedExample.steps.length;
                const currentStep = selectedExample.steps[nextIndex];
                
                setCurrentStory(currentStep.story);

                const newCittaInstance: CittaInstance = {
                    id: `${Date.now()}-${nextIndex}`,
                    citta: CITTAS[currentStep.cittaId],
                    startTime: Date.now(),
                    duration: 0,
                    label: currentStep.pali,
                };
                setCittaHistory(prev => [newCittaInstance, ...prev.slice(0, 199)]);

                return nextIndex;
            });
        }, speed);

        return () => clearInterval(intervalId);
    }, [speed, isPlaying, selectedExample]);

    const handleSelectExample = useCallback((example: typeof MARANASANNA_EXAMPLES[0]) => {
        setSelectedExample(example);
        setIsPlaying(false);
        setActiveIndex(0);
        setCurrentStory(example.initialStory);
        setCittaHistory([]);
        setIsCittaLogOpen(true);
    }, []);

    const handlePlayPause = useCallback(() => {
        if (selectedExample) {
            setIsPlaying(prev => !prev);
            if (!isPlaying) {
                // Log the first citta when starting
                if (cittaHistory.length === 0) {
                     const firstStep = selectedExample.steps[0];
                     const firstCitta: CittaInstance = {
                        id: `${Date.now()}-0`,
                        citta: CITTAS[firstStep.cittaId],
                        startTime: Date.now(),
                        duration: 0,
                        label: firstStep.pali,
                    };
                    setCittaHistory([firstCitta]);
                }
                setCurrentStory(selectedExample.steps[activeIndex].story);
            }
        }
    }, [selectedExample, isPlaying, activeIndex, cittaHistory]);

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setActiveIndex(0);
        setCittaHistory([]);
        if (selectedExample) {
            setCurrentStory(selectedExample.initialStory);
        }
        setIsCittaLogOpen(false);
    }, [selectedExample]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(3025 - Number(e.target.value));
    };
    
    const activeSteps = selectedExample?.steps;

    return (
        <>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6">
                 <div className="pb-4 mb-6 border-b border-slate-700">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold text-cyan-400">Dying Mind-Process (මරණාසන්න චිත්ත වීථිය)</h2>
                        <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                    </div>
                    <p className="text-slate-400 mt-1">Visualizing the final thought-process that bridges one life to the next.</p>
                </div>

                <div className="space-y-6">
                     <div>
                        <h3 className="text-lg font-semibold text-slate-300 mb-3">1. Choose an Example Scenario:</h3>
                        <div className="flex flex-wrap gap-4">
                            {MARANASANNA_EXAMPLES.map(example => (
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

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-slate-300 mb-4">2. Observe the Citta Vīthi Sequence:</h3>
                        <div className="flex flex-wrap justify-center gap-x-2 gap-y-4">
                           {activeSteps && activeSteps.map((step, index) => (
                               <React.Fragment key={index}>
                                    <div className="flex flex-col items-center gap-1 w-32">
                                        <div className={`
                                            w-24 h-12 rounded-lg transition-all duration-500 
                                            flex items-center justify-center text-center px-1
                                            shadow-md border
                                            ${isPlaying && activeIndex === index
                                                ? 'bg-purple-600 border-purple-400 shadow-purple-500/40 scale-110'
                                                : 'bg-slate-700 border-slate-600'
                                            }
                                        `}>
                                            <span className="font-semibold text-white text-sm">{step.pali}</span>
                                        </div>
                                    </div>
                                    {index < activeSteps.length - 1 && (
                                        <div className="flex items-center self-start mt-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500">
                                                <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                               </React.Fragment>
                           ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 mt-8 pt-6 border-t border-slate-700">
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
                            <label htmlFor="maranasanna-speed-slider" className="text-sm font-medium text-slate-400 whitespace-nowrap">
                                Speed
                            </label>
                            <input
                                id="maranasanna-speed-slider"
                                type="range"
                                min="25"
                                max="3000"
                                step="25"
                                value={3025 - speed}
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
            </div>

            {selectedExample && <div className="mt-8"><CittaLog cittaHistory={cittaHistory} isOpen={isCittaLogOpen} setIsOpen={setIsCittaLogOpen} /></div>}

            <ExplanationModal
                isOpen={isExplanationModalOpen}
                onClose={() => setIsExplanationModalOpen(false)}
                content={EXPLANATIONS.maranasannaVithi}
            />
        </>
    );
};

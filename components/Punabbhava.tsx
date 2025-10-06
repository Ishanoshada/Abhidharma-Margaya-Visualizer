
import React, { useState, useEffect, useCallback } from 'react';
import type { Language, CittaInstance, RebirthScenario } from '../types';
import { ExplanationModal } from './ExplanationModal';
import { REBIRTH_SCENARIOS, CITTAS } from '../constants';
import { EXPLANATIONS } from '../explanations';
import { StoryDisplay } from './StoryDisplay';
import { CittaLog } from './CittaLog';

// DATA CONSTANTS & ICONS
const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

const PlayIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.648c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.718-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg> );
const PauseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" /></svg> );
const ResetIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-4.518a.75.75 0 0 0-.75.75v4.518l1.903-1.903a.75.75 0 0 0-1.06-1.061l-1.904 1.903a5.997 5.997 0 0 0-9.22 3.192.75.75 0 0 0 1.413.53A4.498 4.498 0 0 1 12 6.75a4.5 4.5 0 0 1 4.5 4.5a.75.75 0 0 0 1.5 0A6 6 0 0 0 6.39 6.391a.75.75 0 0 0-.992 1.06l1.353 1.353a.75.75 0 0 0 1.06 1.06l-1.903-1.903a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" /></svg> );
const InfoButton: React.FC<{onClick: () => void}> = ({ onClick }) => ( <button onClick={onClick} className="ml-3 text-xs bg-slate-700 text-red-400 px-2 py-1 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse" title="What is this?">What is this?</button> );
const ChevronDown = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg> );

const REALMS_DATA = [
    {
        title: { si: 'කාම ලෝකය', en: 'Kāma-loka (Sensual Realm)', ta: 'காம லோகம்', hi: 'काम लोक' },
        description: { si: 'කාම ආශාවන් මගින් මෙහෙයවනු ලබන, බොහෝ සත්වයන් සඳහා වන සාමාන්‍ය භවයයි. කුසල් සහ අකුසල් කර්ම දෙකෙන්ම හට ගනී.', en: 'The default realm for most beings, driven by sensual desires. Results from both wholesome and unwholesome kamma.', ta: 'பெரும்பாலான உயிரினங்களுக்கான இயல்புநிலை உலகம், புலனின்ப ஆசைகளால் இயக்கப்படுகிறது. நன்மை மற்றும் தீய கர்மங்கள் இரண்டிலிருந்தும் விளைகிறது.', hi: 'अधिकांश जीवों के लिए डिफ़ॉल्ट लोक, जो इंद्रिय इच्छाओं से प्रेरित होता है। कुशल और अकुशल दोनों कर्मों से होता है।' },
        color: 'border-l-red-500'
    },
    {
        title: { si: 'රූප ලෝකය', en: 'Rūpa-loka (Form Realm)', ta: 'ரூப லோகம்', hi: 'रूप लोक' },
        description: { si: 'ධ්‍යාන (භාවනාමය සමාධිය) ප්‍රගුණ කිරීමෙන් ලබා ගන්නා උසස්, ප්‍රණීත භවයකි. මෙහි සිටින සත්වයන්ට සූක්ෂම භෞතික ශරීර ඇත.', en: 'A higher, blissful realm attained through mastery of Dhyāna (meditative absorption). Beings here have subtle physical forms.', ta: 'தியானத்தில் தேர்ச்சி பெறுவதன் மூலம் அடையப்படும் ஒரு உயர்ந்த, ஆனந்தமான உலகம். இங்குள்ள உயிரினங்களுக்கு நுட்பமான உடல் வடிவங்கள் உள்ளன.', hi: 'ध्यान में महारत हासिल करने के माध्यम से प्राप्त एक उच्च, ஆனந்தமயமான लोक। यहां के जीवों के सूक्ष्म रूप होते हैं।' },
        color: 'border-l-blue-500'
    },
    {
        title: { si: 'අරූප ලෝකය', en: 'Arūpa-loka (Formless Realm)', ta: 'அரூப லோகம்', hi: 'अरूप लोक' },
        description: { si: 'අරූප ධ්‍යාන ප්‍රගුණ කිරීමෙන් ලබා ගන්නා ඉහළම භවයයි. මෙහි සිටින සත්වයන් කිසිදු භෞතික ස්වරූපයක් නොමැතිව ශුද්ධ විඥානයක් ලෙස පවතී.', en: 'The highest realm, attained by mastering the formless Dhyānas. Beings here exist as pure consciousness without any physical form.', ta: 'உருவமற்ற தியானங்களில் தேர்ச்சி பெறுவதன் மூலம் அடையப்படும் மிக உயர்ந்த உலகம். இங்குள்ள உயிரினங்கள் எந்தவொரு உடல் வடிவமும் இல்லாமல் தூய உணர்வாக இருக்கின்றன.', hi: 'अरूप ध्यानों में महारत हासिल करके प्राप्त किया गया सर्वोच्च लोक। यहां के जीव बिना किसी भौतिक रूप के शुद्ध चेतना के रूप में मौजूद होते हैं।' },
        color: 'border-l-purple-500'
    }
];

const DETAILED_EXPLANATION: Record<Language, string> = {
    si: `
        <p class="mb-4">බුදුදහමට අනුව, පුනර්භවය යනු එක් භවයකින් තවත් භවයකට ආත්මයක් ගමන් කිරීමක් නොවේ. එය හේතු-ඵල දහම මත පදනම් වූ අඛණ්ඩ ක්‍රියාවලියකි. මරණාසන්න චිත්ත වීථිය (Maranasanna Vīthi) මීළඟ භවය සඳහා හේතුව (කර්මය) සකස් කරයි. එම චුති චිත්තය නිරුද්ධ වූ සැණින්, කිසිදු අතරමැදි කාලයකින් තොරව, නව භවයේ පළමු චිත්තය වන පටිසන්ධි චිත්තය (Paṭisandhi-citta) හටගනී.</p>
        <p class="mb-4">මෙම පටිසන්ධි චිත්තය, පෙර භවයේ අවසාන ජවන් සිත්වල ස්වභාවය (කුසල් හෝ අකුසල්) මත රඳා පවතී. සුගතිගාමී කර්මයක් මරණාසන්නයේදී සිහිපත් වුවහොත්, මනුෂ්‍ය හෝ දේව වැනි සුගති භවයක පටිසandha ලබයි. දුගතිගාමී කර්මයක් සිහිපත් වුවහොත්, තිරිසන්, ප්‍රේත, අසුර හෝ නිරය වැනි දුගති භවයක උත්පත්තිය ලබයි. මෙම ක්‍රියාවලිය සම්පූර්ණයෙන්ම පුද්ගල භාවයෙන් තොර, ස්වභාවික ධර්මතාවයකි.</p>
    `,
    en: `
        <p class="mb-4">According to Buddhism, rebirth is not the transmigration of a soul from one life to another. It is a continuous process based on cause and effect. The dying mind-process (Maranasanna Vīthi) creates the cause (kamma) for the next life. As soon as the death-consciousness (Cuti-citta) ceases, without any intermediate period, the first consciousness of the new life, the rebirth-linking consciousness (Paṭisandhi-citta), arises.</p>
        <p class="mb-4">This Paṭisandhi-citta depends on the nature (wholesome or unwholesome) of the final Javana thoughts in the previous life. If a wholesome kamma is recalled at the moment of death, rebirth takes place in a happy realm, such as the human or deva world. If an unwholesome kamma is recalled, rebirth occurs in a woeful state, such as the animal, ghost, demon, or hell realms. This process is entirely impersonal, a natural law.</p>
    `,
    ta: `
        <p class="mb-4">பௌத்தத்தின்படி, மறுபிறப்பு என்பது ஒரு ஆன்மா ஒரு வாழ்க்கையிலிருந்து இன்னொரு வாழ்க்கைக்குச் செல்வதல்ல. இது காரணம் மற்றும் விளைவை அடிப்படையாகக் கொண்ட ஒரு தொடர்ச்சியான செயல்முறையாகும். மரணத்தின் போது நிகழும் இறுதி மன-செயல்முறை (மரணாசன வீதி) அடுத்த வாழ்க்கைக்கான காரணத்தை (கம்மம்) உருவாக்குகிறது. மரண-உணர்வு (சுதி-சித்தம்) நின்றவுடன், எந்த இடைவெளியும் இல்லாமல், புதிய வாழ்க்கையின் முதல் உணர்வான, மறுபிறப்பு-இணைப்பு உணர்வு (படிசந்தி-சித்தம்) எழுகிறது.</p>
        <p class="mb-4">இந்த படிசந்தி-சித்தம் முந்தைய வாழ்க்கையின் இறுதி ஜவன எண்ணங்களின் தன்மையை (நன்மை அல்லது தீமை) சார்ந்துள்ளது. மரணத்தின் தருவாயில் ஒரு நன்மையான கம்மம் நினைவுகூரப்பட்டால், மனித அல்லது தேவ உலகம் போன்ற ஒரு மகிழ்ச்சியான உலகில் மறுபிறப்பு நிகழ்கிறது. ஒரு தீய கம்மம் நினைவுகூரப்பட்டால், விலங்கு, பேய், அசுரர், அல்லது நரக உலகங்கள் போன்ற ஒரு துக்ககரமான நிலையில் மறுபிறப்பு ஏற்படுகிறது. இந்த செயல்முறை முற்றிலும் ஆள்சார்பற்றது, ஒரு இயற்கை விதி.</p>
    `,
    hi: `
        <p class="mb-4">बौद्ध धर्म के अनुसार, पुनर्जन्म एक आत्मा का एक जीवन से दूसरे जीवन में जाना नहीं है। यह कारण और प्रभाव पर आधारित एक सतत प्रक्रिया है। मरणासन्न चित्त वीथि अगले जीवन के लिए कारण (कर्म) बनाती है। जैसे ही मृत्यु-चेतना (च्युति-चित्त) समाप्त होती है, बिना किसी मध्यवर्ती अवधि के, नए जीवन की पहली चेतना, प्रतिসন্ধि-चित्त, उत्पन्न होती है।</p>
        <p class="mb-4">यह प्रतिসন্ধि-चित्त पिछले जीवन के अंतिम जवन विचारों की प्रकृति (कुशल या अकुशल) पर निर्भर करता है। यदि मृत्यु के क्षण में एक कुशल कर्म याद किया जाता है, तो पुनर्जन्म एक सुखद लोक में होता है, जैसे कि मानव या देव लोक। यदि एक अकुशल कर्म याद किया जाता है, तो पुनर्जन्म एक दुखद अवस्था में होता है, जैसे कि पशु, प्रेत, असुर, या नरक लोक। यह प्रक्रिया पूरी तरह से अवैयक्तिक है, एक प्राकृतिक नियम है।</p>
    `,
};

const initialStory: Record<Language, string> = {
    si: 'ආරම්භ කිරීමට පුනර්භව අවස්ථාවක් තෝරන්න.',
    en: 'Select a rebirth scenario to begin.',
    ta: 'தொடங்குவதற்கு ஒரு மறுபிறப்புக் காட்சியைத் தேர்ந்தெடுக்கவும்.',
    hi: 'शुरू करने के लिए एक पुनर्जन्म परिदृश्य चुनें।',
};

export const Punabbhava: React.FC = () => {
    const [speed, setSpeed] = useState(1500);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [selectedExample, setSelectedExample] = useState<RebirthScenario | null>(null);
    const [currentStory, setCurrentStory] = useState<Record<Language, string>>(initialStory);
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [cittaHistory, setCittaHistory] = useState<CittaInstance[]>([]);
    const [isCittaLogOpen, setIsCittaLogOpen] = useState(false);
    const [isDetailedOpen, setIsDetailedOpen] = useState(false);

    useEffect(() => {
        if (!isPlaying || !selectedExample) return;

        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => {
                if (prevIndex >= selectedExample.steps.length - 1) {
                    setIsPlaying(false);
                    return prevIndex;
                }
                const nextIndex = prevIndex + 1;
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

    const handleSelectExample = useCallback((example: RebirthScenario) => {
        setSelectedExample(example);
        setIsPlaying(false);
        setActiveIndex(0);
        setCurrentStory(example.initialStory);
        setCittaHistory([]);
        setIsCittaLogOpen(true);
    }, []);

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setActiveIndex(0);
        setCittaHistory([]);
        if (selectedExample) {
            setCurrentStory(selectedExample.initialStory);
        }
        setIsCittaLogOpen(false);
    }, [selectedExample]);

    const handlePlayPause = useCallback(() => {
        if (selectedExample) {
            setIsPlaying(prev => !prev);
            if (!isPlaying) {
                 if (cittaHistory.length === 0 || activeIndex >= selectedExample.steps.length - 1) {
                     handleReset();
                     // Use timeout to ensure state is reset before playing
                     setTimeout(() => {
                        const firstStep = selectedExample.steps[0];
                        const firstCitta: CittaInstance = {
                            id: `${Date.now()}-0`,
                            citta: CITTAS[firstStep.cittaId],
                            startTime: Date.now(),
                            duration: 0,
                            label: firstStep.pali,
                        };
                        setCittaHistory([firstCitta]);
                        setCurrentStory(firstStep.story);
                        setIsPlaying(true);
                     }, 100);
                } else {
                     setCurrentStory(selectedExample.steps[activeIndex].story);
                }
            }
        }
    }, [selectedExample, isPlaying, activeIndex, cittaHistory, handleReset]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(3025 - Number(e.target.value));
    };
    
    const getTranslation = (obj: Record<Language, string>) => {
        return obj[selectedLang] || obj['en'];
    };

    const toggleDetailedExplanation = () => setIsDetailedOpen(prev => !prev);

    return (
        <>
             <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6 flex flex-col gap-8">
                 <div className="pb-4 border-b border-slate-700">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold text-cyan-400">Rebirth (පුනරුත්පත්තිය)</h2>
                         <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                    </div>
                    <p className="text-slate-400 mt-1">Understanding the process of "again-becoming" and the realms of existence.</p>
                </div>
                
                <div className="flex justify-end">
                    <div className="flex items-center gap-2" role="tablist" aria-label="Language selection">
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
                
                {/* NEW INTERACTIVE SECTION */}
                <section className="pt-4 border-t border-slate-700">
                    <h3 className="text-2xl font-semibold text-slate-300 mb-4">Interactive Rebirth Visualization</h3>
                    <div className="space-y-6 bg-slate-900/40 p-6 rounded-xl border border-slate-700">
                        <div>
                            <h4 className="text-lg font-semibold text-slate-300 mb-3">1. Choose a Scenario:</h4>
                            <div className="flex flex-wrap gap-4">
                                {REBIRTH_SCENARIOS.map(example => (
                                    <button
                                        key={example.id}
                                        onClick={() => handleSelectExample(example)}
                                        className={`px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${selectedExample?.id === example.id ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}
                                        aria-pressed={selectedExample?.id === example.id}
                                    >
                                        {getTranslation(example.title)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <StoryDisplay text={getTranslation(currentStory)} />
                        
                        {selectedExample && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-slate-300 mb-4">2. Observe the Citta Vīthi Sequence:</h3>
                                <div className={`flex flex-wrap justify-center items-center gap-x-2 gap-y-4 p-4 rounded-lg transition-all duration-1000 ${selectedExample.id === 'human_to_deva' ? 'bg-gradient-to-r from-slate-800 to-blue-900/50' : 'bg-gradient-to-r from-slate-800 to-red-900/50'}`}>
                                   {selectedExample.steps.map((step, index) => (
                                       <React.Fragment key={index}>
                                            {step.pali === 'Paṭisandhi-citta' && (
                                                <div className="flex flex-col items-center mx-2 sm:mx-4">
                                                    <div className="w-1 h-12 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse rounded-full"></div>
                                                    <span className="text-xs text-purple-400 mt-1">Rebirth</span>
                                                </div>
                                            )}
                                            <div className="flex flex-col items-center gap-1 w-28 sm:w-32">
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
                                            {index < selectedExample.steps.length - 1 && step.pali !== 'Cuti-citta' && (
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
                        )}

                        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 pt-4 border-t border-slate-700">
                           <div className="flex items-center gap-3">
                                <button onClick={handlePlayPause} className="p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-all shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed" disabled={!selectedExample} aria-label={isPlaying ? "Pause" : "Play"}>
                                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                                </button>
                                <button onClick={handleReset} className="p-2 bg-slate-600 hover:bg-slate-500 rounded-full text-white transition-all shadow-lg disabled:bg-slate-700 disabled:cursor-not-allowed" disabled={!selectedExample} aria-label="Reset"><ResetIcon /></button>
                            </div>
                            <div className="flex-grow w-full md:w-auto flex items-center gap-4">
                                <label htmlFor="rebirth-speed-slider" className="text-sm font-medium text-slate-400">Speed</label>
                                <input id="rebirth-speed-slider" type="range" min="25" max="3000" step="25" value={3025 - speed} onChange={handleSliderChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" disabled={!selectedExample} />
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-slate-300 mb-4">{selectedLang === 'si' ? 'භව තල තුන' : 'The Three Realms of Existence'}</h3>
                     <div className="space-y-4">
                        {REALMS_DATA.map(realm => (
                             <div key={realm.title.en} className={`bg-slate-800 p-5 rounded-lg border-l-4 ${realm.color} shadow-md`}>
                                <h4 className="font-bold text-xl text-slate-200">{getTranslation(realm.title)}</h4>
                                <p className="text-slate-400 mt-2">{getTranslation(realm.description)}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                <section>
                    <div className="border-t border-slate-700 pt-6">
                         <button onClick={toggleDetailedExplanation} className="w-full flex justify-between items-center p-4 text-left bg-slate-900/50 rounded-lg hover:bg-slate-700/50">
                            <h3 className="text-xl font-bold text-slate-300">{selectedLang === 'si' ? 'සවිස්තරාත්මක විග්‍රහය' : 'Detailed Explanation'}</h3>
                            <div className={`transition-transform duration-300 ${isDetailedOpen ? 'rotate-180' : ''}`}><ChevronDown /></div>
                        </button>
                        {isDetailedOpen && (
                            <div className="mt-4 p-6 bg-slate-900/50 rounded-lg border border-slate-700 text-slate-300 leading-loose prose prose-invert prose-p:text-slate-300"
                                 dangerouslySetInnerHTML={{ __html: DETAILED_EXPLANATION[selectedLang] }}
                            >
                            </div>
                        )}
                    </div>
                </section>

            </div>
            {selectedExample && <div className="mt-8"><CittaLog cittaHistory={cittaHistory} isOpen={isCittaLogOpen} setIsOpen={setIsCittaLogOpen} /></div>}
             <ExplanationModal
                isOpen={isExplanationModalOpen}
                onClose={() => setIsExplanationModalOpen(false)}
                content={EXPLANATIONS.punabbhava}
            />
        </>
    );
};

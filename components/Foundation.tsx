import React, { useState } from 'react';
import type { Language, Tab } from '../types';
import { ExplanationModal } from './ExplanationModal';
import { EXPLANATIONS } from '../explanations';
import { TABS } from '../constants';

interface FoundationProps {
    setActiveTab: (tab: Tab) => void;
}

const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

const InfoButton: React.FC<{onClick: () => void}> = ({ onClick }) => (
    <button onClick={onClick} className="ml-3 text-xs bg-slate-700 text-red-400 px-2 py-1 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse" title="What is this?">
        What is this?
    </button>
);

const INTRO_CONTENT = {
    buddha: {
        title: { en: 'Who is the Buddha?', si: 'බුදුරජාණන් වහන්සේ කවුද?', ta: 'புத்தர் யார்?', hi: 'बुद्ध कौन हैं?' },
        text: { 
            en: 'The Buddha, Siddhartha Gautama, was a sage on whose teachings Buddhism was founded. He is recognized by Buddhists as an awakened or enlightened teacher who shared his insights to help sentient beings end suffering (Dukkha) through the elimination of ignorance (avijjā) and craving (taṇhā). His path leads to the attainment of the sublime state of Nibbāna.',
            si: 'බුදුරජාණන් වහන්සේ, සිද්ධාර්ථ ගෞතම, බුදුදහම ආරම්භ කරන ලද ශාස්තෘවරයාණන් වහන්සේය. උන්වහන්සේ අවිද්‍යාව (avijjā) සහ තණ්හාව (taṇhā) දුරු කිරීම තුළින් සත්වයන්ට දුකින් මිදීමට උපකාර වන තම අවබෝධය බෙදාගත්, සම්බුද්ධත්වයට පත් වූ ශ්‍රේෂ්ඨ ගුරුවරයෙකු ලෙස බෞද්ධයන් විසින් පිළිගනු ලැබේ. උන්වහන්සේගේ මාර්ගය නිර්වාණය නම් උත්තරීතර තත්වයට පත් වීමට මග පාදයි.',
            ta: 'புத்தர், சித்தார்த்த கௌதமர், ஒரு ஞானி ஆவார், அவருடைய போதனைகளின் அடிப்படையில் பௌத்தம் நிறுவப்பட்டது. பௌத்தர்களால் அவர் ஒரு விழித்தெழுந்த அல்லது ஞானம் பெற்ற ஆசிரியராக அங்கீகரிக்கப்படுகிறார், அவர் அறியாமை (அவிஜ்ஜா) மற்றும் தாகம் (தன்ஹா) ஆகியவற்றை அகற்றுவதன் மூலம் உணர்வுள்ள உயிரினங்கள் துன்பத்தை (துக்கம்) முடிவுக்குக் கொண்டுவர உதவும் தனது உள்ளுணர்வுகளைப் பகிர்ந்து கொண்டார். அவருடைய பாதை நிப்பாணத்தின் உன்னத நிலையை அடைவதற்கு வழிவகுக்கிறது.',
            hi: 'बुद्ध, सिद्धार्थ गौतम, एक ऋषि थे जिनके शिक्षणों पर बौद्ध धर्म की स्थापना हुई। उन्हें बौद्धों द्वारा एक जागृत या प्रबुद्ध शिक्षक के रूप में मान्यता प्राप्त है, जिन्होंने अज्ञान (अविज्जा) और तृष्णा (तन्हा) को समाप्त करके सचेतन प्राणियों को दुख समाप्त करने में मदद करने के लिए अपनी अंतर्दृष्टि साझा की। उनका मार्ग निब्बान की उत्कृष्ट अवस्था की प्राप्ति की ओर ले जाता है।'
        }
    },
    abhidhamma: {
        title: { en: 'What is Abhidhamma?', si: 'අභිධර්මය යනු කුමක්ද?', ta: 'அபிதம்மம் என்றால் என்ன?', hi: 'अभिधम्म क्या है?' },
        text: {
            en: 'Abhidhamma is the third "basket" of the Tipiṭaka, the Pāli Canon. It is the "higher" or "special" teaching of the Buddha, which systematically analyzes the nature of mind and matter. Unlike the Suttas which use conventional language, the Abhidhamma uses a purely philosophical and analytical language to describe reality in terms of ultimate truths (Paramārtha).',
            si: 'අභිධර්මය යනු පාලි ත්‍රිපිටකයේ තුන්වන "පිටකය" වේ. එය බුදුරජාණන් වහන්සේගේ "උසස්" හෝ "විශේෂ" දේශනාව වන අතර, එමගින් සිත සහ රූපයෙහි ස්වභාවය ක්‍රමානුකූලව විග්‍රහ කරයි. සම්මුති භාෂාව භාවිතා කරන සූත්‍ර මෙන් නොව, අභිධර්මය යථාර්ථය පරමාර්ථ සත්‍යයන්ගේ දෘෂ්ටිකෝණයෙන් විස්තර කිරීම සඳහා තනිකරම දාර්ශනික හා විශ්ලේෂණාත්මක භාෂාවක් භාවිතා කරයි.',
            ta: 'அபிதம்மம் என்பது பாளி நியதியின் திபிடகத்தின் மூன்றாவது "கூடை" ஆகும். இது புத்தரின் "உயர்" அல்லது "சிறப்பு" போதனையாகும், இது மனம் மற்றும் பொருளின் தன்மையை முறையாக பகுப்பாய்வு செய்கிறது. வழக்கமான மொழியைப் பயன்படுத்தும் சூத்திரங்களைப் போலல்லாமல், அபிதம்மம் பரமார்த்த உண்மைகளின் அடிப்படையில் யதார்த்தத்தை விவரிக்க ஒரு முற்றிலும் தத்துவார்த்த மற்றும் பகுப்பாய்வு மொழியைப் பயன்படுத்துகிறது.',
            hi: 'अभिधम्म तिपिटक, पालि कैनन की तीसरी "पिटारी" है। यह बुद्ध का "उच्च" या "विशेष" शिक्षण है, जो मन और पदार्थ की प्रकृति का व्यवस्थित रूप से विश्लेषण करता है। सुत्तों के विपरीत जो पारंपरिक भाषा का उपयोग करते हैं, अभिधम्म परमार्थ सत्यों के संदर्भ में वास्तविकता का वर्णन करने के लिए विशुद्ध रूप से दार्शनिक और विश्लेषणात्मक भाषा का उपयोग करता है।'
        }
    },
    benefit: {
        title: { en: 'Why Learn Abhidhamma?', si: 'අභිධර්මය ඉගෙන ගන්නේ ඇයි?', ta: 'அபிதம்மம் ஏன் கற்க வேண்டும்?', hi: 'अभिधम्म क्यों सीखें?' },
        text: {
            en: 'Learning Abhidhamma provides a precise framework for understanding the inner world. It helps to deconstruct the illusion of a permanent "self" by showing that a being is merely a complex, impersonal flow of mind-moments and material phenomena. This deep understanding cultivates wisdom (paññā), weakens defilements, and provides a clear map for the practice of meditation, ultimately leading to the cessation of suffering.',
            si: 'අභිධර්මය ඉගෙනීමෙන් අභ්‍යන්තර ලෝකය අවබෝධ කර ගැනීම සඳහා නිවැරදි රාමුවක් ලැබේ. සත්වයෙකු යනු සංකීර්ණ, පුද්ගල භාවයෙන් තොර චිත්තක්ෂණ සහ රූප ධර්ම ප්‍රවාහයක් පමණක් බව පෙන්වීමෙන්, "ස්ථිර ආත්මයක්" පිළිබඳ මායාව බිඳ දැමීමට එය උපකාරී වේ. මෙම ගැඹුරු අවබෝධය ප්‍රඥාව (paññā) වඩවා, කෙලෙස් දුරු කර, භාවනා පුහුණුව සඳහා පැහැදිලි සිතියමක් සපයන අතර, අවසානයේදී දුක්ඛ නිරෝධයට මග පාදයි.',
            ta: 'அபிதம்மம் கற்பது உள் உலகத்தைப் புரிந்துகொள்வதற்கான ஒரு துல்லியமான கட்டமைப்பை வழங்குகிறது. ஒரு உயிர் என்பது வெறும் சிக்கலான, ஆள்சார்பற்ற மன-கணங்கள் மற்றும் பௌதிக நிகழ்வுகளின் ஓட்டம் என்பதைக் காட்டுவதன் மூலம் ஒரு நிரந்தர "சுயத்தின்" மாயையை உடைக்க இது உதவுகிறது. இந்த ஆழமான புரிதல் ஞானத்தை (பஞ்ஞா) வளர்க்கிறது, களங்கங்களை பலவீனப்படுத்துகிறது, மற்றும் தியானப் பயிற்சிக்கு ஒரு தெளிவான வரைபடத்தை வழங்குகிறது, இறுதியில் துன்பத்தின் நிறுத்தத்திற்கு வழிவகுக்கிறது.',
            hi: 'अभिधम्म सीखना आंतरिक दुनिया को समझने के लिए एक सटीक ढाँचा प्रदान करता है। यह एक स्थायी "स्व" के भ्रम को तोड़ने में मदद करता है, यह दिखाकर कि एक जीव केवल मन-क्षणों और भौतिक घटनाओं का एक जटिल, अवैयक्तिक प्रवाह है। यह गहरी समझ प्रज्ञा (पञ्ञा) को विकसित करती है, क्लेशों को कमजोर करती है, और ध्यान के अभ्यास के लिए एक स्पष्ट नक्शा प्रदान करती है, जो अंततः दुख के निरोध की ओर ले जाती है।'
        }
    }
};


const FOUNDATION_CONTENT = {
    prajnapti: {
        title: {
            en: 'Conventional vs. Ultimate Reality',
            si: 'පරමාර්ථය හා ප්‍ර‍ඥප්තිය',
            ta: 'பரமார்த்தம் மற்றும் பிரக்ஞப்தி',
            hi: 'परमार्थ एवं प्रज्ञप्ति',
        },
        explanation: {
            en: `
                <p class="mb-4">The Abhidhamma describes two levels of truth. <strong>Prajñapti (Conventional Truth)</strong> refers to concepts, names, and ideas we use in daily life, like "person," "table," or "house." These are constructs of the mind that seem real but do not exist from an ultimate perspective. When analyzed, a "table" is found to be just a collection of material phenomena; the concept "table" disappears.</p>
                <p><strong>Paramārtha (Ultimate Truth)</strong> refers to the fundamental, irreducible realities that truly exist. These are the momentary dhammas that constitute all experience. This visualization deconstructs the conventional concept of a "table" to reveal its ultimate reality: a collection of fleeting, impersonal material phenomena (Rūpa) that are constantly arising and passing away.</p>`,
            si: `
                <p class="mb-4">අභිධර්මය සත්‍යයේ මට්ටම් දෙකක් විස්තර කරයි. <strong>ප්‍රඥප්තිය (සම්මුති සත්‍යය)</strong> යනු "පුද්ගලයා," "මේසය," හෝ "නිවස" වැනි අප එදිනෙදා ජීවිතයේදී භාවිතා කරන සංකල්ප, නම්, සහ අදහස් වේ. මේවා සැබෑ ලෙස පෙනුනද, පරමාර්ථ දෘෂ්ටියෙන් නොපවතින මනසෙහි නිර්මාණයන්ය. විග්‍රහ කළ විට, "මේසයක්" යනු භෞතික සංසිද්ධි එකතුවක් පමණක් බව පෙනී යන අතර; "මේසය" යන සංකල්පය අතුරුදහන් වේ.</p>
                <p><strong>පරමාර්ථ සත්‍යය</strong> යනු සැබවින්ම පවතින, තවදුරටත් බෙදිය නොහැකි මූලික යථාර්ථයන්ය. සියලු අත්දැකීම් සමන්විත වන්නේ මෙම ක්ෂණික ධර්මතාවයන්ගෙනි. මෙම දෘශ්‍යකරණය මගින්, සම්මුති "මේසය" යන සංකල්පය එහි පරමාර්ථ සත්‍යය වන, නිරතුරුවම ඉපදෙමින් සහ නැතිවෙමින් පවතින, පුද්ගල භාවයෙන් තොර, ක්ෂණික රූප ධර්ම සමූහයක් බවට විග්‍රහ කර පෙන්වයි.</p>`,
            ta: `
                <p class="mb-4">அபிதம்மம் இரண்டு நிலை உண்மைகளை விவரிக்கிறது. <strong>பிரக்ஞப்தி (வழக்கமான உண்மை)</strong> என்பது "நபர்," "மேசை," அல்லது "வீடு" போன்ற நாம் அன்றாட வாழ்வில் பயன்படுத்தும் கருத்துக்கள், பெயர்கள் மற்றும் எண்ணங்களைக் குறிக்கிறது. இவை உண்மையானதாகத் தோன்றினாலும், பரமார்த்த பார்வையில் இல்லாத மனதின் கட்டமைப்புகள் ஆகும். பகுப்பாய்வு செய்தால், ஒரு "மேசை" என்பது வெறும் பௌதிக நிகழ்வுகளின் தொகுப்பு என்று தெரியவரும்; "மேசை" என்ற கருத்து மறைந்துவிடும்.</p>
                <p><strong>பரமார்த்தம் (இறுதி உண்மை)</strong> என்பது உண்மையாக இருக்கும் அடிப்படை, குறைக்க முடியாத யதார்த்தங்களைக் குறிக்கிறது. எல்லா அனுபவங்களையும் உருவாக்கும் இந்த கண நேர தர்மங்கள் இவையாகும். இந்த காட்சிப்படுத்தல், வழக்கமான "மேசை" என்ற கருத்தை அதன் இறுதி உண்மையான, தொடர்ந்து தோன்றி மறைந்து கொண்டிருக்கும், ஆள்சார்பற்ற, கண நேர ரூப தர்மங்களின் தொகுப்பாகப் பிரிக்கிறது.</p>`,
            hi: `
                <p class="mb-4">अभिधम्म सत्य के दो स्तरों का वर्णन करता है। <strong>प्रज्ञप्ति (पारंपरिक सत्य)</strong> उन अवधारणाओं, नामों और विचारों को संदर्भित करता है जिनका हम दैनिक जीवन में उपयोग करते हैं, जैसे "व्यक्ति," "मेज़," या "घर"। ये मन की रचनाएँ हैं जो वास्तविक लगती हैं लेकिन परमार्थिक दृष्टिकोण से मौजूद नहीं होती हैं। विश्लेषण करने पर, एक "मेज़" केवल भौतिक घटनाओं का एक संग्रह पाया जाता है; "मेज़" की अवधारणा गायब हो जाती है।</p>
                <p><strong>परमार्थ (परम सत्य)</strong> उन मौलिक, अविभाज्य वास्तविकताओं को संदर्भित करता है जो वास्तव में मौजूद हैं। ये वे क्षणिक धम्म हैं जो सभी अनुभवों का निर्माण करते हैं। यह विज़ुअलाइज़ेशन पारंपरिक "मेज़" की अवधारणा को उसकी परमार्थ वास्तविकता में विघटित करता है: क्षणभंगुर, अवैयक्तिक भौतिक घटनाओं (रूप) का एक संग्रह जो लगातार उत्पन्न और समाप्त हो रहा है।</p>`,
        },
    },
    fourRealities: {
        title: {
            en: 'The Four Ultimate Realities',
            si: 'පරමාර්ථ සතර',
            ta: 'நான்கு இறுதி உண்மைகள்',
            hi: 'चार परमार्थ सत्य',
        },
        items: [
            {
                title: { en: 'Citta (Mind)', si: 'චිත්තය', ta: 'சித்தம் (மனம்)', hi: 'चित्त (मन)' },
                explanation: { 
                    en: 'The bare awareness or knowing of an object. It is not a static entity but a fleeting process, arising and ceasing moment by moment, forming a continuous stream.',
                    si: 'අරමුණක් දැනගැනීම පමණි. එය ස්ථිතික වස්තුවක් නොව, මොහොතින් මොහොත ඉපදී නැතිවී යමින්, අඛණ්ඩ ප්‍රවාහයක් සාදන ක්ෂණික ක්‍රියාවලියකි.',
                    ta: 'ஒரு பொருளைப் பற்றிய வெற்று விழிப்புணர்வு அல்லது அறிதல். இது ஒரு நிலையான সত্তை அல்ல, ஆனால் ஒரு கண நேர செயல்முறை, கணத்திற்குக் கணம் தோன்றி மறைந்து, ஒரு தொடர்ச்சியான ஓடையை உருவாக்குகிறது.',
                    hi: 'किसी वस्तु का मात्र जानना या बोध। यह एक स्थिर इकाई नहीं है, बल्कि एक क्षणभंगुर प्रक्रिया है, जो क्षण-क्षण उत्पन्न और समाप्त होती है, और एक सतत धारा बनाती है।'
                }
            },
            {
                title: { en: 'Cetasika (Mental Factors)', si: 'චෛතසිකය', ta: 'சைதசிகம் (மன காரணிகள்)', hi: 'चैतसिक (मानसिक कारक)' },
                explanation: { 
                    en: 'The 52 mental states that arise and perish together with the citta, giving it its unique character (e.g., feeling, perception, greed, wisdom).',
                    si: 'සිත සමඟම ඉපදී නැතිවී යන, සිතට එහි විශේෂ චරිතය ලබා දෙන මානසික තත්වයන් 52 (උදා: වේදනාව, සංඥාව, ලෝභය, ප්‍රඥාව).',
                    ta: 'சித்தத்துடன் சேர்ந்து தோன்றி மறையும் 52 மன நிலைகள், அதற்கு அதன் தனித்துவமான தன்மையைக் கொடுக்கின்றன (எ.கா., உணர்வு, கருத்து, பேராசை, ஞானம்).',
                    hi: '52 मानसिक अवस्थाएँ जो चित्त के साथ उत्पन्न और समाप्त होती हैं, उसे उसका अनूठा चरित्र देती हैं (जैसे, वेदना, संज्ञा, लोभ, प्रज्ञा)।'
                }
            },
            {
                title: { en: 'Rūpa (Matter)', si: 'රූපය', ta: 'ரூபம் (பொருள்)', hi: 'रूप (पदार्थ)' },
                explanation: { 
                    en: 'The 28 fundamental material qualities, including the four great elements (earth, water, fire, wind). They are impersonal phenomena arising from causes like kamma, mind, temperature, and nutriment.',
                    si: 'මහා භූත හතර (පඨවි, ආපෝ, තේජෝ, වායෝ) ඇතුළු මූලික භෞතික ගුණාංග 28. ඒවා කර්මය, චිත්තය, උෂ්ණත්වය සහ ආහාර වැනි හේතූන් නිසා හටගන්නා පුද්ගල භාවයෙන් තොර ධර්මතාවයන් ය.',
                    ta: 'நான்கு பெரிய கூறுகள் (பூமி, நீர், நெருப்பு, காற்று) உட்பட 28 அடிப்படைப் பொருள் குணங்கள். அவை கர்மம், மனம், வெப்பநிலை மற்றும் ஊட்டச்சத்து போன்ற காரணங்களால் எழும் ஆள்சார்பற்ற நிகழ்வுகள்.',
                    hi: 'चार महाभूतों (पृथ्वी, जल, अग्नि, वायु) सहित 28 मौलिक भौतिक गुण। ये कर्म, मन, तापमान और पोषक तत्व जैसे कारणों से उत्पन्न होने वाली अवैयक्तिक घटनाएं हैं।'
                }
            },
            {
                title: { en: 'Nibbāna (Nirvana)', si: 'නිර්වාණය', ta: 'நிப்பாணம் (நிர்வாணம்)', hi: 'निब्बान (निर्वाण)' },
                explanation: { 
                    en: 'The unconditioned reality, the complete cessation of suffering and the cycle of rebirth. It is timeless and does not arise from causes, unlike the other three realities.',
                    si: 'සියලු දුක්ඛයන්ගේ සහ පුනර්භව චක්‍රයේ නිරෝධය වන, අසංඛත වූ පරමාර්ථ සත්‍යය. එය කාලයෙන් ඔබ්බෙහි වන අතර අනෙක් සත්‍ය තුන මෙන් හේතූන්ගෙන් හට නොගනී.',
                    ta: 'நிபந்தனையற்ற உண்மை, எல்லா துன்பங்கள் மற்றும் மறுபிறப்பு சுழற்சியின் முழுமையான நிறுத்தம். இது காலமற்றது மற்றும் மற்ற மூன்று உண்மைகளைப் போல காரணங்களிலிருந்து எழுவதில்லை.',
                    hi: 'असंस्कृत वास्तविकता, सभी दुखों और पुनर्जन्म के चक्र का पूर्ण निरोध। यह कालातीत है और अन्य तीन वास्तविकताओं की तरह कारणों से उत्पन्न नहीं होता है।'
                }
            },
        ]
    },
    rupaKalapa: {
        title: {
            en: 'Rūpa Kalāpa (Material Groups)',
            si: 'රූප කලාප',
            ta: 'ரூப கலாபம் (பொருள் குழுக்கள்)',
            hi: 'रूप कलाप (भौतिक समूह)',
        },
        explanation: {
            en: `
                <p class="mb-4">In Abhidhamma, <strong>Rūpa Kalāpas</strong> are the most fundamental, microscopic units of matter. They are not atoms but indivisible clusters of material properties that arise and pass away together. Each kalāpa is born from one of four causes: <strong>Kamma</strong> (past action), <strong>Citta</strong> (consciousness), <strong>Utu</strong> (temperature), or <strong>Āhāra</strong> (nutriment).</p>
                <p>At a minimum, every kalāpa contains an "octad" (Aṭṭhaka) of 8 properties: the four great elements (Earth, Water, Fire, Wind) plus Color, Smell, Taste, and Nutriment. Depending on the type of kalāpa, additional properties like the Life Faculty (Jīvitindriya) or sense faculties (e.g., eye-sensitivity) are included.</p>`,
            si: `
                <p class="mb-4">අභිධර්මයට අනුව, <strong>රූප කලාප</strong> යනු භෞතික ද්‍රව්‍යයේ මූලිකම, අන්වීක්ෂීය ඒකක වේ. ඒවා පරමාණු නොව, එකට ඉපදී එකට නැසෙන, තවදුරටත් බෙදිය නොහැකි රූප ධර්ම සමූහයන් ය. සෑම කලාපයක්ම හේතු හතරෙන් එකකින් හට ගනී: <strong>කර්මය</strong>, <strong>චිත්තය</strong>, <strong>උතු</strong> (උෂ්ණත්වය), හෝ <strong>ආහාර</strong>.</p>
                <p>සෑම කලාපයකම අවම වශයෙන් ගුණාංග 8 කින් යුත් "අෂ්ටකයක්" අඩංගු වේ: මහා භූත හතර (පඨවි, ආපෝ, තේජෝ, වායෝ) සහ වර්ණ, ගන්ධ, රස, ඕජා. කලාප වර්ගය අනුව, ජීවිතින්ද්‍රිය හෝ ප්‍රසාද රූප (උදා: චක්ඛු ප්‍රසාදය) වැනි අමතර ගුණාංග ඇතුළත් වේ.</p>`,
            ta: `
                <p class="mb-4">அபிதம்மத்தில், <strong>ரூப கலாபங்கள்</strong> பொருளின் மிக அடிப்படையான, நுண்ணிய அலகுகளாகும். அவை அணுக்கள் அல்ல, ஆனால் ஒன்றாகத் தோன்றி மறைந்து போகும், பிரிக்க முடியாத பொருள் பண்புகளின் கொத்துக்கள். ஒவ்வொரு கலாபமும் நான்கு காரணங்களில் ஒன்றிலிருந்து பிறக்கிறது: <strong>கர்மம்</strong>, <strong>சித்தம்</strong> (உணர்வு), <strong>உது</strong> (வெப்பநிலை), அல்லது <strong>ஆகாரம்</strong> (ஊட்டச்சத்து).</p>
                <p>குறைந்தபட்சம், ஒவ்வொரு கலாபமும் 8 பண்புகளைக் கொண்ட ஒரு "எண்கிழமை" (அட்டகம்) கொண்டுள்ளது: நான்கு பெரிய கூறுகள் (பூமி, நீர், நெருப்பு, காற்று) மற்றும் நிறம், மணம், சுவை, மற்றும் ஊட்டச்சத்து. கலாபத்தின் வகையைப் பொறுத்து, உயிர் சக்தி (ஜீவிதிந்திரியம்) அல்லது புலன் திறன்கள் (எ.கா., கண்-உணர்திறன்) போன்ற கூடுதல் பண்புகள் சேர்க்கப்படுகின்றன.</p>`,
            hi: `
                <p class="mb-4">अभिधम्म में, <strong>रूप कलाप</strong> पदार्थ की सबसे मौलिक, सूक्ष्म इकाइयाँ हैं। वे परमाणु नहीं हैं, बल्कि भौतिक गुणों के अविभाज्य समूह हैं जो एक साथ उत्पन्न होते हैं और समाप्त हो जाते हैं। प्रत्येक कलाप चार कारणों में से एक से उत्पन्न होता है: <strong>कर्म</strong>, <strong>चित्त</strong> (चेतना), <strong>उतु</strong> (तापमान), या <strong>आहार</strong> (पोषक तत्व)।</p>
                <p>कम से कम, प्रत्येक कलाप में 8 गुणों का एक "अष्टक" होता है: चार महाभूत (पृथ्वी, जल, अग्नि, वायु) और वर्ण, गंध, रस, और ओज (पोषक तत्व)। कलाप के प्रकार के आधार पर, जीवन-शक्ति (जीवितिन्द्रिय) या इंद्रिय-संवेदनशीलता (जैसे, चक्षु-प्रसाद) जैसी अतिरिक्त गुण शामिल होते हैं।</p>`,
        },
    },
    cetasikas: {
        title: {
            en: 'The 52 Cetasikas (Mental Factors)',
            si: 'චෛතසික 52',
            ta: '52 சைதசிகங்கள் (மன காரணிகள்)',
            hi: '52 चैतसिक (मानसिक कारक)',
        },
        explanation: {
            en: `
                <p class="mb-4">There are 52 types of <strong>Cetasikas</strong> which are classified into three main groups:</p>
                <ul class="list-disc list-inside space-y-1 mb-4">
                    <li><strong>13 Aññasamāna (Ethically Variable):</strong> These can be wholesome or unwholesome depending on the citta they associate with.</li>
                    <li><strong>14 Akusala (Unwholesome):</strong> These arise only with unwholesome cittas.</li>
                    <li><strong>25 Sobhana (Beautiful/Wholesome):</strong> These arise only with wholesome and beautiful resultant/functional cittas.</li>
                </ul>
                <p>Among these, 7 are called <strong>Sabbacitta Sādhāraṇa (Universals)</strong> because they are present in every single moment of consciousness. They are the most fundamental building blocks of any thought.</p>`,
            si: `
                <p class="mb-4"><strong>චෛතසික</strong> වර්ග 52ක් ඇති අතර, ඒවා ප්‍රධාන කාණ්ඩ තුනකට වර්ග කර ඇත:</p>
                <ul class="list-disc list-inside space-y-1 mb-4">
                    <li><strong>අඤ්ඤසමාන චෛතසික 13:</strong> ඒවා සම්බන්ධ වන සිත අනුව කුසල් හෝ අකුසල් විය හැකිය.</li>
                    <li><strong>අකුසල චෛතසික 14:</strong> මේවා හටගන්නේ අකුසල් සිත් සමඟ පමණි.</li>
                    <li><strong>සෝභන චෛතසික 25:</strong> මේවා හටගන්නේ කුසල් සහ සෝභන විපාක/ක්‍රියා සිත් සමඟ පමණි.</li>
                </ul>
                <p>මේවා අතුරින් 7ක් <strong>සර්වචිත්ත සාධාරණ (විශ්වීය)</strong> ලෙස හැඳින්වේ, මන්ද ඒවා සෑම චිත්ත ක්ෂණයකම පවතින බැවිනි. ඕනෑම සිතුවිල්ලක මූලිකම ගොඩනැගීමේ ඒකක මේවාය.</p>`,
            ta: `
                <p class="mb-4"><strong>சைதசிகங்களில்</strong> 52 வகைகள் உள்ளன, அவை மூன்று முக்கிய குழுக்களாக வகைப்படுத்தப்பட்டுள்ளன:</p>
                <ul class="list-disc list-inside space-y-1 mb-4">
                    <li><strong>13 அஞ்ஞசமாநம் (ஒழுக்க ரீதியாக மாறக்கூடியவை):</strong> இவை அவை சேரும் சித்தத்தைப் பொறுத்து நன்மையாகவோ அல்லது தீமையாகவோ இருக்கலாம்.</li>
                    <li><strong>14 அகுசலம் (தீயவை):</strong> இவை தீய சித்தங்களுடன் மட்டுமே எழுகின்றன.</li>
                    <li><strong>25 சோபனம் (அழகான/நன்மையானவை):</strong> இவை நன்மையான மற்றும் அழகான விளைவு/செயல்பாட்டு சித்தங்களுடன் மட்டுமே எழுகின்றன.</li>
                </ul>
                <p>இவற்றில், 7 <strong>சப்பசித்த சாதாரண (உலகளாவியவை)</strong> என்று அழைக்கப்படுகின்றன, ஏனெனில் அவை உணர்வின் ஒவ்வொரு கணத்திலும் உள்ளன. அவை எந்தவொரு சிந்தனையின் மிக அடிப்படையான கட்டுமான அலகுகளாகும்.</p>`,
            hi: `
                <p class="mb-4"><strong>चैतसिक</strong> के 52 प्रकार हैं जिन्हें तीन मुख्य समूहों में वर्गीकृत किया गया है:</p>
                <ul class="list-disc list-inside space-y-1 mb-4">
                    <li><strong>13 अन्यसमान (नैतिक रूप से परिवर्तनीय):</strong> ये जिस चित्त से जुड़ते हैं, उसके आधार पर कुशल या अकुशल हो सकते हैं।</li>
                    <li><strong>14 अकुशल (अकुशल):</strong> ये केवल अकुशल चित्तों के साथ उत्पन्न होते हैं।</li>
                    <li><strong>25 शोभन (सुंदर/कुशल):</strong> ये केवल कुशल और सुंदर विपाक/क्रिया चित्तों के साथ उत्पन्न होते हैं।</li>
                </ul>
                <p>इनमें से, 7 को <strong>सब्बचित्त साधारण (सार्वभौमिक)</strong> कहा जाता है क्योंकि वे चेतना के हर एक क्षण में मौजूद होते हैं। वे किसी भी विचार के सबसे मौलिक निर्माण खंड हैं।</p>`,
        },
        universals: [
            { pali: 'Phassa', en: 'Contact', si: 'ඵස්ස', ta: 'பஸ்ஸ', hi: 'फस्स', desc: 'The coming together of consciousness, object, and sense-faculty.' },
            { pali: 'Vedanā', en: 'Feeling', si: 'වේදනා', ta: 'வேதனா', hi: 'वेदना', desc: 'The affective quality of experience: pleasant, unpleasant, or neutral.' },
            { pali: 'Saññā', en: 'Perception', si: 'සඤ්ඤා', ta: 'சஞ்ஞா', hi: 'संज्ञा', desc: 'The act of marking or recognizing an object.' },
            { pali: 'Cetanā', en: 'Volition', si: 'චේතනා', ta: 'சேதனா', hi: 'चेतना', desc: 'The mental urge or intention that directs the mind towards an object.' },
            { pali: 'Ekaggatā', en: 'One-pointedness', si: 'ඒකග්ගතා', ta: 'ஏகக்கதா', hi: 'एकाग्रता', desc: 'The focusing of the mind on a single object.' },
            { pali: 'Jīvitindriya', en: 'Life Faculty', si: 'ජීවිතින්ද්‍රිය', ta: 'ஜீவிதிந்திரியம்', hi: 'जीवितिन्द्रिय', desc: 'The factor that sustains the life of the other co-arisen mental states.' },
            { pali: 'Manasikāra', en: 'Attention', si: 'මනසිකාර', ta: 'மனசிகாரம்', hi: 'मनसिकार', desc: 'The mind\'s spontaneous turning towards an object.' },
        ],
    }
};

const AnimationCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center bg-slate-900/50 rounded-lg p-4 h-48 border border-slate-700">
        {children}
    </div>
);


export const Foundation: React.FC<FoundationProps> = ({ setActiveTab }) => {
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);

    const getTranslation = (obj: Record<Language, string>) => {
        return obj[selectedLang] || obj['en'];
    };
    
    const pathNodes = TABS.filter(t => t.id !== 'foundation').map((tab, index, arr) => {
        const angle = -110 + (index * (220 / (arr.length -1)));
        const radian = angle * (Math.PI / 180);
        const radius = 280;
        const x = 400 + radius * Math.cos(radian);
        const y = 300 + radius * Math.sin(radian);
        return { ...tab, x, y, angle };
    });

    return (
        <>
        <style>{`
            .fire-wheel { width: 1rem; height: 1rem; background-color: #f97316; border-radius: 50%; box-shadow: 0 0 10px 5px #f97316; animation: spin 0.5s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .deconstruction-container { position: relative; width: 120px; height: 80px; }
            .table-part { position: absolute; background: #a16207; border: 1px solid #713f12; transition: all 1.5s ease-in-out; }
            .table-top { width: 120px; height: 20px; top: 15px; }
            .leg { width: 10px; height: 50px; top: 35px; }
            .leg1 { left: 5px; } .leg2 { right: 5px; }
            .deconstruction-container:hover .table-top { transform: translateY(-50px) rotate(-15deg); opacity: 0; }
            .deconstruction-container:hover .leg1 { transform: translateX(-40px) rotate(25deg); opacity: 0; }
            .deconstruction-container:hover .leg2 { transform: translateX(40px) rotate(-25deg); opacity: 0; }
            .rupa-cloud { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 1.5s ease-in-out 1s; }
            .deconstruction-container:hover .rupa-cloud { opacity: 1; }
            .rupa-particle { position: absolute; width: 3px; height: 3px; background: #fde047; border-radius: 50%; animation: rupa-float 4s ease-in-out infinite alternate; }
            @keyframes rupa-float { from { transform: translateY(0px) scale(1); } to { transform: translateY(10px) scale(0.8); } }
            .citta-stream-dot { animation: citta-stream-anim 3s linear infinite; opacity: 0; }
            @keyframes citta-stream-anim { 0% { opacity: 0; transform: translateX(0); } 10% { opacity: 1; } 20% { opacity: 0; } 100% { transform: translateX(150px); opacity: 0; } }
            .cetasika-group { animation: cetasika-anim 3s ease-in-out infinite; }
            @keyframes cetasika-anim { 0%, 100% { opacity: 0; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1); } }
            .nibbana-glow { animation: nibbana-glow-anim 4s ease-in-out infinite; }
            @keyframes nibbana-glow-anim { 0%, 100% { box-shadow: 0 0 15px 5px rgba(167, 139, 250, 0.2); } 50% { box-shadow: 0 0 30px 10px rgba(167, 139, 250, 0.4); } }
            .kalapa-container { position: relative; width: 100px; height: 100px; }
            .kalapa-core { position: absolute; top: 50%; left: 50%; width: 20px; height: 20px; background: #a78bfa; border-radius: 50%; transform: translate(-50%, -50%); transition: transform 1s; }
            .kalapa-element { position: absolute; top: 50%; left: 50%; width: 10px; height: 10px; border-radius: 50%; animation: orbit 5s linear infinite; }
            @keyframes orbit { from { transform: rotate(0deg) translateX(40px) rotate(0deg); } to { transform: rotate(360deg) translateX(40px) rotate(-360deg); } }
            .universal-cetasika { position: absolute; width: 12px; height: 12px; border-radius: 50%; animation: orbit-universal 6s linear infinite; }
            @keyframes orbit-universal { from { transform: rotate(0deg) translateX(35px) rotate(0deg); } to { transform: rotate(360deg) translateX(35px) rotate(-360deg); } }
        `}</style>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6 flex flex-col gap-8">
                <header className="pb-4 border-b border-slate-700">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold text-cyan-400">Abhidhamma Foundation (අභිධර්මයේ පදනම)</h2>
                        <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                    </div>
                    <p className="text-slate-400 mt-1">Key concepts for understanding the Path of Consciousness.</p>
                </header>
                
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.values(INTRO_CONTENT).map((item, index) => (
                        <div key={index} className="bg-slate-900/40 p-5 rounded-lg border border-slate-700">
                             <h3 className="text-xl font-bold text-purple-400 mb-2">{getTranslation(item.title)}</h3>
                             <p className="text-slate-300 text-sm leading-relaxed">{getTranslation(item.text)}</p>
                        </div>
                    ))}
                </div>

                <section className="p-6 bg-slate-900/40 rounded-xl border border-slate-700">
                    <h3 className="text-2xl font-semibold text-purple-400 mb-4">{getTranslation(FOUNDATION_CONTENT.prajnapti.title)}</h3>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-slate-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: getTranslation(FOUNDATION_CONTENT.prajnapti.explanation) }} />
                        <div className="flex flex-col gap-4">
                            <AnimationCard>
                                 <div className="deconstruction-container" title="Hover over the table to see it deconstruct into its ultimate reality (Rūpa).">
                                    <div className="table-part table-top"></div>
                                    <div className="table-part leg leg1"></div>
                                    <div className="table-part leg leg2"></div>
                                    <div className="rupa-cloud">
                                        {[...Array(30)].map((_, i) => (
                                            <div key={i} className="rupa-particle" style={{ top: `${Math.random() * 90}%`, left: `${Math.random() * 90}%`, animationDelay: `${Math.random() * 4}s` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </AnimationCard>
                            <AnimationCard><div className="fire-wheel"></div></AnimationCard>
                        </div>
                    </div>
                </section>

                 <section className="p-6 bg-slate-900/40 rounded-xl border border-slate-700">
                    <h3 className="text-2xl font-semibold text-purple-400 mb-6">{getTranslation(FOUNDATION_CONTENT.fourRealities.title)}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {FOUNDATION_CONTENT.fourRealities.items.map((item, index) => (
                             <div key={item.title.en} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                <div>
                                    <h4 className="text-xl font-bold text-cyan-400 mb-2">{getTranslation(item.title)}</h4>
                                    <p className="text-sm text-slate-400">{getTranslation(item.explanation)}</p>
                                </div>
                                <AnimationCard>
                                    {index === 0 && (<div className="w-40 h-4 relative">{[...Array(5)].map((_, i) => (<div key={i} className="absolute w-4 h-4 bg-blue-400 rounded-full citta-stream-dot" style={{ animationDelay: `${i * 0.6}s` }}></div>))}</div>)}
                                    {index === 1 && (<div className="relative w-12 h-12 cetasika-group"><div className="absolute w-12 h-12 bg-blue-500 rounded-full"></div><div className="absolute top-0 left-0 w-4 h-4 bg-yellow-400 rounded-full"></div><div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full"></div><div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full"></div></div>)}
                                    {index === 2 && (<div className="relative w-16 h-16">{[...Array(10)].map((_, i) => (<div key={i} className="rupa-particle bg-yellow-600" style={{ top: `${Math.random() * 90}%`, left: `${Math.random() * 90}%`, animationDelay: `${Math.random() * 4}s`}}></div>))}</div>)}
                                    {index === 3 && (<div className="w-24 h-24 border-2 border-purple-400/50 rounded-full nibbana-glow"></div>)}
                                </AnimationCard>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="p-6 bg-slate-900/40 rounded-xl border border-slate-700">
                    <h3 className="text-2xl font-semibold text-purple-400 mb-4">{getTranslation(FOUNDATION_CONTENT.rupaKalapa.title)} (රූප කලාප)</h3>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: getTranslation(FOUNDATION_CONTENT.rupaKalapa.explanation) }} />
                        <AnimationCard>
                            <div className="kalapa-container">
                                <div className="kalapa-core"></div>
                                <div className="kalapa-element bg-yellow-600" style={{ animationDelay: '0s' }}></div>
                                <div className="kalapa-element bg-sky-500" style={{ animationDelay: '0.5s' }}></div>
                                <div className="kalapa-element bg-red-500" style={{ animationDelay: '1.0s' }}></div>
                                <div className="kalapa-element bg-slate-400" style={{ animationDelay: '1.5s' }}></div>
                                <div className="kalapa-element bg-green-400" style={{ animationDelay: '2.0s' }}></div>
                                <div className="kalapa-element bg-pink-400" style={{ animationDelay: '2.5s' }}></div>
                                <div className="kalapa-element bg-orange-400" style={{ animationDelay: '3.0s' }}></div>
                                <div className="kalapa-element bg-lime-300" style={{ animationDelay: '3.5s' }}></div>
                            </div>
                        </AnimationCard>
                    </div>
                </section>
                
                <section className="p-6 bg-slate-900/40 rounded-xl border border-slate-700">
                    <h3 className="text-2xl font-semibold text-purple-400 mb-4">{getTranslation(FOUNDATION_CONTENT.cetasikas.title)} (චෛතසික 52)</h3>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: getTranslation(FOUNDATION_CONTENT.cetasikas.explanation) }} />
                        <AnimationCard>
                             <div className="relative flex items-center justify-center">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">Citta</div>
                                {FOUNDATION_CONTENT.cetasikas.universals.map((c, i) => (
                                    <div key={c.pali} className="universal-cetasika bg-slate-400" style={{ animationDelay: `${i * 0.85}s` }} title={c.pali}></div>
                                ))}
                            </div>
                        </AnimationCard>
                    </div>
                     <div className="mt-6">
                        <h4 className="text-xl font-semibold text-cyan-400 mb-3">The 7 Universal Mental Factors (Sabbacitta Sādhāraṇa)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {FOUNDATION_CONTENT.cetasikas.universals.map(item => (
                                <div key={item.en} className="bg-slate-800/70 p-3 rounded-lg border border-slate-700">
                                    <p className="font-semibold text-slate-200">{item[selectedLang] || item['en']} <span className="text-slate-400 font-normal">({item.pali})</span></p>
                                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="p-6 bg-slate-900/40 rounded-xl border border-slate-700 overflow-hidden">
                    <h3 className="text-2xl font-semibold text-purple-400 mb-4">Explore the Path of Abhidhamma</h3>
                    <p className="text-slate-400 max-w-3xl mx-auto text-center mb-8">
                        The Foundation provides the essential concepts. Now, follow the path to explore the detailed visualizations of how these concepts operate in the stream of consciousness. Click on any step to begin.
                    </p>
                     <div className="w-full max-w-4xl mx-auto">
                        <svg viewBox="0 0 800 600" className="w-full h-auto">
                            <defs>
                                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <path 
                                d="M 50 250 Q 150 50, 400 300 T 750 350" 
                                fill="none" 
                                stroke="url(#pathGradient)" 
                                strokeWidth="5" 
                                strokeLinecap="round"
                                strokeDasharray="15 20"
                                className="animate-path-flow"
                            />
                            {pathNodes.map(node => (
                                <g 
                                    key={node.id} 
                                    className="cursor-pointer group"
                                    onClick={() => setActiveTab(node.id)}
                                >
                                    <circle cx={node.x} cy={node.y} r="14" fill="#1e293b" stroke="#64748b" strokeWidth="2" className="transition-all group-hover:stroke-cyan-400 group-hover:scale-110" />
                                    <circle cx={node.x} cy={node.y} r="5" fill="#94a3b8" className="transition-all group-hover:fill-cyan-400 group-hover:animate-pulse" />
                                    <text 
                                        x={node.x} 
                                        y={node.y > 300 ? node.y + 30 : node.y - 25}
                                        fill="#e2e8f0" 
                                        className="font-semibold text-[11px] sm:text-sm transition-colors group-hover:text-cyan-300"
                                        textAnchor="middle"
                                    >
                                        {node.label[selectedLang] || node.label['en']}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>
                </section>
            </div>

            <ExplanationModal
                isOpen={isExplanationModalOpen}
                onClose={() => setIsExplanationModalOpen(false)}
                content={EXPLANATIONS.foundation}
            />
        </>
    );
};
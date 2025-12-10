import React, { useState, useEffect, useCallback } from 'react';
import { StoryDisplay } from './StoryDisplay';
import { ExplanationModal } from './ExplanationModal';
import { EXPLANATIONS } from '../explanations';
import type { Language } from '../types';

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

const NIDANAS = [
    { name: { si: 'අවිද්‍යාව', en: 'Ignorance', ta: 'அவித்தை', hi: 'अविद्या' }, story: { si: 'සත්‍යය නොදැනීම නිසා...', en: 'Because of ignorance of reality...', ta: 'உண்மையைப் பற்றிய அறியாமையால்...', hi: 'वास्तविकता के अज्ञान के कारण...' }, time: 'past' },
    { name: { si: 'සංස්කාර', en: 'Formations', ta: 'சம்ஸ்காரம்', hi: 'संस्कार' }, story: { si: 'කර්ම සකස් වේ.', en: '...karmic formations are created.', ta: '...கர்ம உருவாக்கங்கள் உருவாகின்றன.', hi: '...कर्म संस्कार बनते हैं।' }, time: 'past' },
    { name: { si: 'විඥානය', en: 'Consciousness', ta: 'விஞ்ஞானம்', hi: 'विज्ञान' }, story: { si: 'පටිසන්ධි විඥානය හටගනී.', en: '...rebirth-linking consciousness arises.', ta: '...மறுபிறப்பு-இணைப்பு உணர்வு எழுகிறது.', hi: '...पुनर्जन्म-संयोजक चेतना उत्पन्न होती है।' }, time: 'present' },
    { name: { si: 'නාමරූප', en: 'Name & Form', ta: 'நாமரூபம்', hi: 'नामरूप' }, story: { si: 'මනස සහ ශරීරය හටගනී.', en: '...mind and body come into being.', ta: '...மனமும் உடலும் உருவாகின்றன.', hi: '...मन और शरीर अस्तित्व में आते हैं।' }, time: 'present' },
    { name: { si: 'සළායතන', en: 'Six Senses', ta: 'ஆறு इंद्रियங்கள்', hi: 'षडायतन' }, story: { si: 'ඉන්ද්‍රියන් හය වර්ධනය වේ.', en: '...the six sense bases develop.', ta: '...ஆறு புலன் தளங்கள் உருவாகின்றன.', hi: '...छह इंद्रिय आधार विकसित होते हैं।' }, time: 'present' },
    { name: { si: 'ඵස්ස', en: 'Contact', ta: 'ஸ்பரிசம்', hi: 'स्पर्श' }, story: { si: 'ඉන්ද්‍රියන් හා අරමුණු ගැටේ.', en: '...contact occurs between sense bases and objects.', ta: '...புலன் தளங்களுக்கும் பொருட்களுக்கும் இடையே தொடர்பு ஏற்படுகிறது.', hi: '...इंद्रिय आधारों और वस्तुओं के बीच संपर्क होता है।' }, time: 'present' },
    { name: { si: 'වේදනා', en: 'Feeling', ta: 'வேதனை', hi: 'वेदना' }, story: { si: 'සුඛ, දුක්, උපේක්ඛා වේදනා හටගනී.', en: '...pleasant, painful, or neutral feelings arise.', ta: '...இன்பமான, துன்பமான, அல்லது நடுநிலையான உணர்வுகள் எழுகின்றன.', hi: '...सुखद, दुखद या तटस्थ भावनाएँ उत्पन्न होती हैं।' }, time: 'present' },
    { name: { si: 'තණ්හා', en: 'Craving', ta: 'தாகம்', hi: 'तृष्णा' }, story: { si: 'වේදනාව නිසා තණ්හාව හටගනී.', en: '...craving arises for what is pleasant.', ta: '...இன்பமானவற்றிற்காக தாகம் எழுகிறது.', hi: '...सुखद के लिए तृष्णा उत्पन्न होती है।' }, time: 'present' },
    { name: { si: 'උපාදාන', en: 'Clinging', ta: 'பற்று', hi: 'उपादान' }, story: { si: 'තණ්හාව නිසා තදින් අල්ලාගැනීම හටගනී.', en: '...clinging arises from that craving.', ta: '...அந்த தாகத்திலிருந்து பற்று எழுகிறது.', hi: '...उस तृष्णा से उपादान उत्पन्न होता है।' }, time: 'present' },
    { name: { si: 'භව', en: 'Becoming', ta: 'பவம்', hi: 'भव' }, story: { si: 'උපාදානය නිසා නව භවයක් සකස් වේ.', en: '...the process of becoming for a new existence is set in motion.', ta: '...ஒரு புதிய অস্তিত্বத்திற்கான становление செயல்முறை இயக்கப்படுகிறது.', hi: '...एक नए अस्तित्व के लिए भव की प्रक्रिया गति में आती है।' }, time: 'present' },
    { name: { si: 'ජාති', en: 'Birth', ta: 'பிறப்பு', hi: 'जाति' }, story: { si: 'එනිසා නැවත ඉපදීමක් සිදු වේ.', en: '...consequently, birth takes place.', ta: '...விளைவாக, பிறப்பு ஏற்படுகிறது.', hi: '...परिणामस्वरूप, जन्म होता है।' }, time: 'future' },
    { name: { si: 'ජරා මරණ', en: 'Aging & Death', ta: 'மூப்பு & மரணம்', hi: 'जरा-मरण' }, story: { si: 'ඉපදීම නිසා ජරාව, මරණය හා දුක හටගනී.', en: '...and with birth comes aging, death, and sorrow.', ta: '...பிறப்புடன் மூப்பு, மரணம் மற்றும் துக்கம் வருகிறது.', hi: '...और जन्म के साथ vieillissement, मृत्यु और दुःख आते हैं।' }, time: 'future' },
];

const DETAILED_TEXT: Record<Language, string> = {
    si: `
        <p class="mb-4">මේ පටිච්ච සමුප්පාදයෙහි කාල තුනක් ද, අඞ්ග දොළොසක් ද, ආකාර විස්සක් ද, සන්ධි තුනක් ද, කොට්ඨාස සතරක් ද, වෘත්ත තුනක් ද, මූල දෙකක් ද ඇත්තේ ය. පටිච්ච සමුප්පාදය පිළිබඳ දැනීම සම්පූර්ණ වීමට ඒවා ද දත යුතු ය.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">කාල තුන</h4>
        <p class="mb-4">අවිජ්ජා - සඞ්ඛාර යන අඞ්ග දෙක අතීත කාලයකට අයත් ය. ජාති - ජරා මරණ යන අඞ්ග දෙක අනාගත කාලයට අයත් ය. විඤ්ඤාණයේ සිට භවය දක්වා අඞ්ග අට වර්තමාන කාලයට අයත් ය.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">අඞ්ග දොළොස</h4>
        <p class="mb-4">අවිද්‍යාව, සංස්කාරය, විඥානය, නාමරූපය, ෂඩායතනය, ස්පර්ශය, වේදනාව, තෘෂ්ණාව, උපාදානය, භවය, ජාතිය, ජරාමරණය.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">සන්ධි තුන</h4>
        <p class="mb-4">අතීත හේතු (සඞ්ඛාර) සහ වර්තමාන ඵල (විඤ්ඤාණ) අතර; වර්තමාන ඵල (වේදනා) සහ වර්තමාන හේතු (තණ්හා) අතර; වර්තමාන හේතු (භව) සහ අනාගත ඵල (ජාති) අතර සන්ධි තුනකි.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">ආකාර විස්ස</h4>
        <p class="mb-4">අතීත හේතු 5 (අවිජ්ජා, සඞ්ඛාර, තණ්හා, උපාදාන, භව). වර්තමාන ඵල 5 (විඤ්ඤාණ, නාමරූප, සළායතන, ඵස්ස, වේදනා). වර්තමාන හේතු 5 (තණ්හා, උපාදාන, භව, අවිජ්ජා, සඞ්ඛාර). අනාගත ඵල 5 (විඤ්ඤාණ, නාමරූප... නැවත). මෙම ධර්ම විස්සට ආකාර විස්ස යයි කියනු ලැබේ.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">වෘත්ත තුන</h4>
        <p class="mb-4"><strong>ක්ලේශ වෘත්තය:</strong> අවිජ්ජා, තණ්හා, උපාදාන. <strong>කර්ම වෘත්තය:</strong> සංස්කාරය, කර්ම භවය. <strong>විපාක වෘත්තය:</strong> විඥානය, නාමරූපය, ෂඩායතනය, ඵස්සය, වේදනාව, ජාතිය, ජරාමරණය.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">මූල දෙක</h4>
        <p class="mb-4">අවිද්‍යාව සහ තෘෂ්ණාව සංසාර චක්‍රයේ මූල ධර්ම දෙකයි. මේ දෙක නැති කිරීමෙන් සංසාර චක්‍රය සිඳෙන්නේ ය.</p>
    `,
    en: `
        <p class="mb-4">In this Paticcasamuppāda, there are three time periods, twelve links, twenty modes, three connections, four sections, three rounds, and two roots. To fully understand Dependent Origination, these must also be known.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">The Three Times</h4>
        <p class="mb-4">The two links of Ignorance (Avijjā) and Formations (Saṅkhāra) belong to the past. The two links of Birth (Jāti) and Aging & Death (Jarāmaraṇa) belong to the future. The eight links from Consciousness (Viññāṇa) to Becoming (Bhava) belong to the present.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">The Twelve Links</h4>
        <p class="mb-4">Ignorance, Formations, Consciousness, Name-and-Form, Six Sense Bases, Contact, Feeling, Craving, Clinging, Becoming, Birth, Aging-and-Death.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">The Three Connections</h4>
        <p class="mb-4">Between past causes (Formations) and present effects (Consciousness); between present effects (Feeling) and present causes (Craving); and between present causes (Becoming) and future effects (Birth).</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">The Twenty Modes</h4>
        <p class="mb-4">5 past causes (Ignorance, Formations, Craving, Clinging, Becoming). 5 present effects (Consciousness, Name-and-Form, Six Sense Bases, Contact, Feeling). 5 present causes (Craving, Clinging, Becoming, Ignorance, Formations). 5 future effects (Consciousness, Name-and-Form... again). These twenty are called the twenty modes.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">The Three Rounds</h4>
        <p class="mb-4"><strong>Round of Defilements (Kilesa Vaṭṭa):</strong> Ignorance, Craving, Clinging. <strong>Round of Kamma (Kamma Vaṭṭa):</strong> Formations, Kamma-Becoming. <strong>Round of Results (Vipāka Vaṭṭa):</strong> Consciousness, Name-and-Form, Six Sense Bases, Contact, Feeling, Birth, Aging-and-Death.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">The Two Roots</h4>
        <p class="mb-4">Ignorance and Craving are the two root conditions of the cycle of Saṃsāra. By eliminating these two, the cycle is broken.</p>
    `,
    ta: `
        <p class="mb-4">இந்த பட்டிக்கசமுப்பாதத்தில் மூன்று காலங்கள், பன்னிரண்டு அங்கங்கள், இருபது முறைகள், மூன்று சந்திப்புகள், நான்கு பிரிவுகள், மூன்று வட்டங்கள் மற்றும் இரண்டு வேர்கள் உள்ளன. சார்பு உற்பத்தியை முழுமையாகப் புரிந்து கொள்ள, இவையும் அறியப்பட வேண்டும்.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">மூன்று காலங்கள் (முக்காலம்)</h4>
        <p class="mb-4">அறியாமை (அவிஜ்ஜா) மற்றும் சம்ஸ்காரங்கள் (சங்கார) ஆகிய இரண்டு அங்கங்கள் கடந்த காலத்தைச் சேர்ந்தவை. பிறப்பு (ஜாதி) மற்றும் மூப்பு & மரணம் (ஜராமரண) ஆகிய இரண்டு அங்கங்கள் எதிர்காலத்தைச் சேர்ந்தவை. உணர்வு (விஞ்ஞானம்) முதல் பவம் (பவ) வரையிலான எட்டு அங்கங்கள் நிகழ்காலத்தைச் சேர்ந்தவை.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">பன்னிரண்டு அங்கங்கள்</h4>
        <p class="mb-4">அறியாமை, சம்ஸ்காரங்கள் (செய்கைகள்), விஞ்ஞானம் (அறிவு), நாமரூபம் (பெயரும் உருவும்), ஆறு புலன்கள் (வாயில்கள்), தொடுகை (ஊறு), உணர்வு (நுகர்ச்சி), தாகம் (வேட்கை), பற்று, பவம் (உண்டாதல்), பிறப்பு (தோற்றம்), மூப்பு-மரணம் (வினைப்பயன்).</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">மூன்று சந்திப்புகள்</h4>
        <p class="mb-4">கடந்தகால காரணங்களுக்கும் (சம்ஸ்காரங்கள்) நிகழ்கால விளைவுகளுக்கும் (விஞ்ஞானம்) இடையில்; நிகழ்கால விளைவுகளுக்கும் (உணர்வு) நிகழ்கால காரணங்களுக்கும் (தாகம்) இடையில்; நிகழ்கால காரணங்களுக்கும் (பவம்) எதிர்கால விளைவுகளுக்கும் (பிறப்பு) இடையில் மூன்று சந்திப்புகள் உள்ளன.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">இருபது முறைகள்</h4>
        <p class="mb-4">5 கடந்தகால காரணங்கள் (அறியாமை, சம்ஸ்காரங்கள், தாகம், பற்று, பவம்). 5 நிகழ்கால விளைவுகள் (விஞ்ஞானம், நாமரூபம், ஆறு புலன்கள், தொடுகை, உணர்வு). 5 நிகழ்கால காரணங்கள் (தாகம், பற்று, பவம், அறியாமை, சம்ஸ்காரங்கள்). 5 எதிர்கால விளைவுகள் (விஞ்ஞானம், நாமரூபம்... மீண்டும்). இந்த இருபது தர்மங்களும் இருபது முறைகள் என்று அழைக்கப்படுகின்றன.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">மூன்று வட்டங்கள்</h4>
        <p class="mb-4"><strong>கிளேச வட்டம் (மாசு வட்டம்):</strong> அறியாமை, தாகம், பற்று. <strong>கர்ம வட்டம் (செயல் வட்டம்):</strong> சம்ஸ்காரங்கள், கர்ம-பவம். <strong>விபாக வட்டம் (விளைவு வட்டம்):</strong> விஞ்ஞானம், நாமரூபம், ஆறு புலன்கள், தொடுகை, உணர்வு, பிறப்பு, மூப்பு-மரணம்.</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">இரண்டு வேர்கள்</h4>
        <p class="mb-4">அறியாமை மற்றும் தாகம் ஆகியவை சம்சார சக்கரத்தின் இரண்டு மூல காரணங்கள். இவை இரண்டையும் நீக்குவதன் மூலம், சக்கரம் உடைக்கப்படுகிறது.</p>
    `,
    hi: `
        <p class="mb-4">इस प्रतीत्यसमुत्पाद में तीन काल, बारह अंग, बीस आकार, तीन संधियाँ, चार संक्षेप, तीन वृत्त और दो मूल हैं। प्रतीत्यसमुत्पाद को पूरी तरह समझने के लिए इन्हें भी जानना चाहिए।</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">तीन काल</h4>
        <p class="mb-4">अविद्या और संस्कार ये दो अंग अतीत काल के हैं। जाति और जरा-मरण ये दो अंग भविष्य काल के हैं। विज्ञान से लेकर भव तक आठ अंग वर्तमान काल के हैं।</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">बारह अंग</h4>
        <p class="mb-4">अविद्या, संस्कार, विज्ञान, नाम-रूप, षडायतन, स्पर्श, वेदना, तृष्णा, उपादान, भव, जाति, जरा-मरण।</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">तीन संधियाँ</h4>
        <p class="mb-4">अतीत हेतु (संस्कार) और वर्तमान फल (विज्ञान) के बीच; वर्तमान फल (वेदना) और वर्तमान हेतु (तृष्णा) के बीच; और वर्तमान हेतु (भव) और भविष्य फल (जाति) के बीच तीन संधियाँ हैं।</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">बीस आकार</h4>
        <p class="mb-4">5 अतीत हेतु (अविद्या, संस्कार, तृष्णा, उपादान, भव)। 5 वर्तमान फल (विज्ञान, नाम-रूप, षडायतन, स्पर्श, वेदना)। 5 वर्तमान हेतु (तृष्णा, उपादान, भव, अविद्या, संस्कार)। 5 भविष्य फल (विज्ञान, नाम-रूप... पुनः)। इन बीस धर्मों को बीस आकार कहा जाता है।</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">तीन वृत्त</h4>
        <p class="mb-4"><strong>क्लेश वृत्त:</strong> अविद्या, तृष्णा, उपादान। <strong>कर्म वृत्त:</strong> संस्कार, कर्म-भव। <strong>विपाक वृत्त:</strong> विज्ञान, नाम-रूप, षडायतन, स्पर्श, वेदना, जाति, जरा-मरण।</p>
        <h4 class="text-xl font-semibold text-cyan-400 mt-6 mb-3">दो मूल</h4>
        <p class="mb-4">अविद्या और तृष्णा संसार चक्र के दो मूल कारण हैं। इन दोनों को नष्ट करने से चक्र टूट जाता है।</p>
    `,
};

const initialStory: Record<Language, string> = {
    si: 'ආරම්භ කිරීමට play බොත්තම ඔබන්න.',
    en: 'Press play to begin.',
    ta: 'தொடங்க ப்ளே பொத்தானை அழுத்தவும்.',
    hi: 'शुरू करने के लिए प्ले बटन दबाएं।',
};

export const Paticcasamuppada: React.FC = () => {
    const [speed, setSpeed] = useState(2000);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentStory, setCurrentStory] = useState<Record<Language, string>>(initialStory);
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [isDetailedOpen, setIsDetailedOpen] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;

        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % NIDANAS.length;
                setCurrentStory(NIDANAS[nextIndex].story);
                return nextIndex;
            });
        }, speed);

        return () => clearInterval(intervalId);
    }, [speed, isPlaying]);

    const handlePlayPause = useCallback(() => {
        setIsPlaying(prev => !prev);
        if (!isPlaying) {
             setCurrentStory(NIDANAS[activeIndex].story);
        }
    }, [isPlaying, activeIndex]);

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setActiveIndex(0);
        setCurrentStory(initialStory);
    }, []);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(4025 - Number(e.target.value));
    };
    
    const getTranslation = (obj: Record<Language, string>) => obj[selectedLang] || obj['en'];

    return (
        <>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6 flex flex-col gap-8">
                <div className="pb-4 border-b border-slate-700">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold text-cyan-400">Paticcasamuppāda (පටිච්චසමුප්පාදය)</h2>
                        <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                    </div>
                    <p className="text-slate-400 mt-1">Visualizing the Wheel of Dependent Origination.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-slate-900/40 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3">
                        <button onClick={handlePlayPause} className="p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-all shadow-lg">
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <button onClick={handleReset} className="p-2 bg-slate-600 hover:bg-slate-500 rounded-full text-white transition-all shadow-lg"><ResetIcon /></button>
                    </div>
                    <div className="flex-grow w-full md:w-auto flex items-center gap-4">
                        <label htmlFor="paticca-speed-slider" className="text-sm font-medium text-slate-400">Speed</label>
                        <input id="paticca-speed-slider" type="range" min="25" max="4000" step="25" value={4025 - speed} onChange={handleSliderChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-2 pl-4 border-l border-slate-600" role="tablist">
                        {LANGUAGES.map(lang => (
                            <button key={lang.id} onClick={() => setSelectedLang(lang.id)} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${selectedLang === lang.id ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`} role="tab" aria-selected={selectedLang === lang.id}>
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full aspect-square max-w-lg mx-auto relative flex items-center justify-center">
                    {/* The Chakra/Wheel */}
                    <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                    <div className="absolute inset-8 border-2 border-slate-700/50 rounded-full"></div>
                    
                    {NIDANAS.map((nidana, index) => {
                        const angle = index * 30;
                        const isActive = isPlaying && activeIndex === index;
                        const timeColor = nidana.time === 'past' ? 'text-yellow-400' : nidana.time === 'present' ? 'text-cyan-400' : 'text-purple-400';
                        return (
                            <div
                                key={index}
                                className="absolute w-24 h-24 flex items-center justify-center"
                                style={{
                                    transform: `rotate(${angle}deg) translateY(-150px) rotate(-${angle}deg)`
                                }}
                            >
                                <div className={`w-full h-full rounded-full border-2 flex flex-col items-center justify-center text-center p-1 transition-all duration-500 ${isActive ? 'bg-purple-600 border-purple-400 scale-110 shadow-lg shadow-purple-500/50' : 'bg-slate-800 border-slate-600'}`}>
                                    <span className="text-white font-bold text-xs">{getTranslation(nidana.name)}</span>
                                    <span className={`text-xs ${timeColor}`}>{nidana.time}</span>
                                </div>
                            </div>
                        )
                    })}
                    
                    {/* Central Story Display */}
                    <div className="w-48 h-48 bg-slate-900/70 rounded-full flex items-center justify-center p-4 text-center border-2 border-slate-600 shadow-xl">
                        <p className="text-slate-300 italic text-sm animate-citta-arise" key={getTranslation(currentStory)}>
                           "{getTranslation(currentStory)}"
                        </p>
                    </div>
                </div>
                
                {/* Detailed Explanation Section */}
                <div className="pt-6 border-t border-slate-700">
                    <button onClick={() => setIsDetailedOpen(prev => !prev)} className="w-full flex justify-between items-center p-4 text-left bg-slate-900/50 rounded-lg hover:bg-slate-700/50">
                        <h3 className="text-xl font-bold text-slate-300">Detailed Explanation (විස්තරය)</h3>
                        <div className={`transition-transform duration-300 ${isDetailedOpen ? 'rotate-180' : ''}`}><ChevronDown /></div>
                    </button>
                    {isDetailedOpen && (
                        <div className="mt-4 p-6 bg-slate-900/50 rounded-lg border border-slate-700 text-slate-300 leading-loose prose prose-invert max-w-none prose-p:text-slate-300 prose-ul:text-slate-300 prose-strong:text-slate-200"
                            dangerouslySetInnerHTML={{ __html: DETAILED_TEXT[selectedLang] || DETAILED_TEXT['en'] }}
                        >
                        </div>
                    )}
                </div>

            </div>
            <ExplanationModal
                isOpen={isExplanationModalOpen}
                onClose={() => setIsExplanationModalOpen(false)}
                content={EXPLANATIONS.paticcasamuppada}
            />
        </>
    );
};
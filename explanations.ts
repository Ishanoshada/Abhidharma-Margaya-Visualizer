import type { Language } from './types';

export interface ExplanationContent {
    title: Record<Language, string>;
    body: Record<Language, string>;
}

export const EXPLANATIONS: Record<string, ExplanationContent> = {
    foundation: {
        title: {
            en: 'Abhidhamma Foundation',
            si: 'අභිධර්මයේ පදනම',
            ta: 'அபிதம்ம அடித்தளம்',
            hi: 'अभिधम्म की नींव',
        },
        body: {
            en: `
                <p class="mb-4">This section explains the foundational concepts from the Abhidhamma that are necessary to understand Citta Vīthi. It covers the distinction between conventional reality (Prajñapti) and ultimate reality (Paramārtha), and defines the four ultimate realities.</p>
                <p class="mb-4">Each concept is paired with an animation to make it easier to grasp:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Conventional vs. Ultimate Reality:</strong> Watch how a conventional concept like a "table" is deconstructed into its ultimate components, which are just fleeting material phenomena (Rūpa). The "fire-wheel" is another classic example of a concept that appears real but isn't.</li>
                    <li><strong>The Four Ultimate Realities (Paramārtha):</strong> These are the only things that truly exist from an ultimate perspective.
                        <ul class="list-decimal list-inside ml-6 mt-2 space-y-1">
                           <li><strong>Citta (Mind/Consciousness):</strong> The bare awareness of an object. It is a fleeting process, not a solid thing.</li>
                           <li><strong>Cetasika (Mental Factors):</strong> The mental states that arise with each Citta, coloring and defining it (e.g., feeling, perception, volition).</li>
                           <li><strong>Rūpa (Matter):</strong> The fundamental material elements and their properties. All physical phenomena are composed of these.</li>
                           <li><strong>Nibbāna (Nirvana):</strong> The unconditioned reality, the complete cessation of suffering, which is beyond the other three conditioned realities.</li>
                        </ul>
                    </li>
                </ul>
                <p>Understanding this philosophical foundation is key to appreciating the depth of the Citta Vīthi visualizations in the other tabs.</p>
            `,
            si: `
                <p class="mb-4">මෙම කොටස චිත්ත වීථි අවබෝධ කර ගැනීමට අවශ්‍ය අභිධර්මයේ මූලික සංකල්ප පැහැදිලි කරයි. එය සම්මුති සත්‍යය (ප්‍රඥප්ති) සහ පරමාර්ථ සත්‍යය අතර වෙනසත්, පරමාර්ථ සත්‍ය හතරත් විග්‍රහ කරයි.</p>
                <p class="mb-4">සෑම සංකල්පයක්ම පහසුවෙන් අවබෝධ කර ගැනීම සඳහා සජීවීකරණයක් සමඟ යුගල කර ඇත:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>සම්මුති සහ පරමාර්ථ සත්‍යය:</strong> "මේසයක්" වැනි සම්මුති සංකල්පයක් එහි පරමාර්ථ සංඝටක වන ක්ෂණිකව නැසෙන රූප බවට විග්‍රහ වන ආකාරය නරඹන්න. "ගිනි වළල්ල" යනු සැබෑ ලෙස පෙනුනද එසේ නොවන සංකල්පයකට තවත් සම්භාව්‍ය උදාහරණයකි.</li>
                    <li><strong>පරමාර්ථ සත්‍ය හතර:</strong> පරමාර්ථ දෘෂ්ටිකෝණයෙන් සැබවින්ම පවතින එකම දේවල් මේවාය.
                        <ul class="list-decimal list-inside ml-6 mt-2 space-y-1">
                           <li><strong>චිත්ත (සිත/විඤ්ඤාණය):</strong> අරමුණක නිරුවත් දැනුවත්භාවයයි. එය ඝන දෙයක් නොව ක්ෂණික ක්‍රියාවලියකි.</li>
                           <li><strong>චෛතසික (මානසික සාධක):</strong> සෑම චිත්තයක් සමඟම පැන නගින, එය වර්ණවත් කර නිර්වචනය කරන මානසික තත්වයන් (උදා: වේදනාව, සංඥාව, චේතනාව).</li>
                           <li><strong>රූප:</strong> මූලික භෞතික මූලද්‍රව්‍ය සහ ඒවායේ ගුණාංග. සියලුම භෞතික සංසිද්ධි මේවායින් සෑදී ඇත.</li>
                           <li><strong>නිබ්බාන (නිර්වාණය):</strong> අනෙක් පරමාර්ථ තුනෙන් ඔබ්බෙහි වූ, දුක්ඛයේ සම්පූර්ණ නිරෝධය වන, අසංඛත වූ පරමාර්ථ සත්‍යයයි.</li>
                        </ul>
                    </li>
                </ul>
                <p>මෙම දාර්ශනික පදනම අවබෝධ කර ගැනීම අනෙකුත් ටැබ් වල ඇති චිත්ත වීථි දෘශ්‍යකරණයේ ගැඹුර අගය කිරීමට යතුරයි.</p>
            `,
            ta: `
                <p class="mb-4">இந்த பகுதி, சித்த வீதியைப் புரிந்துகொள்ளத் தேவையான அபிதம்மத்தின் அடிப்படைக் கருத்துக்களை விளக்குகிறது. இது வழக்கமான உண்மை (பிரக்ஞப்தி) மற்றும் இறுதி உண்மை (பரமார்த்தம்) ஆகியவற்றுக்கு இடையேயான வேறுபாட்டையும், நான்கு இறுதி உண்மைகளையும் வரையறுக்கிறது.</p>
                <p class="mb-4">ஒவ்வொரு கருத்தும் எளிதில் புரிந்துகொள்வதற்காக ஒரு அனிமேஷனுடன் இணைக்கப்பட்டுள்ளது:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>வழக்கமான மற்றும் இறுதி உண்மை:</strong> "மேசை" போன்ற ஒரு வழக்கமான கருத்து அதன் இறுதி கூறுகளான, கண நேரத்தில் அழியும் பொருள்தன்மை நிகழ்வுகளாக (ரூபம்) எவ்வாறு பிரிக்கப்படுகிறது என்பதைப் பாருங்கள். "தீ வளையம்" என்பது உண்மையானதாகத் தோன்றும் ஆனால் இல்லாத ஒரு கருத்துக்கு மற்றொரு சிறந்த எடுத்துக்காட்டு.</li>
                    <li><strong>நான்கு இறுதி உண்மைகள் (பரமார்த்தம்):</strong> ஒரு இறுதி கண்ணோட்டத்தில் உண்மையாக இருக்கும் ஒரே விஷயங்கள் இவைதான்.
                        <ul class="list-decimal list-inside ml-6 mt-2 space-y-1">
                           <li><strong>சித்தம் (மனம்/உணர்வு):</strong> ஒரு பொருளின் வெற்று விழிப்புணர்வு. இது ஒரு திடமான பொருள் அல்ல, ஒரு கண நேர செயல்முறை.</li>
                           <li><strong>சைதசிகம் (மன காரணிகள்):</strong> ஒவ்வொரு சித்தத்துடனும் எழும் மன நிலைகள், அதை வண்ணமயமாக்கி வரையறுக்கின்றன (எ.கா., உணர்வு, கருத்து, நோக்கம்).</li>
                           <li><strong>ரூபம் (பொருள்):</strong> அடிப்படைப் பொருள் கூறுகள் மற்றும் அவற்றின் பண்புகள். அனைத்து பௌதிக நிகழ்வுகளும் இவற்றால் ஆனவை.</li>
                           <li><strong>நிப்பாணம் (நிர்வாணம்):</strong> நிபந்தனையற்ற உண்மை, துன்பத்தின் முழுமையான நிறுத்தம், இது மற்ற மூன்று நிபந்தனைக்குட்பட்ட உண்மைகளுக்கு அப்பாற்பட்டது.</li>
                        </ul>
                    </li>
                </ul>
                <p>இந்த தத்துவார்த்த அடித்தளத்தைப் புரிந்துகொள்வது மற்ற தாவல்களில் உள்ள சித்த வீதி காட்சிப்படுத்தல்களின் ஆழத்தைப் பாராட்டுவதற்கான திறவுகோலாகும்.</p>
            `,
            hi: `
                <p class="mb-4">यह खंड अभिधम्म की उन मूलभूत अवधारणाओं की व्याख्या करता है जो चित्त वीथि को समझने के लिए आवश्यक हैं। यह पारंपरिक वास्तविकता (प्रज्ञप्ति) और परमार्थ वास्तविकता के बीच के अंतर को कवर करता है, और चार परमार्थ सत्यों को परिभाषित करता है।</p>
                <p class="mb-4">प्रत्येक अवधारणा को आसानी से समझने के लिए एक एनीमेशन के साथ जोड़ा गया है:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>पारंपरिक बनाम परमार्थ वास्तविकता:</strong> देखें कि कैसे "मेज़" जैसी एक पारंपरिक अवधारणा को उसके परमार्थ घटकों में विघटित किया जाता है, जो केवल क्षणभंगुर भौतिक घटनाएं (रूप) हैं। "अग्नि चक्र" एक और उत्कृष्ट उदाहरण है जो वास्तविक प्रतीत होता है लेकिन है नहीं।</li>
                    <li><strong>चार परमार्थ सत्य:</strong> ये एकमात्र चीजें हैं जो वास्तव में एक परमार्थ दृष्टिकोण से मौजूद हैं।
                        <ul class="list-decimal list-inside ml-6 mt-2 space-y-1">
                           <li><strong>चित्त (मन/चेतना):</strong> किसी वस्तु की नग्न जागरूकता। यह एक ठोस चीज़ नहीं, बल्कि एक क्षणभंगुर प्रक्रिया है।</li>
                           <li><strong>चैतसिक (मानसिक कारक):</strong> प्रत्येक चित्त के साथ उत्पन्न होने वाली मानसिक अवस्थाएँ, जो उसे रंग और परिभाषित करती हैं (जैसे, वेदना, संज्ञा, चेतना)।</li>
                           <li><strong>रूप (पदार्थ):</strong> मौलिक भौतिक तत्व और उनके गुण। सभी भौतिक घटनाएं इनसे बनी हैं।</li>
                           <li><strong>निब्बान (निर्वाण):</strong> अות्पादित वास्तविकता, दुख का पूर्ण निरोध, जो अन्य तीन वातानुकूलित वास्तविकताओं से परे है।</li>
                        </ul>
                    </li>
                </ul>
                <p>इस दार्शनिक नींव को समझना अन्य टैब में चित्त वीथि विज़ुअलाइज़ेशन की गहराई की सराहना करने की कुंजी है।</p>
            `,
        }
    },
    cittaVithi: {
        title: {
            en: 'What is Citta Vīthi?',
            si: 'චිත්ත වීථි යනු කුමක්ද?',
            ta: 'சித்த வீதி என்றால் என்ன?',
            hi: 'चित्त वीथि क्या है?',
        },
        body: {
            en: `
                <p class="mb-4">A <strong>Citta Vīthi</strong> (mind-process) is a sequence of mind-moments (cittas) that arise and pass away with incredible speed to process a single object, like a sight or a thought.</p>
                <p class="mb-4">The fundamental purpose of this visualization is to understand the concept of <strong>Anatta (Non-Self)</strong>. There is no permanent "person" or "I" behind this process. Instead, what we call a "being" is just this incredibly fast, impersonal stream of consciousness (<em>citta-paramparā</em>) flowing from moment to moment.</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Anicca (Impermanence):</strong> Each citta in the timeline flashes into existence for a single moment and then immediately perishes, never to return. This demonstrates the radically impermanent nature of our consciousness.</li>
                    <li><strong>Dukkha (Unsatisfactoriness):</strong> Because this process is uncontrollable, impersonal, and constantly changing, relying on it for lasting happiness is inherently stressful and unsatisfactory.</li>
                    <li><strong>Anatta (Non-Self):</strong> The sequence follows its own natural laws. There is no soul, self, or agent directing it. It is an empty, conditioned process.</li>
                </ul>
                <p>By observing this, we can weaken the deep-rooted illusion of a self and see reality as it is: a dynamic flow of cause and effect.</p>
            `,
            si: `
                <p class="mb-4"><strong>චිත්ත වීථියක්</strong> යනු එක් අරමුණක් (රූපයක් හෝ සිතුවිල්ලක් වැනි) දැනගැනීම සඳහා අතිශය වේගයෙන් ඉපදී නැතිවී යන චිත්තයන්ගේ (සිත්වල) අනුපිළිවෙලකි.</p>
                <p class="mb-4">මෙම දෘශ්‍යකරණයේ මූලික අරමුණ වනුයේ <strong>අනාත්ම (Non-Self)</strong> සංකල්පය අවබෝධ කර ගැනීමයි. මෙම ක්‍රියාවලිය පිටුපස ස්ථිර "පුද්ගලයෙක්" හෝ "මම" යනුවෙන් කිසිවෙකු නොමැත. ඒ වෙනුවට, "සත්වයෙක්" යනු මොහොතින් මොහොත ගලා යන මෙම අතිශය වේගවත්, පුද්ගල භාවයෙන් තොර සිත් පරපුර (<em>චිත්ත-පරම්පරා</em>) පමණි.</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>අනිත්‍ය (Impermanence):</strong> මෙම කාල රාමුවේ ඇති සෑම චිත්තයක්ම එක් මොහොතකට පමණක් ඉපදී, වහාම නිරුද්ධ වී යයි. නැවත කිසි දිනෙක එයම හට නොගනී. අපගේ විඥානයේ ඇති අනිත්‍ය ස්වභාවය මින් පෙන්නුම් කරයි.</li>
                    <li><strong>දුක්ඛ (Unsatisfactoriness):</strong> මෙම ක්‍රියාවලිය පාලනය කළ නොහැකි, පුද්ගල භාවයෙන් තොර සහ නිරන්තරයෙන් වෙනස් වන බැවින්, සදාකාලික සතුටක් සඳහා එය මත යැපීම සහජයෙන්ම දුක්ඛදායකය.</li>
                    <li><strong>අනාත්ම (Non-Self):</strong> මෙම අනුපිළිවෙල එහි ස්වභාවික ධර්මතා අනුවම සිදුවේ. එය මෙහෙයවන ආත්මයක්, පුද්ගලයෙක් හෝ කාරකයෙක් නැත. එය හුදෙක් හේතුඵල දහමට අනුව සිදුවන ශුන්‍ය ක්‍රියාවලියකි.</li>
                </ul>
                <p>මෙය නිරීක්ෂණය කිරීමෙන්, අප තුළ ගැඹුරින් මුල් බැසගත් ආත්ම දෘෂ්ටිය දුරු කර යථාර්ථය ඒ සැටියෙන්ම දැකිය හැක: එනම්, හේතු සහ ඵල ගතික ප්‍රවාහයක් ලෙසයි.</p>
            `,
            ta: `
                <p class="mb-4"><strong>சித்த வீதி</strong> (மன செயல்முறை) என்பது ஒரு பொருளை (பார்வை அல்லது எண்ணம் போன்றவை) அறிவதற்காக நம்பமுடியாத வேகத்தில் தோன்றி மறையும் மன-கணங்களின் (சித்தங்கள்) தொடர்ச்சியாகும்.</p>
                <p class="mb-4">இந்த காட்சிப்படுத்தலின் அடிப்படைக் நோக்கம் <strong>அனாத்மன் (சுயமற்ற தன்மை)</strong> என்ற கருத்தைப் புரிந்துகொள்வதாகும். இந்த செயல்முறைக்குப் பின்னால் ஒரு நிலையான "நபர்" அல்லது "நான்" இல்லை. மாறாக, நாம் "உயிர்" என்று அழைப்பது கணத்திற்குக் கணம் பாயும் இந்த நம்பமுடியாத வேகமான, ஆள்சார்பற்ற உணர்வு ஓடை (<em>சித்த-பரம்பரை</em>) மட்டுமே.</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>அனித்தியம் (நிலையற்றன்மை):</strong> காலக்கோட்டில் உள்ள ஒவ்வொரு சித்தமும் ஒரு கணத்தில் தோன்றி உடனடியாக அழிந்துவிடுகிறது, மீண்டும் திரும்புவதில்லை. இது நமது உணர்வின் தீவிரமான நிலையற்ற தன்மையை நிரூபிக்கிறது.</li>
                    <li><strong>துக்கம் (திருப்தியற்ற தன்மை):</strong> இந்த செயல்முறை கட்டுப்பாடற்றது, ஆள்சார்பற்றது, மற்றும் தொடர்ந்து மாறிக்கொண்டே இருப்பதால், நீடித்த மகிழ்ச்சிக்காக அதை நம்பியிருப்பது இயல்பாகவே மன அழுத்தத்தையும் திருப்தியற்ற தன்மையையும் தருகிறது.</li>
                    <li><strong>அனாத்மன் (சுயமற்ற தன்மை):</strong> இந்தத் தொடர்ச்சி அதன் சொந்த இயற்கை விதிகளின்படி நடக்கிறது. அதை இயக்கும் ஆன்மா, சுயம் அல்லது கர்த்தா இல்லை. இது ஒரு வெற்று, நிபந்தனைக்குட்பட்ட செயல்முறையாகும்.</li>
                </ul>
                <p>இதைக் கவனிப்பதன் மூலம், ஆழமாக வேரூன்றியிருக்கும் சுய மாயையை பலவீனப்படுத்தி, யதார்த்தத்தை உள்ளது உள்ளபடியே காணலாம்: அதாவது, காரணம் மற்றும் விளைவின் ஒரு மாறும் ஓட்டமாக.</p>
            `,
            hi: `
                <p class="mb-4">एक <strong>चित्त वीथि</strong> (मन-प्रक्रिया) मन-क्षणों (चित्तों) का एक अनुक्रम है जो किसी एक वस्तु, जैसे कि एक दृष्टि या एक विचार, को संसाधित करने के लिए अविश्वसनीय गति से उत्पन्न और समाप्त होते हैं।</p>
                <p class="mb-4">इस विज़ुअलाइज़ेशन का मूल उद्देश्य <strong>अनात्म (Non-Self)</strong> की अवधारणा को समझना है। इस प्रक्रिया के पीछे कोई स्थायी "व्यक्ति" या "मैं" नहीं है। इसके बजाय, जिसे हम "जीव" कहते हैं, वह केवल चेतना की यह अविश्वसनीय रूप से तेज़, अवैयक्तिक धारा (<em>चित्त-परंपरा</em>) है जो क्षण-क्षण बहती रहती है।</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>अनित्य (Impermanence):</strong> टाइमलाइन में प्रत्येक चित्त एक क्षण के लिए अस्तित्व में आता है और फिर तुरंत समाप्त हो जाता है, कभी वापस नहीं आता। यह हमारी चेतना की मौलिक रूप से अनित्य प्रकृति को दर्शाता है।</li>
                    <li><strong>दुःख (Unsatisfactoriness):</strong> क्योंकि यह प्रक्रिया अनियंत्रित, अवैयक्तिक और लगातार बदलती रहती है, स्थायी सुख के लिए इस पर निर्भर रहना स्वाभाविक रूप से तनावपूर्ण और असंतोषजनक है।</li>
                    <li><strong>अनात्म (Non-Self):</strong> यह अनुक्रम अपने प्राकृतिक नियमों का पालन करता है। इसे निर्देशित करने वाली कोई आत्मा, स्व, या कर्ता नहीं है। यह एक शून्य, वातानुकूलित प्रक्रिया है।</li>
                </ul>
                <p>इसका अवलोकन करके, हम स्व के गहरे बैठे भ्रम को कमजोर कर सकते हैं और वास्तविकता को वैसे ही देख सकते हैं जैसी वह है: कारण और प्रभाव का एक गतिशील प्रवाह।</p>
            `,
        }
    },
    paticcasamuppada: {
        title: {
            en: 'What is Paticcasamuppāda?',
            si: 'පටිච්චසමුප්පාදය යනු කුමක්ද?',
            ta: 'பிரதீயசமுத்பாதம் என்றால் என்ன?',
            hi: 'प्रतीत्यसमुत्पाद क्या है?',
        },
        body: {
            en: `
                <p class="mb-4"><strong>Paticcasamuppāda</strong>, or Dependent Origination, is the doctrine of causality that explains how suffering (dukkha) and the cycle of rebirth (saṃsāra) arise and cease. It is often visualized as a wheel with 12 links (nidānas), where each link conditions the arising of the next.</p>
                <p class="mb-4">The core formula is: "When this is, that is; This arising, that arises. When this is not, that is not; This ceasing, that ceases." This shows that nothing exists independently; everything is part of an interconnected, impersonal web of cause and effect.</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>No First Cause:</strong> The cycle has no discernible beginning. It's a continuous process fueled by Ignorance (Avijjā) and Craving (Taṇhā).</li>
                    <li><strong>Three Lifetimes:</strong> The 12 links are distributed across three lifetimes (past, present, future) to show how past actions create the present conditions, and present actions shape the future.</li>
                    <li><strong>Anatta (Non-Self):</strong> This doctrine is the ultimate expression of Non-Self. There is no "one" who is born or dies, only this conditioned process unfolding according to its own laws.</li>
                </ul>
                <p>By understanding this process, one can see how to break the cycle. By eradicating Ignorance with wisdom, the entire chain of suffering unravels, leading to Nibbāna.</p>
            `,
            si: `
                <p class="mb-4"><strong>පටිච්චසමුප්පාදය</strong> හෙවත් හේතුඵල දහම යනු දුක (දුක්ඛ) සහ පුනර්භව චක්‍රය (සංසාරය) හටගන්නා සහ නිරුද්ධ වන ආකාරය පැහැදිලි කරන හේතුඵලවාදයයි. එය බොහෝ විට අංග 12 කින් (නිදාන) යුත් චක්‍රයක් ලෙස දෘශ්‍යමාන කෙරේ, එහිදී සෑම අංගයක්ම ඊළඟ අංගයේ හටගැනීමට හේතු වේ.</p>
                <p class="mb-4">මූලික සූත්‍රය නම්: "මෙය ඇති කල්හි එය වේ; මෙය ඉපදීමෙන් එය උපදී. මෙය නැති කල්හි එය නොවේ; මෙය නිරුද්ධ වීමෙන් එය නිරුද්ධ වේ." මින් පෙන්වන්නේ කිසිවක් ස්වාධීනව නොපවතින බවයි; සෑම දෙයක්ම අන්තර් සම්බන්ධිත, පුද්ගල භාවයෙන් තොර හේතු සහ ඵල ජාලයක කොටසකි.</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>පළමු හේතුවක් නැත:</strong> චක්‍රයට හඳුනාගත හැකි ආරම්භයක් නැත. එය අවිද්‍යාව (අවිජ්ජා) සහ තණ්හාව (තණ්හා) මගින් පෝෂණය වන අඛණ්ඩ ක්‍රියාවලියකි.</li>
                    <li><strong>භව තුනක්:</strong> අතීත ක්‍රියා වර්තමාන තත්වයන් නිර්මාණය කරන ආකාරය සහ වර්තමාන ක්‍රියා අනාගතය හැඩගස්වන ආකාරය පෙන්වීම සඳහා අංග 12 භව තුනක් (අතීත, වර්තමාන, අනාගත) පුරා බෙදා ඇත.</li>
                    <li><strong>අනාත්ම:</strong> මෙම ධර්මය අනාත්ම සංකල්පයේ අවසාන ප්‍රකාශනයයි. ඉපදෙන හෝ මිය යන "කෙනෙක්" නැත, ඇත්තේ මෙම හේතුඵල ක්‍රියාවලිය තමන්ගේම නීතිවලට අනුව දිගහැරීම පමණි.</li>
                </ul>
                <p>මෙම ක්‍රියාවලිය අවබෝධ කර ගැනීමෙන්, චක්‍රය බිඳ දමන ආකාරය දැකිය හැකිය. ප්‍රඥාවෙන් අවිද්‍යාව නැති කිරීමෙන්, සම්පූර්ණ දුක්ඛ දාමය ලිහී, නිර්වාණයට මග පාදයි.</p>
            `,
            ta: `...`,
            hi: `...`,
        }
    },
    panchaskandha: {
        title: {
            en: 'What are the Panchaskandha?',
            si: 'පඤ්චස්කන්ධය යනු කුමක්ද?',
            ta: 'பஞ்சஸ்கந்தம் என்றால் என்ன?',
            hi: 'पंचस्कंध क्या हैं?',
        },
        body: {
            en: `
                <p class="mb-4">The <strong>Panchaskandha</strong>, or Five Aggregates, are the five components that constitute what a sentient being perceives as a "person" or "self". They are: Form (Rūpa), Feeling (Vedanā), Perception (Saññā), Mental Formations (Saṅkhāra), and Consciousness (Viññāṇa).</p>
                <p class="mb-4">The core insight here is also <strong>Anatta (Non-Self)</strong>. These five aggregates are constantly arising and passing away in a state of flux. There is no permanent, unchanging "self" or "I" that owns or controls them. They are merely impersonal, conditioned processes.</p>
                 <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Anicca (Impermanence):</strong> As the highlight rapidly shifts, it shows that none of these aggregates are stable. At any given moment, one might be prominent, but it immediately gives way to another. This is their impermanent nature.</li>
                    <li><strong>Dukkha (Unsatisfactoriness):</strong> Clinging to these fleeting, uncontrollable aggregates as "me" or "mine" is the fundamental cause of suffering. When we see they are not ours, we can let go.</li>
                    <li><strong>Anatta (Non-Self):</strong> The aggregates are all that constitute a being. Since each one is impermanent, unsatisfactory, and not-self, there is no part left over to be a permanent soul or self.</li>
                </ul>
                 <p>This visualization helps to deconstruct the illusion of a solid, continuous self, revealing it to be a dynamic interplay of these five fluctuating processes.</p>
            `,
            si: `
                <p class="mb-4"><strong>පඤ්චස්කන්ධය</strong> හෙවත් පංච උපාදානස්කන්ධය යනු සත්වයෙකු "පුද්ගලයෙකු" හෝ "තමා" ලෙස වටහා ගන්නා සංඝටක පහයි. ඒවා නම්: රූප, වේදනා, සංඥා, සංස්කාර සහ විඥාන යන ස්කන්ධයන්ය.</p>
                <p class="mb-4">මෙහි ඇති මූලිකම ප්‍රඥාවද <strong>අනාත්ම (Non-Self)</strong> යන්නයි. මෙම ස්කන්ධ පහම නිරන්තරයෙන් ඉපදෙමින් සහ නැතිවෙමින් වෙනස් වෙමින් පවතී. ඒවා අයිති කරගන්නා හෝ පාලනය කරන ස්ථිර, නොවෙනස් වන "ආත්මයක්" හෝ "මම" යනුවෙන් කිසිවක් නැත. ඒවා හුදෙක් පුද්ගල භාවයෙන් තොර, හේතුඵල දහමට අනුව පවතින ක්‍රියාවලීන් පමණි.</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>අනිත්‍ය (Impermanence):</strong> ඉස්මතු වන කොටස වේගයෙන් වෙනස් වීමෙන් පෙන්නුම් කරන්නේ මෙම ස්කන්ධ කිසිවක් ස්ථිර නොවන බවයි. ඕනෑම මොහොතක, එකක් ප්‍රමුඛ විය හැකි නමුත්, එය වහාම තවත් එකකට ඉඩ සලසයි. මෙය ඒවායේ අනිත්‍ය ස්වභාවයයි.</li>
                    <li><strong>දුක්ඛ (Unsatisfactoriness):</strong> මෙම ක්ෂණික, පාලනය කළ නොහැකි ස්කන්ධයන් "මම" හෝ "මගේ" ලෙස ගැනීම දුකට මූලික හේතුවයි. ඒවා අපගේ නොවන බව දකින විට, අපට ඒවා අත්හැරිය හැකිය.</li>
                    <li><strong>අනාත්ම (Non-Self):</strong> සත්වයෙකු සමන්විත වන්නේ මෙම ස්කන්ධ පහෙන් පමණි. ඒ සෑම එකක්ම අනිත්‍ය, දුක්ඛ, අනාත්ම බැවින්, ස්ථිර ආත්මයක් වීමට ඉතිරි කිසිදු කොටසක් නොමැත.</li>
                </ul>
                <p>මෙම දෘශ්‍යකරණය, ඝන, අඛණ්ඩ ආත්මයක් පිළිබඳ මායාව බිඳ දැමීමට උපකාරී වන අතර, එය මෙම උච්චාවචනය වන ක්‍රියාවලි පහේ ගතික අන්තර්ක්‍රියාවක් බව හෙළි කරයි.</p>
            `,
            ta: `
                <p class="mb-4"><strong>பஞ்சஸ்கந்தம்</strong> அல்லது ஐந்து திரள்கள் என்பது, ஒரு உணர்வுள்ள உயிரினம் "நபர்" அல்லது "சுயம்" என்று கருதும் ஐந்து கூறுகளைக் குறிக்கிறது. அவை: ரூபம் (உருவம்), வேதனை (உணர்வு), சஞ்ஞை (அறிவு), संस्कार (மன உருவாக்கங்கள்), மற்றும் விஞ்ஞானம் (உணர்வுநிலை).</p>
                <p class="mb-4">இங்கு உள்ள முக்கிய உள்நோக்கு <strong>அனாத்மன் (சுயமற்ற தன்மை)</strong> ஆகும். இந்த ஐந்து திரள்களும் தொடர்ந்து ஒரு மாற்ற நிலையில் தோன்றி மறைந்து கொண்டிருக்கின்றன. அவற்றைச் சொந்தமாக்கிக் கொள்ளும் அல்லது கட்டுப்படுத்தும் ஒரு நிலையான, மாறாத "சுயம்" அல்லது "நான்" இல்லை. அவை வெறும் ஆள்சார்பற்ற, நிபந்தனைக்குட்பட்ட செயல்முறைகளாகும்.</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>அனித்தியம் (நிலையற்றன்மை):</strong> முன்னிலைப்படுத்தப்பட்ட பகுதி வேகமாக மாறுவது, இந்த திரள்களில் எதுவும் நிலையானது அல்ல என்பதைக் காட்டுகிறது. எந்த நேரத்திலும், ஒன்று முதன்மையாக இருக்கலாம், ஆனால் அது உடனடியாக மற்றொன்றுக்கு வழிவிடுகிறது. இது அவற்றின் நிலையற்ற தன்மை.</li>
                    <li><strong>துக்கம் (திருப்தியற்ற தன்மை):</strong> இந்த விரைவான, கட்டுப்பாற்றற்ற திரள்களை "நான்" அல்லது "என்னுடையது" என்று பற்றிக்கொள்வதே துன்பத்தின் அடிப்படைக் காரணம். அவை நம்முடையவை அல்ல என்பதை நாம் காணும்போது, நாம் அவற்றை விட்டுவிடலாம்.</li>
                    <li><strong>அனாத்மன் (சுயமற்ற தன்மை):</strong> இந்த திரள்கள் மட்டுமே ஒரு உயிரினத்தை உருவாக்குகின்றன. ஒவ்வொன்றும் நிலையற்றது, திருப்தியற்றது மற்றும் சுயமற்றது என்பதால், ஒரு நிலையான ஆன்மாவாக அல்லது சுயமாக இருக்க எந்தப் பகுதியும் மீதமில்லை.</li>
                </ul>
                <p>இந்த காட்சிப்படுத்தல், ஒரு திடமான, தொடர்ச்சியான சுயத்தின் மாயையை உடைக்க உதவுகிறது, அதை இந்த ஐந்து ஏற்ற இறக்கமான செயல்முறைகளின் ஒரு மாறும் இடைவினையாக வெளிப்படுத்துகிறது.</p>
            `,
            hi: `
                <p class="mb-4"><strong>पंचस्कंध</strong>, या पांच समुच्चय, वे पांच घटक हैं जिनसे एक सचेतन प्राणी "व्यक्ति" या "स्व" का अनुभव करता है। वे हैं: रूप, वेदना, संज्ञा, संस्कार, और विज्ञान।</p>
                <p class="mb-4">यहाँ भी मूल अंतर्दृष्टि <strong>अनात्म (Non-Self)</strong> है। ये पांचों स्कंध निरंतर प्रवाह की स्थिति में उत्पन्न और समाप्त हो रहे हैं। कोई स्थायी, अपरिवर्तनीय "स्व" या "मैं" नहीं है जो इनका स्वामी है या इन्हें नियंत्रित करता है। वे केवल अवैयक्तिक, वातानुकूलित प्रक्रियाएं हैं।</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>अनित्य (Impermanence):</strong> जैसे-जैसे हाइलाइट तेजी से बदलता है, यह दिखाता है कि इनमें से कोई भी स्कंध स्थिर नहीं है। किसी भी क्षण, एक प्रमुख हो सकता है, लेकिन वह तुरंत दूसरे के लिए जगह बना लेता है। यही उनकी अनित्य प्रकृति है।</li>
                    <li><strong>दुःख (Unsatisfactoriness):</strong> इन क्षणभंगुर, अनियंत्रित स्कंधों को "मैं" या "मेरा" मानकर उनसे चिपके रहना ही दुख का मूल कारण है। जब हम देखते हैं कि वे हमारे नहीं हैं, तो हम उन्हें छोड़ सकते हैं।</li>
                    <li><strong>अनात्म (Non-Self):</strong> एक जीव का निर्माण केवल इन स्कंधों से होता है। चूंकि प्रत्येक अनित्य, दुःख और अनात्म है, इसलिए स्थायी आत्मा या स्व होने के लिए कोई हिस्सा शेष नहीं रहता है।</li>
                </ul>
                <p>यह विज़ुअलाइज़ेशन एक ठोस, निरंतर स्व के भ्रम को तोड़ने में मदद करता है, इसे इन पांच उतार-चढ़ाव वाली प्रक्रियाओं की एक गतिशील परस्पर क्रिया के रूप में प्रकट करता है।</p>
            `,
        }
    },
    suvisiPratyaya: {
        title: {
            en: 'What are the 24 Conditions (Paṭṭhāna)?',
            si: 'සුවිසි ප්‍රත්‍යය යනු කුමක්ද?',
            ta: '24 நிபந்தனைகள் (பட்டாணம்) என்றால் என்ன?',
            hi: '24 प्रत्यय (पट्ठान) क्या हैं?',
        },
        body: {
            en: `
                <p class="mb-4">According to the Abhidhamma, the <strong>24 Conditions (Paṭṭhāna)</strong> are the modes of conditionality or supporting factors that govern the arising, existence, and cessation of all phenomena (dhammas). They describe the intricate web of cause and effect relationships between mind (citta), mental factors (cetasika), matter (rūpa), and even Nibbāna.</p>
                <p class="mb-4">The Paṭṭhāna is the most complex book of the Abhidhamma, analyzing how these 24 conditions apply to all realities. It reveals the profoundly interconnected and impersonal nature of existence. Understanding these conditions helps to see that there is no independent "self" or "agent" controlling events; everything arises in dependence upon multiple, interacting conditions.</p>
                 <p>This section provides interactive examples, like walking or blinking, to demonstrate how these profound causal relations operate even in the simplest of our everyday actions, reinforcing the core Buddhist doctrines of <strong>Anicca (Impermanence)</strong>, <strong>Dukkha (Unsatisfactoriness)</strong>, and <strong>Anatta (Non-Self)</strong>.</p>
            `,
            si: `
                <p class="mb-4">බුදුදහමේ අභිධර්මයට අනුව, <strong>සුවිසි ප්‍රත්‍යය</strong> (පට්ඨාන ප්‍රකරණයේ විස්තර කර ඇති 24 පච්චය) යනු ධර්මයන්ගේ උත්පත්තිය, පැවැත්ම සහ නිරෝධය සඳහා බලපාන තත්ත්වයන් හෝ උපකාරක කාරණායි. මෙම ප්‍රත්‍යයන් ධර්මයන් අතර ඇති සම්බන්ධතා (හේතු-ඵල සම්බන්ධයන්) විස්තර කරයි.</p>
                <p class="mb-4">පට්ඨානය අභිධර්මයේ ඇති සංකීර්ණම ග්‍රන්ථය වන අතර, මෙම ප්‍රත්‍ය 24 සියලු යථාර්ථයන්ට බලපාන ආකාරය විග්‍රහ කරයි. එය පැවැත්මේ ගැඹුරින් අන්තර්සම්බන්ධිත සහ පුද්ගල භාවයෙන් තොර ස්වභාවය හෙළි කරයි. මෙම ප්‍රත්‍යයන් අවබෝධ කර ගැනීමෙන්, සිදුවීම් පාලනය කරන ස්වාධීන "ආත්මයක්" හෝ "කාරකයෙක්" නොමැති බව දැකීමට උපකාරී වේ; සෑම දෙයක්ම බහුවිධ, අන්තර්ක්‍රියාකාරී ප්‍රත්‍යයන් මත යැපීමෙන් හටගනී.</p>
                 <p>මෙම කොටස, ඇවිදීම හෝ ඇස් පිල්ලම් ගැසීම වැනි සරල ක්‍රියාවන්හිදී පවා මෙම ගැඹුරු හේතුඵල සම්බන්ධතා ක්‍රියාත්මක වන ආකාරය පෙන්වීමට අන්තර්ක්‍රියාකාරී උදාහරණ සපයයි, එමගින් <strong>අනිත්‍ය</strong>, <strong>දුක්ඛ</strong>, සහ <strong>අනාත්ම</strong> යන මූලික බෞද්ධ ධර්මතාවයන් තවදුරටත් තහවුරු කරයි.</p>
            `,
            ta: `
                <p class="mb-4">அபிதம்மத்தின்படி, <strong>24 நிபந்தனைகள் (பட்டாணம்)</strong> என்பவை அனைத்து நிகழ்வுகளின் (தம்மங்கள்) தோற்றம், இருப்பு மற்றும் அழிவைக் கட்டுப்படுத்தும் நிபந்தனை முறைகள் அல்லது துணை காரணிகளாகும். அவை மனம் (சித்தம்), மன காரணிகள் (சைதசிகம்), பொருள் (ரூபம்), மற்றும் நிப்பாணம் ஆகியவற்றுக்கு இடையேயான காரணம் மற்றும் விளைவு உறவுகளின் சிக்கலான வலையை விவரிக்கின்றன.</p>
                <p class="mb-4">பட்டாணம் அபிதம்மத்தின் மிகவும் சிக்கலான புத்தகம் ஆகும், இந்த 24 நிபந்தனைகள் எல்லா யதார்த்தங்களுக்கும் எவ்வாறு பொருந்தும் என்பதை பகுப்பாய்வு செய்கிறது. இது இருப்பின் ஆழ்ந்த ஒன்றோடொன்று இணைக்கப்பட்ட மற்றும் ஆள்சார்பற்ற தன்மையை வெளிப்படுத்துகிறது. இந்த நிபந்தனைகளைப் புரிந்துகொள்வது, நிகழ்வுகளைக் கட்டுப்படுத்தும் ஒரு சுயாதீனமான "சுயம்" அல்லது "காரணி" இல்லை என்பதைப் பார்க்க உதவுகிறது; எல்லாம் பல, ஊடாடும் நிபந்தனைகளைப் பொறுத்து எழுகிறது.</p>
                 <p>இந்த பகுதி, நடப்பது அல்லது கண் சிமிட்டுவது போன்ற ஊடாடும் உதாரணங்களை வழங்குகிறது, இந்த ஆழமான காரண உறவுகள் நமது அன்றாட எளிய செயல்களில் கூட எவ்வாறு செயல்படுகின்றன என்பதை நிரூபிக்க, <strong>அனித்தியம் (நிலையற்றன்மை)</strong>, <strong>துக்கம் (திருப்தியற்ற தன்மை)</strong>, மற்றும் <strong>அனாத்மன் (சுயமற்ற தன்மை)</strong> ஆகியவற்றின் முக்கிய பௌத்தக் கோட்பாடுகளை வலுப்படுத்துகிறது.</p>
            `,
            hi: `
                <p class="mb-4">अभिधम्म के अनुसार, <strong>24 प्रत्यय (पट्ठान)</strong> वे शर्तें या सहायक कारक हैं जो सभी घटनाओं (धम्मों) के उत्पत्ति, अस्तित्व और निरोध को नियंत्रित करते हैं। वे मन (चित्त), मानसिक कारकों (चैतसिक), पदार्थ (रूप), और यहां तक कि निब्बान के बीच कारण और प्रभाव संबंधों के जटिल जाल का वर्णन करते हैं।</p>
                <p class="mb-4">पट्ठान अभिधम्म की सबसे जटिल पुस्तक है, जो यह विश्लेषण करती है कि ये 24 प्रत्यय सभी वास्तविकताओं पर कैसे लागू होते हैं। यह अस्तित्व की गहन रूप से परस्पर जुड़ी और अवैयक्तिक प्रकृति को प्रकट करता है। इन प्रत्ययों को समझने से यह देखने में मदद मिलती है कि घटनाओं को नियंत्रित करने वाला कोई स्वतंत्र "स्व" या "कर्ता" नहीं है; सब कुछ कई, परस्पर क्रिया करने वाली स्थितियों पर निर्भर होकर उत्पन्न होता है।</p>
                 <p>यह खंड चलने या पलक झपकने जैसे संवादात्मक उदाहरण प्रदान करता है, यह प्रदर्शित करने के लिए कि ये गहन कारण संबंध हमारे सबसे सरल रोजमर्रा के कार्यों में भी कैसे काम करते हैं, जिससे <strong>अनित्य (अस्थिरता)</strong>, <strong>दुःख (असंतोष)</strong>, और <strong>अनात्म (स्व-रहित)</strong> के मूल बौद्ध सिद्धांतों को बल मिलता है।</p>
            `,
        }
    },
    dreamVithi: {
        title: {
            en: 'What is a Dream Vīthi?',
            si: 'සිහින වීථියක් යනු කුමක්ද?',
            ta: '',
            hi: '',
        },
        body: {
            en: `
                <p class="mb-4">In Abhidhamma, a dream is a type of <strong>mind-door process (Mano-dvāra-vīthi)</strong>. Unlike processes that arise from the five physical senses, a dream process originates entirely within the mind, processing memory-images from past experiences.</p>
                <p class="mb-4">Dream vīthis are typically very weak and the object is unclear (<em>atiparittārammaṇa</em>). This has several key characteristics:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>No Registration (Tadārammaṇa):</strong> Because the object is so faint, the mind-process usually does not have "registration" cittas at the end. The process ends right after the Javana phase and falls back into Bhavanga (life-continuum). This is why dreams often feel fleeting and are hard to remember upon waking.</li>
                    <li><strong>Unwholesome Javana:</strong> The seven impulsive moments (Javana) in a dream are almost always unwholesome (<em>akusala</em>), rooted in either greed/attachment (lobha) for pleasant dreams or aversion/fear (dosa) for nightmares.</li>
                    <li><strong>Impersonal Nature:</strong> Like all mind-processes, the dream vīthi demonstrates <strong>Anatta (Non-Self)</strong>. There is no "dreamer" creating the dream; it is an impersonal, conditioned sequence of cittas arising and passing away based on past causes and conditions (memories and mental states).</li>
                </ul>
                <p>This visualization shows how even our dream states are simply the rapid flashing of these impersonal mind-moments, following predictable cognitive laws.</p>
            `,
            si: `
                <p class="mb-4">අභිධර්මයට අනුව, සිහිනයක් යනු <strong>මනෝද්වාර වීථියකි</strong>. පංච ඉන්ද්‍රියන්ගෙන් හටගන්නා වීථි මෙන් නොව, සිහින වීථියක් සම්පූර්ණයෙන්ම මනස තුළම හටගන්නා අතර, අතීත අත්දැකීම්වල මතක සටහන් අරමුණු කරයි.</p>
                <p class="mb-4">සිහින වීථි සාමාන්‍යයෙන් ඉතා දුර්වල වන අතර අරමුණ අපැහැදිලිය (<em>අතිපරිත්තාරම්මණය</em>). මෙහි ප්‍රධාන ලක්ෂණ කිහිපයක් ඇත:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>තදාරම්මණ නොමැති වීම:</strong> අරමුණ ඉතා දුර්වල බැවින්, චිත්ත වීථිය අවසානයේ "තදාරම්මණ" චිත්ත ඇති නොවේ. ජවන් වාරයෙන් පසුවම වීථිය අවසන් වී නැවත භවාංගයට වැටේ. සිහින බොහෝ විට ක්ෂණිකව අමතක වී යන්නේ එබැවිනි.</li>
                    <li><strong>අකුසල ජවන්:</strong> සිහිනයක ඇති ජවන් චිත්ත හත බොහෝ විට අකුසල් සිත්ය. සුබ සිහින සඳහා ලෝභය/ඇල්ම ද, බියකරු සිහින සඳහා ද්වේෂය/භය ද මුල් වේ.</li>
                    <li><strong>අනාත්ම ස්වභාවය:</strong> සියලුම චිත්ත වීථි මෙන්ම, සිහින වීථියද <strong>අනාත්ම (Non-Self)</strong> ස්වභාවය පෙන්වයි. සිහිනය මවන "සිහින දකින්නෙක්" නැත; එය අතීත හේතු සහ ප්‍රත්‍යයන් (මතකයන් සහ මානසික තත්වයන්) මත පදනම්ව හටගන්නා සහ නැතිවී යන පුද්ගල-භාවයෙන් තොර, හේතුඵල දහමට අනුව සිදුවන චිත්ත අනුපිළිවෙලකි.</li>
                </ul>
                <p>මෙම දෘශ්‍යකරණය මගින් අපගේ සිහින තත්වයන් පවා මෙම පුද්ගල-භාවයෙන් තොර චිත්තයන්ගේ වේගවත් ඇතිවීම-නැතිවීම පමණක් බවත්, ඒවා පුරෝකථනය කළ හැකි සංජානන නීති අනුගමනය කරන බවත් පෙන්වයි.</p>
            `,
            ta: ``,
            hi: ``,
        }
    },
    maranasannaVithi: {
        title: {
            en: 'What is Maranasanna Vīthi?',
            si: 'මරණාසන්න වීථි යනු කුමක්ද?',
            ta: 'மரணாசன்ன வீதி என்றால் என்ன?',
            hi: 'मरणासन्न वीथि क्या है?',
        },
        body: {
            en: `
                <p class="mb-4"><strong>Maranasanna Vīthi</strong> is the final mind-process that occurs at the moment of death. This critical sequence determines the nature of the next rebirth. The object of this final process is one of three things:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Kamma:</strong> A significant wholesome or unwholesome action from the past arises in the mind.</li>
                    <li><strong>Kamma Nimitta (Sign of Kamma):</strong> An image or sign associated with a past significant action appears (e.g., seeing temple robes for a benefactor, or a weapon for a hunter).</li>
                    <li><strong>Gati Nimitta (Sign of Destination):</strong> A sign of the future rebirth place appears (e.g., celestial mansions for a heavenly birth, or fires for a hellish one).</li>
                </ul>
                <p class="mb-4">The flow is generally: <strong>Bhavaṅga → Sense/Mind Door Adverting → Javana → Cuti → Paṭisandhi</strong>.</p>
                <p class="mb-4">The <strong>Javana</strong> phase, the impulsive moments, is crucial. Its quality (wholesome or unwholesome) directly conditions the <strong>Cuti-citta</strong> (death-consciousness) and immediately after, the <strong>Paṭisandhi-citta</strong> (rebirth-linking consciousness) of the new life.</p>
                <p>This visualization shows how this final, karmically-potent thought-process bridges one life to the next, operating under the impersonal laws of cause and effect.</p>
            `,
            si: `
                <p class="mb-4"><strong>මරණාසන්න වීථිය</strong> යනු මරණාසන්න මොහොතේ සිදුවන අවසාන චිත්ත වීථියයි. මෙම තීරණාත්මක අනුපිළිවෙල මීළඟ පුනර්භවයේ ස්වභාවය තීරණය කරයි. මෙම අවසාන ක්‍රියාවලියේ අරමුණ මේ තුනෙන් එකකි:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>කර්මය:</strong> අතීතයේ කරන ලද සැලකිය යුතු කුසලයක් හෝ අකුසලයක් සිතට නැගේ.</li>
                    <li><strong>කර්ම නිමිත්ත:</strong> අතීතයේ කල වැදගත් ක්‍රියාවකට අදාළ රූපයක් හෝ සලකුණක් මතු වේ (උදා: දායකයෙකුට සිවුරු පෙනීම, දඩයක්කරුවෙකුට ආයුධයක් පෙනීම).</li>
                    <li><strong>ගති නිමිත්ත:</strong> මීළඟ භවයේ උත්පත්තිය ලබන ස්ථානය පිළිබඳ නිමිත්තක් මතු වේ (උදා: දෙව්ලොව උපතකට දිව්‍ය විමන්, නිරයක උපතකට ගිනිදැල්).</li>
                </ul>
                <p class="mb-4">සාමාන්‍ය ප්‍රවාහය: <strong>භවාංග → පංච/මනෝ ද්වාර ආවජ්ජන → ජවන් → චුති → පටිසන්ධි</strong>.</p>
                <p class="mb-4"><strong>ජවන්</strong> අවධිය ඉතා වැදගත් වේ. එහි ස්වභාවය (කුසල්/අකුසල්) අනුව <strong>චුති චිත්තය</strong> (මරණ චිත්තය) සකස් වන අතර, ඉන් අනතුරුවම නව භවයේ <strong>පටිසන්ධි චිත්තය</strong> (පුනර්භව සම්බන්ධක විඤ්ඤාණය) හට ගනී.</p>
                <p>මෙම දෘශ්‍යකරණය මගින්, කර්ම ශක්තියෙන් යුත් මෙම අවසාන සිතුවිලි ක්‍රියාවලිය, හේතු සහ ඵල යන පුද්ගල භාවයෙන් තොර නීතියට අනුව, එක් භවයක් තවත් භවයකට සම්බන්ධ කරන ආකාරය පෙන්වයි.</p>
            `,
            ta: `
                <p class="mb-4"><strong>மரணாசன்ன வீதி</strong> என்பது மரணத்தின் தருணத்தில் நிகழும் இறுதி மன செயல்முறையாகும். இந்த முக்கியமான வரிசை அடுத்த மறுபிறப்பின் தன்மையை தீர்மானிக்கிறது. இந்த இறுதி செயல்முறையின் பொருள் மூன்று விஷயங்களில் ஒன்றாகும்:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>កម្ម (கர்மம்):</strong> கடந்த காலத்திலிருந்து ஒரு குறிப்பிடத்தக்க நன்மை அல்லது தீய செயல் மனதில் எழுகிறது.</li>
                    <li><strong>កម្មនិមិត្ត (கர்ம நிமித்தம்):</strong> கடந்தகால குறிப்பிடத்தக்க செயலுடன் தொடர்புடைய ஒரு படம் அல்லது அடையாளம் தோன்றுகிறது (எ.கா., ஒரு உபகாரிக்கு கோவில் அங்கிகள், அல்லது ஒரு வேட்டைக்காரனுக்கு ஒரு ஆயுதம்).</li>
                    <li><strong>गतिनिमित्त (கதி நிமித்தம்):</strong> எதிர்கால மறுபிறப்பு இடத்தின் ஒரு அடையாளம் தோன்றுகிறது (எ.கா., ஒரு சொர்க்க பிறப்புக்கு வானுலக மாளிகைகள், அல்லது ஒரு நரகத்திற்கு நெருப்பு).</li>
                </ul>
                <p class="mb-4">பொதுவான ஓட்டம்: <strong>பவங்கம் → புலன்/மன வாசல் அறிதல் → ஜவனம் → சுதி → பிரதிசந்தி</strong>.</p>
                <p class="mb-4"><strong>ஜவன</strong> கட்டம், மனக்கிளர்ச்சி தருணங்கள், முக்கியமானது. அதன் தரம் (நன்மை அல்லது தீமை) நேரடியாக <strong>சுதி-சித்தம்</strong> (மரண-உணர்வு) மற்றும் உடனடியாகப் பிறகு, புதிய வாழ்க்கையின் <strong>பிரதிசந்தி-சித்தம்</strong> (மறுபிறப்பு-இணைப்பு உணர்வு) ஆகியவற்றைக் கட்டுப்படுத்துகிறது.</p>
                <p>இந்த காட்சிப்படுத்தல், காரணம் மற்றும் விளைவின் ஆள்சார்பற்ற விதிகளின் கீழ் செயல்படும் இந்த இறுதி, கர்ம-சக்தி வாய்ந்த சிந்தனை-செயல்முறை, ஒரு வாழ்க்கையை அடுத்த வாழ்க்கையுடன் எவ்வாறு இணைக்கிறது என்பதைக் காட்டுகிறது.</p>
            `,
            hi: `
                <p class="mb-4"><strong>मरणासन्न वीथि</strong> वह अंतिम मन-प्रक्रिया है जो मृत्यु के क्षण में होती है। यह महत्वपूर्ण अनुक्रम अगले पुनर्जन्म की प्रकृति को निर्धारित करता है। इस अंतिम प्रक्रिया का विषय तीन चीजों में से एक है:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>कर्म:</strong> अतीत का कोई महत्वपूर्ण कुशल या अकुशल कर्म मन में उत्पन्न होता है।</li>
                    <li><strong>कर्म निमित्त:</strong> अतीत के किसी महत्वपूर्ण कर्म से जुड़ी कोई छवि या संकेत प्रकट होता है (जैसे, एक दानदाता के लिए मंदिर के वस्त्र, या एक शिकारी के लिए कोई हथियार)।</li>
                    <li><strong>गति निमित्त:</strong> भविष्य के पुनर्जन्म स्थान का एक संकेत प्रकट होता है (जैसे, स्वर्गीय पुनर्जन्म के लिए दिव्य महल, या एक नारकीय जन्म के लिए आग)।</li>
                </ul>
                <p class="mb-4">सामान्य प्रवाह है: <strong>भवंग → इंद्रिय/मन द्वार आवर्जन → जवन → चुति → पटिसंधि</strong>।</p>
                <p class="mb-4"><strong>जवन</strong> चरण, आवेगी क्षण, महत्वपूर्ण है। इसकी गुणवत्ता (कुशल या अकुशल) सीधे <strong>चुति-चित्त</strong> (मृत्यु-चेतना) और उसके तुरंत बाद, नए जीवन के <strong>पटिसंधि-चित्त</strong> (पुनर्जन्म-संयोजक चेतना) को प्रभावित करती है।</p>
                <p>यह विज़ुअलाइज़ेशन दिखाता है कि यह अंतिम, कर्म-शक्तिशाली विचार-प्रक्रिया कैसे एक जीवन को अगले जीवन से जोड़ती है, जो कारण और प्रभाव के अवैयक्तिक नियमों के तहत काम करती है।</p>
            `,
        }
    },
    punabbhava: {
        title: {
            en: 'What is Rebirth (Punabbhava)?',
            si: 'පුනරුත්පත්තිය යනු කුමක්ද?',
            ta: 'புனர்ப்பவம் என்றால் என்ன?',
            hi: 'पुनर्भव क्या है?',
        },
        body: {
            en: `
                <p class="mb-4"><strong>Punabbhava</strong>, literally "again-becoming," is the process of rebirth. It is not the transmigration of a soul, but a continuous, impersonal process of cause and effect.</p>
                <p class="mb-4">The final mind-process at death (Maranasanna Vīthi) acts as the cause, and the first mind-moment of the new life (Paṭisandhi-citta) is its immediate effect. Nothing passes from one life to the next, just as a flame from one candle lights another without any substance passing between them.</p>
                <p class="mb-4">The quality of the Maranasanna Vīthi, which is conditioned by past <strong>Kamma</strong>, determines the realm of rebirth:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Kāma-loka (Sensual Realm):</strong> The default realm for most beings, driven by sensual desires. Results from both wholesome and unwholesome kamma.</li>
                    <li><strong>Rūpa-loka (Form Realm):</strong> A higher, blissful realm attained through mastery of Dhyāna (meditative absorption). Beings here have subtle physical forms.</li>
                    <li><strong>Arūpa-loka (Formless Realm):</strong> The highest realm, attained by mastering the formless Dhyānas. Beings here exist as pure consciousness without any physical form.</li>
                </ul>
                <p>This entire cycle, known as Saṃsāra, is driven by ignorance (avijjā) and craving (taṇhā). The goal of the Buddhist path is to end this cycle by eradicating these root causes.</p>
            `,
            si: `
                <p class="mb-4"><strong>පුනබ්භව</strong>, වචනාර්ථයෙන් "නැවත ඇතිවීම" යනු පුනරුත්පත්තියේ ක්‍රියාවලියයි. එය ආත්මයක් එක් භවයකින් තවත් භවයකට යාමක් නොව, අඛණ්ඩ, පුද්ගල භාවයෙන් තොර හේතු සහ ඵල ක්‍රියාවලියකි.</p>
                <p class="mb-4">මරණාසන්නයේදී ඇතිවන අවසාන චිත්ත වීථිය (මරණාසන්න වීථිය) හේතුව ලෙස ක්‍රියා කරන අතර, නව ජීවිතයේ පළමු චිත්තය (පටිසන්ධි චිත්තය) එහි ක්ෂණික ඵලය වේ. එක් ඉටිපන්දමක දැල්ලකින් කිසිදු ද්‍රව්‍යයක් හුවමාරු නොවී තවත් ඉටිපන්දමක් දල්වන්නා සේ, එක් භවයකින් තවත් භවයකට කිසිවක් ගමන් නොකරයි.</p>
                <p class="mb-4">අතීත <strong>කර්මය</strong> මගින් සකස් වන මරණාසන්න වීථියේ ස්වභාවය, උපදින භවය තීරණය කරයි:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>කාම ලෝකය:</strong> බොහෝ සත්වයන් සඳහා වන සාමාන්‍ය භවයයි. කාම ආශාවන් මගින් මෙහෙයවනු ලැබේ. කුසල් සහ අකුසල් කර්ම දෙකෙන්ම හට ගනී.</li>
                    <li><strong>රූප ලෝකය:</strong> ධ්‍යාන (භාවනාමය සමාධිය) ප්‍රගුණ කිරීමෙන් ලබා ගන්නා උසස්, ප්‍රණීත භවයකි. මෙහි සිටින සත්වයන්ට සූක්ෂම භෞතික ශරීර ඇත.</li>
                    <li><strong>අරූප ලෝකය:</strong> අරූප ධ්‍යාන ප්‍රගුණ කිරීමෙන් ලබා ගන්නා ඉහළම භවයයි. මෙහි සිටින සත්වයන් කිසිදු භෞතික ස්වරූපයක් නොමැතිව ශුද්ධ විඥානයක් ලෙස පවතී.</li>
                </ul>
                <p>සංසාරය ලෙස හැඳින්වෙන මෙම සම්පූර්ණ චක්‍රය අවිද්‍යාව සහ තණ්හාව මගින් මෙහෙයවනු ලැබේ. බෞද්ධ මාර්ගයේ අරමුණ වන්නේ මෙම මූල හේතු නැති කිරීමෙන් මෙම චක්‍රය අවසන් කිරීමයි.</p>
            `,
            ta: `
                <p class="mb-4"><strong>புனர்ப்பவம்</strong>, அதாவது "மீண்டும்-ஆகுதல்," என்பது மறுபிறப்பு செயல்முறையாகும். இது ஒரு ஆன்மாவின் இடமாற்றம் அல்ல, ஆனால் காரணம் மற்றும் விளைவின் ஒரு தொடர்ச்சியான, ஆள்சார்பற்ற செயல்முறையாகும்.</p>
                <p class="mb-4">மரணத்தின் போது இறுதி மன செயல்முறை (மரணாசன்ன வீதி) காரணமாக செயல்படுகிறது, மேலும் புதிய வாழ்க்கையின் முதல் மன-கணம் (பிரதிசந்தி-சித்தம்) அதன் உடனடி விளைவாகும். ஒரு மெழுகுவர்த்தியிலிருந்து வரும் சுடர் எந்தவொரு பொருளும் கடந்து செல்லாமல் மற்றொரு மெழுகுவர்த்தியை ஏற்றுவது போல, ஒரு வாழ்க்கையிலிருந்து அடுத்த வாழ்க்கைக்கு எதுவும் செல்வதில்லை.</p>
                <p class="mb-4">கடந்தகால <strong>கர்மத்தால்</strong> நிபந்தனைக்குட்பட்ட மரணாசன்ன வீதியின் தரம், மறுபிறப்பின் உலகத்தை தீர்மானிக்கிறது:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>காம-லோகம் (புலனின்ப உலகம்):</strong> பெரும்பாலான உயிரினங்களுக்கான இயல்புநிலை உலகம், புலனின்ப ஆசைகளால் இயக்கப்படுகிறது. நன்மை மற்றும் தீய கர்மங்கள் இரண்டிலிருந்தும் விளைகிறது.</li>
                    <li><strong>ரூப-லோகம் (உருவ உலகம்):</strong> தியானத்தில் தேர்ச்சி பெறுவதன் மூலம் அடையப்படும் ஒரு உயர்ந்த, ஆனந்தமான உலகம். இங்குள்ள உயிரினங்களுக்கு நுட்பமான உடல் வடிவங்கள் உள்ளன.</li>
                    <li><strong>அரூப-லோகம் (உருவமற்ற உலகம்):</strong> உருவமற்ற தியானங்களில் தேர்ச்சி பெறுவதன் மூலம் அடையப்படும் மிக உயர்ந்த உலகம். இங்குள்ள உயிரினங்கள் எந்தவொரு உடல் வடிவமும் இல்லாமல் தூய உணர்வாக இருக்கின்றன.</li>
                </ul>
                <p>சம்சாரம் என்று அழைக்கப்படும் இந்த முழு சுழற்சியும் அறியாமை (அவிஜ்ஜா) மற்றும் தாகம் (தன்ஹா) ஆகியவற்றால் இயக்கப்படுகிறது. பௌத்த பாதையின் நோக்கம் இந்த மூல காரணங்களை ஒழிப்பதன் மூலம் இந்த சுழற்சியை முடிவுக்குக் கொண்டுவருவதாகும்.</p>
            `,
            hi: `
                <p class="mb-4"><strong>पुनर्भव</strong>, जिसका शाब्दिक अर्थ है "फिर से-होना," पुनर्जन्म की प्रक्रिया है। यह किसी आत्मा का एक शरीर से दूसरे शरीर में जाना नहीं है, बल्कि कारण और प्रभाव की एक सतत, अवैयक्तिक प्रक्रिया है।</p>
                <p class="mb-4">मृत्यु के समय अंतिम मन-प्रक्रिया (मरणासन्न वीथि) कारण के रूप में कार्य करती है, और नए जीवन का पहला मन-क्षण (पटिसंधि-चित्त) इसका तत्काल प्रभाव होता है। एक जीवन से दूसरे जीवन में कुछ भी नहीं जाता है, ठीक वैसे ही जैसे एक मोमबत्ती की लौ से दूसरी मोमबत्ती जलती है, बिना किसी पदार्थ के उनके बीच से गुजरे।</p>
                <p class="mb-4">मरणासन्न वीथि की गुणवत्ता, जो पिछले <strong>कर्म</strong> द्वारा अनुकूलित होती है, पुनर्जन्म के लोक को निर्धारित करती है:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>काम-लोक (इंद्रिय लोक):</strong> अधिकांश जीवों के लिए डिफ़ॉल्ट लोक, जो इंद्रिय इच्छाओं से प्रेरित होता है। कुशल और अकुशल दोनों कर्मों से होता है।</li>
                    <li><strong>रूप-लोक (रूप लोक):</strong> ध्यान में महारत हासिल करने के माध्यम से प्राप्त एक उच्च, आनंदमय लोक। यहां के जीवों के सूक्ष्म रूप होते हैं और वे गहरी शांति का अनुभव करते हैं।</li>
                    <li><strong>अरूप-लोक (अरूप लोक):</strong> अरूप ध्यानों में महारत हासिल करके प्राप्त किया गया सर्वोच्च लोक। यहां के जीव बिना किसी भौतिक रूप के शुद्ध चेतना के रूप में मौजूद होते हैं।</li>
                </ul>
                <p>संसार के रूप में जाना जाने वाला यह पूरा चक्र अज्ञान (अविद्या) और तृष्णा (तन्हा) द्वारा संचालित होता है। बौद्ध पथ का लक्ष्य इन मूल कारणों को समाप्त करके इस चक्र को समाप्त करना है।</p>
            `,
        }
    },
    abhinna: {
        title: {
            en: 'What are Abhiññā?',
            si: 'අභිඤ්ඤා යනු කුමක්ද?',
            ta: 'அபிஞ்ஞா என்றால் என்ன?',
            hi: 'अभिज्ञा क्या हैं?',
        },
        body: {
            en: `
                <p class="mb-4"><strong>Abhiññā</strong> refers to the "higher knowledges" or supernormal abilities developed through deep meditative concentration (samādhi) and wisdom (paññā). They are not magical powers but profound extensions of the mind's natural capabilities, unlocked when mental hindrances are suppressed.</p>
                <p class="mb-4">These abilities arise from a mind that has reached at least the fourth Dhyāna, where concentration is exceptionally stable and pure. The process involves a specific type of <strong>mind-door vīthi</strong> that takes this supernormal object instead of a normal memory or thought.</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Base Jhāna:</strong> The meditator must first enter and emerge from a high level of concentration to act as a stable base for the mind.</li>
                    <li><strong>Adverting & Javana:</strong> A specific mind-door process then arises (Parikamma, Upacāra, Anuloma, Gotrabhū), leading to the final Abhiññā-Javana, which is the consciousness that directly experiences the supernormal object (e.g., another's thoughts, a distant sound).</li>
                    <li><strong>Impersonal Nature:</strong> Crucially, like all other mental states, these are also governed by <strong>Anatta (Non-Self)</strong>. They are conditioned phenomena arising from specific causes (deep concentration) and are not the powers of a "self" or soul. Clinging to them is a source of attachment and ego.</li>
                </ul>
                <p>The Buddha taught that while these abilities can arise on the path, the ultimate goal is not their attainment, but the attainment of the final Abhiññā: the "Extinction of the Taints" (Āsavakkhaya-ñāṇa), which is enlightenment itself.</p>
            `,
            si: `
                <p class="mb-4"><strong>අභිඤ්ඤා</strong> යනු ගැඹුරු භාවනාමය සමාධිය සහ ප්‍රඥාව තුළින් වර්ධනය කරගන්නා "උසස් ඤාණයන්" හෙවත් අසාමාන්‍ය හැකියාවන්ය. ඒවා මායාකාරී බලයන් නොව, මානසික නීවරණ යටපත් කළ විට විවෘත වන, මනසෙහි ස්වභාවික හැකියාවන්ගේ ගැඹුරු දිගු කිරීම් වේ.</p>
                <p class="mb-4">මෙම හැකියාවන් අවම වශයෙන් සිව්වන ධ්‍යානයටවත් පත් වූ, සමාධිය අතිශයින් ස්ථාවර සහ පිරිසිදු වූ සිතකින් හට ගනී. මෙම ක්‍රියාවලියට සාමාන්‍ය මතකයක් හෝ සිතුවිල්ලක් වෙනුවට මෙම අසාමාන්‍ය අරමුණ ගන්නා විශේෂිත <strong>මනෝද්වාර වීථියක්</strong> ඇතුළත් වේ.</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>පාදක ධ්‍යානය:</strong> භාවනානුයෝගියා පළමුව උසස් සමාධි මට්ටමකට ඇතුළු වී ඉන් නැගී සිටිය යුතු අතර, එය මනසට ස්ථාවර පදනමක් ලෙස ක්‍රියා කරයි.</li>
                    <li><strong>ආවර්ජනය සහ ජවන්:</strong> ඉන්පසු විශේෂිත මනෝද්වාර ක්‍රියාවලියක් (පරිකර්ම, උපචාර, අනුලෝම, ගෝත්‍රභූ) හටගන්නා අතර, එය අසාමාන්‍ය අරමුණ (උදා: අනුන්ගේ සිතිවිලි, දුරස්ථ ශබ්දයක්) කෙලින්ම අත්විඳින අවසාන අභිඤ්ඤා-ජවනය වෙත යොමු කරයි.</li>
                    <li><strong>අනාත්ම ස්වභාවය:</strong> වැදගත්ම දෙය නම්, අනෙකුත් සියලුම මානසික තත්වයන් මෙන්, මේවාද <strong>අනාත්ම (Non-Self)</strong> ධර්මතාවයට යටත් වීමයි. ඒවා නිශ්චිත හේතූන් (ගැඹුරු සමාධිය) නිසා හටගන්නා හේතුඵල ධර්මයන් වන අතර "ආත්මයක" බලයන් නොවේ. ඒවාට ඇලී සිටීම ආශාව සහ මානය ඇතිවීමට හේතුවකි.</li>
                </ul>
                <p>බුදුරජාණන් වහන්සේ දේශනා කළේ මෙම හැකියාවන් මාර්ගයේදී ඇතිවිය හැකි වුවද, අවසාන ඉලක්කය ඒවා ලබා ගැනීම නොව, අවසාන අභිඤ්ඤාව වන "ආසවක්ඛය ඤාණය" (කෙලෙස් නැසීමේ ඤාණය) ලබා ගැනීම බවයි, එයම නිර්වාණයයි.</p>
            `,
            ta: ``,
            hi: ``,
        }
    },
    arpanaVithi: {
        title: {
            en: 'What is Arpaṇa Vīthi?',
            si: 'අර්පණ වීථි යනු කුමක්ද?',
            ta: 'அர்ப்பண வீதி என்றால் என்ன?',
            hi: 'अर्पणा वीथि क्या है?',
        },
        body: {
            en: `
                <p class="mb-4"><strong>Arpaṇa Vīthi</strong> (Absorption Mind-Process) refers to the specialized mind-processes where the javana (impulsive) moments are of a "lofty" (<em>mahaggata</em>) or "supramundane" (<em>lokuttara</em>) nature. These are the processes through which one attains deep meditative states (Dhyāna/Jhāna) and the stages of enlightenment.</p>
                <p class="mb-4">Key characteristics distinguish it from ordinary sensual-sphere (<em>kāmāvacara</em>) processes:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Preparatory Javanas:</strong> Before the main absorption citta, a series of preparatory javanas run: <em>Parikamma</em> (Preparation), <em>Upacāra</em> (Access), <em>Anuloma</em> (Adaptation), and <em>Gotrabhū</em> (Change-of-lineage). Gotrabhū is the crucial moment that transcends the sensual sphere.</li>
                    <li><strong>Dhyāna/Jhāna Vīthi:</strong> The process for entering meditative absorption. The final javana is a Jhāna citta, which can then be repeated for long periods in a subsequent attainment process (<em>samāpajjana</em>).</li>
                    <li><strong>Magga Vīthi (Path Process):</strong> The process for attaining a stage of enlightenment. Here, the Gotrabhū citta takes Nibbāna as its object, and is immediately followed by the single, powerful <strong>Magga (Path)</strong> citta, which eradicates defilements. This is instantly followed by two or three <strong>Phala (Fruition)</strong> cittas that experience the peace of Nibbāna.</li>
                    <li><strong>Practitioner Types:</strong> The number of preparatory javanas depends on the practitioner's wisdom. A "slow" person (<em>dandhābhiññā</em>) has four, while a "quick" person (<em>khippābhiññā</em>) has only three, reaching absorption faster.</li>
                </ul>
                <p>This visualization breaks down these profound processes, showing the precise sequence of mind-moments leading from a concentrated mundane mind to the experience of supramundane reality.</p>
            `,
            si: `
                <p class="mb-4"><strong>අර්පණ වීථි</strong> යනු ජවන් චිත්තයන් "මහග්ගත" හෝ "ලෝකෝත්තර" ස්වභාවයක් ගන්නා විශේෂිත චිත්ත වීථිය. ගැඹුරු ධ්‍යාන අවස්ථා සහ නිර්වාණ මාර්ගඵල සාක්ෂාත් කරගනු ලබන්නේ මෙම චිත්ත වීථි මගිනි.</p>
                <p class="mb-4">මෙය සාමාන්‍ය කාමාවචර වීථි වලින් වෙනස් වන ප්‍රධාන ලක්ෂණ කිහිපයක් ඇත:</p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li><strong>පූර්ව ජවන්:</strong> ප්‍රධාන අර්පණා චිත්තයට පෙර, සූදානම් වීමේ ජවන් මාලාවක් ක්‍රියාත්මක වේ: <em>පරිකර්ම</em>, <em>උපචාර</em>, <em>අනුලෝම</em>, සහ <em>ගෝත්‍රභූ</em>. ගෝත්‍රභූ යනු කාමාවචර තලයෙන් මිදී ලෝකෝත්තර තලයට පිවිසෙන තීරණාත්මක මොහොතයි.</li>
                    <li><strong>ධ්‍යාන වීථි:</strong> ධ්‍යාන සමාපත්තියට පැමිණීමේ ක්‍රියාවලිය. මෙහි අවසාන ජවනය ධ්‍යාන චිත්තයක් වන අතර, එය පසුව සමාපජ්ජන වීථියකදී දීර්ඝ කාලයක් පුනරාවර්තනය කළ හැක.</li>
                    <li><strong>මග්ග වීථි:</strong> මාර්ගඵලයක් සාක්ෂාත් කර ගැනීමේ ක්‍රියාවලිය. මෙහිදී, ගෝත්‍රභූ චිත්තය නිවන අරමුණු කරන අතර, ඉන් අනතුරුවම කෙලෙස් නසන, බලවත් <strong>මග්ග (මාර්ග)</strong> චිත්තය එක් වරක් පහළ වේ. එය ක්ෂණිකවම නිවනේ ශාන්තිය අත්විඳින <strong>ඵල</strong> චිත්ත දෙකක් හෝ තුනක් විසින් අනුගමනය කරනු ලැබේ.</li>
                    <li><strong>පුද්ගල වර්ග:</strong> පූර්ව ජවන් ගණන යෝගාවචරයාගේ ප්‍රඥාව මත රඳා පවතී. "මන්දගාමී" (<em>දන්ධාභිඤ්ඤ</em>) පුද්ගලයෙකුට ජවන් හතරක් ඇති අතර, "වේගවත්" (<em>ඛිප්පාභිඤ්ඤ</em>) පුද්ගලයෙකුට ඇත්තේ තුනක් පමණි, එම නිසා ඔහු වඩාත් වේගයෙන් ධ්‍යානයට ළඟා වේ.</li>
                </ul>
                <p>මෙම දෘශ්‍යකරණය, සාමාන්‍ය සමාධිමත් සිතක සිට ලෝකෝත්තර යථාර්ථය අත්විඳීම දක්වා දිවෙන මෙම ගැඹුරු චිත්ත වීථි ක්‍රියාවලිය, චිත්තයන්ගේ නිශ්චිත අනුපිළිවෙල පෙන්වමින් විග්‍රහ කරයි.</p>
            `,
            ta: ``,
            hi: ``,
        }
    }
};
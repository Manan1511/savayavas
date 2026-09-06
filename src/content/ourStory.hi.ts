/**
 * Hindi sibling of ourStory.en.ts. See site.hi.ts for the translation
 * conventions (identifiers untouched, machine-assisted, needs a native
 * fluency review before launch).
 *
 * `name.savayav.script` / `name.vas.script` are already Devanagari in the
 * English source and are kept byte-identical here: per ourStory.en.ts's own
 * comment, that etymology moment is locale-independent, not a translation.
 */

import type { OurStory } from './ourStory.en'
import type { LocaleShape } from '@/lib/localeShape'

export const ourStory = {
  hero: {
    eyebrow: 'हमारी कहानी',
    headline: ['तीन भाई।', 'एक मिल।', 'धागे के तीन दशक।'],
  },

  founders: {
    eyebrow: 'शुरुआत कैसे हुई',
    headline: 'हाथों से रची गई नींव।',
    body: [
      'शुभ शांतिनाथ सिल्क मिल्स की शुरुआत तीन भाइयों से हुई: अरविंद परमार, विनोद परमार और परेश परमार। उन्होंने मिलकर मुंबई के टेक्सटाइल व्यापार में तीन दशकों में एक मजबूत निर्माण नींव खड़ी की।',
      'भाइयों के बीच साझा विश्वास के रूप में जो शुरू हुआ, वह निर्माण विशेषज्ञता के ऐसे भंडार में बदल गया जिसका दावा ज़्यादातर ब्रांड केवल कागज़ पर करते हैं।',
    ],
    names: ['Arvind Parmar', 'Vinod Parmar', 'Paresh Parmar'],
  },

  name: {
    eyebrow: 'नाम',
    headline: 'हर शब्द पहले से मौजूद था। हमने बस दोनों को जोड़ दिया।',
    savayav: { script: 'सावयव', roman: 'Savayav', meaning: 'विभिन्न प्रकार' },
    vas: { script: 'वस्', roman: 'Vas', meaning: 'फैब्रिक, या वस्त्र' },
    body: [
      'Savayavas & Co. अगला अध्याय है, जिसे आगे ले जा रहे हैं दूसरी पीढ़ी के प्रियांक परमार और शेरिन परमार।',
      'नाम खुद ही कहानी बताता है। सावयव का अर्थ है विभिन्न प्रकार। वस् का अर्थ है फैब्रिक। साथ में: विभिन्न प्रकार के फैब्रिक।',
      'यह न तो उधार लिया गया शब्द है, न ही गढ़ा हुआ। यह उसी भाषा से बना है जो व्यापार हमेशा से बोलता आया है।',
    ],
  },

  vasOrigin: {
    eyebrow: 'पहला अध्याय',
    headline: 'VAS',
    body: 'उसी नाम से आया VAS, हमारा मेंसवियर शर्टिंग फैब्रिक ब्रांड और Savayavas जिस भी चीज़ के लिए खड़ा है उसकी पहली अभिव्यक्ति। जड़ वस् आगे बढ़ती है: ऐसा फैब्रिक जो उस अनुशासन से बना है जो एक परिवार ने तीन पीढ़ियों में सीखा कि एक शर्ट को कैसा महसूस होना चाहिए।',
    cta: { label: 'VAS को जानें', to: '/vas' },
  },

  mill: {
    eyebrow: 'मिल फ्लोर',
    caption: 'असली मशीनरी। असली फैब्रिक, निर्माण की प्रक्रिया में।',
  },

  tribe: {
    eyebrow: 'हमारी दुनिया। हमारे लोग।',
    headline: 'Savayavas & Co. ट्राइब',
    intro: 'हर धागे के पीछे के हाथों, दिलों और विरासत की एक झलक। उद्देश्य के साथ रचा गया। एक ऐसे समुदाय द्वारा आगे बढ़ाया गया जो कालातीत गुणवत्ता में विश्वास रखता है।',
    items: [
      { asset: 'tribe.01', caption: 'सटीकता से बुना हुआ' },
      { asset: 'tribe.02', caption: 'कालातीत बनावट' },
      { asset: 'tribe.03', caption: 'आधुनिक पुरुष के लिए तैयार' },
      { asset: 'tribe.04', caption: 'बेहतरीन धागे' },
      { asset: 'tribe.05', caption: 'उद्देश्य के साथ बनाया गया' },
      { asset: 'tribe.06', caption: 'हर विवरण के लिए तैयार' },
      { asset: 'tribe.07', caption: 'रोज़मर्रा को निखारना' },
      { asset: 'tribe.08', caption: 'प्राकृतिक रेशों में जड़ें' },
      { asset: 'tribe.09', caption: 'टिकने के लिए डिज़ाइन किया गया' },
      { asset: 'tribe.10', caption: 'सोच-समझकर बनाया गया' },
      { asset: 'tribe.11', caption: 'विरासत मिले नवाचार से' },
      { asset: 'tribe.12', caption: 'फर्क महसूस करें' },
      { asset: 'tribe.13', caption: 'कल के लिए ज़िम्मेदारी से बनाया गया' },
      { asset: 'tribe.14', caption: 'हर सिलाई में सम्पूर्ण' },
    ],
  },

  seo: {
    description: 'तीन भाई, एक मिल, धागे के तीन दशक। शुभ शांतिनाथ सिल्क मिल्स और Savayavas & Co. के पीछे के परिवार की कहानी।',
  },
} as const satisfies LocaleShape<OurStory>

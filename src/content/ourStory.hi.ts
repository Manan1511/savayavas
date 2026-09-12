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
    vas: { script: 'वास', roman: 'Vas', meaning: 'फैब्रिक, या वस्त्र' },
    body: [
      'सवायावास & Co. अगला अध्याय है, जिसे आगे ले जा रहे हैं दूसरी पीढ़ी के प्रियांक परमार और शेरिन परमार।',
      'नाम खुद ही कहानी बताता है। सावयव का अर्थ है विभिन्न प्रकार। वास का अर्थ है फैब्रिक। साथ में: विभिन्न प्रकार के फैब्रिक।',
      'यह न तो उधार लिया गया शब्द है, न ही गढ़ा हुआ। यह उसी भाषा से बना है जो व्यापार हमेशा से बोलता आया है।',
    ],
  },

  vasOrigin: {
    eyebrow: 'पहला अध्याय',
    headline: 'वास',
    body: 'उसी नाम से आया वास, हमारा मेंसवियर शर्टिंग फैब्रिक ब्रांड और सवायावास जिस भी चीज़ के लिए खड़ा है उसकी पहली अभिव्यक्ति। जड़ वास आगे बढ़ती है: ऐसा फैब्रिक जो उस अनुशासन से बना है जो एक परिवार ने तीन पीढ़ियों में सीखा कि एक शर्ट को कैसा महसूस होना चाहिए।',
    cta: { label: 'वास को जानें', to: '/vas' },
  },

  mill: {
    eyebrow: 'मिल फ्लोर',
    caption: 'असली मशीनरी। असली फैब्रिक, निर्माण की प्रक्रिया में।',
  },

  seo: {
    description: 'तीन भाई, एक मिल, धागे के तीन दशक। शुभ शांतिनाथ सिल्क मिल्स और सवायावास & Co. के पीछे के परिवार की कहानी।',
  },
} as const satisfies LocaleShape<OurStory>

/**
 * Hindi sibling of contact.en.ts. See site.hi.ts for the translation
 * conventions (identifiers untouched, machine-assisted, needs a native
 * fluency review before launch).
 *
 * `form.typeOptions[].value` is a `LeadKind` identifier consumed by
 * submitLead(), not copy: kept byte-identical to the English source, only
 * `label` is translated.
 */

import type { ContactPage } from './contact.en'
import type { LocaleShape } from '@/lib/localeShape'

export const contactPage = {
  hero: {
    eyebrow: 'संपर्क करें',
    headline: 'हमें आपसे सुनकर खुशी होगी।',
    body: 'चाहे आप अपना पहला ऑर्डर दे रहे हों या पचासवां, हमारी टीम मदद के लिए यहां है।',
  },

  getInTouch: {
    eyebrow: 'संपर्क में रहें',
  },

  visitUs: {
    eyebrow: 'हमसे मिलें',
    directionsLabel: 'दिशा-निर्देश पाएं',
  },

  form: {
    eyebrow: 'पूछताछ भेजें',
    headline: 'ट्रेड और निर्यात पूछताछ',
    body: 'अपनी आवश्यकता साझा करें और हमारी टीम सीधे स्पेसिफिकेशन, कीमत और शर्तों की पुष्टि करेगी।',
    typeOptions: [
      { value: 'trade-inquiry', label: 'ट्रेड पूछताछ' },
      { value: 'export-inquiry', label: 'निर्यात पूछताछ' },
    ],
  },

  seo: {
    description: 'ट्रेड और निर्यात पूछताछ के लिए सवायावास & Co. से संपर्क करें। मुंबई स्थित हमारे ऑफिस पर आएं, या फोन या ईमेल के ज़रिए हमसे संपर्क करें।',
  },
} as const satisfies LocaleShape<ContactPage>

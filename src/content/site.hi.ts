/**
 * Hindi sibling of site.en.ts. Same shape, enforced with `satisfies`, so a
 * missing or mistyped field fails at build time rather than silently
 * rendering English inside a Hindi page.
 *
 * Not translated: route paths (`to`), hrefs, phone/email, slugs — anything
 * that is an identifier rather than copy. Person names in the (placeholder)
 * reviews are kept in Latin script, as is standard practice even in Hindi
 * business writing; city names are set in Devanagari since they're part of
 * the sentence, not a proper-noun label.
 *
 * ⚠️ Machine-assisted translation, not reviewed by a native Hindi speaker.
 * Structurally and grammatically sound, but should get a fluency pass before
 * launch — same caution as the English placeholder content elsewhere.
 */

import type { Site } from './site.en'
import type { LocaleShape } from '@/lib/localeShape'

export const site = {
  brand: {
    name: 'Savayavas & Co.',
    tagline: 'उद्देश्य से निर्मित। विश्वास से बुना हुआ।',
    parentCompany: 'शुभ शांतिनाथ सिल्क मिल्स',
  },

  nav: {
    items: [
      { label: 'कलेक्शन', to: '/collections' },
      { label: 'VAS', to: '/vas' },
      { label: 'हमारी कहानी', to: '/our-story' },
      { label: 'डीलर्स के लिए', to: '/for-dealers' },
      { label: 'जर्नल', to: '/journal' },
      { label: 'संपर्क करें', to: '/contact' },
    ],
    cta: { label: 'पूछताछ करें', to: '/contact' },
    skipToContent: 'मुख्य सामग्री पर जाएँ',
  },

  footer: {
    tagline: 'उद्देश्य से निर्मित। विश्वास से बुना हुआ।',
    rights: 'सर्वाधिकार सुरक्षित।',
    social: [
      { label: 'Instagram', href: 'https://instagram.com/savayavas_co' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Pinterest', href: '#' },
    ],
  },

  contact: {
    phone: '+91 98765 43210',
    email: 'info@savayavas.co',
    instagram: '@savayavas_co',
    hours: 'सोम – शनि : सुबह 10 – शाम 7',
    address: {
      lines: ['Savayavas & Co.', '123, टेक्सटाइल मार्केट,', 'रिंग रोड, सूरत – 395002,', 'गुजरात, भारत।'],
    },
  },

  reviews: {
    placeholder: true,
    eyebrow: 'आपकी बातें',
    headline: 'जो गुणवत्ता को महत्व देते हैं, उनका भरोसा।',
    intro: 'हमारा समुदाय हमें हर दिन बेहतर करने के लिए प्रेरित करता है। जानिए Savayavas & Co. के साथ उनके अनुभव के बारे में उनकी राय।',
    rating: '4.9',
    ratingOutOf: '5',
    count: '120+',
    items: [
      {
        quote: 'फैब्रिक की गुणवत्ता वाकई बेहतरीन है। हर कलेक्शन में उनका बारीकी पर ध्यान और कालातीत रुचि साफ झलकती है।',
        name: 'Vivek Mehta',
        role: 'फैशन डिज़ाइनर, मुंबई',
      },
      {
        quote: 'हम एक साल से अधिक समय से Savayavas & Co. के साथ काम कर रहे हैं, और गुणवत्ता व सेवा में निरंतरता बेजोड़ है।',
        name: 'Arjun Singhal',
        role: 'शर्टिंग निर्माता, लुधियाना',
      },
      {
        quote: 'उनके फैब्रिक हमारी रचनाओं को और निखार देते हैं। प्रीमियम फील, सुंदर ड्रेप, और हमारे ग्राहक उन्हें बेहद पसंद करते हैं।',
        name: 'Neha Aggarwal',
        role: 'बुटीक स्वामी, नई दिल्ली',
      },
    ],
  },

  categories: [
    {
      slug: 'cotton',
      name: '100% कॉटन',
      description:
        'हमारी रेंज की नींव। शुद्ध कॉटन फैब्रिक, जो सांस लेने की क्षमता, रंग की मजबूती और हर बैच में एक समान फील के लिए तैयार किए गए हैं। रोज़मर्रा की फॉर्मल और कैज़ुअल शर्टिंग दोनों के लिए उपयुक्त, और बड़े पैमाने पर निर्माण के लिए एक आज़माया हुआ विकल्प।',
    },
    {
      slug: 'lyocell-cotton',
      name: 'लायोसेल कॉटन',
      description:
        'एक परिष्कृत कॉटन ब्लेंड, जो टिकाऊपन से समझौता किए बिना नरम ड्रेप और हल्की चमक लाता है। ऐसे ब्रांड्स की पहली पसंद, जो किफायती कीमत पर प्रीमियम फील देना चाहते हैं। एक फैब्रिक जो कटिंग टेबल पर भी और शेल्फ पर भी उतना ही खरा उतरता है।',
    },
    {
      slug: 'linen',
      name: '100% लिनन',
      description:
        'प्राकृतिक, सांस लेने योग्य, और मौसम के अनुकूल। हमारा लिनन कलेक्शन उन निर्माताओं के लिए तैयार किया गया है जो गर्म मौसम और रिज़ॉर्ट-फॉर्मल मेंसवियर बनाते हैं, उसी टेक्सचर और ड्रेप के साथ जो लिनन खरीदार विशेष रूप से तलाशते हैं।',
    },
    {
      slug: 'polyester-cotton',
      name: 'पॉलिएस्टर कॉटन',
      description:
        'टिकाऊपन और आराम में कोई समझौता किए बिना आसान देखभाल के लिए इंजीनियर किया गया। बड़े पैमाने पर उत्पादन करने वाले निर्माताओं के लिए एक भरोसेमंद विकल्प, जहाँ निरंतरता, सिलवटों से बचाव और लागत-दक्षता उतनी ही मायने रखती है जितनी फील।',
    },
    {
      slug: 'fashion-polyesters',
      name: 'फैशन पॉलिएस्टर',
      description:
        'पैटर्न, रंग और फिनिश की विविधता के लिए डिज़ाइन किया गया, और उन ब्रांड्स व निर्माताओं के लिए बनाया गया जो फैब्रिक की विश्वसनीयता से समझौता किए बिना ट्रेंड साइकिल का पीछा करते हैं। सीज़नल और तेज़-टर्नअराउंड कलेक्शन के लिए आदर्श।',
    },
  ],
} as const satisfies LocaleShape<Site>

export type SiteHi = typeof site

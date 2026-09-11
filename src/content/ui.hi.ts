/**
 * Hindi sibling of ui.en.ts. See site.hi.ts for the translation conventions
 * (identifiers untouched, machine-assisted, needs a native fluency review
 * before launch).
 *
 * `{category}`, `{handle}` and `{count}` are placeholder tokens substituted
 * by the calling component, kept literal here just like in the English file.
 */

import type { Ui } from './ui.en'
import type { LocaleShape } from '@/lib/localeShape'

export const ui = {
  pageTitles: {
    home: 'होम',
    ourStory: 'हमारी कहानी',
    vas: 'वास',
    collections: 'कलेक्शन',
    forDealers: 'डीलर्स के लिए',
    contact: 'संपर्क करें',
    pageNotFound: 'पेज नहीं मिला',
  },

  common: {
    notFoundEyebrow: 'नहीं मिला',
    explore: 'देखें',
    view: 'देखें',
    getStarted: 'शुरू करें',
    sendEnquiry: 'पूछताछ भेजें',
    backToHome: 'होम पर वापस जाएं',
  },

  notFound: {
    seoDescription: 'यह पेज मौजूद नहीं है।',
    heading: 'पेज नहीं मिला',
    body: 'यह पेज मौजूद नहीं है, या हटा दिया गया है। इसके बजाय इनमें से कोई एक आज़माएं:',
  },

  collectionsPage: {
    viewCollection: 'कलेक्शन देखें',
    comingSoonCatalogue: 'जल्द आ रहा है। तब तक, संपर्क करें और हम इसे सीधे भेज देंगे।',
  },

  category: {
    unknownCollection: 'अज्ञात कलेक्शन',
    backToCollections: 'कलेक्शन पर वापस जाएं',
    allCollections: 'सभी कलेक्शन',
    collection: 'कलेक्शन',
    colourways: 'रंग विकल्प',
    colourwaysNote: 'एक प्रतिनिधि VAS शेड कार्ड। अलग-अलग फैब्रिक के रंग डाई लॉट के अनुसार भिन्न हो सकते हैं; ऑर्डर करने से पहले हमारी टीम से अपना सटीक शेड पुष्ट करें।',
    whoThisIsFor: 'यह किसके लिए है',
    otherCollections: 'अन्य कलेक्शन',
    sourcingQuestion: '{category} सोर्स कर रहे हैं?',
    requestQuote: 'कोटेशन के लिए अनुरोध करें',
    requestQuoteBody: 'हमें अपनी मात्रा और स्पेसिफिकेशन बताएं, और हमारी टीम आपसे संपर्क करेगी।',
    enquireAbout: '{category} के बारे में पूछताछ करें',
  },

  contactPage: {
    emailLabel: 'ईमेल',
    instagramLabel: 'इंस्टाग्राम',
    hoursLabel: 'समय',
    getDirectionsAria: 'दिशा-निर्देश पाएं',
  },

  leadForm: {
    enquiringAboutLabel: 'मैं पूछताछ कर रहा हूं',
    regarding: 'विषय:',
    nameLabel: 'नाम',
    companyLabel: 'कंपनी',
    emailLabel: 'ईमेल',
    phoneLabel: 'फोन',
    messageLabel: 'संदेश',
    nameError: 'कृपया अपना नाम बताएं।',
    emailError: 'एक मान्य ईमेल पता दर्ज करें।',
    exportAckLabel: 'मैं समझता हूं कि निर्यात ऑर्डर के लिए उत्पादन शुरू होने से पहले पूरा भुगतान अग्रिम रूप से आवश्यक है।',
    exportAckError: 'कृपया पुष्टि करें कि आप निर्यात भुगतान शर्तों को समझते हैं।',
    sending: 'भेजा जा रहा है...',
    deliveredMessage: 'धन्यवाद। आपकी पूछताछ भेज दी गई है, और हमारी टीम जल्द ही संपर्क करेगी।',
    notConfiguredMessage: 'हमारा ऑनलाइन फॉर्म अभी जुड़ा नहीं है, इसलिए यह संदेश अपने आप नहीं भेजा जा सका। कृपया सीधे हमसे संपर्क करें:',
  },

  reviews: {
    basedOnReviews: '{count} समीक्षाओं के आधार पर',
    previousReview: 'पिछली समीक्षा',
    nextReview: 'अगली समीक्षा',
  },
} as const satisfies LocaleShape<Ui>

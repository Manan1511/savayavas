/**
 * Hindi sibling of categoryDetail.en.ts. See site.hi.ts for the translation
 * conventions (identifiers untouched, machine-assisted, needs a native
 * fluency review before launch).
 *
 * Mirrors the English file's multiple named exports (rather than bundling
 * into one object) so category.tsx can resolve each independently via
 * useLocaleContent, matching how it already imports them individually.
 */

import type { placeholderSwatches as SwatchesEn, whoThisIsFor as WhoEn } from './categoryDetail.en'
import type { LocaleShape } from '@/lib/localeShape'

export const placeholderSwatches = [
  { name: 'आइवरी', hex: '#F2EDE5' },
  { name: 'स्टोन', hex: '#B8B2A6' },
  { name: 'नेवी', hex: '#2B3441' },
  { name: 'ब्रास', hex: '#A8845C' },
  { name: 'चारकोल', hex: '#141414' },
  { name: 'ग्रेज', hex: '#E4E0D6' },
] as const satisfies LocaleShape<typeof SwatchesEn>

export const whoThisIsFor: LocaleShape<typeof WhoEn> = {
  cotton: 'उन निर्माताओं के लिए जो बड़ी मात्रा में फॉर्मल और कैज़ुअल शर्टिंग बनाते हैं और जिन्हें हर बैच में भरोसेमंद गुणवत्ता चाहिए।',
  'lyocell-cotton': 'उन ब्रांड्स के लिए जो टिकाऊपन से समझौता किए बिना किफायती कीमत पर प्रीमियम फील चाहते हैं।',
  linen: 'उन निर्माताओं के लिए जो गर्म मौसम और रिज़ॉर्ट-फॉर्मल मेंसवियर बनाते हैं और जिन्हें असली लिनन टेक्सचर व ड्रेप चाहिए।',
  'polyester-cotton': 'बड़े पैमाने पर उत्पादन करने वाले निर्माताओं के लिए, जहाँ सिलवटों से बचाव, आसान देखभाल और लागत-दक्षता उतनी ही मायने रखती है जितनी फील।',
  'fashion-polyesters': 'उन ब्रांड्स और निर्माताओं के लिए जो फैब्रिक की विश्वसनीयता से समझौता किए बिना सीज़नल ट्रेंड साइकिल का पीछा करते हैं।',
}

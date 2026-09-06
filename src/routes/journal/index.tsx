import { Seo } from '@/components/Seo'
import { JournalIndex } from './JournalIndex'
import { InstagramCta } from './InstagramCta'

export function Component() {
  return (
    <>
      <Seo
        title="Journal"
        path="/journal"
        description="Notes on fabric, craft and sourcing, from the mill floor to the cutting table. The Savayavas & Co. journal."
      />

      <JournalIndex />
      <InstagramCta />
    </>
  )
}

Component.displayName = 'JournalIndexRoute'

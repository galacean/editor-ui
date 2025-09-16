import { useEffect, useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { AssetItem } from './'
import { styled } from '../design-system'

export default {
  component: AssetItem,
} as Meta<typeof AssetItem>

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
  gap: '$3',
  alignItems: 'self-start',
  width: '600px',
})

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const Overview: StoryFn<typeof AssetItem> = (args) => {
  const [selectedMap, setSelectedMap] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    function clearSelect() {
      setSelectedMap({})
    }

    document.addEventListener('click', clearSelect)

    return () => {
      document.removeEventListener('click', clearSelect)
    }
  })

  function selectFile(id: string) {
    return (e) => {
      e.stopPropagation()
      e.preventDefault()
      setSelectedMap({ ...selectedMap, [id]: true })
    }
  }

  return (
    <Grid>
      <AssetItem
        id="1"
        name="spine_person"
        onRename={async (name) => {
          await wait(1000)
          console.log('rename', name)
        }}
        loadingStatus="loading"
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*q7BUSabi8scAAAAAAAAAAAAADuiaAQ/original"
        selected={selectedMap['1']}
        onSelectedChange={selectFile('1')}
        onDoubleClick={() => {
          console.log('double click')
        }}
      />
      <AssetItem
        id="2"
        name="helper.ts"
        loadingStatus="success"
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*rMekSIWSS4oAAAAAAAAAAAAADuiaAQ/original"
        selected={selectedMap['2']}
        onSelectedChange={selectFile('2')}
      />
      <AssetItem
        id="3"
        name="spine_skeleton"
        readOnly
        selected={selectedMap['3']}
        onSelectedChange={selectFile('3')}
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*UnoLR4LjgcEAAAAAAAAAAAAADuiaAQ/original"
      />
      <AssetItem
        name="car_prefab"
        readOnly
        thumbnail="https://mdn.alipayobjects.com/huamei_dc3kgb/afts/img/A*HQs2QrqBTawAAAAAAAAAAAAADuiaAQ/original"
      />
    </Grid>
  )
}

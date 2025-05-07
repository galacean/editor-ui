import { forwardRef } from 'react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { styled } from '../design-system'
import { AssetThumbnail, AssetThumbnailProps } from './AssetThumbnail'
import AssetName, { AssetNameProps } from './AssetName'

const StyledAssetItem = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '$1',
  alignItems: 'center',
  '&[data-sub]': {
    backgroundColor: '$grayA2',
  },
  '&[data-sub]:nth-child(1 of &[data-sub])': {
    borderRadius: '$3',
  },
  '&[data-sub]:nth-last-child(1 of &[data-sub])': {
    borderRadius: '$3',
  },
  variants: {
    displayMode: {
      grid: {
        flexDirection: 'column',
      },
      list: {
        flexDirection: 'row',
        marginLeft: '$1',
      },
    },
  },
  defaultVariants: {
    displayMode: 'grid',
  },
})

export interface AssetItemProps extends AssetThumbnailProps, AssetNameProps, React.HTMLAttributes<HTMLDivElement> {
  id?: string
  onSelectedChange?: (e: React.MouseEvent) => void
  readOnly?: boolean
  expandable?: boolean
  expanded?: boolean
  defaultExpanded?: boolean
  children?: React.ReactNode;
  displayMode?: "grid" | "list";
}

export const AssetItem = forwardRef<HTMLDivElement, AssetItemProps>(function AssetItem(
  props: AssetItemProps,
  forwardedRef
) {
  const {
    name,
    selected,
    onSelectedChange,
    readOnly,
    thumbnail,
    onRename,
    expandable,
    loadingStatus,
    children,
    expanded: propExpanded,
    dropping,
    defaultExpanded,
    onToggleExpanded,
    ...rest
  } = props

  const [expanded, setExpanded] = useControllableState({
    prop: propExpanded,
    defaultProp: defaultExpanded ?? false,
    onChange: onToggleExpanded,
  })

  return (
    <StyledAssetItem
      aria-label={name}
      aria-expanded={expanded}
      aria-selected={selected}
      onClick={onSelectedChange}
      {...rest}
      ref={forwardedRef}>
      <AssetThumbnail
        thumbnail={thumbnail}
        mini={rest.displayMode === 'list'}
        loadingStatus={loadingStatus}
        selected={selected}
        expandable={expandable}
        expanded={expanded}
        dropping={dropping}
        onToggleExpanded={() => setExpanded(!expanded)}
      />
      <AssetName name={name} selected={selected} readOnly={readOnly} onRename={onRename} />
      {children}
    </StyledAssetItem>
  )
})

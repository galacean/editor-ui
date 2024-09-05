import { forwardRef } from "react"
import { styled } from '@galacean/design-system'

interface PanelProps {
  children?: React.ReactNode;
}

const StyledPanel = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '$3',
  padding: '$2',
  border: '1px solid $border',
  backgroundColor: "$gray2",
  width: '300px',
  gap: '4px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
});

const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(props, forwardedRef) {
  return (
    <StyledPanel ref={forwardedRef}>
      {props.children}
    </StyledPanel>
  )
});

export {
  Panel,
  type PanelProps
}
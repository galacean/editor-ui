import { useEffect, useState } from 'react'
import { Button, Flex, ThemeProvider, Text, Title, resetStyle } from '@galacean/editor-ui'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    resetStyle()
  }, [])

  return (
    <ThemeProvider>
      <Flex align="both" css={{ width: '100vw', height: '100vh' }}>
        <Flex direction="column" gap="sm" align="v">
          <Title size="6" weight="bold">
            Galacean Editor UI
          </Title>
          <Text>Count: {count}</Text>
          <Button size="md" variant="primary" onClick={() => setCount(count + 1)} css={{ margin: '$4 0' }}>
            Increment Count
          </Button>
          <Text size="sm" secondary>
            Check the bundle analyzer to verify tree-shaking is working correctly
          </Text>
        </Flex>
      </Flex>
    </ThemeProvider>
  )
}

export default App

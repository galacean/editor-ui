import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { IconBellRinging, IconSettings, IconSparkles } from '@tabler/icons-react'

import { Button } from '../Button'
import { Flex } from '../Flex'
import { Input } from '../Input'
import { Select, SelectItem } from '../Select'
import { Text } from '../Typography'

import { Dialog, DialogBody, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '.'

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['trigger', 'children', 'css', 'className'],
    },
  },
  args: {
    closable: true,
  },
} satisfies Meta<typeof Dialog>

export default meta

const DialogShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      direction="column"
      gap="lg"
      css={{
        width: '100%',
      }}>
      {children}
    </Flex>
  )
}

export const Overview: StoryFn<typeof Dialog> = (args) => {
  const [open, setOpen] = useState(false)

  return (
    <Flex direction="column" gap="md" css={{ width: '420px' }}>
      <Text muted>A lightweight editor dialog with a title area, compact body content and optional close action.</Text>
      <Button variant="soft" size="md" startSlot={<IconSparkles size="14px" />} onClick={() => setOpen(true)}>
        Open Overview Dialog
      </Button>
      <Dialog {...args} open={open} onOpenChange={setOpen}>
        <DialogShell>
          <DialogHeader>
            <DialogTitle>Create workspace</DialogTitle>
            <DialogDescription>Set up a workspace for artists, scenes and publishing presets.</DialogDescription>
          </DialogHeader>

          <DialogBody>
            <Input variant="soft" placeholder="Workspace name" startSlot={<IconSettings size="12px" />} size="sm" />
            <Select placeholder="Region" defaultValue="cn" variant="soft">
              <SelectItem value="cn">China</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
            </Select>
          </DialogBody>

          <DialogFooter as={Flex} gap="sm" justifyContent="end">
            <Button variant="subtle" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" onClick={() => setOpen(false)}>
              Continue
            </Button>
          </DialogFooter>
        </DialogShell>
      </Dialog>
    </Flex>
  )
}

export const Layouts: StoryFn<typeof Dialog> = (args) => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)

  return (
    <Flex gap="sm" wrap align="v">
      <Button variant="soft" startSlot={<IconSettings size="14px" />} onClick={() => setSettingsOpen(true)}>
        Settings Dialog
      </Button>
      <Button variant="outline" startSlot={<IconBellRinging size="14px" />} onClick={() => setNoticeOpen(true)}>
        Notice Dialog
      </Button>

      <Dialog {...args} open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogShell>
          <DialogHeader>
            <DialogTitle>Editor settings</DialogTitle>
            <DialogDescription>
              Adjust default scene behavior and UI preferences for your current project.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Input placeholder="Project alias" size="sm" />
            <Select placeholder="Default camera" defaultValue="perspective" variant="soft">
              <SelectItem value="perspective">Perspective</SelectItem>
              <SelectItem value="orthographic">Orthographic</SelectItem>
            </Select>
          </DialogBody>
          <DialogFooter as={Flex} gap="sm" justifyContent="end">
            <Button variant="subtle" onClick={() => setSettingsOpen(false)}>
              Close
            </Button>
            <Button variant="solid" onClick={() => setSettingsOpen(false)}>
              Save
            </Button>
          </DialogFooter>
        </DialogShell>
      </Dialog>

      <Dialog
        {...args}
        open={noticeOpen}
        onOpenChange={setNoticeOpen}
        css={{ width: 'min(360px, calc(100vw - 32px))' }}>
        <DialogShell>
          <DialogHeader>
            <DialogTitle>Publishing finished</DialogTitle>
            <DialogDescription>
              Scene bundle uploaded successfully. You can continue editing or open the publish dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter as={Flex} gap="sm" justifyContent="end" css={{ marginTop: '$1' }}>
            <Button variant="subtle" onClick={() => setNoticeOpen(false)}>
              Stay here
            </Button>
            <Button variant="soft" onClick={() => setNoticeOpen(false)}>
              Open dashboard
            </Button>
          </DialogFooter>
        </DialogShell>
      </Dialog>
    </Flex>
  )
}

export const Closable: StoryFn<typeof Dialog> = () => {
  const [closableOpen, setClosableOpen] = useState(false)
  const [plainOpen, setPlainOpen] = useState(false)

  return (
    <Flex gap="sm" wrap align="v">
      <Button variant="soft" onClick={() => setClosableOpen(true)}>
        Closable
      </Button>
      <Button variant="subtle" onClick={() => setPlainOpen(true)}>
        Without Close Button
      </Button>

      <Dialog open={closableOpen} onOpenChange={setClosableOpen} closable>
        <DialogShell>
          <DialogHeader>
            <DialogTitle>Closable dialog</DialogTitle>
            <DialogDescription>
              The top-right close button is useful for longer forms and less destructive flows.
            </DialogDescription>
          </DialogHeader>
        </DialogShell>
      </Dialog>

      <Dialog open={plainOpen} onOpenChange={setPlainOpen} closable={false}>
        <DialogShell>
          <DialogHeader>
            <DialogTitle>Plain dialog</DialogTitle>
            <DialogDescription>
              Some flows are clearer when dismissal only happens through explicit footer actions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter as={Flex} justifyContent="end">
            <Button variant="soft" onClick={() => setPlainOpen(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogShell>
      </Dialog>
    </Flex>
  )
}

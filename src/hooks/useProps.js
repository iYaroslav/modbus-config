import React, { useState, createContext, useContext, useEffect } from 'react'
import ls from 'local-storage'

const PropsContext = createContext({})

const cache = {
  serverIp: ls('server-ip') || '',
  idProvider: ls('id-provider') || 'mac',
  isWeak: ls('weak-mode') || false,
  isKiosk: ls('kiosk-mode') || false,
  isRS485Enabled: ls('rs485-enabled') || false,
  autorun: ls('autorun') || false,
}

function storeValue(value, key, storeKey = key) {
  if (cache[key] !== value) {
    ls(storeKey, value)
    cache[key] = value
  }
}

export const PropsProvider = ({ children }) => {
  const [isAutorunEnabled, setAutorunEnabled] = useState(cache.autorun)
  const [isFocused, setFocused] = useState(true)
  const [device, setDevice] = useState(undefined)
  const [isConnected, setConnected] = useState(undefined)

  useEffect(() => {
    storeValue(isAutorunEnabled, 'autorun')
    window.API.setAutorun(isAutorunEnabled)
  }, [isAutorunEnabled])

  // useEffect(() => {
  //   if (isCoreInitialized && isRS485Enabled && device && device.filial_id) {
  //     const onCollision = () => {
  //       core.alert
  //         .broadcast({
  //           topic: 'found_collision',
  //           filial_id: device.filial_id,
  //         })
  //         .catch(e => console.error('Unable to send message', e.message))
  //     }
  //
  //     const onFound = (did) => {
  //       control.update(did, '_--_')
  //       core.alert
  //         .broadcast({
  //           topic: 'found_device',
  //           filial_id: device.filial_id,
  //         })
  //         .catch(console.error)
  //     }
  //
  //     const onUpdated = (did) => {
  //       core.device
  //         .discover({
  //           id: did,
  //           type: 'display',
  //           filial_id: device.filial_id,
  //         })
  //         .catch(e => console.error('Unable to update device', e.message))
  //     }
  //
  //     const onIdentity = (data) => {
  //       try {
  //         Object.entries(data).forEach(([did, { value }]) => control.update(did, value))
  //       } catch (e) {
  //         console.error(e)
  //       }
  //     }
  //
  //     const onTicket = (data) => {
  //       const empty = ['redirected', 'finished', 'abandoned', 'dropped']
  //
  //       if (data && data.status && data.number && Array.isArray(data.display_ids)) {
  //         const blink = data.status === 'called'
  //         const value = empty.includes(data.status) ? '    ' : data.number
  //         data.display_ids.forEach((did) => control.update(did, value, blink))
  //       }
  //     }
  //
  //     bus.on('alert-find_devices', control.find)
  //     bus.on('alert-detect_devices', onIdentity)
  //     bus.on('ticket', onTicket)
  //     bus.on(events.FOUND, onFound)
  //     bus.on(events.UPDATED, onUpdated)
  //     bus.on(events.COLLISION, onCollision)
  //
  //     return () => {
  //       bus.off('alert-find_devices', control.find)
  //       bus.off('alert-detect_devices', onIdentity)
  //       bus.off('ticket', onTicket)
  //       bus.off(events.FOUND, onFound)
  //       bus.off(events.UPDATED, onUpdated)
  //       bus.off(events.COLLISION, onCollision)
  //     }
  //   }
  // }, [isCoreInitialized, isRS485Enabled, device])

  useEffect(() => {
    window.API.onFocusChanged(setFocused)
  }, [])

  return <PropsContext.Provider value={ {
    isAutorunEnabled, setAutorunEnabled,
    isFocused, device, isConnected,
    windowProps: {
      closeWindow: window.API.closeWindow,
      minimizeWindow: window.API.minimizeWindow,
      focused: isFocused,
    },
  } }>
    { children }
  </PropsContext.Provider>
}

export function useProps() {
  return useContext(PropsContext)
}

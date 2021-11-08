import Backup from './app'

window.addEventListener('error', (e) => {
  const target: HTMLLinkElement | HTMLScriptElement = e.target as HTMLLinkElement
  if (!Boolean(target instanceof HTMLElement)) return
  if (target.tagName === 'LINK') Backup.handleLink(target)
  if (target.tagName === 'SCRIPT') Backup.handleScript(target as unknown as HTMLScriptElement)
}, true)

export default Backup

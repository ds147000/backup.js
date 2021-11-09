import Backup from './app'

window.addEventListener('error', (e) => {
  const target: HTMLLinkElement | HTMLScriptElement | HTMLImageElement = e.target as HTMLLinkElement
  if (!Boolean(target instanceof HTMLElement)) return
  if (target.tagName.toLocaleUpperCase() === 'LINK') Backup.handleLink(target)
  if (target.tagName.toLocaleUpperCase() === 'SCRIPT') Backup.handleScript(target as unknown as HTMLScriptElement)
  if (target.tagName.toLocaleUpperCase() === 'IMG') Backup.handleImage(target as unknown as HTMLImageElement )
}, true)

export default Backup

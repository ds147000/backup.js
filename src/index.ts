import Backup from './app'

window.addEventListener('error', (e) => {
  const target: HTMLLinkElement | HTMLScriptElement | HTMLImageElement = e.target as HTMLLinkElement
  if (!Boolean(target instanceof HTMLElement)) return

  let isHandle: boolean = false
  if (target.tagName.toLocaleUpperCase() === 'LINK') 
    isHandle = Backup.handleLink(target)

  if (target.tagName.toLocaleUpperCase() === 'SCRIPT')
    isHandle = Backup.handleScript(target as unknown as HTMLScriptElement)

  if (target.tagName.toLocaleUpperCase() === 'IMG') 
    isHandle = Backup.handleImage(target as unknown as HTMLImageElement )

  if (isHandle) e.stopPropagation()
}, true)

export default Backup

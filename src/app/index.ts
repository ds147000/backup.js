
class Backup {
  static number = 0
  static maxNumer = 20

  static handleLink(target: HTMLLinkElement): void {
    const oldUrl = target.href
    const url = Backup.getNewUrl(oldUrl, 'LINK')
    if (Backup.isStop(oldUrl, url)) return // 相同地址，停止
    Backup.setNewLink(url)
  }

  static handleScript(target: HTMLScriptElement): void {
    const oldUrl = target.src
    const url = Backup.getNewUrl(oldUrl, 'SCRIPT')
    if (Backup.isStop(oldUrl, url)) return // 相同地址，停止
    Backup.setNewScript(url)
  }

  static handleImage(target: HTMLImageElement): void {
    const oldUrl = target.src
    const url = Backup.getNewUrl(oldUrl, 'IMG')
    if (Backup.isStop(oldUrl, url)) return // 相同地址，停止
    target.src = url
  }

  static setNewLink(url: string): void {
    Backup.number += 1
    
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url.trim()
    document?.head?.appendChild(link)
  }

  static setNewScript(url: string): void {
    Backup.number += 1

    const el = document.createElement('script')
    el.src = url.trim()
    document?.body?.appendChild(el)
  }

  static isStop(oldUrl: string, newUrl?: string): boolean {
    if (Backup.number >= Backup.maxNumer) return true

    if (!newUrl || !oldUrl) return true
    return oldUrl.trim() === newUrl.trim()
  }

  static getNewUrl(url: string, tagName: 'SCRIPT' | 'LINK' | 'IMG'): string {
    return url
  }
}

export default Backup
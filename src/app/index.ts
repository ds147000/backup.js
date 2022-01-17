
class Backup {
  static number = 0
  static max = 40

  static handleLink(target: HTMLLinkElement): boolean {
    const oldUrl = target.href
    const url = Backup.getNewUrl(oldUrl, 'LINK')
    if (Backup.isStop(oldUrl, url)) return false // 相同地址，停止
    Backup.setNewLink(url)

    return true
  }

  static handleScript(target: HTMLScriptElement): boolean {
    const oldUrl = target.src
    const url = Backup.getNewUrl(oldUrl, 'SCRIPT')
    if (Backup.isStop(oldUrl, url)) return false // 相同地址，停止
    Backup.setNewScript(url)

    return true
  }

  static handleImage(target: HTMLImageElement): boolean {
    const oldUrl = target.src
    const url = Backup.getNewUrl(oldUrl, 'IMG')
    if (Backup.isStop(oldUrl, url)) return false // 相同地址，停止
    target.src = url

    return true
  }

  static setNewLink(url: string): void {
    Backup.number += 1
    
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url.trim()
    document.head?.appendChild(link)
  }

  static setNewScript(url: string): void {
    Backup.number += 1

    const el = document.createElement('script')
    el.src = url.trim()
    document.body?.appendChild(el)
  }

  static isStop(oldUrl: string, newUrl?: string): boolean {
    if (Backup.number >= Backup.max) return true

    if (!newUrl || !oldUrl) return true
    return oldUrl.trim() === newUrl.trim()
  }

  static getNewUrl(url: string, tagName: 'SCRIPT' | 'LINK' | 'IMG'): string {
    return url
  }
}

export default Backup
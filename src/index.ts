import Backup from './app'

listenerWindow()

function handleWindowError(e: Event) {
  const target: HTMLLinkElement | HTMLScriptElement | HTMLImageElement = e.target as HTMLLinkElement

  if (!Boolean(target instanceof HTMLElement)) return // 非元素错误，终止

  let isHandle: boolean = false
  if (target.tagName.toLocaleUpperCase() === 'LINK') 
    isHandle = Backup.handleLink(target)

  if (target.tagName.toLocaleUpperCase() === 'SCRIPT')
    isHandle = Backup.handleScript(target as unknown as HTMLScriptElement)

  if (target.tagName.toLocaleUpperCase() === 'IMG') 
    isHandle = Backup.handleImage(target as unknown as HTMLImageElement )

  if (isHandle) e.stopPropagation() // 完成错误处理，阻止冒泡影响程序
}

function listenerWindow() {
  window.addEventListener('error', handleWindowError, true)
}

function removeListenerWindow() {
  window.removeEventListener('error', handleWindowError, true)
}


function listenerServiceWorker() {
  let ServiceWorkerApp: ServiceWorkerRegistration

  navigator.serviceWorker.register(window['backupWorkerUrl'], { scope: '/' })
    .then(function(res) {
      ServiceWorkerApp = res
      removeListenerWindow()
    })
    .catch(function(error) {
      console.error(error)
      listenerWindow()
    })

  if (ServiceWorkerApp) ServiceWorkerApp.update()
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration()
    .then((res) => {
      // 先开启全局服务
      if (!res) removeListenerWindow()

      // 当脚本路径被删除则卸载服务
      if (!window['backupWorkerUrl'] && res?.active?.scriptURL?.indexOf?.('backup-wroker.js') !== -1) res.unregister()
      if (!window['backupWorkerUrl']) return
      
      listenerServiceWorker()
    })
    .catch((err) => {
      console.error(err)
    })
}

export default Backup

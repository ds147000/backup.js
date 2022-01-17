function isImgaeAssets(url) {
  return /\.(png|jpg|jpeg|gif)/.test(url)
}

// 一级域名
const DOMAIN_1 = 'https://xxxx.com/'
// 二级域名
const DOMAIN_2 = 'https://abc/'
// 三级域名
const DOMAIN_3 = '/'

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return; // 先阻止拦截图片，因为图片 cdn 存在问题无法直接fetch访问

  if (new RegExp(DOMAIN_1).test(event.request.url)) {
    event.respondWith(handleAssetsRequest(event.request));
  }

  return ;
});

function handleAssetsRequest(request) {
  var newRequest = new Request(request.url, { method: 'GET' }) // 重新定义request 解决源request访问oss错误问题

  return fetch(newRequest)
    .then(function(response) {
      if (!response.ok) return handleErrorRequestOfAliDomain(newRequest)
      return response;
    })
    .catch(function(err) {
      return handleErrorRequestOfAliDomain(newRequest);
    })
}

// 二级请求阿里云
function handleErrorRequestOfAliDomain(request) {
  var url = request.url.replace(new RegExp(DOMAIN_1), DOMAIN_2);

  var newRequest = new Request(url, { method: 'GET' });

  return fetch(newRequest)
    .then(function(response) {
      if (!response.ok) return handleErrorRequestOfServer(newRequest)
      return response;
    })
    .catch(function(err) {
      if (isImgaeAssets(url)) {
        throw err;
      }
      return handleErrorRequestOfServer(newRequest);
    })
}

function handleErrorRequestOfServer(request) {
  var url = request.url.replace(new RegExp(DOMAIN_2), DOMAIN_3);
  var newRequest = new Request(url, { method: 'GET' });

  return fetch(newRequest)
    .then(function(response) {
      return response;
    })
    .catch(function(err) {
      throw err
    })
}

function isImgaeAssets(url) {
  return /\.(png|jpg|jpeg|gif)/.test(url)
}

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return; // 先阻止拦截图片，因为图片 cdn 存在问题无法直接fetch访问

  if (/\/xxx\.\//.test(event.request.url)) {
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
  var url = request.url.replace(/http.*?xxx\.com\//, 'https://abc/');

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
  var url = request.url.replace('https://abc/', '/');
  var newRequest = new Request(url, { method: 'GET' });

  return fetch(newRequest)
    .then(function(response) {
      return response;
    })
    .catch(function(err) {
      throw err
    })
}

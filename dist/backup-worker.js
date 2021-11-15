self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  if (/\/assets.xrkmm.cn\//.test(event.request.url)) {
    event.respondWith(handleAssetsRequest(event.request));
  }

  return ;
});

function handleAssetsRequest(request) {
  return fetch(request)
    .then(function(response) {
      return response;
    })
    .catch(function(err) {
      return handleErrorRequestOfAliDomain(request);
    })
}

// 二级请求阿里云
function handleErrorRequestOfAliDomain(request) {
  var url = request.url.replace(/http.*?assets\.xrkmm\.cn\//, 'https://xrk-assets.oss-cn-shenzhen.aliyuncs.com/');

  var newRequest = new Request(url, { method: 'GET' });
  return fetch(newRequest)
    .then(function(response) {
      return response;
    })
    .catch(function(err) {
      if (/\.(png|jpg|jpeg|gif)/.test(url)) {
        throw err;
      }
      return handleErrorRequestOfServer(request);
    })
}

function handleErrorRequestOfServer(request) {
  var url = request.url.replace('https://xrk-assets.oss-cn-shenzhen.aliyuncs.com/', '');

  var newRequest = new Request(url, { method: 'GET'});

  return fetch(newRequest)
    .then(function(response) {
      return response;
    })
    .catch(function(err) {
      throw err
    })
}
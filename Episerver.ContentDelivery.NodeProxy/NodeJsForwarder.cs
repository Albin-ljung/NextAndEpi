using Microsoft.AspNetCore.Http;
using System.Net;
using Yarp.ReverseProxy.Forwarder;
using System.Diagnostics;

namespace Episerver.ContentDelivery.NodeProxy
{
    internal class NodeJsForwarder
    {
        private readonly IHttpForwarder _forwarder;
        private readonly NodeJsOptions _options;
        private readonly HttpMessageInvoker _httpClient;
        private readonly ForwarderRequestConfig _requestConfig;


        public NodeJsForwarder(
       IHttpForwarder forwarder,
       NodeJsOptions options)
        {
            _forwarder = forwarder;
            _options = options;

            _httpClient = new HttpMessageInvoker(new SocketsHttpHandler()
            {
                UseProxy = false,
                AllowAutoRedirect = false,
                AutomaticDecompression = DecompressionMethods.None,
                UseCookies = false,
                ActivityHeadersPropagator = new ReverseProxyPropagator(DistributedContextPropagator.Current)
            });

            _requestConfig = new ForwarderRequestConfig
            {
                ActivityTimeout = TimeSpan.FromSeconds(_options.ProxyTimeout)
            };
        }

        public virtual ValueTask<ForwarderError> ProxyRequest(HttpContext context)
            => _forwarder.SendAsync(context, $"http://localhost:{_options.DestinationPort}", _httpClient, _requestConfig, HttpTransformer.Default);
    }
}

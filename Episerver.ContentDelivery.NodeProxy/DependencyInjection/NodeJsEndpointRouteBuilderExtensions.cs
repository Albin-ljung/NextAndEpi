using EPiServer.ContentDelivery.NodeProxy;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace Episerver.ContentDelivery.NodeProxy.DependencyInjection
{
    public static class NodeJsEndpointRouteBuilderExtensions
    {
        public static IEndpointRouteBuilder MapNodeJs(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapFallback("{*path}", async context =>
            {
                var process = endpoints.ServiceProvider.GetRequiredService<NodeJsProcess>();
                var ready = await process.EnsureProcessStarted();

                if (ready)
                {
                    var forwarder = endpoints.ServiceProvider.GetRequiredService<NodeJsForwarder>();
                    await forwarder.ProxyRequest(context);
                }
            }).WithDisplayName("Node.js proxy");

            return endpoints;
        }
    }
}

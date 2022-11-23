using Cms.Core.Pages;
using Cms.Core.Pages.Base;
using EPiServer.Web.Mvc;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Mvc;


namespace Cms.Core.Controllers
{
    public class LandingPageController : PageController<LandingPage>
    {

            public RedirectResult Index(LandingPage currentPage)
            {
                var userCanEdit = currentPage.ACL.QueryDistinctAccess(EPiServer.Security.AccessLevel.Edit);
                var url = UrlResolver.Current.GetUrl(
                       currentPage.ContentLink,
                       currentPage.Language.TwoLetterISOLanguageName,
                       new VirtualPathArguments
                       {
                           ContextMode = EPiServer.Web.ContextMode.Default
                       });

                url += $"?epieditmode=true&iseditbale={userCanEdit}";


                return new RedirectResult(url);
            }
        }
}

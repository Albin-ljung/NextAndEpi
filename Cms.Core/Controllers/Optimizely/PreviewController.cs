using Cms.Core.Blocks;
using Cms.Core.Pages;
using EPiServer;
using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Framework.Web;
using EPiServer.Framework.Web.Mvc;
using EPiServer.Web;
using EPiServer.Web.Mvc;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cms.Core.Controllers.Optimizely
{
    [TemplateDescriptor(Inherited = true,
         TemplateTypeCategory = TemplateTypeCategories.MvcController,
         Tags = new[] { RenderingTags.Preview, RenderingTags.Edit },
         AvailableWithoutTag = false)]
    [RequireClientResources]
    public class PreviewController : ActionControllerBase, IRenderTemplate<BlockData>
    {
        private readonly IContentRepository _contentRepository;

        public PreviewController(IContentRepository contentRepository)
        {
            _contentRepository = contentRepository;
        }

        public ActionResult Index(IContent currentContent)
        {
            var startPage = _contentRepository.Get<PageData>(ContentReference.StartPage);
            var model = new BlockEditPageViewModel(startPage, currentContent);

            return View(model);
        }
    }
}

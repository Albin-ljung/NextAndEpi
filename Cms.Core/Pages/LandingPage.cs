using Cms.Core.Pages.Base;
using Cms.Core.Resouces;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using System.ComponentModel.DataAnnotations;


namespace Cms.Core.Pages
{
    [ContentType(
    DisplayName ="Landing Page",
       GUID = "fe78bb39-39c8-439e-b6c4-5d87d9be1f96",
       GroupName = GlobalConstants.GroupNames.Common)]
    [ImageUrl("/images/pic01.jpg")]
    public class LandingPage : SeoMetaData
    {
        [Display(
           GroupName = SystemTabNames.Content,
           Order = 10)]
        public virtual string Title { get; set; }

        [Display(
            GroupName = SystemTabNames.Content,
            Order = 20)]
        public virtual ContentArea Blocks { get; set; }
    }
}

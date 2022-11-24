using Cms.Core.Resouces;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using System.ComponentModel.DataAnnotations;


namespace Cms.Core.Blocks
{
    [ContentType(
    DisplayName = "Text block",
      GUID = "61d17c72-6663-48d8-b0a1-f5bf393368e0",
      GroupName = GlobalConstants.GroupNames.Common)]
    [ImageUrl("/images/pic02.jpg")]
    public class TextBlock : BlockData
    {
        [Display(
           Name = "Content",
           GroupName = SystemTabNames.Content,
           Order = 100)]
        public virtual XhtmlString Content { get; set; }
    }
}

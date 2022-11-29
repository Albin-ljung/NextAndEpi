using Cms.Core.Resouces;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Cms.Core.Resouces.GlobalConstants;

namespace Cms.Core.Blocks
{
    [ContentType(
        DisplayName = "Image block",
        GUID = "493bcff8-d98e-463a-8124-cfd8deeeb5c0",
        GroupName = GlobalConstants.GroupNames.Common)]
    public class ImageBlock : BlockData
    {
        [Display(
          Name = "Image",
          GroupName = SystemTabNames.Content,
          Order = 100)]
        [UIHint(UIHint.Image)]
        public virtual ContentReference Image { get; set; }
    }
}

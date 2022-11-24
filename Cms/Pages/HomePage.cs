﻿using System.ComponentModel.DataAnnotations;
using Cms.Core.Pages.Base;
using Cms.Core.Resouces;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;

namespace Cms.Core.Pages
{
    [ContentType(
        DisplayName = "Home Page",
        GUID = "F4F8CD6F-28E0-4009-B32F-A77F90473CC6",
        GroupName = GlobalConstants.GroupNames.Common)]
    [ImageUrl("/images/pic01.jpg")]
    public class HomePage : SeoMetaData
    {
        [Display(
           GroupName = SystemTabNames.Content,
           Order = 10)]
        public virtual string Title { get; set; }

        [Display(
            GroupName = SystemTabNames.Content,
            Order = 20)]
        public virtual ContentArea MainContentArea { get; set; }
    }
}
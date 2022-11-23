using EPiServer.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cms.Core.Blocks
{
    public class BlockEditPageViewModel
    {
        public BlockEditPageViewModel(PageData page, IContent content)
        {
            PreviewBlock = new PreviewBlock(page, content);
        }

        public PreviewBlock PreviewBlock { get; }
    }
}

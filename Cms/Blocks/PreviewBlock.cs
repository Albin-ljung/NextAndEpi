using EPiServer.Core;

namespace Cms.Core.Blocks
{
    public class PreviewBlock : PageData
    {
        public IContent PreviewContent { get; }

        public PreviewBlock(PageData currentPage, IContent previewContent)
            : base(currentPage)
        {
            PreviewContent = previewContent;
        }
    }
}

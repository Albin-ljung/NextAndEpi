export default function TextBlock({blockContent}:any){
    const { content } = blockContent.contentLink.expanded;
    return(
        <div dangerouslySetInnerHTML={{__html: content}} />
    )
}
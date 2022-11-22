export default function TextBlock({blockContent}:any){
    const { content } = blockContent;
    return(
        <div dangerouslySetInnerHTML={{__html: content.value}} />
    )
}
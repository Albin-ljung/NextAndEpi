export default function ImageBlock({blockContent}:any){
    const { image } = blockContent.contentLink.expanded;
    return (
        <img src={image.url} />
    )
}
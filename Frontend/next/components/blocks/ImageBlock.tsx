export default function ImageBlock({blockContent}:any){
    const { image } = blockContent;
    return (
        <img src={image.value.url} />
    )
}
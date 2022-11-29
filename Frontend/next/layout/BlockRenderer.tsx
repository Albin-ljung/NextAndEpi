import ImageBlock from "../components/blocks/ImageBlock"
import TextBlock from "../components/blocks/TextBlock"

const blockTypes = {
    "TextBlock": TextBlock,
    "ImageBlock": ImageBlock
} as any


export default function BlockRenderer({ blocks }:any){
    if(!blocks) return null;
   
    const BlockComponents = blocks.map((block:any, i:number) => {
        const Component = blockTypes[block.contentLink.expanded.contentType[1]];
        if(!Component) return null;

        return <Component blockContent={block} key={i}/>
    });

    if(BlockComponents.length !== 0){
        return (
            <div>
                {BlockComponents}
            </div>
        )
    }

    return <></>
}
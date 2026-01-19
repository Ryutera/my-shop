import { getProductsFromContentful } from '@/app/actions';
import NoResults from '@/components/NoResults'
import ProductsGrid from '@/components/ProductsGrid'

type PageProps = {
    params: Promise<{ slug: string }>;
};

const page = async ({ params }: PageProps) => {

    const {slug} = await params
    const q = slug.toLowerCase();


    const items = await getProductsFromContentful()
    if (!items) { console.log("no clothes data") }


    const filteredItems = items!.filter((i) =>
        String(i.fields?.name ?? "").toLowerCase().includes(q)
    );

    
      return (
 filteredItems.length===0 ? (
            <div className="flex justify-center items-center w-full min-h-[50vh]">
                <NoResults />
            </div>
        ) : (
        <ProductsGrid items={filteredItems} label={slug}/>
    )
      )
       
    

}





export default page

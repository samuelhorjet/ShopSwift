import ProductDetail from "./ProductDetail"

// This function tells Next.js which paths to pre-render
export async function generateStaticParams() {
  // Generate paths for all your products
  // This should ideally come from your actual data source
  const productIds = [1, 2, 3, 4, 5, 6, 7, 8]

  return productIds.map((id) => ({
    id: id.toString(),
  }))
}

export default function Page({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  return <ProductDetail productId={productId} />
}

import ProductDetail from "../[id]/ProductDetail"

export default function Page({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  return <ProductDetail productId={productId} />
}

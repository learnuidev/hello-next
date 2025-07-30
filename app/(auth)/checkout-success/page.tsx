export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ checkoutId: string }>;
}) {
  const params = await searchParams;

  const checkoutId = params.checkoutId;

  return (
    <div>
      <h1>Success</h1>

      <p>Checkout ID: {checkoutId}</p>
    </div>
  );
}

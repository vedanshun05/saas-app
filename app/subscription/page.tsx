import { PricingTable } from "@clerk/nextjs"

export const dynamic = 'force-dynamic';

const Subscription = () => {
  return (
    <div>
      <PricingTable />
    </div>
  )
}

export default Subscription
'use client';

import { mockOrders, statusColors } from '../data';

export function AccountOrder() {
  return (
    <div className='space-y-4'>
      <h2 className='mb-4 text-xl font-semibold'>Order History</h2>
      {mockOrders.map((order) => (
        <div key={order.id} className='bg-card border-border rounded-2xl border p-6'>
          <div className='mb-4 flex items-start justify-between'>
            <div>
              <p className='text-lg font-semibold'>{order.id}</p>
              <p className='text-muted-foreground text-sm'>
                Placed on {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                statusColors[order.status]
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <div className='mb-4 space-y-3'>
            {order.items.map((item, idx) => (
              <div key={idx} className='flex items-center justify-between text-sm'>
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className='border-border flex items-center justify-between border-t pt-4'>
            <span className='font-medium'>Total</span>
            <span className='text-lg font-semibold'>${order.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

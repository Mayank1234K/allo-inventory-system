export interface ProductInventory {
  productId: string;
  productName: string;
  warehouseId: string;
  warehouse: string;
  availableStock: number;
}

export interface Reservation {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  status: string;
  expiresAt: string;
}
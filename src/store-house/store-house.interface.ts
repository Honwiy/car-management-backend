import { CarPropertyItemList } from '../car/car.interface'

// 汽车采购
export interface CarPurchaseOrdering {
  purchaseOrderingCode?: string
  purchaseOrderingNumber?: string
  carPropertyItemList?: CarPropertyItemList
  purchaseOrderingDate?: string
  PurchaseOrderingPlanningDate?: string
  purchaseOrderingCount?: number
  startPrice?: string
  purchaseOrderingTotalPrice?: string
  preSellingPrice?: string
  paymentType?: string
  billingNumber?: string
  cooperationBank?: string
  billingPrice?: string
  billingStartDate?: string
  billingEndDate?: string
}

export class StoreHouse {
  Id?: number
  StoreHouseCode?: string
  StoreHouseLocation?: string
  StoreHouseName?: number
  StoreHouseTel?: number
  IsActived?: number
  CreatedDate?: number
  CreatedBy?: number
  UpdatedDate?: number
  UpdatedBy?: number
}

export class StorehouseCarMapping {
  Id?: number
  StoreHouseId?: number
  CarId?: number
  Status?: string
  LockTime?: string
  UnlockTime?: string
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

// 售后配件采购
// export interface AccessoriesPurchaseOrdering {

// }

// // 精品商品采购
// export interface BoutiquePurchaseOrdering {
  
// }

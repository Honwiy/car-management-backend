export class CarPurchaseOrderingDto {
  carPropertyItemMappingId?: any
  purchaseOrderingCode?: string
  purchaseOrderingNumber?: string
  // carPropertyItemList?: CarPropertyItemList
  purchaseOrderingDate?: string
  purchaseOrderingPlanningDate?: string
  purchaseOrderingCount?: number
  // startPrice?: string
  purchaseOrderingTotalPrice?: string
  // preSellingPrice?: string
  purchaseOrderingStatus?: string
  paymentType?: string
  billingNumber?: string
  cooperationBank?: string
  billingPrice?: string
  billingStartDate?: string
  billingEndDate?: string
  createdDate?: string
  createdBy?: string
  updatedDate?: string
  updatedBy?: string
}

export function initCarPurchaseOrdering() {
    return {
      carPropertyItemMappingId: '',
      purchaseOrderingCode: '',
      purchaseOrderingNumber: '',
      // carPropertyItemList?: CarPropertyItemList
      purchaseOrderingDate: '',
      purchaseOrderingPlanningDate: '',
      purchaseOrderingCount: 0,
      startPrice: '',
      purchaseOrderingTotalPrice: '',
      preSellingPrice: '',
      purchaseOrderingStatus: '',
      paymentType: '',
      billingNumber: '',
      cooperationBank: '',
      billingPrice: '',
      billingStartDate: '',
      billingEndDate: '',
      createdDate: '',
      createdBy: '',
      updatedDate: '',
      updatedBy: '',
    }
  }

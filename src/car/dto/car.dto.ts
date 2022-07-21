export class CarDto {
  id?: number
  carPropertyItemMappingId?: number
  storeHouseId: number
  originStoreHouseId: number
  carPurchaseOrderingNumber: string
  isActive: number
  purchaseOrderingPrice: number
  standardSellPrice: number
  vinNumber: string
  engineNumber: string
  batteryPackNumber: string
  gearboxNumber: string
  announcementNumber: string
  certificateNumber: string
  certificateLocation: string
  arriveStoreDate: string
  storeDateCount: number
  isThirdParty: number
  isLocked: number
  carStoreHouseStatus: string
  carStatus: string
  sellingStatus: string
  productionDate: string
  manufacturedDate: string
  createdDate: string
  createdBy: string
  updatedDate: string
  updatedBy: string
}


export function initCarDto() {
  return {
    carPropertyItemMappingId: null,
    storeHouseId: null,
    originStoreHouseId: null,
    carPurchaseOrderingNumber: '',
    isActive: 1,
    purchaseOrderingPrice: null,
    standardSellPrice: null,
    vinNumber: '',
    engineNumber: '',
    batteryPackNumber: '',
    gearboxNumber: '',
    announcementNumber: '',
    certificateNumber: '',
    certificateLocation: '',
    arriveStoreDate: '',
    storeDateCount: null,
    isThirdParty: 0,
    isLocked: 0,
    carStoreHouseStatus: '',
    carStatus: '',
    sellingStatus: '',
    productionDate: '',
    manufacturedDate: '',
    createdDate: '',
    createdBy: '',
    updatedDate: '',
    updatedBy: '',
  }
}

export function initCarPropertyItemList() {
  return {
    brand: '',
    carSeries: '',
    carType: '',
    carTypeCode: '',
    carTypeCategory: '',
    carSweptVolume: '',
    transmission: '',
    carColor: '',
    productionAddress: '',
    productName: ''
  }
}

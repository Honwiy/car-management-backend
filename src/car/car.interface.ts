export interface Car {
  Id?: number
  VinNumber?: string
  CarTypeId: number
  EngineNumber?: string
  Color?: number
  PurchaseId?: number
  CerificationStatus?: string
  CerificationNumber?: string
  Status?: string
}


export interface CarPropertyItemList {
  brand?: string
  carSeries?: string
  carType?: string
  carTypeCode?: string
  carTypeCategory?: string
  carSweptVolume?: string
  transmission?: string
  carColor?: string
  productionAddress?: string
  productName?: string
}

export interface CarPropertyList {
  Id?: number
  PropertyCode?: string
  PropertyText?: string
  IsActive?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
}

export interface CarFetchFilter {
  carBrand?: number
  carType?: string
  carSeries?: string
  carBillingEndDateFrom?: number,
  carBillingEndDateTo?: number
}

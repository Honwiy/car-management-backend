export interface Customer {
  Id?: number
  SalesEmployeeId?: number
  Name?: string
  CustomerNumber?: string
  CustomerPhoneNumber?: string
  IdentityCard?: string
  DistrictId?: number
  CustomerSourceId?: number
  BrandId?: number
}

export interface SearchFilter {
  Name?: string
  CustomerPhoneNumber?: string
  IdentityCard?: string
  BrandId?: number
}

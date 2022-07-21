export interface UserData {
  UserId: number
  Username: string
  Email: string
  token?: string
  Image?: string
  Mobile?: string
}

export interface UserGroup {
  UserGroupId: number
  UserGroupCode: string
  UserGroupText: string
}

export interface Department {
  DepartmentId: number
  DepartmentCode: string
  DepartmentText: string
}

export interface Branch {
  BranchId: number
  BranchCode: string
  BranchText: string
}

export interface Brand {
  BrandId: number
  BrandCode: string
  BrandText: string
}

export interface UserGroupMapping {
  UserGroupId?: number
  UserGroupCode?: string
  UserGroupText?: string
  DepartmentId?: number
  DepartmentCode?: string
  DepartmentText?: string
  BranchId?: number
  BranchCode?: string
  BranchText?: string
  BrandId?: number
  BrandCode?: string
  BrandText?: string
}

export interface UserRO {
  user: UserData
}

export interface UserInfoRO {
  user?: UserData
  organizations?: Array<any>
  userGroup?: Array<UserGroupMapping>
  department?: Array<Department>
  branch?: Array<Branch>
  brand?: Array<Brand>
}

export interface OrganizationItem {
  value: string
  label: string
  children: Array<any>
}

export function initUserInfo() {
  return {
    user: {},
    organizations: [],
    userGroup: [],
    department: [],
    branch: [],
    brand: []
  }
}

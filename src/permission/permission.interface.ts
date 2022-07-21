export interface PermissionSearchFilter {
  Name?: string
  Phone?: string
  BranchId?: number
}

export interface UserList{
  Id?: number
  Username?: string
  Email?: string
  Mobile?: number
  BranchName?: string
  BranchId?: number
  BrandName?: string
}

export interface UserListRO {
  userListArr?: Array<UserList>
} 

export function InitUserList(){
  return{
    userListArr: []
  }
}

export interface BranchList {
  BranchId?: number
  BranchName?: string
  BrandName?: string
}

export interface UserPermissionactionMapping {
  Id?: number
  UserId?: number
  PermissionActionId?: number
  BranchId?: number
  isActived?: number
  CreatedDate?: string
  CreatedBy?: string
  UpdatedDate?: string
  UpdatedBy?: string
  
}

export interface UserActionMappingArr{
  userArr: Array<UserPermissionactionMapping>
}






import { GeneralOptionEntity } from './generaloption.entity'

export interface GeneralOption {
  Id: number
  BrandId: number
  FuncitonName: string
  Name: string
  PermissionId: number
  isActive: number
  Category: string
  ParentId?: number
  Code: string
  SubName: string
  Items?: GeneralOption[]
}

export class IGeneralOptionList {

  generalOptionList: Array<GeneralOption>

  constructor(generalOptionList: Array<GeneralOption>) {
    this.generalOptionList = generalOptionList
  }

  initGeneralOptionList() {
    const result: GeneralOption[] = this.getChildren(this.generalOptionList)
    return result
  }

  private getChildren(generalOption: GeneralOptionEntity[], parent?: GeneralOption): GeneralOption[] {
    if (!generalOption || generalOption.length === 0) {
      return []
    }
    const childrenList: GeneralOption[] = generalOption.filter((item: GeneralOptionEntity) => {
      if (!parent) {
        return !item.GeneralOption
      } else {
        return item.GeneralOption && item.GeneralOption.Id === parent.Id
      }
    }).map((item: GeneralOptionEntity) => {
      return {
        Id: item.Id,
        BrandId: item.BrandId,
        ParentId: item.GeneralOption ? item.GeneralOption.Id : undefined,
        Code: item.Code,
        FuncitonName: item.FuncitonName || item.FuncitonName === '' ? item.FuncitonName : undefined,
        Name: item.Name || item.Name === '' ? item.Name : undefined,
        SubName: item.SubName || item.SubName === '' ? item.SubName : undefined,
        PermissionId: item.PermissionId,
        isActive: item.isActive,
        Category: item.Category,
      }
    }).sort((item1: GeneralOption, item2: GeneralOption) => {
      return (item1.Id ? item1.Id : 0) - (item2.Id ? item2.Id : 0)
    })

    childrenList.forEach((childrenItem: GeneralOption) => {
      const items = this.getChildren(generalOption, childrenItem)
      childrenItem.Items = items
    })
    return childrenList
  }

}

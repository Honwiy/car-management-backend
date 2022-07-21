import { ApiModelProperty } from '@nestjs/swagger'

export class DerivativeItem {
  @ApiModelProperty()
  id?: number
  @ApiModelProperty()
  derivativeCategoryId?: number
  @ApiModelProperty()
  itemCode?: string
  @ApiModelProperty()
  itemText?: string
  @ApiModelProperty()
  itemUnit?: string
  @ApiModelProperty()
  itemPrice?: number
  @ApiModelProperty()
  status?: number
  @ApiModelProperty()
  createdDate?: string
  @ApiModelProperty()
  createdBy?: string
  @ApiModelProperty()
  updatedDate?: string
  @ApiModelProperty()
  updatedBy?: string
}

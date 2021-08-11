export const NOT_SUBMITTED = 1
export const AUDITING = 2
export const ACCEPTED = 3
export const REJECTED = 4

export const NOT_MODIFIED = 0
export const MODIFIED = 1
export const ADDED = 2
export const REMOVED = 3

export const NORMAL = 1
export const LOCKED = 2
export const BROKEN = 3

export const BRAND_AUDIT_STATUS_MAP = {
  [NOT_SUBMITTED]: '未提交',
  [AUDITING]: '待审核',
  [ACCEPTED]: '审核通过',
  [REJECTED]: '审核未通过',
}

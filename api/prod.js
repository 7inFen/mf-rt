/**
 * Default production API config.
 * 根据/src/lib/request中对api的解析规则
 * apiList子key的值为对象集合
 * 且请求路径中不能有小数点
 */

const BASE_URL = 'http://kolapi.mdfull.com'
export default {
  apiBaseUrl: BASE_URL,
  uploadFile: `${BASE_URL}/file/add`, // 上传
  downloadFile: '',
  tokenName: 'vra-token',
  apiList: {
    common: {},
    map: {
      accountStatus: 'auth/get-audit-status',
    },
    auth: {
      login: 'auth/login',
      accountInfo: 'home/get-user-info',
      changePassword: 'home/change-password',
      permissionList: 'home/get-permissions',
      getCode: 'auth/get-code',
      validateCode: 'auth/verify-code',
      signup: 'auth/registe',
      resetPassword: 'user/reset-password',
      validateAccount: 'user/validate-account',
      getQualificationInfo: 'agent-file/get-info',
      validateBrand: 'brand/validate',
    },
    notice: {
      list: 'system/notice-list',
      read: 'system/read-notice',
      delete: 'system/delete-notice',
    },
    home: {
      index: 'home/index?env=development',
      submit: 'home/submit.json',
    },
    admin: {
      audit: {
        agentAuditInfo: 'audit/admin-agent-audit-info',
        agentAuditSubmit: 'audit/admin-agent-audit-save',
        agentCertificateExample: BASE_URL + '/image/agent_certificate_example.jpeg',
      },
      brand: {
        brandApplyList: 'brand/get-list',
        brandApplyInfo: 'brand/get-info',
        brandApplySubmit: 'brand/save',
        industryCategoryList: 'brand-category/list',
        brandCertificateExample: BASE_URL + '/image/brand_certificate_example.jpeg',
      },
      account: {
        accountList: 'user/get-agent-user-list',
        accountEnable: 'user/enable-agent-user',
        accountSubmit: 'user/save-agent-user',
      },
      schedule: {
        campaignList: 'schedule/get-list',
        productList: 'schedule/product-line-list',
        campaignCount: 'schedule/get-count',
        platformTalentList: 'schedule/platform-talent-list',
        customerConfirmInfo: 'schedule/customer-confirm-info',
        customerConfirmAuditInfo: 'schedule/customer-confirm-audit-info',
        customerConfirmAuditSubmit: 'schedule/customer-confirm-audit-save',
        removeTalentSubmit: 'schedule/remove-talent',
        auditAcceptSubmit: 'schedule/audit-accept',
        auditRejectSubmit: 'schedule/audit-reject',
        auditFinishSubmit: 'schedule/audit-finish',
        rejectReasonList: 'schedule/reject-reason-list',
        confirmReasonList: 'schedule/confirm-reason-list',
        auditHistoryList: 'schedule/audit-history-list',
        auditHistoryTotalInfo: 'schedule/audit-history-total-info',
        auditHistoryTalentList: 'schedule/audit-history-talent-list',
        platformStat: 'schedule/platform-stat',
        totalStat: 'schedule/total-stat',
        internalPreview: 'schedule/internal-preview',
        internalPreviewCount: 'schedule/internal-preview-count',
        externalPreview: 'schedule/external-preview',
        scheduleExport: 'schedule/export',
      },
      institute: {
        instituteFilter: 'mcn/get-platform-dim',
        instituteList: 'mcn/get-list',
        instituteInfo: 'mcn/get-info',
        instituteTalentList: 'mcn/get-talent-list',
        rebateSubmit: 'mcn/update-rebate',
        updateAgencyRebate: 'mcn/update-mcn-rebate',
      },
    },
    operator: {
      brand: {
        brandList: 'brand/get-list',
        brandInfo: 'brand/get-info',
        getImportPlatforms: 'platform/get-list',
        validateImport: 'talent/validate',
        import: 'talent/import',
        templateFileUrl1: 'file/get?fileId=8',
        templateFileUrl2: 'file/get?fileId=9',
        templateFileUrl3: 'file/get?fileId=10',
        templateFileUrl4: 'file/get?fileId=11',
      },
      schedule: {
        campaignList: 'project/get-list',
        draftList: 'project/get-draft-list',
        productList: 'project/product-line-list',
        campaignCount: 'project/get-count',
        platformTalentList: 'project/platform-talent-list',
        customerConfirmInfo: 'project/customer-confirm-info',
        customerConfirmSubmit: 'project/customer-confirm-save',
        saveDraftSubmit: 'project/draft-save',
        auditSubmit: 'project/audit-save',
        removeTalentSubmit: 'project/remove-talent',
        auditHistoryList: 'project/audit-history-list',
        auditHistoryTotalInfo: 'project/audit-history-total-info',
        auditHistoryTalentList: 'project/audit-history-talent-list',
        platformStat: 'project/platform-stat',
        totalStat: 'project/total-stat',
        internalPreview: 'project/internal-preview',
        internalPreviewCount: 'project/internal-preview-count',
        externalPreview: 'project/external-preview',
        scheduleExport: 'project/export',
        scheduleImport: 'project/import',
        validateImport: 'project/validate-import',
        addTalent: 'project/add-talent',
        getOrderInfo: 'project/get-project-info',
        getOrderInfoTalentList: 'project/get-project-talent-info',
      },
      cart: {
        cartInfo: 'cart/info',
        platformTalentList: 'cart/platform-talent-list',
        removeTalentSubmit: 'cart/remove-talent',
        expectedDataRequired: 'cart/expected-data-required',
        expectedDataSubmit: 'cart/expected-data-save',
        expectedDataSubmitBatch: 'cart/expected-data-save-batch',
        generateScheduleSubmit: 'cart/generate-project',
        productList: 'project-line/list',
        productEditSubmit: 'project-line/save',
        productRemoveSubmit: 'project-line/remove',
        scheduleExport: 'common/common.json?api=operator.schedule.scheduleExport',
      },
      talent: {
        getPlatforms: 'platform/get-list',
        getFilterMap: 'talent/get-dims',
        getList: 'talent/get-list',
        updateList: 'talent/update',
        getLockPrice: 'talent/get-lock-price-list',
        getAllTags: 'talent/get-tags',
        getTalentInfo: 'talent/get-info',
        add: 'talent/add',
        bulkUpdate: 'talent/batch-update',
        talentHistoricalCost: 'talent/talent-cost-history',
        platformHistoricalQuote: 'talent/platform-quote-history',
        cooperationAnalysis: 'talent/cooperation-history',
        getScheduleList: 'talent/get-schedule-list',
        addSchedule: 'talent/add-schedule-talent',
        getCartIdList: 'cart/get-talent-list',
        updateCartList: 'cart/update-talent-list',
        delete: 'talent/delete',
        getFormListData: 'talent/get-talent-form-list',
      },
      order: {
        getList: 'project/get-order-list',
        getTalentList: 'project/get-talent-list',
        talentPublish: 'project/publish',
        delete: 'project/delete',
        getScheduleTalents: 'project/get-schedule-talent',
        add: 'project/add',
        getInfo: 'project/get-order-info',
        edit: 'project/update',
        update: 'project/update',
      },
    },
    audit: {
      agent: {
        tabs: 'agent-file/statistics',
        list: 'agent-file/list',
        getQualificationInfo: 'agent-file/get-info',
        audit: 'agent-file/audit',
        getRefuseReason: 'audit-comment/brief',
      },
      brand: {
        tabs: 'brand/statistics',
        list: 'brand/audit-list',
        getQualificationInfo: 'brand/audit-info',
        audit: 'brand/audit',
        getRefuseReason: 'audit-comment/brief',
      },
    },
    report: {
      getPlatforms: 'platform/get-list',
      list: 'project/get-post-list',
      getTalentByProject: 'project/get-talent',
      getProjectByTalent: 'project/get-project',
      info: 'project/info',
      interactiveTrends: 'project/trend',
      hotWords: 'project/wordcloud',
      hotComments: 'project/comment',
      productComments: 'project/keyword-comment',
      negativeComments: 'project/negative-comment',
      commentMood: 'project/comment-attitude',
      viewRateTrends: 'project/play-distribution',
    },
    finance: {
      filterMap: 'finance/get-status-dim',
      list: 'finance/list',
      totalAmount: 'finance/get-total-amount',
      update: 'finance/save',
    },
  },
}

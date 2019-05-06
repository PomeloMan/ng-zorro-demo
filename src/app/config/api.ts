import { HttpHeaders } from '@angular/common/http';

export const API = {

    MENU_NAV_URL: 'sys/menu/nav',//菜单列表



    CAPTCHA_URL: 'captcha',//获取验证码
    AUTH_URL: 'login',//登录
    CODE_URL: 'code',//获取邮件验证码
    SIGNUP_URL: 'signup',//快速注册登陆
    LINK_URL: 'link',//绑定项目
    // Locales
    LOCALE_LIST_URL: 'app/locale/list',
    // User
    USER_URL: 'sys/user',//用户
    USER_ME_URL: 'sys/user/updateMe',
    USER_LIST_URL: 'sys/user/list',//用户列表
    USER_LISTS_URL: 'sys/user/lists',//用户列表
    USER_PAGE_URL: 'sys/user/page',//用户列表
    USER_INFO_URL: 'sys/user/info',//用户信息
    USER_SAVE_URL: 'sys/user/saveAll',//用户保存
    // Role
    ROLE_LIST_URL: 'sys/role/list',//角色列表
    // System module

    // Notification
    NOTIFICATION_LIST_URL: 'app/project/notifications',//通知类型列表
    // Project module
    PROJECT_URL: 'app/project',
    PROJECT_USER_URL: 'app/project/users',//项目成员
    PROJECT_ISDELETED_URL: 'app/project/isDeleted',
    PROJECT_PAGE_URL: 'app/project/page',//项目列表
    PROJECT_LIST_URL: 'app/project/list',//项目列表
    PROJECT_COMPLETE_URL: 'app/project/complete',//完成项目
    PROJECT_MEMBER_URL: 'app/project/member',//项目成员
    // Client module
    CLIENT_PAGE_URL: 'app/client/page',//客户列表
    CLIENT_LIST_URL: 'app/client/list',//客户列表
    // Query module
    QUERY_URL: 'app/querybase',
    QUERY_LIST_URL: 'app/querybase/search',
    QUERY_PAGE_URL: 'app/querybase/page',//Query列表
    QUERY_MARK_URL: 'app/querybase/mark',
    QUERY_EXPORT_URL: 'app/querybase/export',
    QUERY_IMPORT_URL: 'app/querybase/import',
    QUERY_MOVETO_URL: 'app/querybase/moveto',
    QUERY_ISDELETED_URL: 'app/querybase/isDeleted',
    QUERY_REVISION_URL: 'app/query/revision',
    QUERY_REVISION_PAGE_URL: 'app/query/revision/page',
    QUERY_REVISION_LIST_URL: 'app/query/revision/list',
    QUERY_REVISION_MARK_URL: 'app/query/revision/mark',
    QUERY_WATCHER_URL: 'app/watcher',
    QUERY_MY_WATCH: 'app/watcher/page',
    QUERY_MY_QUERY: 'app/watcher/page/query',
    // Attachment
    ATTACH_URL: 'app/attachment',
    ATTACH_EXPORT_URL: 'app/attachment/export',
    // Message
    MESSAGE_PAGE_URL: 'app/message/page'
}


/**
 * options: { observe: 'response' }
 */
export interface ResponseEntity<T> {
    body?: T;
    headers?: HttpHeaders;
    ok?: boolean;
    status?: number;
    statusText?: string;
    type?: number;
    url?: string;
}

export interface Page<T> {
    content?: T;
    first?: boolean;
    last?: boolean;
    number?: number
    numberOfElements?: number
    size?: number
    sort?: string
    totalElements?: number
    totalPages?: number
}
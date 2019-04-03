export const PREFIX = 'http';
export const HOST = 'peer1';
export const PORT = '8000';
export const BASE_PATH = PREFIX + '://' + HOST + ':' + PORT + '/query/';

export const STORAGE_SETTING = '_settings';
export const STORAGE_SETTING_THEME = '_theme';
export const STORAGE_SETTING_STYLE = '_style';


export const SSO = false;
export const CAS_SERVER_LOGOUT_URL = 'https://www.neotrans.xyz:8443/cas-server/logout?service=' + BASE_PATH + 'toLogin';
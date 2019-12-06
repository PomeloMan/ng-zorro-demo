import { isNullOrUndefined } from 'util';
import { NzNotificationService, NzModalService, NzMessageService } from 'ng-zorro-antd';

/**
 * 将目标对象转成树结构
 * @param source 转换对象
 * @param iteractor 转换成 nztree node 对象
 * @param callback 回调函数
 */
export function convert(source: object, iteractor?: (node) => any, callback?: (array, hashMap) => Array<any>) {
  const stack: any[] = [];
  const array: any[] = [];
  const hashMap = {};

  stack.push({ ...source });

  while (stack.length !== 0) {
    let node = { ...stack.pop() };
    if (typeof iteractor === 'function') {
      node = iteractor(node);
    }
    if (node.parent) {
      if (isNullOrUndefined(hashMap[node.parent.id])) {
        hashMap[node.parent.id] = [];
      }
      hashMap[node.parent.id].push(node);
    }
    array.push(node);
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ ...node.children[i], parent: { ...node, children: null } });
      }
    }
  }
  if (typeof callback === 'function') {
    return callback(array, hashMap);
  }
  return array;
}

/**
 * ng-zorro 消息封装
 * @param notificationServ NzNotificationService 对象
 * @param type 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
 * @param title 标题
 * @param content 内容
 */
export function notify(
  notificationServ: NzNotificationService,
  type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
  title?: string,
  content?: string
) {
  notificationServ.create(
    type,
    title ? title : type.toLocaleUpperCase(),
    content
  );
}

/**
 * ng-zorro 模态框封装
 * @param modalServ NzModalService 对象
 * @param callback 成功回调函数
 * @param title 标题
 * @param content 内容
 */
export function confirm(
  modalServ: NzModalService,
  callback = () => { },
  title: string = 'Do you Want to delete the item(s)?',
  content?: string
) {
  return modalServ.confirm({
    nzTitle: title,
    nzContent: content,
    nzOnOk: () => {
      callback();
    }
  });
}

/**
 * ng-zorro 消息封装
 * @param messageServ NzMessageService 对象
 * @param type 'success' | 'info' | 'warning' | 'error' | 'loading'
 * @param content 消息内容
 * @param options 消息配置 { nzDuration: number, nzPauseOnHover: boolean, nzAnimate: boolean }
 */
export function message(
  messageServ: NzMessageService,
  type: 'success' | 'info' | 'warning' | 'error' | 'loading',
  content?: string,
  options?: { nzDuration: number, nzPauseOnHover: boolean, nzAnimate: boolean }
) {
  if (type === 'success') {
    messageServ.success(content, options);
  } else if (type === 'info') {
    messageServ.info(content, options);
  } else if (type === 'warning') {
    messageServ.warning(content, options);
  } else if (type === 'error') {
    messageServ.error(content, options);
  } else if (type === 'loading') {
    messageServ.loading(content, options);
  } else {
    return null;
  }
}

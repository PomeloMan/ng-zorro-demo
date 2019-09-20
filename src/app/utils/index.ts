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
 * @param notification NzNotificationService 对象
 * @param type 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
 * @param title 标题
 * @param content 内容
 */
export function createNotification(
  notification: NzNotificationService,
  type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
  title?: string,
  content?: string
) {
  notification.create(
    type,
    title ? title : type.toLocaleUpperCase(),
    content
  );
}

/**
 * ng-zorro 模态框封装
 * @param modal NzModalService 对象
 * @param callback 成功回调函数
 * @param title 标题
 * @param content 内容
 */
export function showConfirm(
  modal: NzModalService,
  callback = () => { },
  title: string = 'Do you Want to delete the item(s)?',
  content?: string
) {
  return modal.confirm({
    nzTitle: title,
    nzContent: content,
    nzOnOk: () => {
      callback();
    }
  });
}

export function showMessage(
  message: NzMessageService,
  type: 'success' | 'info' | 'warning' | 'error' | 'loading',
  content?: string,
  options?: { nzDuration: number, nzPauseOnHover: boolean, nzAnimate: boolean }
) {
  if (type === 'success') {
    message.success(content, options);
  } else if (type === 'info') {
    message.info(content, options);
  } else if (type === 'warning') {
    message.warning(content, options);
  } else if (type === 'error') {
    message.error(content, options);
  } else if (type === 'loading') {
    message.loading(content, options);
  } else {
    return null;
  }
}

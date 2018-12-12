import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/** service hỗ trợ mapping response body nhận được từ server thành các object.
 * **/
export class ObjectResolverService {
  constructor() {
  }

  /** hàm trả về id của object nhận vào.
   * nếu object này có id, thì trả về id.
   * nếu object này không có id thì trả về NaN.
   * nếu object này không phù hợp (với kiểu trả về của server) thì trả về null.
   * **/
  resolveId(object: any): number {
    if (object.hasOwnProperty('_links')) {
      object = object._links;
      if (object.hasOwnProperty('self')) {
        object = object.self;
        const href = object.href;
        return Number(href.split('/').pop());
      }
    }
    return null;
  }

  /** Trả về object thuộc kiểu T từ object đã cho.
   *  Không bao gồm các trường trong _links
   *  Trả về null nếu object này không đúng kiểu nhận về từ server
   * @Param selfLink: có trả về selfLink hay không. mặc định không.
   * **/
  resolveBase<T>(object: any, selfLink: boolean = false): T {
    if (!object.hasOwnProperty('_embedded')) {
      let resolvedObject = {};
      resolvedObject['id'] = this.resolveId(object);
      if (selfLink) {
        if (object.hasOwnProperty('_links')) {
          if (object._links.hasOwnProperty('self')) {
            resolvedObject['self'] = object._links.self.href;
          }
        }
      }
      for (const property in object) {
        if (object.hasOwnProperty(property) && property !== '_links') {
          resolvedObject[property] = object[property];
        }
      }
      return resolvedObject as T;
    }
    return null;
  }

  /** Trả về object '_links' đã được làm gọn.
   * **/
  resolveLinks(object: any): any {
    let resolvedObject = {};
    if (object.hasOwnProperty('_links')) {
      object = object._links;
      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          resolvedObject[property] = object[property].href;
        }
      }
      return resolvedObject;
    }
    return null;
  }

  /** Trả về object thuộc kiểu T từ object đã cho.
   * Object này có cấu trúc đơn giản hơn object nhận từ sever
   * các phần trong '_links' đã được lấy ra và gộp vào object trả về.
   * Trả về null nếu object này không đúng kiểu nhận về từ server
   * @Param selfLink: có lấy _link.self hay không, mặc định có.
   * **/
  resolve<T>(object: any, selfLink: boolean = true): T {
    if (!object.hasOwnProperty('_embedded')) {
      let resolvedObject = this.resolveBase(object);
      if (object.hasOwnProperty('_links')) {
        object = object._links;
        for (const property in object) {
          if (object.hasOwnProperty(property) && (selfLink || property !== 'self')) {
            resolvedObject[property] = object[property].href;
          }
        }
      }
      return resolvedObject as T;
    }
    return null;
  }
}

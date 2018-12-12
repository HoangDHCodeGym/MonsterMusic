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
   *  Trả về object được đính kèm nếu object này không đúng kiểu nhận về từ server
   *
   * @Param selfLink: có trả về selfLink hay không. mặc định không.
   * @Param appendTo: object đính kèm, mặc định {}, sẽ trả về object này đã được đính thêm các field nhận được.
   * **/
  resolveBase<T>(object: any, appendTo: any = {}, selfLink: boolean = false): T {
    if (!object.hasOwnProperty('_embedded')) {
      let resolvedObject = appendTo;
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
    return appendTo as T;
  }

  /** Trả về object '_links' đã được làm gọn.
   *
   * @Param selfLink: có trả về selfLink hay không. mặc định có.
   * @Param appendTo: object đính kèm, mặc định {}, sẽ trả về object này đã được đính thêm các field nhận được.
   * **/
  resolveLinks(object: any, appendTo: any = {}, selfLink: boolean = true): any {
    let resolvedObject = appendTo;
    if (object.hasOwnProperty('_links')) {
      object = object._links;
      for (const property in object) {
        if (object.hasOwnProperty(property) && (selfLink || property !== 'self')) {
          resolvedObject[property] = object[property].href;
        }
      }
      return resolvedObject;
    }
    return appendTo;
  }

  /** Trả về object thuộc kiểu T từ object đã cho.
   * Object này có cấu trúc đơn giản hơn object nhận từ sever
   * các phần trong '_links' đã được lấy ra và gộp vào object trả về.
   * Trả về object được đính kèm nếu object này không đúng kiểu nhận về từ server
   *
   * @Param selfLink: có lấy _link.self hay không, mặc định có.
   * @Param appendTo: object đính kèm, mặc định {}, sẽ trả về object này đã được đính thêm các field nhận được.
   * **/
  resolve<T>(object: any, appendTo: any = {}, selfLink: boolean = true): T {
    let resolvedObject = this.resolveLinks(object, appendTo, selfLink);
    resolvedObject = this.resolveBase(object, resolvedObject, false);
    return resolvedObject as T;
  }

  /** Trả về một object
   *   cấu trúc : * page:{} chứa các thông tin về paging and sorting
   *              * list là 1 mảng chứa các object đã được xử lý bằng hàm resolveBase ở trên.
   *              * self, profile chứa thông tin của _link.
   *
   *   @Param appendTo: object đính kèm, mặc định {}, sẽ trả về object này đã được đính thêm các field nhận được.
   * **/
  resolveList<T>(object: any, appendTo: any = {}) {
    if (object.hasOwnProperty('_embedded')) {
      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          if (property !== '_embedded' && property !== '_links') {
            appendTo[property] = object[property]
          }
        }
      }
      appendTo = this.resolveLinks(object, appendTo);
      object = object._embedded;
      for (const prop in object) {
        if (object.hasOwnProperty(prop)) {
          appendTo['list'] = object[prop];
          for (let e of appendTo['list']) {
            e = this.resolveBase(e, {}, true);
          }
        }
      }
    }
    return appendTo as T;
  }
}

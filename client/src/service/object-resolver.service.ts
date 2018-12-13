import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
/** service hỗ trợ mapping response body nhận được từ server thành các object.
 * **/
export class ObjectResolverService {
  constructor(private httpClient: HttpClient) {
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

  /** tương tự như httpClient.get nhưng trả về 1 object trong đó tất
   * cả các thành phần trong _links đã được get và resolve.
   *
   * @param url : link api để get
   * @param id : id của object cần get
   * **/
  get(url, id: number): Observable<any> {
    let output = {
      data: {},
      uploadData: {},
    };
    let links = {
      _links: {},
      solved: {}
    };
    return from(this.httpClient
      .get<HttpResponse<any>>(url + '/' + id, {observe: 'response'})
      .toPromise()
      .then(
        async (response) => {
          if (response.status == 200) {
            output.uploadData = this.resolveBase(response.body);
            output.data = this.resolve(response.body);
            console.log(output.data);
            links._links = this.resolveLinks(response.body, {}, false);
            for (const prop in links._links) {
              try {
                await this.httpClient
                  .get(links._links[prop])
                  .toPromise()
                  .then((resp) => {
                      if (links._links[prop] !== url + '/' + id) {
                        if (!resp.hasOwnProperty('"_embedded"')) {
                          links.solved[prop] = this.resolveBase(resp, {}, true);
                        } else {
                          links.solved[prop] = this.resolveList(resp,)
                        }
                      }
                    }
                  )
              } catch (e) {
                links.solved[prop] = null;
              }
            }
            output.data = this.resolve(links.solved, output.data);
            output.data['id'] = id;
          }
        }, () => {
          output = null;
        }
      )
      .then(() => output))
  }
}

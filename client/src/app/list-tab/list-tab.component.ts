import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ObjectResolverService} from "../../service/object-resolver.service";


@Component({
  selector: 'app-list-tab',
  templateUrl: './list-tab.component.html',
  styleUrls: ['./list-tab.component.scss']
})
export class ListTabComponent<T> implements OnInit {
  list: T[] = [];
  page = {
    number: 0,
    size: 5,
    totalElements: 0,
    totalPages: 0
  };

  @Input()
  set size(size: number) {
    this.page.size = size;
  }

  @Input() url: string;
  @Input() sort: string;
  @Input() asc: boolean = true;

  @Output() choose = new EventEmitter<number>();
  @Output() exit = new EventEmitter<void>();

  constructor(private httpClient: HttpClient,
              private resolver: ObjectResolverService) {
  }

  ngOnInit() {
    this.fetch();
    this.resolver.get('http://localhost:8080/api/singers', 1, false)
      .subscribe(resp => console.log(resp))
  }

  onChoose(id: number) {
    this.choose.emit(id);
  }

  onExit() {
    this.exit.emit();
  }

  private fetch() {
    this.httpClient
      .get(this.url
        + '?page='
        + this.page.number
        + '&size='
        + this.page.size
        + this.sortType(), {observe: 'response'})
      .subscribe(response => {
        if (response.status == 200) {
          const solved = this.resolver.resolveList<any>(response.body);
          this.list = solved.list;
        }
      })
  }

  private sortType(): string {
    if (typeof this.sort != 'undefined') {
      const sort = '&sort=' + this.sort + ',';
      if (this.asc) {
        return sort + 'asc';
      }
      return sort + 'desc';
    }
    return '';
  }
}

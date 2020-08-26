import { HttpService } from "./http.service";

import { PagedData } from "../shared/models/dto/paged-data";
import { QueryFilter } from "../shared/models/dto/query-filter";
import { SortInfo } from "../shared/models/dto/sort-info";
import { PageRequest } from "../shared/models/dto/page-request";
import { Observable } from "rxjs";
export default abstract class BaseService<T> {
    constructor(
        protected httpService: HttpService,
        private SERVICE_PATHS: any
    ) { }

    create(t: T): Observable<T> {
        return this.httpService.postForEntity<T>(this.SERVICE_PATHS.CREATE, t);
    }

    uploadFile(path, formData: FormData, progress?): Observable<any> {
        if (progress) {
            return this.httpService.postFile(path, formData, true);
        }
        return this.httpService.postFile(path, formData);
    }
    update(t: T, path?: string): Observable<T> {
        if (!path) {
            return this.httpService.put<T>(this.SERVICE_PATHS.UPDATE(t), t);
        } else {
            return this.httpService.put<T>(path, t);
        }
    }

    delete(t: T): Observable<any> {
        return this.httpService.delete(this.SERVICE_PATHS.DELETE(t));
    }

    getById(id: any): Observable<T> {
        return this.httpService.get(this.SERVICE_PATHS.GET_BY_ID(id));
    }

    list(
        pageRequest?: PageRequest,
        sortInfo?: SortInfo | null
    ): Observable<PagedData<T>> {
        return this.httpService.list<T>(
            this.SERVICE_PATHS.LIST,
            pageRequest,
            sortInfo
        );
    }

    filter(
        queryFilters: QueryFilter[],
        pageRequest?: PageRequest,
        sortInfo?: SortInfo | null
    ): Observable<PagedData<T>> {
        if (!sortInfo) { sortInfo = this.getDefaultSortInfo() };
        if (queryFilters == null || queryFilters.length === 0) {
            return this.list(pageRequest, sortInfo);
        }
        return this.httpService.filter(
            this.SERVICE_PATHS.FILTER,
            queryFilters,
            pageRequest,
            sortInfo
        );
    }

    getDefaultSortInfo = () => {
        return null;
    };
}

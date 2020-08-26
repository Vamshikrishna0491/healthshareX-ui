import { Injectable, OnInit } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpParams,
    HttpEvent,
    HttpErrorResponse
} from "@angular/common/http";
import { PageInfo } from "../shared/models/dto/page-info";
import { PagedData } from "../shared/models/dto/paged-data";
import { QueryFilter } from "../shared/models/dto/query-filter";
import { SortInfo } from "../shared/models/dto/sort-info";
import { PageRequest } from "../shared/models/dto/page-request";


import { Observable, of, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { environment } from "../../environments/environment";

const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS, PUT"
    }),
    withCredentials: true
  };

const httpParamOptions = {
};

@Injectable({
    providedIn: "root"
})
export class HttpService {
    private apiBaseUrl: string;

    constructor(private http: HttpClient) {
        this.apiBaseUrl = environment.baseApiUrl;
    }

    get<T>(
        path: string,
        queryParams?: { key: string; value: any }[] | null,
        options?: any
    ): Observable<T> {
        console.log("ENTERED URL HTTP -- "+ this.apiBaseUrl+path)
        let requestHttpOptions = httpOptions;
        if (options) requestHttpOptions = { ...httpOptions, ...options };

        if (queryParams) {
            let params = new HttpParams();
            queryParams.forEach(element => {
                params = params.set(element.key, element.value);
            });
            let options = { ...requestHttpOptions, params };
            return this.http.get<T>(this.apiBaseUrl + path, options).pipe(
                map(res => res),
                catchError(this.handleError('onGet'))
            );
        } else {
            return this.http
                .get<T>(this.apiBaseUrl + path, requestHttpOptions)
                .pipe(
                    map(res => res),
                    catchError(this.handleError('onGet'))
                );
        }
    }

    list<T>(
        path: string,
        pageRequest?: PageRequest,
        sortInfo?: SortInfo | null,
        addlParams?: any
    ): Observable<PagedData<T>> {
        let params = new HttpParams();
        if(pageRequest){
            params = params.set("page", String(pageRequest.pageIndex))
            .set("size", String(pageRequest.pageSize));
        }

        if (sortInfo && sortInfo.prop) {
            params = params.set(
                "sort",
                sortInfo.prop + " " + (sortInfo.dir ? sortInfo.dir : "asc")
            );
        }

        if (addlParams) {
            addlParams.forEach(element => {
                params = params.set(element.key, element.value);
            });
        }

        let options = { ...httpOptions, params };

        return this.http
            .get<PagedData<T>>(this.apiBaseUrl + path, options)
            .pipe(
                map(res => this.tranformData<T>(res)),
                catchError(this.handleError('onList'))
            );
    }

    filter<T>(
        path: string,
        data: QueryFilter[],
        pageRequest?: PageRequest,
        sortInfo?: SortInfo|null
    ): Observable<PagedData<T>> {
        let params = new HttpParams()
            .set("page", String(pageRequest ? pageRequest.pageIndex + 1 : 1))
            .set("size", String(pageRequest ? pageRequest.pageSize : 20));
        if (sortInfo && sortInfo.prop){
            params = params.set(
                "sort",
                sortInfo.prop + " " + (sortInfo.dir ? sortInfo.dir : "asc")
            );
        }

        let options = { ...httpOptions, params };

        return this.http.post<T>(this.apiBaseUrl + path, data, options).pipe(
            map(res => this.tranformData<T>(res)),
            catchError(this.handleError('filter'))
        );
    }

    postWithParams<T>(
        path: string,
        pageRequest?: PageRequest,
        addlParams?: { key: string; value: any }[],
    ): Observable<T> {

        let params = new HttpParams()
        //     .set("pageIndex", String(pageRequest ? pageRequest.pageIndex + 1 : 1))
        //     .set("pageSize", String(pageRequest ? pageRequest.pageSize : 10));


        if (addlParams) {
            addlParams.forEach(element => {
                params = params.set(element.key, element.value);
            });
        }

        let options = { ...httpOptions };
        return this.http.post<T>(this.apiBaseUrl + path, pageRequest, options).pipe(
            map(res => res),
            catchError(this.handleError('Post with params'))
        );
    }

    postForLogin(
        path: string,
        loginInfo: {
            username: string;
            password: string;
        }
    ): Observable<string> {
        let params = new HttpParams();
        params = params.set("username", loginInfo.username);
        params = params.set("password", loginInfo.password);

        let options = { params, responseType: "text" as "text" };
        console.log("check");
        return this.http.post(this.apiBaseUrl + path, null, options).pipe(
            map(res => res),
            catchError(this.handleError('post'))
        );
    }

    post<T>(path: string, data: any, options?: any): Observable<T> {
        let postHttpOptions = httpOptions;
        if (options) postHttpOptions = { ...httpOptions, ...options };
        return this.http
            .post<T>(this.apiBaseUrl + path, data, postHttpOptions)
            .pipe(
                map(res => res),
                catchError(this.handleError('post'))
            );
    }
    postFile(path: string, data: FormData,progress?): Observable<any> {

            if(progress) {

                return this.http.post(this.apiBaseUrl + path, data,
                    {responseType:"text" as "text",reportProgress:true,observe: 'events'}).pipe(
                    map(d=>  d)
                );
          }


        return this.http.post(this.apiBaseUrl + path, data,{responseType:"text" as "text"}).pipe(
            map(d=>  d)
        );
      }

    postForEntity<T>(path: string, data: T): Observable<T> {
        console.log('this.apiBaseUrl + path',this.apiBaseUrl + path, data);
        return this.http
            .post<T>(this.apiBaseUrl + path, data)
            .pipe(
                map(res => res),
                catchError(this.handleError())


            );
    }

    put<T>(path: string, data: T): Observable<T> {
        console.log('PUT this.apiBaseUrl + path',this.apiBaseUrl + path, data);
        return this.http.put<T>(this.apiBaseUrl + path, data, httpOptions).pipe(
            map(res => res),
            catchError(this.handleError())
        );
    }

    delete(path: string): Observable<Object> {
        return this.http.delete(this.apiBaseUrl + path, httpOptions).pipe(
            map(res => res),
            catchError(this.handleError())
        );
    }
    deleteWithBody(path: string,body?:any): Observable<Object> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: body,
            withCredentials: true

        };
        return this.http.delete(this.apiBaseUrl + path, httpOptions).pipe(
            map(res => res),
            catchError(this.handleError())
        );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: T): Observable<T|boolean> => {
          console.log(error);
          return throwError(error);
        };
      }

    private tranformData<T>(data: any) {
        const myPageInfo = new PageInfo();
        myPageInfo.pageNumber = data["number"];
        myPageInfo.pageSize = data["size"];
        myPageInfo.numberOfElements = data["numberOfElements"];
        myPageInfo.totalElements = data["totalElements"];
        myPageInfo.totalPages = data["totalPages"];

        const mySortInfo = new SortInfo();
        mySortInfo.prop =
            data["sort"] && data["sort"][0] ? data["sort"][0].property : null;
        mySortInfo.dir =
            data["sort"] && data["sort"][0] ? data["sort"][0].direction : null;

        const pagedData = new PagedData<T>(
            data["content"] || data,
            myPageInfo,
            mySortInfo
        );
        return pagedData;
    }
}

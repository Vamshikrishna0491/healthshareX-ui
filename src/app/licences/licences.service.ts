import { Injectable } from "@angular/core";
import BaseService from "../services/base.service";
import { HttpService } from "../services/http.service";
import { Observable, Subject } from "rxjs";
import { HttpRequest, HttpEventType, HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LicencesComponent } from './licences.component';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";

const SERVICE_PATHS = {

    GET_LIST_LICENCES: `https://healthsharex.com/services/licenceType`,
    BUY_LICENCE: id => `services/licences/${id}`,
};

@Injectable({
    providedIn: "root"
})
export class LicencesService extends BaseService<LicencesComponent> {
    baseAPiUrl = environment.baseApiUrl;
    constructor(httpService: HttpService, public http: HttpClient, private httpClientModule:HttpClientModule) {
        super(httpService, SERVICE_PATHS);
    }
    
    getAllLicences(): Observable<any> {
        console.log("Called Get Licences Service")
        return this.http.get<any>(SERVICE_PATHS.GET_LIST_LICENCES);
    }

}

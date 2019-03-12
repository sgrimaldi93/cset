////////////////////////////////
//
//   Copyright 2018 Battelle Energy Alliance, LLC
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.
//
////////////////////////////////
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';


/* Naming NOTE
  The API's file field is `fileItem` thus, we name it the same below
  it's like saying <input type='file' name='fileItem' />
  on a standard file field
*/


@Injectable()
export class FileUploadClientService {

  downloadUrl: String;
  reportsUrl: String;
  Token: String;
  exportUrl: string;

  constructor(private http: HttpClient, private configSvc: ConfigService,
    private authSvc: AuthenticationService) {
    this.downloadUrl = this.configSvc.apiUrl + 'files/download/';
    this.exportUrl = this.configSvc.apiUrl + 'files/export';
    this.reportsUrl = this.configSvc.reportsUrl;
    this.Token = this.authSvc.userToken();
  }

  downloadFile(id: number) {
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      params: new HttpParams()
    };
    return this.http.get(this.downloadUrl + '' + id, headers);
  }
  download(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
  getText(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
  /**
   *
   * @param fileItem
   * @param extraData
   */
  fileUpload(fileItem: File, extraData?: object): any {
    const apiCreateEndpoint = this.configSvc.apiUrl + 'files/blob/create/';
    const formData: FormData = new FormData();

    formData.append('fileItem', fileItem, fileItem.name);
    if (extraData) {
      for (const key of Object.keys(extraData)) {
        // iterate and set other form data
        formData.append(key, extraData[key]);
      }
    }

    const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
      reportProgress: true // for progress data
    });
    return this.http.request(req);
  }

  /**
   *
   * @param fileItem
   * @param extraData
   */
  optionalFileUpload(fileItem?: File, extraData?: object): any {
    const apiCreateEndpoint = this.configSvc.apiUrl + 'files/blob/create/';
    const formData: FormData = new FormData();
    let fileName;
    if (extraData) {
      for (const key of Object.keys(extraData)) {
        // iterate and set other form data
        if (key === 'fileName') {
          fileName = extraData[key];
        }
        formData.append(key, extraData[key]);
      }
    }

    if (fileItem) {
      if (!fileName) {
        fileName = fileItem.name;
      }
      formData.append('image', fileItem, fileName);
    }
    const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
      reportProgress: true // for progress data
    });
    return this.http.request(req);
  }
  moduleStatus(moduleId: string): Observable<any> {
    const moduleEndpoint = this.configSvc.apiUrl + 'import/' + moduleId;
    return this.http.get(moduleEndpoint);
  }
  getSchema(): Observable<any> {
    return this.http.get(this.configSvc.apiUrl + 'schema');
  }
  getExports(): Observable<Array<LinkedSet>> {
    const moduleEndpoint = this.configSvc.apiUrl + 'export';
    return this.http.get<Array<LinkedSet>>(moduleEndpoint);
  }
  getXMLExportSet(setName: string): Observable<string> {
    const moduleEndpoint = this.configSvc.apiUrl + 'export/' + setName;
    const headers = new HttpHeaders({ "Accept": "application/xml" });
    return this.http.get(moduleEndpoint, { headers: headers, responseType: "text" });
  }
  getJSONExportSet(setName: string): Observable<string> {
    const moduleEndpoint = this.configSvc.apiUrl + 'export/' + setName;
    const headers = new HttpHeaders({ "Accept": "application/json" });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.http.get(moduleEndpoint, options);
  }
  moduleUpload(module: string): Observable<any> {
    const moduleEndpoint = this.configSvc.apiUrl + 'import';
    let contentType = "application/json";
    if (module.startsWith("<")) {
      contentType = "application/xml";
    }
    const headers = new HttpHeaders({ "Content-Type": contentType });
    return this.http.post(moduleEndpoint, module, { headers: headers });
  }
  /**
   *
   */
  list(): Observable<any> {
    const listEndpoint = this.configSvc.apiUrl + 'files/';
    return this.http.get(listEndpoint);
  }

  /**
   *
   */
  uploadReferenceDoc(fileItem: File, options?: object): any {
    const apiCreateEndpoint = this.configSvc.apiUrl + 'builder/UploadReferenceDoc';
    const formData: FormData = new FormData();

    formData.append('fileItem', fileItem, fileItem.name);
    formData.append('setName', sessionStorage.getItem('setName'));
    // if we ever need to support options, add them here

    const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
      reportProgress: true // for progress data
    });
    return this.http.request(req);
  }
}

export class LinkedSet {
  public SetName: string;
  public Name: string;
}
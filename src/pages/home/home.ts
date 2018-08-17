import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent, PDFProgressData } from 'ng2-pdf-viewer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  pdfSrc: any;

  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  error: any;
  showAll = true;
  autoresize = true;
  fitToPage = false;
  pageNumber: number;


  // or pass options as object
  // pdfSrc: any = {
  //   url: './assets/pdf-test.pdf',
  //   withCredentials: true,
  //// httpHeaders: { // cross domain
  ////   'Access-Control-Allow-Credentials': true
  //// }
  // };

  rotation = 0;
  zoom = 1.0;
  originalSize = false;
  pdf: any;
  renderText = true;
  progressData: PDFProgressData;
  outline: any[];
  isOutlineShown = false;

  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  // pdfData = atob('JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
  //   'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
  //   'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
  //   'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
  //   'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
  //   'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
  //   'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
  //   'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
  //   'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
  //   'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
  //   'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
  //   'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
  //   'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G');

  constructor() {

  }

  ngOnInit() {
    this.pageNumber = this.page;
    this.pdfSrc = '../assets/test.pdf';

    // var rawLength = this.pdfData.length;
    // var array = new Uint8Array(new ArrayBuffer(rawLength));

    // for (var i = 0; i < rawLength; i++) {
    //   array[i] = this.pdfData.charCodeAt(i);
    // }

    // this.pdfSrc = array;
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
    this.pageNumber = this.page;
    this.scrollToPage();
  }

  prevPage() {
    this.page--;
    this.pageNumber = this.page;
    this.scrollToPage();
  }

  zoomIn(amount: number) {
    this.zoom += 0.1;
  }

  fit() {
    this.zoom = 1.0;
  }

  zoomOut(amount: number) {
    this.zoom -= 0.1;
  }

  gotoPage(event) {
    let pageNo = event.target.value;
    if (pageNo != '') {
      if (pageNo > 0 && pageNo <= this.totalPages) {
        this.page = event.target.value;
        this.scrollToPage();
      }
      else {
        this.pageNumber = this.page;
      }
    }
  }

  onError(error: any) {
    this.error = error; // set error
    if (error.name === 'PasswordException') {
      const password = prompt('This document is password protected. Enter the password:');

      if (password) {
        this.error = null;
        this.setPassword(password);
      }
    }
  }

  setPassword(password: string) {
    let newSrc;

    if (this.pdfSrc instanceof ArrayBuffer) {
      newSrc = { data: this.pdfSrc };
    } else if (typeof this.pdfSrc === 'string') {
      newSrc = { url: this.pdfSrc };
    } else {
      newSrc = { ...this.pdfSrc };
    }

    newSrc.password = password;

    this.pdfSrc = newSrc;
  }

  scrollToPage() {
    this.pdfComponent.pdfViewer.scrollPageIntoView({
      pageNumber: this.page
    });
  }
}


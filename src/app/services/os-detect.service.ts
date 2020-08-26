import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OsDetectService {
  userAgent;
  constructor() {
    this.userAgent = navigator.userAgent || navigator.vendor;  
  }
  isWindowsOS() {
    if (/windows phone/i.test(this.userAgent)) {
      return true;
    }else{
      return false;
    }
  }
  isWeb(){
    if (navigator.platform == "Win32") {
      return true;
    }else{
      return false;
    }
  }
  isAndriod() {
    if (/android/i.test(this.userAgent) && navigator.platform != "Win32") {
      return true;
    }else{
      return false;
    }
  }
  isIOS() {
    if (/iPad|iPhone|iPod/.test(this.userAgent)) {
      return true;
    }else{
      return false;
    }
  }
  isSafari(){
    if(/Safari/.test(this.userAgent)){
      return true;
    }else{
      return false;
    }
  }
  isIOSChorme() {
    if (/CriOS/i.test(navigator.userAgent) &&
      /iphone|ipod|ipad/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }

  isIE(){
    if(navigator.vendor == ""){
      return true;
    }else{
      return false;
    }
  }
}

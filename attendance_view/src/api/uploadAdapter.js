import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { uploadfileDataImageAdmin,registerPageToWriter ,updatePageToWriter} from '../api/httpBaseUtil.js';
import '../config/config.js'

class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file
        .then( file => new Promise( ( resolve, reject ) => {
                const data = new FormData() 
                data.append('file', file);    
                uploadfileDataImageAdmin(data)
                .then((response)=>{
                    if(!!response.data.path){
                        var image_head = response.data.url;
                        resolve({
                            default: image_head
                        });
                    }
                    else
                    {
                        reject(false);
                    }
                    
                })
                .catch((error)=>{
                    reject(false);
                });
        } ) );
    }
    abort() {
    }
}

export const MyCustomUploadAdapterPlugin=(editor)=> {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
      return new UploadAdapter(loader)
    }
}

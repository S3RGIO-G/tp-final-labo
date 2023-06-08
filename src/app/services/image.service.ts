import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getBytes, getDownloadURL, } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private storage: Storage) { }

  async addImage(image : File, id : string){
    const imgRef = ref(this.storage, `images/${id}/${image.name}`);
    return uploadBytes(imgRef, image).then( async (res) => {
      return await getDownloadURL(res.ref);
    });
  }

  getImages(){
    //Mejor me creo un array aca y directamente paso un array de URL's
    const imgRef = ref(this.storage, `images`);
    return listAll(imgRef);
  }

  getImage(name: string){
    const imgRef = ref(this.storage, `images/${name}`);
    return imgRef;
  }


}

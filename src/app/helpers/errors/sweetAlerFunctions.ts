import { AnimationModal, Sweetalert2 } from '@helpers/interfaces/sweetAlert.interface';
import Swal from 'sweetalert2';


export function showAlertError( { title, text , showClass }: Sweetalert2 ){

  return Swal.fire({
    title,
    text,
    icon: 'error',
    showClass: showClass ?  AnimationModal.popup1: undefined,
    hideClass: showClass ? AnimationModal.popup2 : undefined,
  })

}



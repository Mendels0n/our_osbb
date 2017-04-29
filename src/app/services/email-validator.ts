import { UserService } from './user.service';
import { AbstractControl } from '@angular/forms';

export function checkUniqueEmail(service: UserService, control: any) {
    return function (control: any) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                service.checkEmeil(control.value).subscribe(
                    (res: any) => {
                        console.log(res);
                        if (res.exist == true) {
                            resolve({
                                emailTaken: true
                            });
                        } else {
                            resolve(null);
                        }
                    },
                    err => {
                        resolve({
                            emailTaken: true
                        });
                    }
                );
            },500)
        });
    };
}
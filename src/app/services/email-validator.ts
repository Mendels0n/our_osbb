import { UserService } from './user.service';
import { AbstractControl } from '@angular/forms';

export function checkUniqueEmail(service: UserService, control: any) {
    return function (control: any) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                service.checkEmeil(control.value).subscribe(
                    (res: boolean) => {
                        if (res == true) {
                            resolve({
                                emailIdTaken: true
                            });
                        } else {
                            resolve(null);
                        }
                    },
                    err => {
                        resolve({
                            emailIdTaken: true
                        });
                    }
                );
            },500)
        });
    };
}
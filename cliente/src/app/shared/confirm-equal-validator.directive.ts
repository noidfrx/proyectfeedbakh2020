import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true    
    }]
    
})

export class ConfirmEqualValidatorDirective implements Validator{
    @Input() appConfirmEqualValidator: string;
    validate(control: AbstractControl): {[key:string]:any} | null{
        //Subimos un nivel hasta el formulario
        const controlToCompare = control.parent.get(this.appConfirmEqualValidator);

        //Comprobamos si existe control a comparar y si las contraseñas no son iguales
        if(controlToCompare && controlToCompare.value !== control.value){
            return {'notEqual':true};
        }
        return null;
    }
}